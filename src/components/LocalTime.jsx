import { useEffect, useState } from "react";
import { site } from "../data/site";

/**
 * The visitor's clock vs. mine. A small thing, but it tells a client
 * "there is a real person here, in a real timezone" better than any copy.
 */
export default function LocalTime({ className = "" }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const time = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: site.timezone,
  }).format(now);

  return (
    <span className={className}>
      {/* <span className="tabular-nums">{time}</span> */}
      {/* <span className="text-faint"> GMT+1</span> */}
    </span>
  );
}
