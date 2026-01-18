import React, { useEffect, useMemo, useState } from "react";
import emailjs from "@emailjs/browser";
import { EMAILJS_CONFIG } from "../config/emailjs";

/**
 * FreeConsultation.jsx
 * - React + Tailwind
 * - Month calendar view, only upcoming dates selectable
 * - Slot selection + niche selection
 * - Sends booking details via EmailJS
 *
 * ENV (Vite):
 *   VITE_EMAILJS_SERVICE_ID=xxxx
 *   VITE_EMAILJS_TEMPLATE_ID=xxxx
 *   VITE_EMAILJS_PUBLIC_KEY=xxxx
 *
 * EmailJS template variables suggested:
 *   {{name}}, {{email}}, {{date}}, {{time}}, {{niche}}, {{notes}}
 */

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

// Adjust as you like
const NICHES = [
    "Web Development",
    "Videography",
    "Photography",
    "Branding",
    "Social Media",
    "Graphic Design",
    "Advertising",
    "3D",
    "Strategy",
];

// Base available time slots (local time)
const BASE_SLOTS = [
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
];

// Example rule: weekends have fewer slots
function slotsForDate(dateObj) {
    const day = dateObj.getDay(); // 0 Sun ... 6 Sat
    if (day === 0) return ["02:00 PM", "02:30 PM", "03:00 PM"]; // Sunday
    if (day === 6) return ["11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM"]; // Saturday
    return BASE_SLOTS; // Weekdays
}

function pad2(n) {
    return String(n).padStart(2, "0");
}

