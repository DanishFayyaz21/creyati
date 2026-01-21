import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import { EMAILJS_CONFIG, TEMPLATE_PARAMS } from "../../config/emailjs";

const StudioBookingForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    enquiryType: "I have a general enquiry",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const closeModal = () => {
    if (onClose) onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);

      // Check if EmailJS is properly configured
      if (
        !EMAILJS_CONFIG.SERVICE_ID ||
        !EMAILJS_CONFIG.TEMPLATE_ID ||
        !EMAILJS_CONFIG.PUBLIC_KEY
      ) {
        throw new Error(
          "EmailJS configuration is missing. Please check your environment variables."
        );
      }

      // Prepare template parameters
      const templateParams = {
        [TEMPLATE_PARAMS.from_name]: `${formData.firstName} ${formData.lastName}`,
        [TEMPLATE_PARAMS.from_email]: formData.email,
        [TEMPLATE_PARAMS.message]: `
Enquiry Type: ${formData.enquiryType}
Phone: ${formData.phone || 'Not provided'}

Message:
${formData.message}
        `,
        [TEMPLATE_PARAMS.to_name]: "Creyeti Team",
      };

      // Show loading toast
      const loadingToast = toast.loading("Sending your enquiry...", {
        style: {
          background: "#1f2937",
          color: "#f9fafb",
          border: "1px solid #374151",
          borderRadius: "12px",
          padding: "16px",
          fontSize: "14px",
          fontWeight: "500",
        },
        iconTheme: {
          primary: "#3b82f6",
          secondary: "#f9fafb",
        },
      });

      // Send email using EmailJS
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      // Send auto-reply if template is configured
      if (EMAILJS_CONFIG.AUTO_REPLY_TEMPLATE_ID) {
        await emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.AUTO_REPLY_TEMPLATE_ID,
          templateParams,
          EMAILJS_CONFIG.PUBLIC_KEY
        );
      }

      // Dismiss loading toast and show success toast
      toast.dismiss(loadingToast);
      toast.success("Enquiry sent successfully! We'll get back to you soon.", {
        duration: 3000,
        style: {
          background: "#10b981",
          color: "#ffffff",
          border: "1px solid #059669",
          borderRadius: "12px",
          padding: "16px",
          fontSize: "14px",
          fontWeight: "500",
        },
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        enquiryType: "I have a general enquiry",
        message: "",
      });

      // Close modal after toast finishes
      setTimeout(() => {
        toast.dismiss();
        closeModal();
      }, 3200);

    } catch (error) {
      console.error("Email send error:", error);
      
      toast.error(
        error.message || "Failed to send enquiry. Please try again.",
        {
          duration: 5000,
          style: {
            background: "#ef4444",
            color: "#ffffff",
            border: "1px solid #dc2626",
            borderRadius: "12px",
            padding: "16px",
            fontSize: "14px",
            fontWeight: "500",
          },
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
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

                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* First Name and Last Name */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-semibold mb-2">
                        First name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
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
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
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
                    <select 
                      name="enquiryType"
                      value={formData.enquiryType}
                      onChange={handleChange}
                      className="w-full bg-transparent border border-gray-600 text-white px-4 py-3 rounded focus:outline-none focus:border-white"
                    >
                      <option value="I have a general enquiry" className="bg-black">I have a general enquiry</option>
                      <option value="Studio Booking" className="bg-black">Studio Booking</option>
                      <option value="Pricing Information" className="bg-black">Pricing Information</option>
                    </select>
                  </div>

                  {/* Phone and Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-semibold mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-transparent border border-gray-600 text-white px-4 py-3 rounded focus:outline-none focus:border-white"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-semibold mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
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
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
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
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-white text-black px-8 py-3 font-semibold rounded hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Enquire now"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
    </>
  );
};

export default StudioBookingForm;
