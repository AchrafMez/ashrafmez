import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaDocker, FaGitAlt, FaReact, FaLinux, FaBug } from "react-icons/fa";
import {
  SiC,
  SiCplusplus,
  SiJavascript,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs
} from "react-icons/si";

function MMarqueeWrapper() {
  const [isHovered, setIsHovered] = useState(false);

  const tech = [
    { icon: <FaDocker />, color: "#2496ED" },
    { icon: <SiC />, color: "#A8B9CC" },
    { icon: <SiCplusplus />, color: "#00599C" },
    { icon: <SiJavascript />, color: "#F7DF1E" },
    { icon: <FaBug />, color: "#D90000" },
    { icon: <FaGitAlt />, color: "#F05033" },
    { icon: <FaReact />, color: "#61DAFB" },
    { icon: <SiNextdotjs />, color: "#000000" },
    { icon: <FaLinux />, color: "#FCC624" },
    { icon: <SiTailwindcss />, color: "#38B2AC" },
    { icon: <SiNodedotjs />, color: "#68A063" },
  ];

  return (
    <div className="relative w-screen max-w-full overflow-hidden isolate py-10 md:py-16">
      {/* Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-20 md:w-48 bg-gradient-to-r from-white dark:from-stone-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 md:w-48 bg-gradient-to-l from-white dark:from-stone-900 to-transparent z-10 pointer-events-none" />

      <div
        className="whitespace-nowrap"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="flex items-center gap-6 sm:gap-10 md:gap-16 lg:gap-20 will-change-transform"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            duration: isHovered ? 40 : 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...tech, ...tech, ...tech].map((item, i) => (
            <span
              key={i}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
              style={{ color: isHovered ? item.color : "currentColor" }}
            >
              {item.icon}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}


export default MMarqueeWrapper;
