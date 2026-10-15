import emailjs from '@emailjs/browser';
import { emailjsConfig } from '../config/emailjsConfig';

export async function sendContactMessage({ name, email, subject, message }) {
  const { serviceId, templateId, publicKey } = emailjsConfig;
  if (!serviceId || !templateId || !publicKey) throw new Error('not_configured');
  try { return await emailjs.send(serviceId, templateId, {
    name: name.trim(), email: email.trim(), reply_to: email.trim(),
    subject: subject.trim(), message: message.trim(),
  }, { publicKey }); }
  catch (error) {
    if (import.meta.env.DEV) {
      let detail = String(error.text || error.message || 'Request failed');
      for (const value of [serviceId, templateId, publicKey]) detail = detail.replaceAll(value, '[redacted]');
      console.warn('EmailJS:', error.status || 'network', detail);
    }
    throw error;
  }
}
