import { useEffect, useRef } from "react";
import { useReducedMotion } from "../hooks/useEnvironment";

const SPACING = 34; // px between grid nodes
const RADIUS = 190; // px of cursor influence
const IDLE_MS = 1400; // stop the loop this long after the pointer settles

/**
 * A fixed grid of dots behind the whole page. Nodes near the pointer brighten
 * and lean away from it, so the background quietly responds to presence
 * without ever competing with the content.
 *
 * Cost is O(nodes) per frame with no allocation, and the loop parks itself
 * once the pointer goes idle — on touch devices it paints exactly once.
 */
export default function FieldCanvas() {
  const canvasRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const still = reduced || coarse;

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let originX = 0;
    let originY = 0;

    const pointer = { x: -9999, y: -9999 };
    const eased = { x: -9999, y: -9999 };
    let influence = 0; // 0 → 1, fades the effect in and out
    let lastMove = 0;
    let raf = 0;
    let running = false;

    // White on black, at two strengths: barely-there at rest, and a lit
    // node under the pointer. Fixed, because the page has one theme.
    const DOT = "255,255,255";
    const BASE_ALPHA = 0.075;
    const HOT_ALPHA = 0.6;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(width / SPACING) + 1;
      rows = Math.ceil(height / SPACING) + 1;
      // Centre the lattice so it never looks clipped on one edge.
      originX = (width - (cols - 1) * SPACING) / 2;
      originY = (height - (rows - 1) * SPACING) / 2;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const active = influence > 0.001;
      const r2 = RADIUS * RADIUS;

      for (let i = 0; i < cols; i++) {
        const gx = originX + i * SPACING;
        for (let j = 0; j < rows; j++) {
          const gy = originY + j * SPACING;

          let alpha = BASE_ALPHA;
          let size = 1;
          let x = gx;
          let y = gy;

          if (active) {
            const dx = gx - eased.x;
            const dy = gy - eased.y;
            const dist2 = dx * dx + dy * dy;

            if (dist2 < r2) {
              // Smooth falloff: 1 at the pointer, 0 at the radius edge.
              const t = 1 - Math.sqrt(dist2) / RADIUS;
              const fall = t * t * influence;
              alpha = BASE_ALPHA + (HOT_ALPHA - BASE_ALPHA) * fall;
              size = 1 + fall * 1.6;
              // Nudge the node outward along the pointer vector.
              const push = fall * 9;
              const inv = 1 / (Math.sqrt(dist2) || 1);
              x = gx + dx * inv * push;
              y = gy + dy * inv * push;
            }
          }

          ctx.fillStyle = `rgba(${DOT},${alpha})`;
          ctx.fillRect(x - size / 2, y - size / 2, size, size);
        }
      }
    };

    const tick = () => {
      const idle = performance.now() - lastMove > IDLE_MS;
      const targetInfluence = idle ? 0 : 1;

      eased.x += (pointer.x - eased.x) * 0.12;
      eased.y += (pointer.y - eased.y) * 0.12;
      influence += (targetInfluence - influence) * 0.06;

      draw();

      // Park the loop once the effect has fully faded out.
      if (idle && influence < 0.002) {
        influence = 0;
        draw();
        running = false;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || still) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      if (influence === 0) {
        // First contact after idling — snap so it doesn't fly in from offscreen.
        eased.x = pointer.x;
        eased.y = pointer.y;
      }
      lastMove = performance.now();
      start();
    };

    const onResize = () => {
      resize();
      draw();
    };

    resize();
    draw();

    if (!still) {
      window.addEventListener("pointermove", onMove, { passive: true });
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
