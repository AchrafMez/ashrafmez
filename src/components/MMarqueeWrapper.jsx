import React from "react";
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
  const tech = [
    { icon: <FaDocker />, color: "#2496ED" },
    { icon: <SiC />, color: "#A8B9CC" },
    { icon: <SiCplusplus />, color: "#00599C" },
    { icon: <SiJavascript />, color: "#F7DF1E" },
    { icon: <FaBug />, color: "#D90000" }, // 
    { icon: <FaGitAlt />, color: "#F05033" },
    { icon: <FaReact />, color: "#61DAFB" },
    { icon: <SiNextdotjs />, color: "#000000" },
    { icon: <FaLinux />, color: "#FCC624" },
    { icon: <SiTailwindcss />, color: "#38B2AC" },
    { icon: <SiNodedotjs />, color: "#68A063" },
  ];

  return (
    <div className="overflow-hidden whitespace-nowrap w-full py-20 text-current bg-transparent">
      <motion.div
        className="flex items-center gap-20"
        initial={{ x: 0 }}
        animate={{ x: "-150%" }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...tech, ...tech].map((item, i) => (
          <span
            key={i}
            className="text-[6vw] md:text-[4vw] transition-colors duration-300 cursor-pointer"
            style={{ color: "currentColor"}}
            onMouseEnter={(e) => (e.currentTarget.style.color = item.color)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "currentColor")}
          >
            {item.icon}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default MMarqueeWrapper;
