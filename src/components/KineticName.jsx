import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePointerFine, useReducedMotion } from "../hooks/useEnvironment";

const ENTRY_STEP = 45; // ms between characters on the intro reveal
const WAVE_RADIUS = 170; // px of cursor influence per character

/**
 * The headline. Two layered behaviours:
 *
 *  1. Entry — each glyph rises out of its own clipping mask, staggered.
 *  2. Idle  — glyphs near the pointer lift and lean, so the name behaves
 *             like a physical object rather than a static block of type.
 *
 * The wave is written straight to `style.transform` inside a rAF loop, so
 * React never re-renders while the pointer moves. Geometry is re-measured
 * only when the loop wakes up or the layout changes — never per frame.
 */
export default function KineticName({ lines, className = "" }) {
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const pointerFine = usePointerFine();
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    // One frame of delay so the masked start state paints before we animate.
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!pointerFine || reduced) return;

    const container = containerRef.current;
    if (!container) return;

    const chars = Array.from(container.querySelectorAll("[data-glyph]"));
    if (!chars.length) return;

    const state = chars.map(() => ({ lift: 0, target: 0 }));
    let metrics = [];
    let raf = 0;
    let running = false;
    let dirty = true;
    const pointer = { x: -9999, y: -9999 };

    const measure = () => {
      metrics = chars.map((node) => {
        const rect = node.getBoundingClientRect();
        return { cx: rect.left + rect.width / 2, cy: rect.top + rect.height / 2 };
      });
      dirty = false;
    };

    const tick = () => {
      if (dirty) measure();
      let moving = false;

      for (let i = 0; i < chars.length; i++) {
        const m = metrics[i];
        if (!m) continue;

        const dx = pointer.x - m.cx;
        const dy = pointer.y - m.cy;
        // Vertical distance is weighted down so the wave reads as a horizontal sweep.
        const dist = Math.sqrt(dx * dx + dy * dy * 0.35);
        const t = Math.max(0, 1 - dist / WAVE_RADIUS);

        const s = state[i];
        s.target = t * t;
        s.lift += (s.target - s.lift) * 0.14;

        if (s.lift > 0.002 || s.target > 0.002) moving = true;

        const y = -s.lift * 16;
        const scale = 1 + s.lift * 0.06;
        // Glyphs tilt away from the pointer, like a surface being pressed.
        const skew = (dx / WAVE_RADIUS) * s.lift * -5;
        chars[i].style.transform = `translate3d(0,${y}px,0) scale(${scale}) skewX(${skew}deg)`;
      }

      if (!moving) {
        for (const node of chars) node.style.transform = "";
        running = false;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      dirty = true; // re-measure once on wake, not every frame
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      start();
    };

    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
      start();
    };

    const invalidate = () => {
      dirty = true;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", invalidate);
    window.addEventListener("scroll", invalidate, { passive: true });
    container.addEventListener("pointerleave", onLeave);
    if (document.fonts?.ready) document.fonts.ready.then(invalidate).catch(() => {});

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", invalidate);
      window.removeEventListener("scroll", invalidate);
      container.removeEventListener("pointerleave", onLeave);
      for (const node of chars) node.style.transform = "";
    };
  }, [pointerFine, reduced, lines]);

  let glyphIndex = 0;

  return (
    <span ref={containerRef} className={className}>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block">
          {/* One accessible copy of the line; the glyphs themselves are decorative */}
          <span className="sr-only">{line}</span>

          {line.split("").map((char, i) => {
            if (char === " ") {
              return (
                <span key={`${lineIndex}-${i}`} aria-hidden="true" className="inline-block">
                  &nbsp;
                </span>
              );
            }

            const delay = glyphIndex * ENTRY_STEP;
            glyphIndex += 1;

            return (
              <span key={`${lineIndex}-${i}`} aria-hidden="true" className="char-mask">
                <span
                  className="char"
                  style={{
                    transform: mounted || reduced ? undefined : "translate3d(0,105%,0)",
                    transition: reduced
                      ? undefined
                      : `transform 1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
                  }}
                >
                  {/* Inner node carries the pointer wave; outer carries the entry */}
                  <span data-glyph className="char">
                    {char}
                  </span>
                </span>
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}
