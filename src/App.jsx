import React, { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Intro from "./components/Intro";
import Portfolio from "./components/Portfolio";
import Journey from "./components/Journey";
import Navbar from "./components/Navbar";

const getInitTheme = () => {
  return document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";
};

function App() {
  const [theme, setTheme] = useState(getInitTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <>
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <div className="bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-300 min-h-screen min-h-[100dvh] font-inter overflow-x-hidden">
        <div className="max-w-5xl w-11/12 mx-auto">
          <Intro />
          <section className="py-16 sm:py-20">
            <Portfolio />
          </section>
          <section className="py-16 sm:py-20">
            <Journey />
          </section>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;

