"use client";

import { useEffect } from "react";
import { animate, createTimeline } from "animejs";

export default function AnimeScrollAnimations() {
  useEffect(() => {
    // Intersection Observer for scroll-triggered animations
    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    };

    const animateOnScroll = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;

          // Explosive entrance for cards with 3D rotation
          if (target.classList.contains("anime-explosive")) {
            const timeline = createTimeline();

            timeline.add(animate(target, {
              scale: [0, 1.2],
              rotate: [180, 0],
              opacity: [0, 1],
              duration: 600,
              ease: "out(3)",
            }));

            timeline.add(animate(target, {
              scale: [1.2, 1],
              duration: 300,
              ease: "inOut(2)",
            }), 600);
          }

          // Glitch text effect
          if (target.classList.contains("anime-glitch")) {
            const chars = target.textContent.split('');
            target.innerHTML = chars.map(char => `<span style="display:inline-block">${char === ' ' ? '&nbsp;' : char}</span>`).join('');
            const charElements = target.querySelectorAll('span');

            charElements.forEach((char, index) => {
              animate(char, {
                translateX: [Math.random() * 100 - 50, 0],
                translateY: [Math.random() * 100 - 50, 0],
                opacity: [0, 1],
                rotate: [Math.random() * 360, 0],
                duration: 800,
                delay: index * 30,
                ease: "out(3)",
              });
            });
          }

          // Wave reveal effect
          if (target.classList.contains("anime-wave")) {
            animate(target, {
              translateY: [100, 0],
              opacity: [0, 1],
              scaleY: [0.5, 1],
              duration: 1000,
              ease: "out(4)",
            });
          }

          // 3D flip card effect
          if (target.classList.contains("anime-flip")) {
            animate(target, {
              rotateY: [90, 0],
              opacity: [0, 1],
              duration: 800,
              ease: "out(3)",
            });
          }

          // Bouncy scale entrance
          if (target.classList.contains("anime-bounce-in")) {
            const timeline = createTimeline();

            timeline.add(animate(target, {
              scale: [0, 1.3],
              opacity: [0, 1],
              duration: 400,
              ease: "out(2)",
            }));

            timeline.add(animate(target, {
              scale: [1.3, 0.9],
              duration: 200,
              ease: "inOut(2)",
            }), 400);

            timeline.add(animate(target, {
              scale: [0.9, 1.05],
              duration: 200,
              ease: "inOut(2)",
            }), 600);

            timeline.add(animate(target, {
              scale: [1.05, 1],
              duration: 200,
              ease: "inOut(2)",
            }), 800);
          }

          // Stagger children with explosive effect
          if (target.classList.contains("anime-stagger-parent")) {
            const children = target.querySelectorAll(".anime-stagger-child");
            children.forEach((child, index) => {
              const timeline = createTimeline();

              timeline.add(animate(child, {
                scale: [0, 1.15],
                translateY: [60, -10],
                opacity: [0, 1],
                rotate: [Math.random() * 20 - 10, 0],
                duration: 500,
                delay: index * 80,
                ease: "out(3)",
              }));

              timeline.add(animate(child, {
                scale: [1.15, 1],
                translateY: [-10, 0],
                duration: 300,
                ease: "inOut(2)",
              }), 500 + index * 80);
            });
          }

          observer.unobserve(target);
        }
      });
    };

    const observer = new IntersectionObserver(animateOnScroll, observerOptions);

    // Observe all anime elements
    const animeElements = document.querySelectorAll(
      ".anime-explosive, .anime-glitch, .anime-wave, .anime-flip, .anime-bounce-in, .anime-stagger-parent"
    );

    animeElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Continuous crazy animations for decorative elements
  useEffect(() => {
    // Floating orbs with chaotic movement
    const floatOrbs = document.querySelectorAll(".anime-float-orb");
    floatOrbs.forEach((orb, index) => {
      const timeline = createTimeline({ loop: true });

      timeline.add(animate(orb, {
        translateY: [-30, 30],
        translateX: [-20, 20],
        scale: [1, 1.3, 1],
        rotate: [0, 360],
        duration: 3000 + index * 500,
        ease: "inOut(sine)",
      }));

      timeline.add(animate(orb, {
        translateY: [30, -30],
        translateX: [20, -20],
        scale: [1, 0.8, 1],
        rotate: [360, 720],
        duration: 3000 + index * 500,
        ease: "inOut(sine)",
      }), 3000 + index * 500);
    });

    // Crazy morphing shapes with color shifts
    const morphElements = document.querySelectorAll(".anime-morph");
    morphElements.forEach((el, index) => {
      const timeline = createTimeline({ loop: true });

      timeline.add(animate(el, {
        borderRadius: [
          "60% 40% 30% 70% / 60% 30% 70% 40%",
          "30% 60% 70% 40% / 50% 60% 30% 60%",
        ],
        rotate: [0, 180],
        scale: [1, 1.2],
        duration: 4000,
        delay: index * 1000,
        ease: "inOut(2)",
      }));

      timeline.add(animate(el, {
        borderRadius: [
          "30% 60% 70% 40% / 50% 60% 30% 60%",
          "40% 60% 60% 40% / 60% 40% 60% 40%",
        ],
        rotate: [180, 360],
        scale: [1.2, 1],
        duration: 4000,
        ease: "inOut(2)",
      }), 4000);
    });

    // Pulsing glow with scale variations
    const pulseElements = document.querySelectorAll(".anime-pulse-glow");
    pulseElements.forEach((el, index) => {
      animate(el, {
        scale: [1, 1.1, 0.95, 1.05, 1],
        opacity: [0.5, 1, 0.7, 0.9, 0.5],
        duration: 2500,
        delay: index * 200,
        ease: "inOut(sine)",
        loop: true,
      });
    });

    // Rotating gradient backgrounds
    const gradientElements = document.querySelectorAll(".anime-rotate-gradient");
    gradientElements.forEach((el) => {
      animate(el, {
        rotate: [0, 360],
        duration: 10000,
        ease: "linear",
        loop: true,
      });
    });
  }, []);

  return null; // This component only handles animations
}
