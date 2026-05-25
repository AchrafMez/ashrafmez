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
    <div className="relative max-w-5xl w-11/12 mx-auto overflow-hidden py-6 sm:py-8 md:py-10 lg:py-12">
    <div className="marquee-fade-left absolute left-0 top-0 bottom-0 w-20 sm:w-28 md:w-36 z-10 pointer-events-none" />
    <div className="marquee-fade-right absolute right-0 top-0 bottom-0 w-20 sm:w-28 md:w-36 z-10 pointer-events-none" />

      <div
        className="whitespace-nowrap"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="flex items-center w-max will-change-transform"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: isHovered ? 40 : 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* We duplicate the array 2 times exactly (so length is 2x), 
              this way -50% shifts exactly the width of one original tech array, 
              causing it to perfectly bridge head-to-tail without snapping. */}
          {[...tech, ...tech].map((item, i) => (
            <span
              key={i}
              className="text-3xl md:text-4xl lg:text-5xl transition-colors duration-300 pr-6 md:pr-10"
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