function formatISODate(d) {
    // yyyy-mm-dd (local)
    return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function formatPrettyDate(d) {
    return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function startOfDay(d) {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
}

function isPastDate(dateObj) {
    const today = startOfDay(new Date());
    const target = startOfDay(dateObj);
    return target < today;
}

function daysInMonth(year, monthIndex) {
    return new Date(year, monthIndex + 1, 0).getDate();
}

function firstDayOfMonth(year, monthIndex) {
    return new Date(year, monthIndex, 1).getDay();
}

function loadBookings() {
    try {
        const raw = localStorage.getItem("free_consultation_bookings_v1");
        if (!raw) return {};
        const parsed = JSON.parse(raw);
        return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
        return {};
    }
}

function saveBookings(bookings) {
    localStorage.setItem("free_consultation_bookings_v1", JSON.stringify(bookings));
}

/**
 * bookings format:
 * {
 *   "2026-01-18": ["10:00 AM", "02:00 PM"]
 * }
 */

export default function FreeConsultation() {
    const now = new Date();

    const [viewYear, setViewYear] = useState(now.getFullYear());
    const [viewMonth, setViewMonth] = useState(now.getMonth()); // 0-11

    const [selectedDate, setSelectedDate] = useState(null); // Date | null
    const [selectedSlot, setSelectedSlot] = useState("");
    const [selectedNiche, setSelectedNiche] = useState("");
    const [showModal, setShowModal] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        notes: "",
    });

    const [bookings, setBookings] = useState(() => loadBookings());

    const [status, setStatus] = useState({
        state: "idle", // idle | sending | success | error
        message: "",
    });

    useEffect(() => {
        saveBookings(bookings);
    }, [bookings]);

    const monthMeta = useMemo(() => {
        const totalDays = daysInMonth(viewYear, viewMonth);
        const offset = firstDayOfMonth(viewYear, viewMonth);
        return { totalDays, offset };
    }, [viewYear, viewMonth]);

    const calendarCells = useMemo(() => {
        const { totalDays, offset } = monthMeta;
        const cells = [];
        const totalCells = 42; // 6 weeks grid

        for (let i = 0; i < totalCells; i++) {
            const dayNumber = i - offset + 1;
            if (dayNumber < 1 || dayNumber > totalDays) {
                cells.push(null);
            } else {
                cells.push(new Date(viewYear, viewMonth, dayNumber));
            }
        }
        return cells;
    }, [monthMeta, viewYear, viewMonth]);

    const selectedISO = selectedDate ? formatISODate(selectedDate) : "";
    const takenSlots = selectedISO ? bookings[selectedISO] || [] : [];

    const availableSlots = useMemo(() => {
        if (!selectedDate) return [];
        const all = slotsForDate(selectedDate);
        return all.filter((s) => !takenSlots.includes(s));
    }, [selectedDate, takenSlots]);

    function goPrevMonth() {
        const d = new Date(viewYear, viewMonth, 1);
        d.setMonth(d.getMonth() - 1);
        setViewYear(d.getFullYear());
        setViewMonth(d.getMonth());
    }

    function goNextMonth() {
        const d = new Date(viewYear, viewMonth, 1);
        d.setMonth(d.getMonth() + 1);
        setViewYear(d.getFullYear());
        setViewMonth(d.getMonth());
    }

    function goToday() {
        const t = new Date();
        setViewYear(t.getFullYear());
        setViewMonth(t.getMonth());
        setSelectedDate(t);
        setSelectedSlot("");
        setStatus({ state: "idle", message: "" });
    }

    function onPickDate(dateObj) {
        if (!dateObj) return;
        if (isPastDate(dateObj)) return;
        setSelectedDate(dateObj);
        setSelectedSlot("");
        setSelectedNiche("");
        setShowModal(false);
        setStatus({ state: "idle", message: "" });
    }

    function onSelectSlot(slot) {
        setSelectedSlot(slot);
        setSelectedNiche("");
        setShowModal(false);
        setStatus({ state: "idle", message: "" });
    }

    function onSelectNiche(niche) {
        setSelectedNiche(niche);
        setShowModal(true);
    }

    function closeModal() {
        setShowModal(false);
        setStatus({ state: "idle", message: "" });
    }

    function onSubmit(e) {
        e.preventDefault();

        setStatus({ state: "idle", message: "" });

        if (!selectedDate) {
            setStatus({ state: "error", message: "Please select a date." });
            return;
        }
        if (!selectedSlot) {
            setStatus({ state: "error", message: "Please select a time slot." });
            return;
        }
        if (!form.name.trim()) {
            setStatus({ state: "error", message: "Please enter your name." });
            return;
        }
        if (!form.email.trim()) {
            setStatus({ state: "error", message: "Please enter your email." });
            return;
        }

        // Final availability check (in case of rapid clicking)
        const iso = formatISODate(selectedDate);
        const already = bookings[iso] || [];
        if (already.includes(selectedSlot)) {
            setStatus({ state: "error", message: "That slot was just taken. Please pick another." });
            return;
        }

        // Check if EmailJS is properly configured
        if (
            !EMAILJS_CONFIG.SERVICE_ID ||
            !EMAILJS_CONFIG.TEMPLATE_ID ||
            !EMAILJS_CONFIG.PUBLIC_KEY
        ) {
            setStatus({
                state: "error",
                message:
                    "EmailJS configuration is missing. Please check your environment variables.",
            });
            return;
        }

        setStatus({ state: "sending", message: "Booking your consultation..." });

        const payload = {
            name: form.name.trim(),
            email: form.email.trim(),
            date: formatPrettyDate(selectedDate),
            time: selectedSlot,
            niche: selectedNiche,
            notes: form.notes.trim(),
            iso_date: iso,
        };

        emailjs
            .send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ID,
                payload,
                EMAILJS_CONFIG.PUBLIC_KEY
            )
            .then(() => {
                // Mark slot as booked locally
                setBookings((prev) => {
                    const next = { ...prev };
                    const list = Array.isArray(next[iso]) ? [...next[iso]] : [];
                    list.push(selectedSlot);
                    next[iso] = list;
                    return next;
                });

                setStatus({ state: "success", message: "Booked! Check your email for confirmation." });

                // Reset form and close modal after successful booking
                setTimeout(() => {
                    setShowModal(false);
                    setSelectedSlot("");
                    setSelectedNiche("");
                    setForm({ name: "", email: "", notes: "" });
                    setStatus({ state: "idle", message: "" });
                }, 2000);
            })
            .catch((err) => {
                setStatus({
                    state: "error",
                    message: err?.text || "Failed to send booking email. Please try again.",
                });
            });
    }

    const monthLabel = `${MONTHS[viewMonth]} ${viewYear}`;

    return (
        <div className="w-full max-w-5xl mx-auto px-4 py-10">
            <div className="mb-6">
                <div className="mb-10">
                    <h2 className="heading2 text-center text-fill-white">
                        Free Consultation
                    </h2>
                    {/* <p className="text-white/50 text-center -mt-4 ">Book a free consultation with one of our experts</p> */}
                </div>
                <p className="text-xs md:text-sm text-gray-600 mt-1">
                    {/* {!selectedDate && "Pick a future date to get started."} */}
                    {selectedDate && !selectedSlot && "Choose an available time slot."}
                    {selectedDate && selectedSlot && !selectedNiche && "Select your consultation niche."}
                    {selectedDate && selectedSlot && selectedNiche && "Complete your booking details."}
                </p>
            </div>

            <div className={`grid grid-cols-1 gap-6 ${selectedDate ? 'lg:grid-cols-3' : 'justify-items-center'}`}>
                {/* Calendar */}
                <div className={`rounded-2xl border border-black bg-white shadow-sm transition-all duration-500 ease-in-out col-span-1 ${selectedDate ? 'lg:col-span-2' : 'max-w-2xl w-full'}`}>
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={goPrevMonth}
                                className="px-2 md:px-3 py-1 md:py-2 rounded-xl border border-black hover:bg-gray-50 active:scale-[0.99] transition"
                                aria-label="Previous month"
                            >
                                ←
                            </button>
                            <button
                                type="button"
                                onClick={goNextMonth}
                                className="px-2 md:px-3 py-1 md:py-2 rounded-xl border border-black hover:bg-gray-50 active:scale-[0.99] transition"
                                aria-label="Next month"
                            >
                                →
                            </button>
                            <button
                                type="button"
                                onClick={goToday}
                                className="ml-2 px-3 py-2 rounded-xl border border-black hover:bg-gray-50 active:scale-[0.99] transition text-xs  sm:text-base"
                            >
                                Today
                            </button>
                        </div>

                        <div className="text-xs md:text-base font-medium">{monthLabel}</div>
                    </div>

                    <div className="p-4">
                        <div className="grid grid-cols-7 text-xs text-gray-500 mb-2">
                            {WEEKDAYS.map((d) => (
                                <div key={d} className="py-2 text-center font-medium">
                                    {d}
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-7 gap-2">
                            {calendarCells.map((dateObj, idx) => {
                                if (!dateObj) {
                                    return <div key={idx} className="h-14 rounded-xl bg-transparent" />;
                                }

                                const disabled = isPastDate(dateObj);
                                const iso = formatISODate(dateObj);
                                const isSelected = selectedISO && iso === selectedISO;

                                // Optional: show a tiny dot if fully booked
                                const allSlots = slotsForDate(dateObj);
                                const dayTaken = bookings[iso] || [];
                                const fullyBooked = allSlots.length > 0 && dayTaken.length >= allSlots.length;

                                return (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => onPickDate(dateObj)}
                                        disabled={disabled}
                                        className={[
                                            "h-12 w-12 rounded-full border text-sm justify-self-center flex items-center justify-center relative transition",
                                            disabled
                                                ? "border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed"
                                                : "border-black  active:scale-[0.99]",
                                            isSelected ? "bg-black text-white border-black  hover:bg-black" : "",
                                        ].join(" ")}
                                        title={disabled ? "Past date" : fullyBooked ? "Fully booked" : "Available"}
                                    >
                                        {dateObj.getDate()}
                                        {fullyBooked && !disabled && !isSelected && (
                                            <span className="absolute bottom-1 right-2 w-2 h-2 rounded-full bg-gray-300" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="mt-2 text-xs text-gray-500">
                            <span className="inline-flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-gray-300 inline-block" />
                                Dot means all slots booked (on this device).
                            </span>
                        </div>
                    </div>
                </div>

                {/* Slots Panel - Show only after date is selected */}
                {selectedDate && (
                    <div className="rounded-2xl border border-black bg-white shadow-sm p-5 animate-slide-in-right">
                        <div className="mb-4">
                            <div className="text-sm text-gray-500">Selected date</div>
                            <div className="text-lg font-semibold">
                                {formatPrettyDate(selectedDate)}
                            </div>
                        </div>

                        {/* Slots */}
                        {!selectedSlot && (
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <div className="text-sm font-medium">Available slots</div>
                                    <div className="text-xs text-gray-500">
                                        {availableSlots.length} open
                                    </div>
                                </div>

                                {availableSlots.length === 0 ? (
                                    <div className="text-sm text-gray-500">
                                        No slots left for this date. Try another date.
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-2">
                                        {availableSlots.map((slot) => (
                                            <button
                                                key={slot}
                                                type="button"
                                                onClick={() => onSelectSlot(slot)}
                                                className="px-3 py-2 rounded-xl border border-black hover:bg-gray-50 text-sm transition active:scale-[0.99]"
                                            >
                                                {slot}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Show selected slot and niche selection */}
                        {selectedSlot && (
                            <div>
                                <div className=" pb-4 border-b border-gray-100">
                                    <div className="text-sm text-gray-500">Selected time</div>
                                    <div className="text-base font-semibold">{selectedSlot}</div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSelectedSlot("");
                                            setSelectedNiche("");
                                        }}
                                        className="text-xs text-blue-600 hover:underline mt-1"
                                    >
                                        Change time
                                    </button>
                                </div>

                                {!selectedNiche && (
                                    <div>
                                        <div className="text-sm font-medium mb-3">Select your niche</div>
                                        <div className="grid grid-cols-1 gap-2">
                                            {NICHES.map((niche) => (
                                                <button
                                                    key={niche}
                                                    type="button"
                                                    onClick={() => onSelectNiche(niche)}
                                                    className="px-3 py-2 rounded-xl border border-black hover:bg-gray-50 text-sm text-left transition active:scale-[0.99]"
                                                >
                                                    {niche}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {selectedNiche && (
                                    <div>
                                        <div className="pb-4 border-b border-gray-100 mb-4">
                                            <div className="text-sm text-gray-500">Selected niche</div>
                                            <div className="text-base font-semibold">{selectedNiche}</div>
                                            <button
                                                type="button"
                                                onClick={() => setSelectedNiche("")}
                                                className="text-xs text-blue-600 hover:underline mt-1"
                                            >
                                                Change niche
                                            </button>
                                        </div>

                                        {/* Confirm Booking Button */}
                                        <button
                                            type="button"
                                            onClick={() => setShowModal(true)}
                                            className="w-full bg-black text-white px-4 py-3 rounded-xl text-sm font-medium hover:opacity-90 active:scale-[0.99] transition"
                                        >
                                            Confirm Booking
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Modal for booking form */}
            {showModal && (
                <div
                    className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999] p-4"
                    onClick={closeModal}
                >
                    <div
                        className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto bo"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-semibold">Complete Your Booking</h3>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                                    aria-label="Close"
                                >
                                    ×
                                </button>
                            </div>

                            {/* Booking summary */}
                            <div className="bg-gray-100 rounded-xl p-4 mb-5 space-y-2 border border-gray-200">
                                <div>
                                    <div className="text-xs text-gray-500">Date</div>
                                    <div className="text-sm font-medium">{formatPrettyDate(selectedDate)}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500">Time</div>
                                    <div className="text-sm font-medium">{selectedSlot}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500">Niche</div>
                                    <div className="text-sm font-medium">{selectedNiche}</div>
                                </div>
                            </div>

                            {/* Form */}
                            <form onSubmit={onSubmit} className="space-y-2">
                                <div>
                                    <label className="text-sm font-medium" htmlFor="modal-name">
                                        Name *
                                    </label>
                                    <input
                                        id="modal-name"
                                        value={form.name}
                                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                                        className="mt-2 w-full rounded-xl border border-black px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20"
                                        placeholder="Jane Doe"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium" htmlFor="modal-email">
                                        Email *
                                    </label>
                                    <input
                                        id="modal-email"
                                        type="email"
                                        value={form.email}
                                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                                        className="mt-2 w-full rounded-xl border border-black px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20"
                                        placeholder="jane@email.com"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium" htmlFor="modal-notes">
                                        Notes (optional)
                                    </label>
                                    <textarea
                                        id="modal-notes"
                                        rows={3}
                                        value={form.notes}
                                        onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                                        className="mt-2 w-full rounded-xl border border-black px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20 resize-none"
                                        placeholder="Tell us what you want to cover..."
                                    />
                                </div>

                                {/* Status */}
                                {status.state !== "idle" && (
                                    <div
                                        className={[
                                            "rounded-xl px-3 py-2 text-sm border",
                                            status.state === "success"
                                                ? "bg-green-50 border-green-600 text-green-800"
                                                : status.state === "error"
                                                    ? "bg-red-50 border-red-600 text-red-800"
                                                    : "bg-gray-100 border-gray-400 text-gray-800",
                                        ].join(" ")}
                                    >
                                        {status.message}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={status.state === "sending"}
                                    className={[
                                        "w-full rounded-xl px-4 py-3 text-sm font-medium transition",
                                        status.state === "sending"
                                            ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                                            : "bg-black text-white hover:opacity-90 active:scale-[0.99]",
                                    ].join(" ")}
                                >
                                    {status.state === "sending" ? "Booking..." : "Confirm Booking"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
}
