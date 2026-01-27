// EmailJS Configuration
export const EMAILJS_CONFIG = {
  SERVICE_ID: process.env.REACT_APP_EMAILJS_SERVICE_ID,
  TEMPLATE_ID: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
  AUTO_REPLY_TEMPLATE_ID: process.env.REACT_APP_EMAILJS_AUTO_REPLY_TEMPLATE_ID,
  PUBLIC_KEY: process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
  // Verified sender address from your domain (e.g., no-reply@creyati.com)
  SENDER_EMAIL: process.env.REACT_APP_EMAILJS_SENDER_EMAIL,
};

// EmailJS template parameters mapping
export const TEMPLATE_PARAMS = {
  from_name: "from_name",
  from_email: "from_email",
  message: "message",
  to_name: "to_name", // Optional: recipient name
  reply_to: "reply_to", // Ensures replies go to the user
};
