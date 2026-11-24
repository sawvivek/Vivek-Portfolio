import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const experiences = [
  {
    role: "Hackathon Participant",
    company: "J.P. Morgan GenTech Hackathon",
    duration: "2026",
    description:
      "Participated in the GenTech Hackathon, exploring technology-driven challenges and collaborative problem-solving.",
  },
  {
    role: "Hackathon Participant",
    company: "HackNEXT 1.0",
    duration: "ALML TCET",
    description:
      "Participated in HackNEXT 1.0 at TCET, gaining experience in innovation, teamwork, and technical challenges.",
  },
  {
    role: "Participant & Winner",
    company: "Technologia",
    duration: "TCET",
    description:
      "Participated in Technologia 1 and secured wins in Technologia 2 and Technologia 3 at TCET.",
  },
  {
    role: "Python Training",
    company: "Python 3.11 Certification",
    duration: "IIT Bombay",
    description:
      "Successfully completed Python 3.11 training and earned certification through IIT Bombay.",
  },
];

function ExperienceItem({ exp, idx, start, end, scrollYProgress, layout }) {
  const markerScale = useTransform(scrollYProgress, [start, end], [0, 1]);

  const markerOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);

  const cardOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);

  const isAbove = idx % 2 === 0;

  const cardY = useTransform(
    scrollYProgress,
    [start, end],
    [isAbove ? 30 : -30, 0],
  );

  const cardX = useTransform(scrollYProgress, [start, end], [-24, 0]);

  // Desktop Timeline Item
  if (layout === "desktop") {
    return (
      <div
        className="relative flex-1 flex justify-center items-center min-w-0"
        key={`${exp.company}-${idx}`}
      >
        {/* Timeline Marker */}
        <motion.div
          className="z-10 w-6 h-6 rounded-full bg-white shadow-[0_0_0_7px_rgba(255,255,255,0.12),0_0_20px_rgba(255,255,255,0.5)]"
          style={{
            scale: markerScale,
            opacity: markerOpacity,
          }}
        />

        {/* Connector Line */}
        <motion.div
          className={`absolute ${
            isAbove ? "-top-8" : "-bottom-8"
          } w-[2px] bg-white/40`}
          style={{
            height: 40,
            opacity: cardOpacity,
          }}
        />

        {/* Experience Card */}
        <motion.article
          className={`absolute ${
            isAbove ? "bottom-12" : "top-12"
          } bg-gray-900/85 backdrop-blur-md border border-white/10 hover:border-blue-400/50 rounded-xl p-5 w-[290px] shadow-xl transition-colors duration-300`}
          style={{
            opacity: cardOpacity,
            y: cardY,
            maxWidth: "90vw",
          }}
        >
          <span className="text-xs uppercase tracking-widest text-blue-400 font-semibold">
            {exp.duration}
          </span>

          <h3 className="text-lg font-semibold mt-2 text-white">{exp.role}</h3>

          <p className="text-sm text-gray-400 mt-1 mb-3">{exp.company}</p>

          <p className="text-sm text-gray-300 leading-relaxed break-words">
            {exp.description}
          </p>
        </motion.article>
      </div>
    );
  }

  // Mobile Timeline Item
  return (
    <div
      key={`${exp.company}-mobile-${idx}`}
      className="relative flex items-start"
    >
      {/* Mobile Marker */}
      <motion.div
        className="absolute -left-[14px] top-5 z-10 w-6 h-6 rounded-full bg-white shadow-[0_0_0_7px_rgba(255,255,255,0.12),0_0_18px_rgba(255,255,255,0.5)]"
        style={{
          scale: markerScale,
          opacity: markerOpacity,
        }}
      />

      {/* Mobile Experience Card */}
      <motion.article
        className="w-full bg-gray-900/85 backdrop-blur-md border border-white/10 hover:border-blue-400/50 rounded-xl p-5 ml-6 shadow-xl transition-colors duration-300"
        style={{
          opacity: cardOpacity,
          x: cardX,
        }}
      >
        <span className="text-xs uppercase tracking-widest text-blue-400 font-semibold">
          {exp.duration}
        </span>

        <h3 className="text-lg font-semibold mt-2 text-white break-words">
          {exp.role}
        </h3>

        <p className="text-sm text-gray-400 mt-1 mb-3 break-words">
          {exp.company}
        </p>

        <p className="text-sm text-gray-300 leading-relaxed break-words">
          {exp.description}
        </p>
      </motion.article>
    </div>
  );
}

