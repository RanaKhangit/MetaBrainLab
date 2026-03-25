"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export function HeroAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let particles: Particle[] = [];
    const PARTICLE_COUNT = 80;
    const CONNECTION_DISTANCE = 150;
    const SPEED = 0.3;
    const MOUSE_RADIUS = 200;
    const REPULSION_STRENGTH = 2.5;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * canvas!.width,
          y: Math.random() * canvas!.height,
          vx: (Math.random() - 0.5) * SPEED,
          vy: (Math.random() - 0.5) * SPEED,
        });
      }
    }

    function animate() {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update & draw particles
      for (const p of particles) {
        // Base movement
        p.x += p.vx;
        p.y += p.vy;

        // Mouse interaction (Repulsion)
        if (mouseRef.current.active) {
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MOUSE_RADIUS) {
            const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
            const angle = Math.atan2(dy, dx);
            const moveX = Math.cos(angle) * force * REPULSION_STRENGTH;
            const moveY = Math.sin(angle) * force * REPULSION_STRENGTH;

            p.x += moveX;
            p.y += moveY;
          }
        }

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(45, 212, 191, 0.4)";
        ctx.fill();
      }

      // Draw connections (skip on narrow screens for performance)
      if (canvas.width > 640) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < CONNECTION_DISTANCE) {
              const opacity = 0.15 * (1 - dist / CONNECTION_DISTANCE);
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `rgba(45, 212, 191, ${opacity})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    resize();
    initParticles();
    animate();

    window.addEventListener("resize", () => {
      resize();
      initParticles();
    });
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        aria-hidden="true"
      />
      {/* CSS fallback for reduced motion */}
      <div
        className="absolute inset-0 z-0 motion-reduce:block hidden"
        style={{
          background: `
            radial-gradient(ellipse at 20% 30%, rgba(45, 212, 191, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(6, 182, 212, 0.06) 0%, transparent 50%)
          `,
        }}
        aria-hidden="true"
      />
    </>
  );
}
