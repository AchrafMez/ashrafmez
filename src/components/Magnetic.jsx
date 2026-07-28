import { cloneElement, useEffect, useRef } from "react";
import { usePointerFine, useReducedMotion } from "../hooks/useEnvironment";

/**
 * Pulls its child toward the pointer while hovered, then springs back on exit.
 * Wraps a single element and drives it via transform only — no layout impact,
 * so it is safe around text and buttons.
 */
export default function Magnetic({ children, strength = 0.35, radius = 90 }) {
  const ref = useRef(null);
  const pointerFine = usePointerFine();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!pointerFine || reduced) return;
    const node = ref.current;
    if (!node) return;

    let raf = 0;
    const current = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    let settled = true;

    const animate = () => {
      current.x += (target.x - current.x) * 0.16;
      current.y += (target.y - current.y) * 0.16;

      const done =
        Math.abs(target.x - current.x) < 0.1 && Math.abs(target.y - current.y) < 0.1;

      if (done) {
        current.x = target.x;
        current.y = target.y;
      }

      node.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;

      if (done) {
        settled = true;
        return;
      }
      raf = requestAnimationFrame(animate);
    };

    const wake = () => {
      if (!settled) return;
      settled = false;
      raf = requestAnimationFrame(animate);
    };

    const onMove = (e) => {
      const rect = node.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      // Only engage once the pointer is inside the magnetic field.
      const dist = Math.hypot(dx, dy);
      const reach = Math.max(rect.width, rect.height) / 2 + radius;
      const falloff = Math.max(0, 1 - dist / reach);

      target.x = dx * strength * falloff;
      target.y = dy * strength * falloff;
      wake();
    };

    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      wake();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    node.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
      node.style.transform = "";
    };
  }, [pointerFine, reduced, strength, radius]);

  return cloneElement(children, { ref });
}