// Main Experience Component
const Experience = () => {
  const sceneRef = React.useRef(null);
  const [isMobile, setIsMobile] = React.useState(false);

  // Detect Screen Size
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Dynamic Timeline Height
  const SCENE_HEIGHT_VH = isMobile
    ? 100 * experiences.length * 1.6
    : 100 * experiences.length * 1.2;

  // Scroll Progress
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  // Animation Thresholds
  const numExperiences = experiences.length;

  const thresholds = React.useMemo(
    () =>
      Array.from(
        { length: numExperiences },
        (_, i) => (i + 1) / numExperiences,
      ),
    [numExperiences],
  );

  // Timeline Progress Animation
  const lineWidth = useTransform(scrollYProgress, (v) => `${v * 100}%`);

  const lineHeight = useTransform(scrollYProgress, (v) => `${v * 100}%`);

  return (
    <section id="experience" className="relative bg-black text-white">
      <div
        ref={sceneRef}
        style={{
          height: `${SCENE_HEIGHT_VH}vh`,
          minHeight: "120vh",
        }}
        className="relative"
      >
        <div className="sticky top-0 h-screen flex flex-col">
          {/* Section Heading */}
          <div className="shrink-0 px-6 pt-8">
            <h2 className="text-4xl sm:text-5xl font-semibold mt-5 text-center">
              Experience
              <span className="text-blue-400"> & Achievements</span>
            </h2>

            <p className="text-sm sm:text-base text-gray-400 text-center mt-3">
              My journey through hackathons, events and learning.
            </p>
          </div>

          {/* Timeline Container */}
          <div className="flex-1 flex items-center justify-center px-6 pb-10">
            {/* Desktop Timeline */}
            <div className="relative w-full max-w-7xl hidden md:block">
              {/* Horizontal Timeline Line */}
              <div className="relative h-[5px] bg-white/15 rounded-full">
                <motion.div
                  className="absolute left-0 top-0 h-[5px] bg-white rounded-full origin-left"
                  style={{
                    width: lineWidth,
                  }}
                />
              </div>

              {/* Desktop Experience Items */}
              <div className="relative flex justify-between mt-0">
                {experiences.map((exp, idx) => {
                  const start = idx === 0 ? 0 : thresholds[idx - 1];

                  const end = thresholds[idx];

                  return (
                    <ExperienceItem
                      key={`${exp.company}-${idx}`}
                      exp={exp}
                      idx={idx}
                      start={start}
                      end={end}
                      scrollYProgress={scrollYProgress}
                      layout="desktop"
                    />
                  );
                })}
              </div>
            </div>

            {/* Mobile Timeline */}
            <div className="relative w-full max-w-md md:hidden">
              {/* Vertical Timeline Line */}
              <div className="absolute left-0 top-0 bottom-0 w-[5px] bg-white/15 rounded-full">
                <motion.div
                  className="absolute top-0 left-0 w-[5px] bg-white rounded-full origin-top"
                  style={{
                    height: lineHeight,
                  }}
                />
              </div>

              {/* Mobile Experience Items */}
              <div className="relative flex flex-col gap-8 ml-10 mt-6 pb-28">
                {experiences.map((exp, idx) => {
                  const start = idx === 0 ? 0 : thresholds[idx - 1];

                  const end = thresholds[idx];

                  return (
                    <ExperienceItem
                      key={`${exp.company}-mobile-${idx}`}
                      exp={exp}
                      idx={idx}
                      start={start}
                      end={end}
                      scrollYProgress={scrollYProgress}
                      layout="mobile"
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
