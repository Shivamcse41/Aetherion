import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function BackgroundAnimation() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle settings: Hacker code tags with glowing neon links
    const symbolList = [
      '01', '10', 'system.init()', 'd_crypt()', 'auth_token', 
      'SDE.v2', 'ATH-SEC', 'ptr->val', '[]', '{}', '</>', '=>'
    ];
    const particleCount = 45;
    const particles = [];

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 6 + 9; // Size range
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.symbol = symbolList[Math.floor(Math.random() * symbolList.length)];
        this.opacity = Math.random() * 0.4 + 0.15;
        this.isPink = Math.random() > 0.6;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce screen margins
        if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
        if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;
      }

      draw() {
        ctx.font = `bold ${this.size}px monospace`;
        ctx.shadowBlur = 10;
        
        if (theme === 'dark') {
          const colorStr = this.isPink ? '255, 0, 127' : '0, 240, 255';
          ctx.fillStyle = `rgba(${colorStr}, ${this.opacity})`;
          ctx.shadowColor = `rgba(${colorStr}, 0.5)`;
        } else {
          ctx.fillStyle = this.isPink ? `rgba(168, 85, 247, ${this.opacity})` : `rgba(91, 61, 245, ${this.opacity})`;
          ctx.shadowBlur = 0;
        }

        ctx.fillText(this.symbol, this.x, this.y);
        ctx.shadowBlur = 0; // reset
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const drawConnections = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const distSq = (particles[a].x - particles[b].x) ** 2 + (particles[a].y - particles[b].y) ** 2;
          const maxDistSq = 130 ** 2;
          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / 130) * 0.08;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            
            if (theme === 'dark') {
              ctx.strokeStyle = particles[a].isPink 
                ? `rgba(255, 0, 127, ${alpha})` 
                : `rgba(0, 240, 255, ${alpha})`;
            } else {
              ctx.strokeStyle = `rgba(124, 77, 255, ${alpha})`;
            }
            
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      drawConnections();
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden">
      {/* Cyberpunk grid overlay with active sweep */}
      <div 
        className="absolute inset-0 tech-grid-animated opacity-[0.08] dark:opacity-[0.16]" 
        style={{
          backgroundImage: theme === 'dark'
            ? 'linear-gradient(to right, rgba(168, 85, 247, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(168, 85, 247, 0.15) 1px, transparent 1px)'
            : 'linear-gradient(to right, rgba(91, 61, 245, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(91, 61, 245, 0.08) 1px, transparent 1px)'
        }}
      />

      {/* Futuristic Scan Sweep Laser */}
      <div className="tech-scanner-line" />

      {/* Cyberpunk matrix particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Giant Cyberpunk Mesh Nebula elements (High Vibrancy Color) */}
      <div className="absolute top-[5%] left-[-15%] w-[650px] h-[650px] rounded-full bg-purple-600/20 dark:bg-purple-600/15 filter blur-[150px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-[5%] right-[-15%] w-[750px] h-[750px] rounded-full bg-pink-500/20 dark:bg-pink-500/15 filter blur-[160px] pointer-events-none" />
      <div className="absolute top-[40%] left-[30%] w-[500px] h-[500px] rounded-full bg-cyan-500/15 dark:bg-cyan-500/10 filter blur-[140px] pointer-events-none" />
    </div>
  );
}
