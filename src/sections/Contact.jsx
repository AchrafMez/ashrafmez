import { useEffect, useState } from "react";
import Magnetic from "../components/Magnetic";
import ParticleField from "../components/ParticleField";
import Reveal from "../components/Reveal";
import LocalTime from "../components/LocalTime";
import { site, socials } from "../data/site";

/** Click-to-copy with a self-clearing confirmation. */
function CopyEmail() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
    } catch (e) {
      // Clipboard blocked (insecure context or denied) — fall back to the mail client.
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      data-cursor="link"
      className="link-underline font-mono text-xs uppercase tracking-[0.18em] text-muted transition-colors hover:text-fg"
      aria-live="polite"
    >
      {copied ? "Copied to clipboard" : "Copy email address"}
    </button>
  );
}

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden border-t border-line pt-24 sm:pt-32 lg:pt-40"
    >
      <ParticleField />

      <div className="shell relative">
        {/* Section index — uncomment to restore.
        <Reveal>
          <p className="eyebrow">
            <span className="text-faint">05</span> — Contact
          </p>
        </Reveal>
        */}

        <Reveal delay={0.05}>
          <h2 className="mt-8 text-balance font-display text-[clamp(2.5rem,9vw,7.5rem)] font-semibold leading-[0.9] tracking-tightest">
            Have something
            <br />
            worth <span className="font-serif italic font-normal text-muted">building</span>?
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Tell me what you&apos;re trying to make. If it&apos;s a fit, I&apos;ll come back
            with an approach and a timeline — not a sales call.
          </p>
        </Reveal>

        {/* Primary call to action */}
        <Reveal delay={0.18}>
          <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6">
            <Magnetic strength={0.28}>
              <a
                href={`mailto:${site.email}?subject=Project%20enquiry`}
                data-cursor="view"
                data-cursor-label="Email"
                className="group inline-flex items-center gap-4 rounded-full border border-fg bg-fg px-8 py-4 text-bg transition-colors duration-500 hover:bg-transparent hover:text-fg sm:px-10 sm:py-5"
              >
                <span className="font-display text-lg font-medium tracking-tight sm:text-xl">
                  Start a conversation
                </span>
                <svg
                  className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </a>
            </Magnetic>

            <CopyEmail />
          </div>
        </Reveal>

        {/* Contact detail grid */}
        <div className="mt-20 grid gap-px border-t border-line bg-line sm:mt-28 sm:grid-cols-2 lg:grid-cols-4">
          {socials.map((social, i) => (
            /* Cell stays opaque so the `gap-px` hairlines never bleed through
               while the contents are still fading in. */
            <div key={social.name} className="bg-bg">
              <a
                href={social.url}
                target={social.url.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer noopener"
                data-cursor="link"
                className="group flex h-full flex-col justify-between gap-8 p-6 transition-colors duration-500 hover:bg-fg/[0.03] lg:p-8"
              >
                <Reveal delay={Math.min(i * 0.05, 0.2)}>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                    {social.name}
                  </span>
                </Reveal>
                <Reveal delay={Math.min(i * 0.05, 0.2) + 0.05}>
                  <span className="flex items-center justify-between gap-3">
                    <span className="truncate text-sm text-fg">{social.handle}</span>
                    <svg
                      className="h-3.5 w-3.5 shrink-0 text-faint transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M17 7H7m10 0v10" />
                    </svg>
                  </span>
                </Reveal>
              </a>
            </div>
          ))}
        </div>

        {/* Colophon */}
        <div className="mt-16 flex flex-col gap-6 border-t border-line py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
            © {new Date().getFullYear()} {site.name} — Built from scratch
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
              {site.location}
            </span>
            <LocalTime className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint" />
            <a
              href="#top"
              data-cursor="link"
              className="link-underline font-mono text-[10px] uppercase tracking-[0.18em] text-muted"
            >
              Back to top
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
