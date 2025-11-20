"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 50], [0.8, 0.98]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Determine active section with throttling
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

    // Throttle scroll handler for performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledScroll);
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

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.header
      style={{ opacity: scrolled ? headerOpacity : 0.95 }}
      className={`fixed w-full top-0 z-[60] transition-all duration-500 ${
        scrolled
          ? "bg-slate-900/95 backdrop-blur-xl shadow-2xl border-b border-white/10"
          : "bg-slate-900/70 backdrop-blur-md"
      }`}
    >
      <nav className="flex justify-between items-center max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-2.5">
        <motion.a
          href="#hero"
          onClick={(e) => handleNavClick(e, 'hero')}
          className="text-2xl md:text-xl font-black text-white relative group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="gradient-text">K</span>
          <span className="text-white">I</span>
          <motion.div
            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
          />
        </motion.a>

        <ul className="hidden md:flex items-center gap-1.5 bg-slate-800/50 backdrop-blur-xl rounded-full p-1 border border-white/10 shadow-xl relative">
          {navItems.map((item, index) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <a
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 block group ${
                  activeSection === item.id
                    ? "text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full shadow-lg"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
                {activeSection !== item.id && (
                  <motion.div
                    className="absolute inset-0 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  />
                )}
              </a>
            </motion.li>
          ))}
        </ul>

        <motion.a
          href="https://github.com/Kostia06"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block px-5 py-2 text-sm bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold rounded-full shadow-lg relative overflow-hidden group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10">GitHub</span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        </motion.a>

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
        className={`md:hidden fixed inset-0 z-[100] transition-all bg-black h-fit duration-300 ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-96 h-96 bg-indigo-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 -top-20 -left-20 animate-float"></div>
          <div className="absolute w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 top-1/2 left-1/2 animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute w-96 h-96 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 -bottom-20 -right-20 animate-float" style={{animationDelay: '4s'}}></div>
        </div>

        <div className="relative flex flex-col items-center justify-start h-screen pt-24 pb-8 px-6 gap-5 overflow-y-auto z-10">
          {navItems.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                handleNavClick(e, item.id);
                setMobileMenuOpen(false);
              }}
              className={`text-xl font-bold transition-all ease-in-out rasnition duration-200 text-center w-full py-2 hover:scale-125 ${
                activeSection === item.id
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"
                  : "text-gray-300 hover:text-white"
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
            className="mt-4 px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-base font-bold rounded-full hover:scale-105 transition-all shadow-lg w-auto"
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
    </motion.header>
  );
}
