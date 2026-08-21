import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import projects from "../data/portfolio";
import Reveal from "../components/Reveal";
import Magnetic from "../components/Magnetic";
import { useReducedMotion } from "../hooks/useEnvironment";

function NotFound() {
  return (
    <div className="shell flex min-h-[70vh] flex-col items-center justify-center py-32 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-6 font-display text-5xl font-semibold tracking-tightest sm:text-7xl">
        No such project
      </h1>
      <p className="mt-4 max-w-md text-muted">
        That path doesn&apos;t resolve to anything. It may have been renamed.
      </p>
      <Link
        to="/"
        data-cursor="link"
        className="link-underline mt-10 font-mono text-xs uppercase tracking-[0.2em]"
      >
        Back to index
      </Link>
    </div>
  );
}

export default function ProjectDetail() {
  const { id } = useParams();
  const index = projects.findIndex((p) => p.id === id);
  const project = projects[index];
  const reduced = useReducedMotion();

  const { scrollY } = useScroll();
  // The banner drifts down and swells a little as the page scrolls past it, so
  // the still reads as a moving plate rather than a pasted-on image.
  const bannerY = useTransform(scrollY, [0, 700], ["0%", "10%"]);
  const bannerScale = useTransform(scrollY, [0, 700], [1, 1.09]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!project) return;
    const previous = document.title;
    document.title = `${project.title} — Achraf Meziouni`;
    return () => {
      document.title = previous;
    };
  }, [project]);

  if (!project) return <NotFound />;

  const next = projects[(index + 1) % projects.length];

  return (
    <article className="pb-24">
      {/* ── Cover ─────────────────────────────────────────────
          The poster runs full-bleed as a banner with the title set over it.
          Legibility comes from `.banner-scrim`, which ramps to solid --bg
          behind the type instead of blurring the whole plate — an earlier
          blurred-wash version killed the image and the type together. */}
      <header className="relative">
        <div className="relative h-[clamp(26rem,72vh,46rem)] w-full overflow-hidden">
          <motion.img
            src={project.poster}
            alt={`${project.title} interface`}
            style={reduced ? undefined : { y: bannerY, scale: bannerScale }}
            className="absolute inset-x-0 top-[-6%] h-[112%] w-full object-cover object-top"
          />

          <div className="banner-scrim" aria-hidden="true" />
          <div className="banner-topfade" aria-hidden="true" />
        </div>

        {/* Back link floats over the top of the plate, clear of the nav. */}
        <div className="absolute inset-x-0 top-[4.5rem] sm:top-[5.5rem]">
          <div className="shell">
            <Reveal>
              <Link
                to="/work"
                data-cursor="link"
                className="group inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-fg"
              >
                <svg
                  className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m6 6-6-6 6-6" />
                </svg>
                All work
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Title block, bottom-aligned inside the banner. */}
        <div className="absolute inset-x-0 bottom-0 pb-10 sm:pb-14 lg:pb-16">
          <div className="shell">
            <Reveal delay={0.06}>
              <p className="eyebrow flex flex-wrap items-center gap-x-3">
                <span>
                  {project.category} — {project.year}
                </span>
                {project.live && (
                  <span className="flex items-center gap-1.5 text-signal">
                    <span className="h-1 w-1 rounded-full bg-signal" />
                    Live
                  </span>
                )}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="mt-4 font-display text-[clamp(2.75rem,8vw,6.5rem)] font-semibold leading-[0.9] tracking-tightest">
                {project.title}
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-5 max-w-xl text-balance font-serif text-xl italic leading-snug text-muted sm:text-[1.75rem]">
                {project.tagline}
              </p>
            </Reveal>
          </div>
        </div>
      </header>

      {/* ── Highlight strip ───────────────────────────────── */}
      {project.highlights && (
        <div className="shell mt-14 lg:mt-20">
          <div className="grid grid-cols-1 gap-px border-y border-line bg-line sm:grid-cols-3">
            {project.highlights.map((h) => (
              <div key={h.label} className="bg-bg px-6 py-8 lg:px-8">
                <p className="font-display text-3xl font-semibold tracking-tight lg:text-4xl">
                  {h.value}
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                  {h.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Body ──────────────────────────────────────────── */}
      <div className="shell mt-20 grid gap-16 md:grid-cols-12 md:gap-12 lg:mt-28">
        <div className="md:col-span-7 lg:col-span-7">
          <Reveal>
            <h2 className="eyebrow">Overview</h2>
            <p className="mt-6 text-lg leading-[1.65] text-fg sm:text-xl">
              {project.longDescription}
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="eyebrow mt-16">What it does</h2>
            <ul className="mt-6">
              {project.features.map((feature, i) => (
                <li
                  key={feature}
                  className="flex gap-6 border-t border-line py-5 text-base leading-relaxed text-muted"
                >
                  <span className="shrink-0 font-mono text-[11px] text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="rule" />
          </Reveal>
        </div>

        {/* Sticky metadata rail */}
        <aside className="md:col-span-5 lg:col-span-4 lg:col-start-9">
          <div className="md:sticky md:top-28">
            <Reveal delay={0.1}>
              <dl className="space-y-8">
                <div>
                  <dt className="eyebrow">Role</dt>
                  <dd className="mt-3 text-base text-fg">{project.role}</dd>
                </div>

                <div>
                  <dt className="eyebrow">Year</dt>
                  <dd className="mt-3 text-base text-fg">{project.year}</dd>
                </div>

                <div>
                  <dt className="eyebrow">Stack</dt>
                  <dd className="mt-3 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>

              {/* A deployed URL outranks the repo — clients click the demo. */}
              <div className="mt-10 flex flex-col items-start gap-4">
                {project.live && (
                  <Magnetic strength={0.22}>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer noopener"
                      data-cursor="view"
                      data-cursor-label="Visit"
                      className="group inline-flex items-center gap-3 rounded-full border border-fg bg-fg px-6 py-3.5 text-bg transition-colors duration-500 hover:bg-transparent hover:text-fg"
                    >
                      {/* This pill is a white plate, so the live pip inverts to
                          the page black — `bg-current` tracks the button's own
                          ink, which flips back to white on hover. A --signal
                          dot here would be white on white. */}
                      <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-70" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em]">
                        Visit live site
                      </span>
                      <svg
                        className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M17 7H7m10 0v10" />
                      </svg>
                    </a>
                  </Magnetic>
                )}

                <Magnetic strength={0.22}>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    data-cursor="view"
                    data-cursor-label="GitHub"
                    className={`group inline-flex items-center gap-3 rounded-full border border-fg px-6 py-3.5 transition-colors duration-500 ${
                      project.live
                        ? "bg-transparent text-fg hover:bg-fg hover:text-bg"
                        : "bg-fg text-bg hover:bg-transparent hover:text-fg"
                    }`}
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                      />
                    </svg>
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em]">
                      Source code
                    </span>
                  </a>
                </Magnetic>
              </div>
            </Reveal>
          </div>
        </aside>
      </div>

      {/* ── Media ─────────────────────────────────────────────
          The cover already carries the poster, so this section only appears
          when there is something further to show. */}
      {(project.video || project.extraImages?.length > 0) && (
        <div className="shell mt-20 lg:mt-28">
          {project.video && (
            <Reveal>
              {/* Capture footage is far lower resolution than the screenshots,
                  so it gets a narrower frame rather than full bleed. */}
              <figure className="mx-auto max-w-5xl overflow-hidden rounded-md ring-1 ring-line">
                <video
                  src={project.video}
                  poster={project.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                  aria-label={`${project.title} running`}
                  className="w-full"
                />
                <figcaption className="border-t border-line px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                  Recorded from the running build
                </figcaption>
              </figure>
            </Reveal>
          )}

          {project.extraImages?.map((img, i) => (
            <Reveal key={img} delay={0.05}>
              <figure className="mt-8 overflow-hidden rounded-md bg-surface p-4 ring-1 ring-line sm:p-8">
                <img
                  src={img}
                  alt={`${project.title} — ${project.extraCaptions?.[i] ?? "detail view"}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full"
                />
                <figcaption className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                  Fig. {String(i + 1).padStart(2, "0")} —{" "}
                  {project.extraCaptions?.[i] ?? "Detail view"}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      )}

      {/* ── Next project ──────────────────────────────────── */}
      <div className="shell mt-28 lg:mt-40">
        <Reveal>
          <Link
            to={`/projects/${next.id}`}
            data-cursor="view"
            data-cursor-label="Open"
            className="group block border-t border-line pt-10"
          >
            <p className="eyebrow">Next project</p>
            <div className="mt-6 flex flex-wrap items-baseline justify-between gap-6">
              <h2 className="font-display text-4xl font-semibold tracking-tightest transition-transform duration-700 ease-out group-hover:translate-x-2 sm:text-6xl lg:text-7xl">
                {next.title}
              </h2>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                {next.category} — {next.year}
              </span>
            </div>
          </Link>
        </Reveal>
      </div>
    </article>
  );
}
