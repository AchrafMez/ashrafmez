import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import { services, stats } from "../data/site";

export default function Services() {
  return (
    <section id="services" className="scroll-mt-24 py-24 sm:py-32 lg:py-40">
      <div className="shell">
        <SectionHeader
          index="03"
          label="What I do"
          title={
            <>
              Hire me for the
              <br />
              <span className="font-serif italic font-normal text-muted">
                whole problem
              </span>
            </>
          }
          lead="Not just the screens. I'll take a brief through architecture, implementation and deployment — and hand back something documented enough that you're never locked into me."
        />

        {/* Capability columns.
            The hairlines come from a `bg-line` parent showing through `gap-px`,
            so each cell must stay fully opaque — the reveal happens on the
            content inside, never on the cell itself. */}
        <div className="mt-16 grid gap-px border-t border-line bg-line sm:mt-24 md:grid-cols-3">
          {services.map((service, i) => (
            <div
              key={service.index}
              className="group relative bg-bg p-8 transition-colors duration-500 lg:p-10"
            >
              {/* Fill that wipes up from the bottom edge on hover */}
              <span className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-fg/[0.03] transition-transform duration-700 ease-out group-hover:scale-y-100" />

              <Reveal delay={Math.min(i * 0.08, 0.24)} className="relative">
                <p className="eyebrow">{service.index}</p>

                <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight lg:text-[1.75rem]">
                  {service.title}
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-muted">{service.body}</p>

                <ul className="mt-8 flex flex-wrap gap-x-3 gap-y-2">
                  {service.tags.map((tag) => (
                    <li
                      key={tag}
                      className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint transition-colors duration-500 group-hover:text-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          ))}
        </div>

        {/* Quantified strip */}
        <div className="mt-px grid grid-cols-2 gap-px border-b border-line bg-line lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={stat.label} className="bg-bg px-8 py-8 lg:px-10">
              <Reveal delay={Math.min(i * 0.06, 0.2)}>
                <p className="font-display text-4xl font-semibold tracking-tight lg:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                  {stat.label}
                </p>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
