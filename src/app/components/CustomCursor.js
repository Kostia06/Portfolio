"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let animationFrameId;
    let trailPoints = [];

    const handleMouseMove = (e) => {
      setIsVisible(true);
      const newPosition = { x: e.clientX, y: e.clientY };
      setPosition(newPosition);

      // Add to trail
      trailPoints.push({ ...newPosition, id: Date.now() });

      // Keep only last 20 points
      if (trailPoints.length > 20) {
        trailPoints = trailPoints.slice(-20);
      }

      setTrail([...trailPoints]);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const animate = () => {
      // Fade out trail points
      trailPoints = trailPoints.map((point, index) => ({
        ...point,
        opacity: (index + 1) / trailPoints.length,
      }));

      setTrail([...trailPoints]);
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", () => setIsVisible(true));

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Trail particles */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="fixed pointer-events-none z-[9999] transition-opacity duration-300"
          style={{
            left: point.x,
            top: point.y,
            opacity: (index + 1) / trail.length * 0.6,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div
            className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            style={{
              boxShadow: '0 0 10px rgba(139, 92, 246, 0.8)',
              width: `${(index + 1) / trail.length * 8}px`,
              height: `${(index + 1) / trail.length * 8}px`,
            }}
          />
        </div>
      ))}

      {/* Main cursor */}
      <div
        className="fixed pointer-events-none z-[10000] mix-blend-screen transition-transform duration-100"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="relative">
          {/* Outer ring */}
          <div className="w-8 h-8 border-2 border-purple-500 rounded-full animate-pulse" />
          {/* Inner dot */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full"
               style={{ boxShadow: '0 0 20px rgba(139, 92, 246, 1)' }} />
        </div>
      </div>
    </>
  );
}
