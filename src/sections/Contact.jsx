import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import ParticlesBackground from "../components/ParticlesBackground.jsx";
import Astra from "../assets/Astra.png";

// Vite automatically loads variables from .env
const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

const initialFormData = {
  name: "",
  email: "",
  idea: "",
};

export default function Contact() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    if (status) setStatus("");
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.idea.trim()) {
      newErrors.idea = "Please enter your message.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Send email using EmailJS

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error("Missing EmailJS configuration:", {
        serviceId: Boolean(SERVICE_ID),
        templateId: Boolean(TEMPLATE_ID),
        publicKey: Boolean(PUBLIC_KEY),
      });

      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      const templateParams = {
        from_name: formData.name.trim(),
        from_email: formData.email.trim(),
        reply_to: formData.email.trim(),
        message: formData.idea.trim(),
      };

      const response = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY,
      );

      console.log("Email sent successfully:", response);

      setStatus("success");
      setFormData(initialFormData);
      setErrors({});
    } catch (error) {
      console.error("EmailJS error:", error);
      console.error("Status:", error?.status);
      console.error("Details:", error?.text || error?.message);

      setStatus("error");
    }
  };

  // Reusable input styling
  const inputClass = (field) =>
    `w-full p-3.5 rounded-xl bg-white/5 border ${
      errors[field] ? "border-red-500" : "border-white/15"
    } text-white placeholder-gray-500 outline-none focus:border-blue-500 focus:bg-white/[0.08] transition duration-300`;

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen bg-black overflow-hidden text-white py-20 px-6 md:px-12 lg:px-20 flex items-center"
    >
      {/* Background */}
      <ParticlesBackground />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Heading and Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-14"
        >
          <p className="text-blue-400 text-sm font-semibold tracking-[0.3em] uppercase mb-4">
            Open to Collaboration
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Let's Build Something
            <span className="block text-blue-500 mt-2">Great Together</span>
          </h2>

          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto mt-5 leading-relaxed">
            Have an interesting idea, a project, or an opportunity to
            collaborate? Let's connect, exchange ideas, and turn creative
            thoughts into meaningful projects.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Astra Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full flex justify-center items-center"
          >
            <motion.img
              src={Astra}
              alt="Collaboration illustration"
              className="w-72 sm:w-96 md:w-full max-w-lg rounded-2xl object-cover shadow-2xl"
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full bg-white/[0.04] backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl"
          >
            <h3 className="text-2xl font-bold mb-2">Start a Conversation</h3>

            <p className="text-gray-400 text-sm mb-7">
              I'd love to hear from you. Share your thoughts below.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block mb-2 text-sm font-medium"
                >
                  Your Name <span className="text-red-500">*</span>
                </label>

                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  className={inputClass("name")}
                />

                {errors.name && (
                  <p className="text-red-400 text-xs mt-2">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block mb-2 text-sm font-medium"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>

                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  className={inputClass("email")}
                />

                {errors.email && (
                  <p className="text-red-400 text-xs mt-2">{errors.email}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-idea"
                  className="block mb-2 text-sm font-medium"
                >
                  Your Message / Idea <span className="text-red-500">*</span>
                </label>

                <textarea
                  id="contact-idea"
                  name="idea"
                  rows={6}
                  placeholder="Tell me about your idea, project, or collaboration..."
                  value={formData.idea}
                  onChange={handleChange}
                  className={`${inputClass("idea")} resize-none`}
                />

                {errors.idea && (
                  <p className="text-red-400 text-xs mt-2">{errors.idea}</p>
                )}
              </div>

              {/* Submission Status */}
              {status && (
                <div
                  role="status"
                  aria-live="polite"
                  className={`text-sm p-3 rounded-xl ${
                    status === "success"
                      ? "bg-green-500/10 text-green-400 border border-green-500/20"
                      : status === "error"
                        ? "bg-red-500/10 text-red-400 border border-red-500/20"
                        : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                  }`}
                >
                  {status === "sending" && "Sending your message..."}

                  {status === "success" &&
                    "Message sent successfully! Thanks for reaching out."}

                  {status === "error" &&
                    "Unable to send your message. Please check the browser console for details."}
                </div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{
                  scale: status === "sending" ? 1 : 1.02,
                }}
                whileTap={{
                  scale: status === "sending" ? 1 : 0.97,
                }}
                disabled={status === "sending"}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-semibold transition duration-300 shadow-lg shadow-blue-500/20"
              >
                {status === "sending" ? "Sending..." : "Let's Collaborate"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
