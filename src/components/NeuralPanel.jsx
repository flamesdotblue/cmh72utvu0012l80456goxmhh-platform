import React from 'react';

// Animated canvas panel with flowing nodes and neon links to match a sleek AI vibe
export default function NeuralPanel() {
  const canvasRef = React.useRef(null);
  const animationRef = React.useRef(0);
  const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.clientWidth;
    let height = canvas.clientHeight;

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.scale(dpr, dpr);
    };

    resize();
    const onResize = () => resize();
    window.addEventListener('resize', onResize);

    const nodes = Array.from({ length: 72 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: 1 + Math.random() * 1.3,
    }));

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, 'rgba(168,85,247,0.9)'); // violet-500
    gradient.addColorStop(1, 'rgba(251,191,36,0.9)'); // amber-400

    let t = 0;

    const draw = () => {
      t += 0.003;
      ctx.clearRect(0, 0, width, height);

      // subtle background grid
      ctx.save();
      ctx.globalAlpha = 0.3;
      const step = 32;
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x + (Math.sin(t + x * 0.01) * 2), 0);
        ctx.lineTo(x + (Math.sin(t + x * 0.01) * 2), height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y + (Math.cos(t + y * 0.01) * 2));
        ctx.lineTo(width, y + (Math.cos(t + y * 0.01) * 2));
        ctx.stroke();
      }
      ctx.restore();

      // nodes update
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }

      // connections
      ctx.lineWidth = 1.2;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          const threshold = 110;
          if (dist < threshold) {
            const opacity = 1 - dist / threshold;
            ctx.strokeStyle = `rgba(167,139,250,${opacity * 0.6})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // glow sweep
      const sweepX = (Math.sin(t * 2) * 0.5 + 0.5) * width;
      const sweepGrad = ctx.createRadialGradient(sweepX, height * 0.5, 0, sweepX, height * 0.5, Math.max(width, height) * 0.6);
      sweepGrad.addColorStop(0, 'rgba(139,92,246,0.25)');
      sweepGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = sweepGrad;
      ctx.fillRect(0, 0, width, height);

      // draw nodes
      for (const n of nodes) {
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.shadowColor = 'rgba(139,92,246,0.5)';
        ctx.shadowBlur = 8;
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [dpr]);

  return (
    <div className="relative h-full w-full">
      <canvas ref={canvasRef} className="h-full w-full" />
      <div className="pointer-events-none absolute inset-0 mix-blend-screen">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_80%_-10%,rgba(168,85,247,0.25),transparent),radial-gradient(800px_400px_at_10%_110%,rgba(251,191,36,0.18),transparent)]" />
      </div>
    </div>
  );
}
