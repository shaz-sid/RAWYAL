import { useEffect, useRef } from 'react';

/**
 * Enhanced 2D canvas starfield — multi-depth gold & ivory twinkling stars
 * featuring slow drift, radial star glow, and subtle ambient parallax.
 */
export default function StarfieldBackground({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let width, height;
    let animId;
    let isVisible = true;

    const STAR_COUNT = 650;

    class Star {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Varied sizes: micro stardust (0.3 - 1.2px), 15% larger glowing stars (1.6 - 2.8px)
        const isBright = Math.random() > 0.85;
        this.size = isBright ? Math.random() * 1.4 + 1.5 : Math.random() * 0.9 + 0.3;
        this.isBright = isBright;

        this.opacity = Math.random() * 0.7 + 0.2;
        this.twinkleSpeed = Math.random() * 0.0035 + 0.0015;
        this.phase = Math.random() * Math.PI * 2;
        this.driftX = (Math.random() - 0.5) * 0.05;
        this.driftY = (Math.random() - 0.5) * 0.035;

        // Color palette: Champagne gold (#D8B979), Light gold (#F5DFAD), Ivory white (#F8F5F0)
        const colorType = Math.random();
        if (colorType > 0.5) {
          // Champagne Gold
          this.r = 216;
          this.g = 185;
          this.b = 121;
        } else if (colorType > 0.25) {
          // Warm Light Gold
          this.r = 245;
          this.g = 223;
          this.b = 173;
        } else {
          // Ivory White
          this.r = 248;
          this.g = 245;
          this.b = 240;
        }
      }

      update(time) {
        this.x += this.driftX;
        this.y += this.driftY;

        if (this.x < -5) this.x = width + 5;
        if (this.x > width + 5) this.x = -5;
        if (this.y < -5) this.y = height + 5;
        if (this.y > height + 5) this.y = -5;

        this.currentOpacity = this.opacity * (0.45 + 0.55 * Math.sin(time * this.twinkleSpeed * 1000 + this.phase));
      }

      draw(ctx) {
        if (this.currentOpacity < 0.02) return;
        ctx.globalAlpha = this.currentOpacity;

        // Draw star core
        ctx.fillStyle = `rgb(${this.r|0},${this.g|0},${this.b|0})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Subtle glow halo for larger bright stars
        if (this.isBright) {
          ctx.globalAlpha = this.currentOpacity * 0.25;
          const glow = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3.5);
          glow.addColorStop(0, `rgba(${this.r},${this.g},${this.b},0.6)`);
          glow.addColorStop(1, `rgba(${this.r},${this.g},${this.b},0)`);
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size * 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    let stars = [];

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * DPR;
      canvas.height = height * DPR;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    function init() {
      resize();
      stars = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push(new Star());
      }
    }

    function animate(time) {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;
      const t = time * 0.001;
      ctx.clearRect(0, 0, width, height);
      for (const s of stars) {
        s.update(t);
        s.draw(ctx);
      }
    }

    const onVis = () => { isVisible = !document.hidden; };
    let resizeTimer;
    const onResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(init, 250); };

    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('resize', onResize);

    init();
    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} />;
}
