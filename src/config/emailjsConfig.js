export const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim() || '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim() || '',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim() || '',
};
