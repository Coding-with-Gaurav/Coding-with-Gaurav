import { useState  } from 'react';
import { Send } from 'lucide-react';
import emailjs from 'emailjs-com';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
// useEffect(() => {
//   console.log("ENV VALUES:", {
//     service: import.meta.env.VITE_EMAILJS_SERVICE_ID,
//     template: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
//     key: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
//   });
// }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setSubmitted(true);
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setSubmitted(false);
      }, 4000);
    } catch (error) {
      alert('Failed to send message. Please try again or email me directly.');
      console.error('EmailJS error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>

      {submitted ? (
        <div className="bg-green-900/20 border border-green-500/50 text-green-300 p-6 rounded-lg text-center animate-pulse">
          <p className="text-lg font-medium">Message sent successfully!</p>
          <p className="text-sm mt-2">I'll reply within 24 hours.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-amber-400 focus:outline-none transition-colors"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-amber-400 focus:outline-none transition-colors"
            />
          </div>

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-amber-400 focus:outline-none transition-colors"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-amber-400 focus:outline-none transition-colors resize-none"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-400 text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-amber-300 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>Sending...</>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Send Message
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;