import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../hooks/useEnvironment";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>[]{}#*+=-_";

/**
 * Decodes text character-by-character the first time it scrolls into view —
 * a nod to the terminal work, applied sparingly to section labels.
 * Renders the final text immediately when motion is reduced.
 */
export default function Scramble({ text, className = "", as: Tag = "span", speed = 28 }) {
  const ref = useRef(null);
  const [output, setOutput] = useState(text);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setOutput(text);
      return;
    }

    const node = ref.current;
    if (!node) return;

    let interval = 0;
    let frame = 0;
    let done = false;

    const run = () => {
      // Each character locks in after a staggered number of ticks.
      interval = window.setInterval(() => {
        frame += 1;
        let settled = 0;
        const next = text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            const lockAt = i * 1.6 + 4;
            if (frame >= lockAt) {
              settled += 1;
              return char;
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("");

        setOutput(next);
        if (settled >= text.replace(/ /g, "").length) {
          window.clearInterval(interval);
          setOutput(text);
        }
      }, speed);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !done) {
          done = true;
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      window.clearInterval(interval);
    };
  }, [text, speed, reduced]);

  return (
    <Tag ref={ref} className={className}>
      {/* Keeps the accessible name stable while the visual text churns */}
      <span aria-hidden="true">{output}</span>
      <span className="sr-only">{text}</span>
    </Tag>
  );
}
