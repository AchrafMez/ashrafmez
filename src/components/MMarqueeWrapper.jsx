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
    <div className="relative w-full overflow-hidden py-6 sm:py-8 md:py-10 lg:py-12">
      <div className="absolute left-0 top-0 bottom-0 w-8 xs:w-12 sm:w-16 md:w-24 lg:w-32 xl:w-48 
                      bg-gradient-to-r from-white dark:from-stone-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 xs:w-12 sm:w-16 md:w-24 lg:w-32 xl:w-48 
                      bg-gradient-to-l from-white dark:from-stone-900 to-transparent z-10 pointer-events-none" />

      <div
        className="whitespace-nowrap"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="flex items-center gap-4 xs:gap-6 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-20 will-change-transform"
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
              className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 
                        transition-colors duration-300"
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
