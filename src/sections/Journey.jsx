import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import journey from "../data/journey";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import { useReducedMotion } from "../hooks/useEnvironment";

export default function Journey() {
  const listRef = useRef(null);
  const reduced = useReducedMotion();

  // The rail fills as the list passes through the viewport.
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 75%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <section id="journey" className="scroll-mt-24 py-24 sm:py-32 lg:py-40">
      <div className="shell">
        <SectionHeader
          index="04"
          label="Journey"
          title={
            <>
              How I got
              <br />
              <span className="font-serif italic font-normal text-muted">here</span>
            </>
          }
          lead="No traditional CS degree. A selective peer-learning school, a business I ran myself, and several years of deliberately building things harder than I needed to."
        />

        <div ref={listRef} className="relative mt-16 sm:mt-24">
          {/* Static rail */}
          <div className="absolute bottom-0 left-0 top-2 w-px bg-line md:left-[10rem]" />
          {/* Progress rail, driven by scroll */}
          <motion.div
            aria-hidden="true"
            style={reduced ? { scaleY: 1 } : { scaleY }}
            className="absolute bottom-0 left-0 top-2 w-px origin-top bg-fg md:left-[10rem]"
          />

          <ol>
            {journey.map((item, i) => (
              <li key={`${item.year}-${item.title}`}>
                <Reveal delay={Math.min(i * 0.05, 0.2)}>
                  <article className="group relative grid gap-x-10 gap-y-3 py-8 pl-8 md:grid-cols-[10rem_1fr] md:pl-0 lg:py-10">
                    {/* Year sits in its own column on desktop, above the rail */}
                    <div className="md:pr-10 md:text-right">
                      <p className="font-mono text-xs tracking-[0.12em] text-fg">
                        {item.year}
                      </p>
                      <p className="mt-1 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.12em] text-faint">
                        {item.duration}
                      </p>
                    </div>

                    {/* Node marker on the rail */}
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-[2.35rem] h-[7px] w-[7px] -translate-x-[3px] rotate-45 bg-faint ring-4 ring-bg transition-colors duration-500 group-hover:bg-fg md:left-[10rem] lg:top-[2.85rem]"
                    />

                    <div className="md:pl-10">
                      <div className="flex flex-wrap items-baseline gap-x-3">
                        <h3 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
                          {item.title}
                        </h3>
                        {item.current && (
                          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-signal">
                            <span className="h-1 w-1 rounded-full bg-signal" />
                            Current
                          </span>
                        )}
                      </div>

                      <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
                        {item.place}
                      </p>

                      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                        {item.details}
                      </p>

                      <ul className="mt-5 flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <li
                            key={tag}
                            className="border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-faint transition-colors duration-500 group-hover:border-faint group-hover:text-muted"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
