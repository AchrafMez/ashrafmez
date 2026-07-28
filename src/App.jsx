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
 * React Router restores the path but not the fragment, so a link like `/#work`
 * arriving from another route lands at the top. This resolves the target once
 * the new route has actually painted.
 */
function HashScroll() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = requestAnimationFrame(() => {
      const target = document.querySelector(hash);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => cancelAnimationFrame(id);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <BrowserRouter>
      <HashScroll />

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
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
