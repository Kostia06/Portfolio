"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";

export default function FloatingIcons() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const icons = ['⚡', '🚀', '💻', '🎨', '⭐', '🔥', '💡', '🎯', '✨', '🌟'];
    const particles = [];

    class FloatingIcon {
      constructor(id) {
        this.id = id;
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 50;
        this.targetY = Math.random() * canvas.height * 0.6;
        this.icon = icons[Math.floor(Math.random() * icons.length)];
        this.size = Math.random() * 20 + 20;
        this.opacity = 0;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 2;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = -1 - Math.random() * 2;
        this.maxOpacity = Math.random() * 0.5 + 0.3;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;

        if (this.y > this.targetY && this.opacity < this.maxOpacity) {
          this.opacity += 0.02;
        }

        if (this.y < -50 || this.x < -50 || this.x > canvas.width + 50) {
          this.reset();
        }
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 50;
        this.targetY = Math.random() * canvas.height * 0.6;
        this.opacity = 0;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.font = `${this.size}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.icon, 0, 0);
        ctx.restore();
      }
    }

    // Create particles
    for (let i = 0; i < 20; i++) {
      particles.push(new FloatingIcon(i));
      particles[i].y = Math.random() * canvas.height;
      particles[i].opacity = Math.random() * 0.5 + 0.3;
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-60"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
