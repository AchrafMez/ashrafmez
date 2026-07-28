import { useEffect, useRef } from "react";
import { usePointerFine, useReducedMotion } from "../hooks/useEnvironment";

/**
 * Two-part cursor: a dot that tracks the pointer exactly, and a ring that
 * trails behind with critically-damped easing. Any element can drive its
 * state by declaring `data-cursor="link|view"` and `data-cursor-label="…"`.
 *
 * Runs entirely outside React's render loop — the rAF writes transforms
 * straight to the DOM, so moving the mouse never triggers a re-render.
 */
export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);
  const enabled = usePointerFine();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!enabled || reduced) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...target };
    let visible = false;
    let raf = 0;

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;

      if (!visible) {
        visible = true;
        ringPos.x = target.x;
        ringPos.y = target.y;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }

      // Walk up from the hovered node to find the nearest cursor directive.
      const hit = e.target instanceof Element ? e.target.closest("[data-cursor]") : null;
      const state = hit?.getAttribute("data-cursor") ?? "default";
      if (ring.dataset.state !== state) {
        ring.dataset.state = state;
        dot.style.opacity = state === "default" ? "1" : "0";
      }
      if (label) {
        const text = hit?.getAttribute("data-cursor-label") ?? "View";
        if (label.textContent !== text) label.textContent = text;
      }
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const onDown = () => ring.style.setProperty("scale", "0.85");
    const onUp = () => ring.style.setProperty("scale", "1");

    const tick = () => {
      // Exponential smoothing: the ring covers 18% of the remaining gap
      // each frame, which reads as weight without feeling laggy.
      ringPos.x += (target.x - ringPos.x) * 0.18;
      ringPos.y += (target.y - ringPos.y) * 0.18;

      dot.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    document.documentElement.classList.add("cursor-none-fine");
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("cursor-none-fine");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, reduced]);

  if (!enabled || reduced) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" style={{ opacity: 0 }} aria-hidden="true" />
      <div
        ref={ringRef}
        className="cursor-ring"
        data-state="default"
        style={{ opacity: 0, transition: "opacity 300ms ease, scale 200ms ease" }}
        aria-hidden="true"
      >
        <span ref={labelRef} className="cursor-label">
          View
        </span>
      </div>
    </>
  );
}
