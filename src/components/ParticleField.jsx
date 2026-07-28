import { useEffect, useRef } from "react";
import { useReducedMotion } from "../hooks/useEnvironment";

/**
 * Drifting node network, scoped to whatever element it is placed inside.
 *
 * Pair-wise line drawing is O(n²), so the node count stays deliberately low
 * and the loop pauses entirely whenever the container is off-screen.
 */
export default function ParticleField({ className = "" }) {
  const canvasRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mobile = window.innerWidth < 640;
    const COUNT = mobile ? 18 : 46;
    const LINK = mobile ? 90 : 130;
    const SPEED = 0.18;

    let width = 0;
    let height = 0;
    let nodes = [];
    let raf = 0;
    let onScreen = true;

    const palette = { rgb: "255,255,255", dot: 0.3, line: 0.09 };

    const syncPalette = () => {
      const dark = document.documentElement.classList.contains("dark");
      palette.rgb = dark ? "255,255,255" : "68,64,60";
      palette.dot = dark ? 0.32 : 0.28;
      palette.line = dark ? 0.09 : 0.08;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      nodes = Array.from({ length: COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
        r: Math.random() * 1.1 + 0.5,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const { rgb, dot, line } = palette;

      for (const p of nodes) {
        p.x += p.vx;
        p.y += p.vy;
        // Wrap rather than bounce, so the field never develops visible edges.
        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;
      }

      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            const d = Math.sqrt(d2);
            ctx.strokeStyle = `rgba(${rgb},${line * (1 - d / LINK)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        ctx.fillStyle = `rgba(${rgb},${dot})`;
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const tick = () => {
      draw();
      raf = requestAnimationFrame(tick);
    };

    const play = () => {
      if (raf || reduced) return;
      raf = requestAnimationFrame(tick);
    };

    const pause = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    syncPalette();
    resize();
    seed();
    draw();

    if (!reduced) play();

    // Only animate while the section is actually visible.
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen && !document.hidden) play();
        else pause();
      },
      { threshold: 0 }
    );
    io.observe(parent);

    const onVisibility = () => {
      if (document.hidden) pause();
      else if (onScreen) play();
    };

    const onResize = () => {
      resize();
      seed();
      draw();
    };

    const themeObserver = new MutationObserver(() => {
      syncPalette();
      draw();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      pause();
      io.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
