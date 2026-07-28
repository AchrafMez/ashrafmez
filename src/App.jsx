import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Cursor from "./components/Cursor";
import FieldCanvas from "./components/FieldCanvas";
import ScrollProgress from "./components/ScrollProgress";

import Hero from "./sections/Hero";
import Work from "./sections/Work";
import Services from "./sections/Services";
import Journey from "./sections/Journey";
import Contact from "./sections/Contact";
import ProjectDetail from "./pages/ProjectDetail";

import useTheme from "./hooks/useTheme";

function Home() {
  useEffect(() => {
    document.title = "Achraf Meziouni — Software Engineer";
  }, []);

  return (
    <main>
      <Hero />
      <Work />
      <Services />
      <Journey />
      <Contact />
    </main>
  );
}

function ProjectPage() {
  return (
    <main>
      <ProjectDetail />
      <Contact />
    </main>
  );
}

/**
 * The home sections are addressed as real paths (`/work`) rather than fragments
 * (`/#work`) — same destination, cleaner URL. Every one of these paths renders
 * <Home/> via the catch-all route, so all that is left is to scroll to the
 * matching section once the route has actually painted.
 */
const SECTION_PATHS = ["work", "services", "journey", "contact"];

function SectionScroll() {
  // `key` changes on every navigation, so re-clicking the current section
  // scrolls again instead of doing nothing.
  const { pathname, key } = useLocation();

  useEffect(() => {
    const id = pathname.replace(/^\/|\/$/g, "");
    if (!SECTION_PATHS.includes(id)) return;
    const frame = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, key]);

  return null;
}

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <BrowserRouter>
      <SectionScroll />

      {/* Ambient layers — behind and above everything, never in the flow */}
      <FieldCanvas />
      <div className="grain" aria-hidden="true" />
      <ScrollProgress />
      <Cursor />

      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <div className="relative z-10 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:id" element={<ProjectPage />} />
          {/* Also catches the section paths in SECTION_PATHS, and anything
              unrecognised, which lands on the home page rather than a dead end. */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
