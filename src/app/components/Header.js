"use client";

import { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Determine active section
      const sections = ["hero", "about", "achievements", "experience", "projects", "skills", "contact"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { id: "about", label: "About" },
    { id: "achievements", label: "Achievements" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-900/95 backdrop-blur-lg shadow-lg border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <nav className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4">
        <a
          href="#hero"
          className="text-2xl font-black text-white hover:scale-105 transition-transform"
        >
          <span className="gradient-text">K</span>
          <span className="text-white">I</span>
        </a>

        <ul className="hidden md:flex items-center gap-1 bg-white/5 backdrop-blur-sm rounded-full p-1 border border-white/10">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 ${
                  activeSection === item.id
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="https://github.com/Kostia06"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-full hover:scale-105 transition-all shadow-lg"
        >
          GitHub
        </a>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white z-50 p-2 relative"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center">
            <span
              className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                mobileMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
              }`}
            ></span>
            <span
              className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
                mobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                mobileMenuOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
              }`}
            ></span>
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-slate-900/98 backdrop-blur-lg z-40 transition-all duration-300 ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
          {navItems.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-2xl font-bold transition-all duration-300 ${
                activeSection === item.id
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 scale-110"
                  : "text-gray-300 hover:text-white hover:scale-110"
              }`}
              style={{
                transitionDelay: mobileMenuOpen ? `${index * 50}ms` : "0ms",
                transform: mobileMenuOpen ? "translateY(0)" : "translateY(-20px)",
                opacity: mobileMenuOpen ? 1 : 0,
              }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://github.com/Kostia06"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-4 px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-full hover:scale-105 transition-all shadow-lg"
            style={{
              transitionDelay: mobileMenuOpen ? `${navItems.length * 50}ms` : "0ms",
              transform: mobileMenuOpen ? "translateY(0)" : "translateY(-20px)",
              opacity: mobileMenuOpen ? 1 : 0,
            }}
          >
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
}
