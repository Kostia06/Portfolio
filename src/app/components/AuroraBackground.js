"use client";

import { useEffect, useRef } from "react";

export default function AuroraBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class AuroraWave {
      constructor(index) {
        this.index = index;
        this.offset = Math.random() * Math.PI * 2;
        this.speed = 0.0005 + Math.random() * 0.001;
        this.amplitude = 50 + Math.random() * 100;
        this.wavelength = 0.003 + Math.random() * 0.002;
        this.color = [
          [99, 102, 241],    // indigo
          [139, 92, 246],    // purple
          [236, 72, 153],    // pink
          [59, 130, 246],    // blue
          [168, 85, 247],    // violet
        ][index % 5];
        this.opacity = 0.15 + Math.random() * 0.15;
      }

      update(time) {
        this.offset += this.speed;
      }

      draw(time) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);

        for (let x = 0; x < canvas.width; x += 5) {
          const y =
            canvas.height / 2 +
            Math.sin(x * this.wavelength + this.offset + time * 0.001) * this.amplitude +
            Math.sin(x * this.wavelength * 2 + this.offset * 2 + time * 0.002) * (this.amplitude / 2);

          ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();

        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, 0)`);
        gradient.addColorStop(0.5, `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.opacity})`);
        gradient.addColorStop(1, `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, 0)`);

        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    const waves = Array.from({ length: 8 }, (_, i) => new AuroraWave(i));

    let animationId;
    let time = 0;

    function animate() {
      time++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      waves.forEach((wave) => {
        wave.update(time);
        wave.draw(time);
      });

      animationId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: "screen", opacity: 0.6 }}
    />
  );
}
