'use client';

import { useEffect, useRef } from 'react';

const GRID_SPACING = 56;
const SAMPLE_STEP = 6;
const WELL_RADIUS = 360;
const WELL_STRENGTH = 78;
const LINE_COLOR = 'rgba(10, 37, 64, 0.035)';
const LINE_COLOR_HOT = 'rgba(10, 37, 64, 0.16)';

// Beyond this distance the displacement is sub-pixel, so we skip the heavy
// math (and subdivide nothing) without any visible difference.
const WELL_REACH = WELL_RADIUS * 3.2;
const WELL_REACH2 = WELL_REACH * WELL_REACH;
const INV_TWO_R2 = 1 / (2 * WELL_RADIUS * WELL_RADIUS);

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Backdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const meshRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    // Eased pointer + intensity (0 = relaxed/flat, 1 = full gravity well).
    const target = { x: -9999, y: -9999 };
    const cur = { x: -9999, y: -9999 };
    let targetIntensity = 0;
    let intensity = 0;
    let raf = 0;
    let running = false;
    const reduced = prefersReducedMotion();

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    // Scratch outputs for the warp so we avoid allocating an array per point.
    let wx = 0;
    let wy = 0;
    const warpPoint = (px: number, py: number) => {
      const dx = cur.x - px;
      const dy = cur.y - py;
      const dist2 = dx * dx + dy * dy;
      if (dist2 > WELL_REACH2) {
        wx = px;
        wy = py;
        return;
      }
      const dist = Math.sqrt(dist2) || 1;
      const pull = WELL_STRENGTH * Math.exp(-dist2 * INV_TWO_R2) * intensity;
      wx = px + (dx / dist) * pull;
      wy = py + (dy / dist) * pull;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      ctx.strokeStyle = LINE_COLOR;

      const G = GRID_SPACING;
      const active = intensity > 0.001;

      // Vertical lines: only subdivide the ones close enough to feel the well;
      // the rest are perfectly straight, so a 2-point line is identical.
      for (let x = -G; x <= width + G; x += G) {
        ctx.beginPath();
        if (!active || Math.abs(x - cur.x) > WELL_REACH) {
          ctx.moveTo(x, -G);
          ctx.lineTo(x, height + G);
        } else {
          for (let y = -G; y <= height + G; y += SAMPLE_STEP) {
            warpPoint(x, y);
            if (y === -G) ctx.moveTo(wx, wy);
            else ctx.lineTo(wx, wy);
          }
        }
        ctx.stroke();
      }
      // Horizontal lines.
      for (let y = -G; y <= height + G; y += G) {
        ctx.beginPath();
        if (!active || Math.abs(y - cur.y) > WELL_REACH) {
          ctx.moveTo(-G, y);
          ctx.lineTo(width + G, y);
        } else {
          for (let x = -G; x <= width + G; x += SAMPLE_STEP) {
            warpPoint(x, y);
            if (x === -G) ctx.moveTo(wx, wy);
            else ctx.lineTo(wx, wy);
          }
        }
        ctx.stroke();
      }

      // Brighten the cells caught in the well for extra depth.
      if (intensity > 0.02) {
        const glow = ctx.createRadialGradient(cur.x, cur.y, 0, cur.x, cur.y, WELL_RADIUS * 1.1);
        glow.addColorStop(0, LINE_COLOR_HOT);
        glow.addColorStop(1, 'rgba(10, 37, 64, 0)');
        ctx.save();
        ctx.globalAlpha = intensity;
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(cur.x, cur.y, WELL_RADIUS * 1.1, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    };

    const tick = () => {
      // Ease pointer + intensity toward targets.
      cur.x += (target.x - cur.x) * 0.16;
      cur.y += (target.y - cur.y) * 0.16;
      intensity += (targetIntensity - intensity) * 0.08;

      // Gravity drift for the gradient blobs.
      if (meshRef.current) {
        const ox = (cur.x - width / 2) * 0.05 * intensity;
        const oy = (cur.y - height / 2) * 0.05 * intensity;
        meshRef.current.style.transform = `translate3d(${ox}px, ${oy}px, 0)`;
      }

      draw();

      const settled =
        Math.abs(target.x - cur.x) < 0.4 &&
        Math.abs(target.y - cur.y) < 0.4 &&
        Math.abs(targetIntensity - intensity) < 0.004;

      if (settled) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const ensureRunning = () => {
      if (running || reduced) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (cur.x < -9000) {
        cur.x = target.x;
        cur.y = target.y;
      }
      targetIntensity = 1;
      ensureRunning();
    };

    const onLeave = () => {
      targetIntensity = 0;
      ensureRunning();
    };

    resize();
    window.addEventListener('resize', resize);

    if (!reduced) {
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerdown', onMove, { passive: true });
      document.addEventListener('pointerleave', onLeave);
      window.addEventListener('blur', onLeave);
    }

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onMove);
      document.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('blur', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="site-backdrop" aria-hidden="true">
      <canvas ref={canvasRef} className="site-grid-canvas" />
      <div ref={meshRef} className="site-meshes">
        <div className="site-mesh" />
        <div className="site-mesh site-mesh--two" />
        <div className="site-mesh site-mesh--three" />
      </div>
    </div>
  );
}
