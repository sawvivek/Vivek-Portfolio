import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa6";
import { motion } from "framer-motion";

const socials = [
  {
    Icon: FaTwitter,
    label: "Twitter",
    href: "https://twitter.com/viveksaw_",
  },
  {
    Icon: FaLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/vivek-kumar-saw-47a552324/",
  },
  {
    Icon: FaGithub,
    label: "GitHub",
    href: "https://github.com/sawvivek",
  },
];

const glowVariants = {
  initial: {
    scale: 1,
    y: 0,
    filter: "drop-shadow(0 0 0 rgba(0,0,0,0))",
  },
  hover: {
    scale: 1.2,
    y: -3,
    filter:
      "drop-shadow(0 0 8px rgba(13, 88, 204, 0.9)) drop-shadow(0 0 20px rgba(16, 185, 129, 0.8))",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
    },
  },
  tap: {
    scale: 0.95,
    y: 0,
    transition: { duration: 0.08 },
  },
};

export default function Footer() {
  return (
    <footer className="relative w-full min-h-[300px] overflow-hidden bg-black">
      <motion.div
        className="relative z-10 min-h-[300px] w-full px-4 py-16 flex flex-col items-center justify-center gap-6 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Name */}
        <h1
          className="font-semibold leading-none text-white text-center select-none"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "clamp(3rem, 8vw, 9rem)",
            letterSpacing: "0.02em",
            lineHeight: "0.9",
            textShadow: "0 2px 18px rgba(0, 0, 0, 0.5)",
          }}
        >
          Vivek Saw
        </h1>

        {/* Gradient Divider */}
        <div className="h-[3px] w-24 md:w-32 rounded-full bg-gradient-to-r from-[#0d58cc] via-cyan-400 to-emerald-400" />

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-5 text-2xl md:text-3xl">
          {socials.map(({ Icon, label, href }) => (
            <motion.a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full text-white bg-white/5 hover:bg-white/10 hover:text-cyan-400 transition-colors duration-300"
              variants={glowVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <Icon />
            </motion.a>
          ))}
        </div>

        {/* Description */}
        <p className="text-sm text-white/70 max-w-lg leading-relaxed text-center">
          Crafted with ❤️ by Vivek Saw. Built with React, Tailwind CSS, and
          Framer Motion. Explore my work and connect with me on social media.
          Feel free to reach out if you have any questions or would like to
          collaborate!
        </p>

        {/* Copyright */}
        <p className="text-xs md:text-sm text-white/50 text-center">
          © {new Date().getFullYear()} Vivek Saw. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
}
