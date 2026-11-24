import React from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";

import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import photo1 from "../assets/photo1.png";
import photo2 from "../assets/photo2.png";
import photo3 from "../assets/photo3.png";

const MH3 = motion.h3;

// Detect mobile screen size
const useIsMobile = (query = "(max-width: 639px)") => {
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== "undefined" && window.matchMedia(query).matches,
  );

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia(query);
    const handler = (e) => setIsMobile(e.matches);

    if (mql.addEventListener) {
      mql.addEventListener("change", handler);
    } else {
      mql.addListener(handler);
    }

    setIsMobile(mql.matches);

    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", handler);
      } else {
        mql.removeListener(handler);
      }
    };
  }, [query]);

  return isMobile;
};

export default function Projects() {
  const isMobile = useIsMobile();

  // Project Details
  const projects = React.useMemo(
    () => [
      {
        title: "HopeBridge",
        subtitle: "NGO Donation Platform",
        description:
          "A platform where NGOs manage campaigns and donors contribute money or items while tracking their donations.",
        link: "https://github.com/sawvivek/ngo-donation-platform",
        linkType: "GitHub",
        bgColor: "#0d4d3d",
        image: isMobile ? photo1 : img1,
      },
      {
        title: "FoolProof",
        subtitle: "Exam Integrity Platform",
        description:
          "An examination management platform with offline support, audit tracking, exam sessions, and automated result generation.",
        link: "https://frontend-two-alpha-48.vercel.app/",
        linkType: "Live Demo",
        bgColor: "#172554",
        image: isMobile ? photo2 : img2,
      },
      {
        title: "TrustFAQ",
        subtitle: "NLP-Based FAQ Assistant",
        description:
          "An intelligent FAQ assistant that provides verified answers, handles uncertain questions, and manages its knowledge base.",
        link: "https://github.com/sawvivek/ChatBot",
        linkType: "GitHub",
        bgColor: "#103B43",
        image: isMobile ? photo3 : img3,
      },
    ],
    [isMobile],
  );

  // Section Reference
  const sceneRef = React.useRef(null);

  // Scroll Tracking
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  // Project Switching Thresholds
  const thresholds = React.useMemo(
    () => projects.map((_, i) => (i + 1) / projects.length),
    [projects],
  );

  const [activeIndex, setActiveIndex] = React.useState(0);

  // Update Active Project on Scroll
  React.useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((v) => {
      const idx = thresholds.findIndex((t) => v <= t);

      setActiveIndex(idx === -1 ? thresholds.length - 1 : idx);
    });

    return () => unsubscribe();
  }, [scrollYProgress, thresholds]);

  const activeProject = projects[activeIndex];

  return (
    <section
      id="projects"
      ref={sceneRef}
      className="relative text-white"
      style={{
        height: `${100 * projects.length}vh`,
        backgroundColor: activeProject.bgColor,
        transition: "background-color 400ms ease",
      }}
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen flex flex-col items-center">
        {/* Section Title */}
        <h2
          className={`text-3xl font-semibold z-10 text-center ${
            isMobile ? "mt-4" : "mt-3"
          }`}
        >
          My Projects
        </h2>

        {/* Main Project Display */}
        <div className="relative w-full flex-1 flex items-center justify-center min-h-0">
          {projects.map((project, idx) => (
            <div
              key={project.title}
              className={`absolute top-[47%] left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                activeIndex === idx
                  ? "opacity-100 z-20"
                  : "opacity-0 z-0 pointer-events-none"
              }`}
              style={{
                width: "85%",
                maxWidth: "1200px",
              }}
            >
              {/* Project Title - CHANGED: Reduced font size, kept LEFT alignment */}
              <AnimatePresence mode="wait">
                {activeIndex === idx && (
                  <MH3
                    key={project.title}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                    className="block w-[75%] text-left text-[clamp(1.8rem,4vw,3.2rem)] text-white/95 font-bangers italic font-semibold mb-1"
                    style={{
                      zIndex: 5,
                    }}
                  >
                    {project.title}
                  </MH3>
                )}
              </AnimatePresence>

              {/* Project Image - UNCHANGED: Original image dimensions and appearance */}
              <div
                className={`relative w-full overflow-hidden bg-black/20 shadow-2xl md:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)] ${
                  isMobile ? "mb-4 rounded-lg" : "mb-0 rounded-xl"
                } h-[62vh] sm:h-[66vh]`}
                style={{
                  zIndex: 10,
                  transition: "box-shadow 250ms ease",
                }}
              >
                <img
                  src={project.image}
                  alt={`${project.title} project preview`}
                  className="w-full h-full object-cover drop-shadow-xl md:drop-shadow-2xl"
                  style={{
                    position: "relative",
                    zIndex: 10,
                    filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.65))",
                    transition: "filter 200ms ease",
                  }}
                  loading="lazy"
                />

                {/* Image Gradient */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    zIndex: 11,
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0) 40%)",
                  }}
                />
              </div>

              {/* Project Information - CHANGED: Better spacing and alignment */}
              <AnimatePresence mode="wait">
                {activeIndex === idx && (
                  <motion.div
                    key={`${project.title}-details`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.4 }}
                    className={`text-center ${
                      isMobile ? "px-3 mt-2" : "px-4 mt-2"
                    }`}
                  >
                    <h4 className="text-lg sm:text-xl font-semibold">
                      {project.subtitle}
                    </h4>

                    <p className="mt-1 text-sm sm:text-base text-white/85 max-w-3xl mx-auto leading-relaxed">
                      {project.description}
                    </p>

                    {/* Project Button - CHANGED: Compact spacing and visible placement */}
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center mt-3 mb-2 px-7 py-3 font-semibold rounded-xl bg-white text-black shadow-lg hover:bg-gray-200 hover:scale-105 transition-all duration-300 relative z-30"
                      aria-label={`${project.linkType}: ${project.title}`}
                    >
                      {project.linkType === "GitHub"
                        ? "View on GitHub"
                        : "View Live Demo"}
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
