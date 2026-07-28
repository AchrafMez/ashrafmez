import { motion } from "framer-motion";
import KineticName from "../components/KineticName";
import LocalTime from "../components/LocalTime";
import TechMarquee from "../components/TechMarquee";
import { site } from "../data/site";
import { useReducedMotion } from "../hooks/useEnvironment";

/** 1337's wordmark, inline so it inherits the current text colour. */
function Logo1337({ className = "" }) {
  return (
    <svg viewBox="0 0 76 20" fill="none" className={className} role="img" aria-label="1337">
      <path
        d="M2.8333 17.6623H5.92418V2.33766H2.31816V5.45455H0V1.49012e-07H8.75748V17.6623H11.8484V20H2.8333V17.6623Z"
        fill="currentColor"
      />
      <path
        d="M21.3785 17.6623H30.6512V10.9091H22.1513V8.57143H30.6512V2.33766H21.3785V0H33.4845V20H21.3785V17.6623Z"
        fill="currentColor"
      />
      <path
        d="M42.2419 17.6623H51.5146V10.9091H43.0147V8.57143H51.5146V2.33766H42.2419V0H54.3479V20H42.2419V17.6623Z"
        fill="currentColor"
      />
      <path
        d="M72.6355 2.33766H64.9084V7.27273H62.5902V0H75.2113V20H72.6355V2.33766Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Hero() {
  const reduced = useReducedMotion();

  const fade = (delay) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
        };

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-between pb-8 pt-28 sm:pt-32"
    >
      <div className="shell flex flex-1 flex-col justify-center">
        {/* Status strip — availability, location, live clock */}
        <motion.div
          {...fade(0.1)}
          className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-2 sm:mb-14"
        >
          <span className="eyebrow flex items-center gap-2.5">
            <span className="relative flex h-1.5 w-1.5">
              {!reduced && site.available && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
              )}
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
            </span>
            {site.availabilityNote}
          </span>
          <span className="eyebrow hidden sm:inline">{site.location}</span>
          <LocalTime className="eyebrow hidden sm:inline" />
        </motion.div>

        {/* The name — hover it */}
        <h1 className="font-display font-semibold leading-[0.86] tracking-tightest text-[clamp(3.25rem,14vw,11rem)]">
          <KineticName lines={["Achraf", "Meziouni"]} className="block" />
        </h1>

        {/* Positioning statement — the one paragraph a client actually reads */}
        <motion.div
          {...fade(0.9)}
          className="mt-10 grid gap-8 border-t border-line pt-8 sm:mt-14 md:grid-cols-12 md:gap-12"
        >
          <p className="eyebrow md:col-span-3">
            <span className="text-faint">01</span> — Introduction
          </p>

          <div className="md:col-span-9 lg:col-span-7">
            <p className="text-balance text-xl font-light leading-[1.45] text-fg sm:text-2xl md:text-[1.75rem]">
              I&apos;m a software engineer at{" "}
              <a
                href={site.school.url}
                target="_blank"
                rel="noreferrer noopener"
                data-cursor="link"
                aria-label="1337 — 42 Network school"
                className="link-underline inline-flex items-baseline"
              >
                <Logo1337 className="mx-0.5 inline-block h-[0.6em] w-auto" />
              </a>{" "}
              who builds from the socket up — <em className="font-serif italic">systems</em> in
              C and C++, <em className="font-serif italic">products</em> in React and Node, and
              the infrastructure that keeps both standing.
            </p>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
              I care about the parts users never see: the schema that won&apos;t need
              migrating, the request that returns before they notice, the deploy that
              doesn&apos;t wake anyone up.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              <a
                href="#work"
                data-cursor="link"
                className="link-underline font-mono text-xs uppercase tracking-[0.2em] text-fg"
              >
                Selected work
              </a>
              <a
                href="#contact"
                data-cursor="link"
                className="link-underline font-mono text-xs uppercase tracking-[0.2em] text-muted"
              >
                Start a project
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tech ribbon anchored to the bottom of the viewport */}
      <motion.div {...fade(1.15)} className="mt-12 border-y border-line py-5">
        <TechMarquee />
      </motion.div>
    </section>
  );
}
