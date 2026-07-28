import Reveal from "./Reveal";
import Scramble from "./Scramble";

/**
 * Every section opens the same way: a mono index label in the left column,
 * a display-weight title in the right. The repetition is the point — it
 * gives the page a spine you can feel while scrolling.
 */
export default function SectionHeader({ index, label, title, lead, className = "" }) {
  return (
    <div className={`grid gap-6 md:grid-cols-12 md:gap-12 ${className}`}>
      {/* Section index — uncomment to restore. The `index` and `label` props are
          still accepted by every caller, so nothing else has to change. The
          title column is pinned with col-start-4 so it holds its position here.
      <Reveal className="md:col-span-3">
        <p className="eyebrow">
          <span className="text-faint">{index}</span> —{" "}
          <Scramble text={label} />
        </p>
      </Reveal>
      */}

      <div className="md:col-span-9 md:col-start-4">
        <Reveal delay={0.05}>
          <h2 className="text-balance font-display text-4xl font-semibold leading-[0.95] tracking-tightest sm:text-5xl md:text-6xl lg:text-7xl">
            {title}
          </h2>
        </Reveal>
        {lead && (
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {lead}
            </p>
          </Reveal>
        )}
      </div>
    </div>
  );
}
