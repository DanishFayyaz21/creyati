import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import { EMAILJS_CONFIG, TEMPLATE_PARAMS } from "../config/emailjs";

// Validation schema
const validationSchema = Yup.object({
  firstName: Yup.string().min(2, "First name must be at least 2 characters"),
  lastName: Yup.string().min(2, "Last name must be at least 2 characters"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  message: Yup.string().min(10, "Message must be at least 10 characters").required("Message is required"),
});

// Initial form values
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  message: "",
};

const FloatingConsultation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setIsSubmitting(true);

      if (!EMAILJS_CONFIG.SERVICE_ID || !EMAILJS_CONFIG.TEMPLATE_ID || !EMAILJS_CONFIG.PUBLIC_KEY) {
        throw new Error("EmailJS configuration is missing. Please check your environment variables.");
      }

      const templateParams = {
        ...TEMPLATE_PARAMS,
        from_name: `${values.firstName} ${values.lastName}`,
        from_email: values.email,
        message: values.message,
      };

      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      toast.success("Thank you! Your consultation request has been sent.");
      resetForm();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Email sending error:", error);
      toast.error(error.message || "Failed to send consultation request. Please try again.");
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />

      {/* Floating Button */}

      <button
        onClick={() => setIsModalOpen(!isModalOpen)}
        className="fixed right-1 top-1/3 transform -translate-y-1/2 z-40
       bg-white border border-black hover:bg-gray-50 transition-all duration-300 ease-out
       w-10 sm:w-10 md:w-12 h-24 sm:h-28 md:h-32 
       flex items-center justify-center
       rounded-xl md:rounded-xl
       hover:shadow-lg 
       group
       cursor-pointer
       px-2"
        aria-label="Free Consultation"
      >
        <span
          className="text-black font-bold text-[10px] sm:text-xs md:text-sm
         whitespace-nowrap leading-tight
         transform -rotate-90 origin-center
         group-hover:scale-105 transition-all duration-300"
        >
          {isModalOpen ? "Close" : "Free Consult"}
        </span>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 pointer-events-auto animate-fade-in"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Content - Positioned directly next to button with zero gap */}
          <div
            className="fixed right-[48px] sm:right-[56px] md:right-[64px] top-1/2 transform -translate-y-1/2 pointer-events-auto p-4 sm:p-4"
            onWheel={(e) => e.stopPropagation()} // Prevent scroll propagation to the background
          >
            <div
              className="bg-white border-2 border-black rounded-lg md:rounded-xl
                         shadow-2xl transform transition-all duration-300 animate-slide-in
                         w-full max-w-sm max-h-[70vh] overflow-y-auto pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="border-b-2 border-black p-4 md:p-4">
                <h2 className="text-xl md:text-xl font-bold text-black">Free Consultation</h2>
              </div>

              {/* Modal Body */}
              <div className="p-4 md:p-4">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched }) => (
                    <Form className="space-y-4 md:space-y-5">
                      {/* First Name */}
                      <div>
                        {/* <label className="block text-black font-semibold mb-2 text-sm md:text-base">First Name</label> */}
                        <Field
                          type="text"
                          name="firstName"
                          placeholder="John"
                          className={`w-full px-4 py-2 md:py-3 
                                     bg-white border-2 rounded-lg md:rounded-xl
                                     text-black placeholder-gray-400
                                     focus:outline-none focus:border-black focus:ring-2 focus:ring-black/20
                                     transition-all duration-200
                                     ${errors.firstName && touched.firstName ? "border-red-500" : "border-gray-300"}`}
                        />
                        <ErrorMessage name="firstName">
                          {(msg) => <p className="text-red-500 text-xs md:text-sm mt-1">{msg}</p>}
                        </ErrorMessage>
                      </div>

                      {/* Last Name */}
                      <div>
                        {/* <label className="block text-black font-semibold mb-2 text-sm md:text-base">Last Name</label> */}
                        <Field
                          type="text"
                          name="lastName"
                          placeholder="Doe"
                          className={`w-full px-4 py-2 md:py-3 
                                     bg-white border-2 rounded-lg md:rounded-xl
                                     text-black placeholder-gray-400
                                     focus:outline-none focus:border-black focus:ring-2 focus:ring-black/20
                                     transition-all duration-200
                                     ${errors.lastName && touched.lastName ? "border-red-500" : "border-gray-300"}`}
                        />
                        <ErrorMessage name="lastName">
                          {(msg) => <p className="text-red-500 text-xs md:text-sm mt-1">{msg}</p>}
                        </ErrorMessage>
                      </div>

                      {/* Email */}
                      <div>
                        {/* <label className="block text-black font-semibold mb-2 text-sm md:text-base">
                          Email <span className="text-red-500">*</span>
                        </label> */}
                        <Field
                          type="email"
                          name="email"
                          placeholder="john@example.com"
                          className={`w-full px-4 py-2 md:py-3 
                                     bg-white border-2 rounded-lg md:rounded-xl
                                     text-black placeholder-gray-400
                                     focus:outline-none focus:border-black focus:ring-2 focus:ring-black/20
                                     transition-all duration-200
                                     ${errors.email && touched.email ? "border-red-500" : "border-gray-300"}`}
                        />
                        <ErrorMessage name="email">
                          {(msg) => <p className="text-red-500 text-xs md:text-sm mt-1">{msg}</p>}
                        </ErrorMessage>
                      </div>

                      {/* Message */}
                      <div>
                        {/* <label className="block text-black font-semibold mb-2 text-sm md:text-base">
                          Message <span className="text-red-500">*</span>
                        </label> */}
                        <Field
                          as="textarea"
                          name="message"
                          placeholder="Tell us about your project..."
                          rows="3"
                          className={`w-full px-4 py-2 md:py-3 
                                     bg-white border-2 rounded-lg md:rounded-xl
                                     text-black placeholder-gray-400
                                     focus:outline-none focus:border-black focus:ring-2 focus:ring-black/20
                                     transition-all duration-200 resize-none
                                     ${errors.message && touched.message ? "border-red-500" : "border-gray-300"}`}
                        />
                        <ErrorMessage name="message">
                          {(msg) => <p className="text-red-500 text-xs md:text-sm mt-1">{msg}</p>}
                        </ErrorMessage>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-400
                                 text-white font-bold py-3 md:py-4 px-4 md:px-6
                                 rounded-lg md:rounded-xl transition-all duration-300
                                 hover:shadow-lg
                                 disabled:cursor-not-allowed
                                 mt-4 md:mt-6 text-sm md:text-base border border-black"
                      >
                        {isSubmitting ? "Sending..." : "Send Request"}
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default FloatingConsultation;
