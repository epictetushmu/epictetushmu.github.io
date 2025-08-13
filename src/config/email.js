// src/config/email.js
// EmailJS Configuration - Replace these with your actual values from EmailJS dashboard

export const EMAIL_CONFIG = {
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY_HERE',    // Replace with your EmailJS public key
  SERVICE_ID: 'YOUR_SERVICE_ID_HERE',    // Replace with your EmailJS service ID  
  TEMPLATE_ID: 'YOUR_TEMPLATE_ID_HERE'   // Replace with your EmailJS template ID
}

// For development, you can also set these via environment variables
// Note: Vite exposes variables prefixed with VITE_
if (import.meta.env.VITE_EMAILJS_PUBLIC_KEY) {
  EMAIL_CONFIG.PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
}
if (import.meta.env.VITE_EMAILJS_SERVICE_ID) {
  EMAIL_CONFIG.SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
}
if (import.meta.env.VITE_EMAILJS_TEMPLATE_ID) {
  EMAIL_CONFIG.TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
}
