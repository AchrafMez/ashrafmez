import { FaDocker, FaGitAlt, FaReact, FaLinux } from "react-icons/fa";
import {
  SiC,
  SiCplusplus,
  SiJavascript,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiPostgresql,
  SiRedis,
  SiNginx,
  SiGnubash,
} from "react-icons/si";

const TECH = [
  { icon: SiC, name: "C" },
  { icon: SiCplusplus, name: "C++" },
  { icon: SiJavascript, name: "JavaScript" },
  { icon: FaReact, name: "React" },
  { icon: SiNextdotjs, name: "Next.js" },
  { icon: SiNodedotjs, name: "Node.js" },
  { icon: SiPostgresql, name: "PostgreSQL" },
  { icon: SiRedis, name: "Redis" },
  { icon: FaDocker, name: "Docker" },
  { icon: SiNginx, name: "Nginx" },
  { icon: FaLinux, name: "Linux" },
  { icon: SiGnubash, name: "Bash" },
  { icon: FaGitAlt, name: "Git" },
  { icon: SiTailwindcss, name: "Tailwind" },
];

/**
 * Infinite tech ribbon. The track holds the list twice and translates -50%,
 * so the seam lands exactly where the first copy ends — no snap, no gap.
 * Animated in CSS rather than JS so it costs nothing on the main thread.
 */
export default function TechMarquee({ className = "" }) {
  return (
    <div className={`edge-fade overflow-hidden ${className}`} aria-hidden="true">
      <div className="marquee-track" style={{ "--marquee-duration": "50s" }}>
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {TECH.map(({ icon: Icon, name }) => (
              <div
                key={`${copy}-${name}`}
                className="group flex shrink-0 items-center gap-3 px-6 sm:px-8"
              >
                <Icon className="h-5 w-5 shrink-0 text-faint transition-colors duration-300 group-hover:text-fg sm:h-6 sm:w-6" />
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint transition-colors duration-300 group-hover:text-fg">
                  {name}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
