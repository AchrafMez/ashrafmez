import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import projects from "../data/portfolio";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import { usePointerFine, useReducedMotion } from "../hooks/useEnvironment";

/**
 * A single floating preview panel, shared by every row. It follows the pointer
 * with eased lag and tilts based on horizontal velocity, so it feels like a
 * physical card being dragged rather than a tooltip being positioned.
 *
 * All images are mounted at once and cross-faded via opacity, which avoids a
 * decode flash when moving quickly between rows.
 */
function HoverPreview({ activeIndex }) {
  const wrapRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;

    let raf = 0;
    const pos = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    let lastX = 0;
    let tilt = 0;

    // Sits beside the pointer, never on top of it — the row title has to stay
    // readable while the preview is up.
    const resolve = (clientX, clientY) => {
      const { width, height } = node.getBoundingClientRect();
      const margin = 24;
      const offset = 140;

      // Prefer the right of the pointer; flip left when there's no room.
      let x = clientX + offset + width / 2;
      if (x + width / 2 > window.innerWidth - margin) {
        x = clientX - offset - width / 2;
      }
      const y = Math.min(
        Math.max(clientY, height / 2 + margin),
        window.innerHeight - height / 2 - margin
      );
      return { x, y };
    };

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.12;
      pos.y += (target.y - pos.y) * 0.12;

      // Velocity-driven lean, clamped so it never becomes a cartwheel.
      const velocity = pos.x - lastX;
      lastX = pos.x;
      tilt += (Math.max(-12, Math.min(12, velocity * 0.6)) - tilt) * 0.1;

      node.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) rotate(${tilt}deg)`;
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      const next = resolve(e.clientX, e.clientY);
      target.x = next.x;
      target.y = next.y;
      if (!ready) {
        pos.x = target.x;
        pos.y = target.y;
        lastX = target.x;
        setReady(true);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [ready]);

  const visible = activeIndex !== null && ready;

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-40 h-[260px] w-[340px] will-change-transform xl:h-[300px] xl:w-[400px]"
      style={{
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0.85,
        transition: "opacity 400ms cubic-bezier(0.16,1,0.3,1), scale 500ms cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-md bg-surface shadow-2xl shadow-black/25 ring-1 ring-line">
        {projects.map((project, i) => (
          <img
            key={project.id}
            src={project.poster}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
            style={{ opacity: activeIndex === i ? 1 : 0 }}
          />
        ))}
      </div>
    </div>
  );
}

/** Compact card layout used on touch and narrow screens. */
function WorkCard({ project, index }) {
  return (
    <Reveal delay={Math.min(index * 0.05, 0.2)}>
      <Link
        to={`/projects/${project.id}`}
        className="group block border-t border-line py-6"
      >
        <div className="mb-4 overflow-hidden rounded-md bg-surface ring-1 ring-line">
          <img
            src={project.poster}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="aspect-[16/10] w-full object-cover"
          />
        </div>
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-2xl font-semibold tracking-tight">
            {project.title}
          </h3>
          <span className="flex shrink-0 items-center gap-2 font-mono text-[11px] text-faint">
            {project.live && (
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-signal" />
            )}
            {project.year}
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted">{project.tagline}</p>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
          {project.category} · {project.stack.slice(0, 3).join(" / ")}
        </p>
      </Link>
    </Reveal>
  );
}

export default function Work() {
  const [active, setActive] = useState(null);
  const pointerFine = usePointerFine();
  const reduced = useReducedMotion();
  const showIndex = pointerFine && !reduced;

  return (
    <section id="work" className="scroll-mt-24 py-24 sm:py-32 lg:py-40">
      <div className="shell">
        <SectionHeader
          index="02"
          label="Selected work"
          title={
            <>
              Things I built,
              <br />
              <span className="font-serif italic font-normal text-muted">
                and why they hold up
              </span>
            </>
          }
          lead="Two of these run in production today. The rest are the reason they could be built at all — the low-level work where you learn what an abstraction is actually costing you."
        />

        {showIndex ? (
          <>
            <HoverPreview activeIndex={active} />

            {/* The index. Rows dim in sympathy so the hovered one owns the page. */}
            <ol
              className="mt-16 sm:mt-24"
              onPointerLeave={() => setActive(null)}
            >
              {projects.map((project, i) => (
                <li key={project.id}>
                  <Reveal delay={Math.min(i * 0.04, 0.16)}>
                    <Link
                      to={`/projects/${project.id}`}
                      data-cursor="view"
                      data-cursor-label="Open"
                      onPointerEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onBlur={() => setActive(null)}
                      className="group relative flex items-center gap-8 border-t border-line py-7 transition-opacity duration-500 xl:py-8"
                      style={{
                        opacity: active === null || active === i ? 1 : 0.28,
                      }}
                    >
                      <span className="w-10 shrink-0 font-mono text-[11px] text-faint">
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      {/* The title swaps to a serif-italic cut of itself — the
                          same words, so nothing can truncate or collide with
                          the floating preview. */}
                      <h3 className="swap min-w-0 flex-1 font-display text-4xl font-semibold tracking-tightest xl:text-[3.25rem] xl:leading-[1.05]">
                        <span className="truncate">{project.title}</span>
                        {/* Purely a visual duplicate — hidden so the title
                            isn't announced twice. */}
                        <span aria-hidden="true" className="truncate font-serif font-normal italic">
                          {project.title}
                        </span>
                      </h3>

                      {/* The mono column carries the one-line pitch on hover */}
                      <span className="swap hidden w-80 shrink-0 font-mono text-[11px] uppercase tracking-[0.12em] text-muted lg:block">
                        <span className="truncate">{project.category}</span>
                        <span aria-hidden="true" className="truncate text-fg">
                          {project.hoverLine}
                        </span>
                      </span>

                      <span className="flex w-20 shrink-0 items-center justify-end gap-2 font-mono text-[11px] text-faint">
                        {project.live && (
                          <>
                            <span
                              aria-hidden="true"
                              className="h-1.5 w-1.5 shrink-0 rounded-full bg-signal"
                            />
                            <span className="sr-only">Deployed live —</span>
                          </>
                        )}
                        {project.year}
                      </span>

                      {/* Hairline that draws across the row on hover */}
                      <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-fg transition-transform duration-700 ease-out group-hover:scale-x-100" />
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ol>
            <div className="rule" />
          </>
        ) : (
          <div className="mt-12 sm:mt-16">
            {projects.map((project, i) => (
              <WorkCard key={project.id} project={project} index={i} />
            ))}
            <div className="rule" />
          </div>
        )}
      </div>
    </section>
  );
}
