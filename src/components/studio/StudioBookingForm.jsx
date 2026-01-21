import React, { useState } from "react";

const StudioBookingForm = ({ onClose }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dates = [];

  for (let i = 0; i < firstDay; i++) {
    dates.push(null);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    dates.push(d);
  }

  const changeMonth = (value) => {
    setCurrentMonth(new Date(year, month + value, 1));
  };

  const selectDate = (day) => {
    if (!day) return;
    const fullDate = `${year}-${month + 1}-${day}`;
    setSelectedDate(fullDate);
  };

  const closeModal = () => {
    if (onClose) onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
      onClick={closeModal}
    >
      <div 
        className="relative bg-black w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-white text-3xl hover:text-gray-400 z-10"
        >
          ×
        </button>

            {/* Modal Header */}
            <div className="border-b border-gray-800 px-8 py-6">
              <h2 className="text-2xl font-semibold text-white text-center">Send enquiry</h2>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <p className="text-sm text-gray-400 mb-6">* indicates required field</p>

              <form className="space-y-6">
                {/* First Name and Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      First name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full bg-transparent border border-gray-600 text-white px-4 py-3 rounded focus:outline-none focus:border-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Last name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full bg-transparent border border-gray-600 text-white px-4 py-3 rounded focus:outline-none focus:border-white"
                      required
                    />
                  </div>
                </div>

                {/* Type Dropdown */}
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Type <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full bg-transparent border border-gray-600 text-white px-4 py-3 rounded focus:outline-none focus:border-white">
                    <option value="" className="bg-black">I have a general enquiry</option>
                    <option value="booking" className="bg-black">Studio Booking</option>
                    <option value="pricing" className="bg-black">Pricing Information</option>
                  </select>
                </div>

                {/* Phone and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-semibold mb-2">Phone</label>
                    <input
                      type="tel"
                      className="w-full bg-transparent border border-gray-600 text-white px-4 py-3 rounded focus:outline-none focus:border-white"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      className="w-full bg-transparent border border-gray-600 text-white px-4 py-3 rounded focus:outline-none focus:border-white"
                      required
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows="6"
                    className="w-full bg-transparent border border-gray-600 text-white px-4 py-3 rounded focus:outline-none focus:border-white resize-none"
                    required
                  ></textarea>
                </div>

                {/* Buttons */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-800">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="text-white underline hover:text-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-white text-black px-8 py-3 font-semibold rounded hover:bg-gray-200 transition-colors"
                  >
                    Enquire now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
  );
};

export default StudioBookingForm;
