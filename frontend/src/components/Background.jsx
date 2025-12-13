import React, { useRef, useEffect } from 'react';
import './Background.css';

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particlesArray = [];

    // --- Configuration ---
    // Premium Neon Palette: These pop against the dark violet background
    const colors = [
      '#00f2ff', // Neon Cyan
      '#bd00ff', // Electric Violet
      '#ff0099', // Hot Pink
      '#4d4dff'  // Bright Blue
    ];

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const mouse = {
      x: null,
      y: null,
      radius: 150
    };

    window.addEventListener('mousemove', (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
    });

    const handleClick = (event) => {
      // Burst 15 particles on click for a "richer" feel
      for (let i = 0; i < 15; i++) {
        particlesArray.push(new Particle(event.x, event.y, true));
      }
    };
    window.addEventListener('click', handleClick);

    class Particle {
      constructor(x, y, isBurst = false) {
        this.x = x || Math.random() * canvas.width;
        this.y = y || Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1; // Slightly varied sizes
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];

        this.isBurst = isBurst;
        if (isBurst) {
          this.speedX = Math.random() * 2 - 1.5;
          this.speedY = Math.random() * 2 - 1.5;
          this.life = 120; // Lasts longer
          this.size = Math.random() * 5 + 2; // Burst particles are bigger
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = this.color;

        // Always apply a subtle glow for that "Premium" feel
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;

        ctx.fill();
        ctx.shadowBlur = 0; // Reset
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Mouse interaction
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius && !this.isBurst) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const maxDistance = mouse.radius;
          const force = (maxDistance - distance) / maxDistance;
          const directionX = forceDirectionX * force * this.density;
          const directionY = forceDirectionY * force * this.density;

          this.x -= directionX;
          this.y -= directionY;
        }

        // Boundary wrap (Premium feel: particles don't just bounce, they float endlessly)
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;

        if (this.isBurst) {
          this.life--;
          this.size -= 0.05;
          this.x += this.speedX * 0.1; // Burst expands
          this.y += this.speedY * 0.1;
        }
      }
    }

    function connect() {
      let opacityValue = 1;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
            ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

          if (distance < (canvas.width / 7) * (canvas.height / 7)) {
            opacityValue = 1 - (distance / 20000);
            // Use a vibrant violet/blue for connections to match the background depth
            ctx.strokeStyle = `rgba(138, 43, 226, ${opacityValue * 0.4})`; // Semi-transparent Violet
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function init() {
      particlesArray = [];
      // Adjust density calculation
      const numberOfParticles = (canvas.width * canvas.height) / 10000;
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

        if (particlesArray[i].size <= 0.2) {
          particlesArray.splice(i, 1);
          i--;
        }
      }
      connect();
    }

    init();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', () => { });
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" />;
};

export default ParticleBackground;