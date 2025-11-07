"use client";

import { useEffect, useRef } from "react";

export default function GlitchText({ children, className = "" }) {
  const textRef = useRef(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    let interval;
    const glitch = () => {
      const hasGlitch = Math.random() > 0.95;
      if (hasGlitch) {
        element.style.textShadow = `
          ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 rgba(255, 0, 0, 0.7),
          ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 rgba(0, 255, 255, 0.7)
        `;
        element.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;

        setTimeout(() => {
          element.style.textShadow = '';
          element.style.transform = '';
        }, 50);
      }
    };

    interval = setInterval(glitch, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <span ref={textRef} className={`inline-block ${className}`}>
      {children}
    </span>
  );
}
