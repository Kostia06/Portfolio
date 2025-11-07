"use client";

import { useEffect, useRef } from "react";

export default function ParallaxSection({ children, speed = 0.5, className = "" }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrolled = window.scrollY;
      const offset = rect.top + scrolled;
      const diff = scrolled - offset;

      if (rect.top < window.innerHeight && rect.bottom > 0) {
        section.style.transform = `translateY(${diff * speed}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <div ref={sectionRef} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
