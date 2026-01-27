import React from "react";
import { InlineWidget } from "react-calendly";
import { useLocation } from "react-router-dom"; // ✅ Import hook
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import { EMAILJS_CONFIG, TEMPLATE_PARAMS } from "../config/emailjs";

// Validation schema
const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  message: Yup.string()
    .min(10, "Message must be at least 10 characters")
    .required("Message is required"),
});

// Initial form values
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  message: "",
};

const ContactUs = () => {
  const location = useLocation(); // ✅ Get current path

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setSubmitting(true);

      // Check if EmailJS is properly configured
      if (
        !EMAILJS_CONFIG.SERVICE_ID ||
        !EMAILJS_CONFIG.TEMPLATE_ID ||
        !EMAILJS_CONFIG.PUBLIC_KEY ||
        !EMAILJS_CONFIG.SENDER_EMAIL
      ) {
        throw new Error(
          "EmailJS configuration is missing. Please check your environment variables."
        );
      }

      // Prepare template parameters
      const templateParams = {
        [TEMPLATE_PARAMS.from_name]: `${values.firstName} ${values.lastName}`,
        // Use a verified sender to satisfy Zoho relay rules
        [TEMPLATE_PARAMS.from_email]: EMAILJS_CONFIG.SENDER_EMAIL,
        [TEMPLATE_PARAMS.message]: values.message,
        [TEMPLATE_PARAMS.to_name]: "Creyeti Team", // You can customize this
        // Set reply-to so responses go to the user's email
        [TEMPLATE_PARAMS.reply_to]: values.email,
      };

      // Show loading toast
      const loadingToast = toast.loading("Sending your message...", {
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
      const result = await emailjs.send(
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

      console.log("Email sent successfully:", result);

      // Dismiss loading toast and show success toast
      toast.dismiss(loadingToast);
      toast.success("Message sent successfully! We'll get back to you soon.", {
        duration: 5000,
        style: {
          background: "#065f46",
          color: "#f0fdf4",
          border: "1px solid #10b981",
          borderRadius: "12px",
          padding: "16px",
          fontSize: "14px",
          fontWeight: "500",
        },
        iconTheme: {
          primary: "#10b981",
          secondary: "#f0fdf4",
        },
      });

      resetForm();
    } catch (error) {
      console.error("Error sending email:", error);

      // Show error toast
      toast.error(
        "Failed to send message. Please try again or contact us directly.",
        {
          duration: 6000,
          style: {
            background: "#7f1d1d",
            color: "#fef2f2",
            border: "1px solid #ef4444",
            borderRadius: "12px",
            padding: "16px",
            fontSize: "14px",
            fontWeight: "500",
          },
          iconTheme: {
            primary: "#ef4444",
            secondary: "#fef2f2",
          },
        }
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-10 md:py-20 bg-black">
      <div className="container max-w-6xl mx-auto">
        {/* ✅ Show title-row only if NOT on /contact */}
        {location.pathname !== "/contact" && (
          <div className="title-row mb-10 lg:mb-20 text-center flex flex-col items-center justify-center">
            <h2 className="heading2 text-fill-white mb-10">Contact Us</h2>
            {/* <span className="border-line bg-white mx-0 my-5"></span> */}
            <p className="para text-fill-white mb-0 max-w-[581px]">
              Interested in working together? Fill out some info and we’ll be in
              touch shortly. We can’t wait to hear from you!
            </p>
          </div>
        )}

        <div className="max-w-[625px] mx-auto">
          {/* Form Section */}
          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form className="space-y-6">
                  {/* Name Fields */}
                  <div>
                    <label className="block text-white font-semibold">
                      Name{" "}
                      <span className="text-gray-400 text-sm">(required)</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div>
                        <label className="text-gray-400 text-sm">
                          First Name
                        </label>
                        <Field
                          type="text"
                          name="firstName"
                          className={`w-full rounded-full border bg-transparent px-5 py-3 text-white placeholder-gray-400 focus:outline-none transition ${
                            errors.firstName && touched.firstName
                              ? "border-red-500"
                              : "border-gray-500 focus:border-white"
                          }`}
                          placeholder="John"
                        />
                        <ErrorMessage
                          name="firstName"
                          component="div"
                          className="text-red-400 text-sm mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-gray-400 text-sm">
                          Last Name
                        </label>
                        <Field
                          type="text"
                          name="lastName"
                          className={`w-full rounded-full border bg-transparent px-5 py-3 text-white placeholder-gray-400 focus:outline-none transition ${
                            errors.lastName && touched.lastName
                              ? "border-red-500"
                              : "border-gray-500 focus:border-white"
                          }`}
                          placeholder="Doe"
                        />
                        <ErrorMessage
                          name="lastName"
                          component="div"
                          className="text-red-400 text-sm mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-white font-semibold">
                      Email{" "}
                      <span className="text-gray-400 text-sm">(required)</span>
                    </label>
                    <Field
                      type="email"
                      name="email"
                      className={`mt-2 w-full rounded-full border bg-transparent px-5 py-3 text-white placeholder-gray-400 focus:outline-none transition ${
                        errors.email && touched.email
                          ? "border-red-500"
                          : "border-gray-500 focus:border-white"
                      }`}
                      placeholder="you@example.com"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-400 text-sm mt-1"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-white font-semibold">
                      Message{" "}
                      <span className="text-gray-400 text-sm">(required)</span>
                    </label>
                    <Field
                      as="textarea"
                      name="message"
                      rows="4"
                      className={`mt-2 w-full rounded-3xl border bg-transparent px-5 py-3 text-white placeholder-gray-400 focus:outline-none transition resize-none ${
                        errors.message && touched.message
                          ? "border-red-500"
                          : "border-gray-500 focus:border-white"
                      }`}
                      placeholder="Type your message here..."
                    />
                    <ErrorMessage
                      name="message"
                      component="div"
                      className="text-red-400 text-sm mt-1"
                    />
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`bg-gray-200 text-black font-semibold px-10 py-3 rounded-full shadow-lg transition ${
                        isSubmitting
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-white hover:shadow-xl"
                      }`}
                    >
                      {isSubmitting ? "SENDING..." : "SEND"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>

          {/* Right Form Section */}
          {/* <div>
            <div className="flex flex-col justify-center">
              <h5 className="heading5 text-fill-white capitalize">
                Schedule an appointment
              </h5>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <InlineWidget
                url="https://calendly.com/prayush-creyeti/30min"
                styles={{ maxHeight: "700px", height: "700px" }}
              />
            </div>
          </div> */}
        </div>
      </div>

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#1f2937",
            color: "#f9fafb",
            border: "1px solid #374151",
            borderRadius: "12px",
            padding: "16px",
            fontSize: "14px",
            fontWeight: "500",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          },
        }}
      />
    </section>
  );
};

export default ContactUs;
