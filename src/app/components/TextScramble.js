"use client";

import { useEffect, useRef, useState } from "react";

export default function TextScramble({ children, className = "", delay = 0 }) {
  const [displayText, setDisplayText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);
  const chars = "!<>-_\\/[]{}—=+*^?#________";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const text = String(children);
    let iteration = 0;
    let animationId;

    const scramble = () => {
      iteration++;

      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration <= text.length) {
        animationId = setTimeout(scramble, 30);
      }
    };

    const timeoutId = setTimeout(scramble, delay);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(animationId);
    };
  }, [isVisible, children, delay]);

  return (
    <span ref={elementRef} className={className}>
      {displayText || children}
    </span>
  );
}
