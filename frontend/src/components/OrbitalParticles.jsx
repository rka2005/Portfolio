import React, { useRef, useEffect, useCallback } from 'react';
import './OrbitalParticles.css';

// --- Particle Settings ---
const NUM_PARTICLES = 150;
const PARTICLE_SPEED = 0.2; // Slower, more elegant drift
const MOUSE_REPEL_RADIUS = 180; // Slightly larger area of influence
const MOUSE_REPEL_STRENGTH = 0.6; // Gentle push
const LINE_CONNECT_RADIUS = 150; // How close particles must be to connect and draw a line
const MAX_PARTICLE_SIZE = 4.5;

// Premium Gradient Colors (Hex or RGB will work, let's use hex for clarity)
// These colors will blend into a beautiful radial gradient for each particle
const GRADIENT_COLOR_1 = "#00FFBF"; // Your primary highlight
const GRADIENT_COLOR_2 = "#00C4CC"; // A complementary cyan/teal
const GRADIENT_COLOR_3 = "#0099FF"; // A vibrant blue

// Helper to convert hex to rgba
const hexToRgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// Helper function to get random values
const random = (min, max) => Math.random() * (max - min) + min;

export default function ConstellationParticles() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false }); // Add 'active' for better mouse leave handling
  const animationFrameRef = useRef(null);

  // 1. Function to create a radial gradient for a particle
  const createParticleGradient = useCallback((ctx, particle) => {
    const gradient = ctx.createRadialGradient(
      particle.x, particle.y, 0, // Inner circle start
      particle.x, particle.y, particle.size // Outer circle end
    );
    gradient.addColorStop(0, hexToRgba(GRADIENT_COLOR_1, 0.9));
    gradient.addColorStop(0.5, hexToRgba(GRADIENT_COLOR_2, 0.6));
    gradient.addColorStop(1, hexToRgba(GRADIENT_COLOR_3, 0.3));
    return gradient;
  }, []);

  // 2. Initialize Particles
  const initParticles = useCallback((canvas) => {
    const { width, height } = canvas;
    const particleArray = [];
    for (let i = 0; i < NUM_PARTICLES; i++) {
      particleArray.push({
        x: random(0, width),
        y: random(0, height),
        vx: random(-PARTICLE_SPEED, PARTICLE_SPEED),
        vy: random(-PARTICLE_SPEED, PARTICLE_SPEED),
        size: random(2, MAX_PARTICLE_SIZE), // Slightly larger particles
      });
    }
    particlesRef.current = particleArray;
  }, []);

  // 3. The Animation Loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const particles = particlesRef.current;

    // Clear the canvas with solid black (premium feel)
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // --- Update and Draw Particles ---
    for (const p of particles) {
      // --- Physics Calculation ---

      // 1. Repel from mouse only if mouse is active
      if (mouseRef.current.active) {
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_REPEL_RADIUS) {
          const force = MOUSE_REPEL_STRENGTH * (1 - dist / MOUSE_REPEL_RADIUS); // Force tapers off
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }
      }

      // 2. Add velocity
      p.x += p.vx;
      p.y += p.vy;

      // 3. Wall collision (wrap around gracefully)
      if (p.x > canvas.width + p.size) p.x = -p.size;
      if (p.x < -p.size) p.x = canvas.width + p.size;
      if (p.y > canvas.height + p.size) p.y = -p.size;
      if (p.y < -p.size) p.y = canvas.height + p.size;

      // --- Draw the particle with gradient ---
      ctx.fillStyle = createParticleGradient(ctx, p);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }

    // --- Draw Constellation Lines with gradient ---
    ctx.lineWidth = 0.5;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < LINE_CONNECT_RADIUS) {
          // Create a linear gradient for the line between particles
          const lineGradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
          // Faint, transparent versions of your primary highlight color
          lineGradient.addColorStop(0, hexToRgba(GRADIENT_COLOR_1, 0.05));
          lineGradient.addColorStop(0.5, hexToRgba(GRADIENT_COLOR_2, 0.15));
          lineGradient.addColorStop(1, hexToRgba(GRADIENT_COLOR_3, 0.05));
          
          ctx.strokeStyle = lineGradient;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [createParticleGradient, initParticles]); // Dependencies for useCallback

  // 4. Setup and Teardown
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles(canvas);

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };
    const handleMouseLeave = () => {
      // Mouse moves off screen, deactivate interaction, particles drift naturally
      mouseRef.current = { x: -9999, y: -9999, active: false }; 
    };
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas); // Re-init particles on resize to fill new dimensions
      // Recenter mouse if it was active
      if (mouseRef.current.active) {
          mouseRef.current = { x: canvas.width / 2, y: canvas.height / 2, active: true };
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, [animate, initParticles]);

  return <canvas ref={canvasRef} className="constellation-canvas" />;
}