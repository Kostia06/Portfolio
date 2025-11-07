"use client";

import { useEffect, useRef } from "react";

export default function LiquidBlob({ color = "indigo", size = 300 }) {
  const blobRef = useRef(null);

  useEffect(() => {
    const blob = blobRef.current;
    if (!blob) return;

    let mouseX = 0;
    let mouseY = 0;
    let blobX = 0;
    let blobY = 0;

    const handleMouseMove = (e) => {
      const rect = blob.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      mouseX = e.clientX - centerX;
      mouseY = e.clientY - centerY;
    };

    const animate = () => {
      blobX += (mouseX - blobX) * 0.05;
      blobY += (mouseY - blobY) * 0.05;

      blob.style.transform = `translate(${blobX * 0.3}px, ${blobY * 0.3}px)`;

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={blobRef}
      className={`absolute rounded-full blur-3xl opacity-30 animate-blob`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: `radial-gradient(circle, var(--tw-gradient-stops))`,
      }}
    />
  );
}
