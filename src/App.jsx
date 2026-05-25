import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Intro from "./components/Intro";
import Portfolio from "./components/Portfolio";
import Journey from "./components/Journey";
import Navbar from "./components/Navbar";
import ProjectDetails from "./components/ProjectDetails";

const getInitTheme = () => {
  return "dark"; // Defaulting to dark as per typical dev portfolio or getting from storage
};

function Home() {
  return (
    <>
      <Intro />
      {/* <section className="py-16 sm:py-20">
        <Portfolio />
      </section>
      <section className="py-16 sm:py-20">
        <Journey />
      </section> */}
    </>
  );
}

function App() {
  const [theme, setTheme] = useState(getInitTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <Router>
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <div className="bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-300 min-h-screen font-inter overflow-x-hidden">
        <div className="max-w-5xl w-11/12 mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/projects/:id" element={<ProjectDetails />} /> */}
          </Routes>
          {/* <Footer /> */}
        </div>
      </div>
    </Router>
  );
}

export default App;

