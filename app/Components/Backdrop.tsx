'use client';

import { useEffect, useRef } from 'react';

type Mote = {
  x: number;
  y: number;
  z: number;
  radius: number;
  tint: number;
  phase: number;
  drift: number;
  band: number;
  offsetX: number;
  offsetY: number;
  velocityX: number;
  velocityY: number;
};

type GlassRect = {
  left: number;
  top: number;
  right: number;
  bottom: number;
  radius: number;
};

type MoteDraw = {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  normalSprite: HTMLCanvasElement;
  glassSprite: HTMLCanvasElement;
};

const NEAR_PLANE = 72;
const MAX_WORLD_DEPTH = 1_200_000;
const OPTICAL_DEPTH = 3600;
const FOCAL_LENGTH = 680;
const POINTER_REACH = 630;
const CAMERA_SPEED = 1.45;
const TAU = Math.PI * 2;
const SPRITE_SIZE = 128;
const SPRITE_RADIUS = 34;
const BLUR_STEPS = [1, 3, 6, 10, 14, 24] as const;
const GLASS_BLUR_INDEX = BLUR_STEPS.length - 1;
const DEPTH_BANDS = [
  [NEAR_PLANE, 1200],
  [1200, 12_000],
  [12_000, 120_000],
  [120_000, MAX_WORLD_DEPTH],
] as const;

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Deterministic randomness keeps the composition stable between renders.
const seededRandom = (seed: number) => () => {
  let value = (seed += 0x6d2b79f5);
  value = Math.imul(value ^ (value >>> 15), value | 1);
  value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
  return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
};

export default function Backdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const reduceMotion = reducedMotion();
    const random = seededRandom(91472);
    const count = window.innerWidth < 720 ? 56 : 96;
    const motes: Mote[] = Array.from({ length: count }, (_, index) => {
      const band = index % DEPTH_BANDS.length;
      const [near, far] = DEPTH_BANDS[band];
      return {
        x: (random() - 0.5) * 2.35,
        y: (random() - 0.5) * 2.1,
        z: near + random() * (far - near),
        radius: 6 + random() * random() * 30,
        tint: Math.floor(random() * 4),
        phase: random() * TAU,
        drift: 0.35 + random() * 0.8,
        band,
        offsetX: 0,
        offsetY: 0,
        velocityX: 0,
        velocityY: 0,
      };
    }).sort((a, b) => b.band - a.band);
    const colors = [
      [62, 107, 148],
      [104, 151, 196],
      [185, 155, 118],
      [112, 126, 147],
    ];
    const sprites = colors.map((color) => {
      const base = document.createElement('canvas');
      base.width = SPRITE_SIZE;
      base.height = SPRITE_SIZE;
      const baseCtx = base.getContext('2d');
      if (!baseCtx) return [];
      baseCtx.fillStyle = 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',0.5)';
      baseCtx.beginPath();
      baseCtx.arc(SPRITE_SIZE / 2, SPRITE_SIZE / 2, SPRITE_RADIUS, 0, TAU);
      baseCtx.fill();
      baseCtx.lineWidth = 1.5;
      baseCtx.strokeStyle = 'rgba(255,255,255,0.22)';
      baseCtx.stroke();

      return BLUR_STEPS.map((blur) => {
        const sprite = document.createElement('canvas');
        sprite.width = SPRITE_SIZE;
        sprite.height = SPRITE_SIZE;
        const spriteCtx = sprite.getContext('2d');
        if (!spriteCtx) return sprite;
        spriteCtx.filter = 'blur(' + blur + 'px)';
        spriteCtx.drawImage(base, 0, 0);
        return sprite;
      });
    });
    let width = 0;
    let height = 0;
    let raf = 0;
    let lastTime = performance.now();
    let camera = window.scrollY * CAMERA_SPEED;
    let targetCamera = camera;
    let cameraY = window.scrollY;
    let targetCameraY = cameraY;
    let active = true;
    const pointer = {
      x: -1000,
      y: -1000,
      tx: -1000,
      ty: -1000,
      presence: 0,
      target: 0,
      windX: 0,
      windY: 0,
    };
    let glassRects: GlassRect[] = [];
    let glassRefreshRaf = 0;
    let glassTrackingUntil = 0;

    const refreshGlassRects = () => {
      const surfaces = document.querySelectorAll<HTMLElement>(
        '.bg-\\[var\\(--surface\\)\\], .bg-\\[var\\(--surface\\)\\]\\/80, .bg-\\[var\\(--surface\\)\\]\\/95'
      );
      glassRects = Array.from(surfaces)
        .map((surface) => {
          const rect = surface.getBoundingClientRect();
          const radius = Number.parseFloat(getComputedStyle(surface).borderTopLeftRadius) || 0;
          return {
            left: rect.left,
            top: rect.top,
            right: rect.right,
            bottom: rect.bottom,
            radius,
          };
        })
        .filter(
          (rect) =>
            rect.right > 0 &&
            rect.bottom > 0 &&
            rect.left < window.innerWidth &&
            rect.top < window.innerHeight
        );
    };

    const scheduleGlassRefresh = () => {
      if (glassRefreshRaf) return;
      glassRefreshRaf = requestAnimationFrame(() => {
        glassRefreshRaf = 0;
        refreshGlassRects();
      });
    };

    const trackGlassMovement = () => {
      glassTrackingUntil = performance.now() + 900;
      scheduleGlassRefresh();
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      trackGlassMovement();
    };

    const drawMote = (
      x: number,
      y: number,
      radius: number,
      opacity: number,
      sprite: HTMLCanvasElement
    ) => {
      if (radius < 0.45 || opacity < 0.004) return;
      const size = (radius / SPRITE_RADIUS) * SPRITE_SIZE;
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.drawImage(sprite, x - size / 2, y - size / 2, size, size);
      ctx.restore();
    };

    const render = (now: number) => {
      const elapsed = Math.min(32, now - lastTime);
      lastTime = now;
      if (now < glassTrackingUntil) refreshGlassRects();
      const ease = 1 - Math.pow(0.001, elapsed / 1000);
      camera += (targetCamera - camera) * Math.min(1, ease * 3.1);
      cameraY += (targetCameraY - cameraY) * Math.min(1, ease * 3.1);
      const previousPointerX = pointer.x;
      const previousPointerY = pointer.y;
      pointer.x += (pointer.tx - pointer.x) * Math.min(1, ease * 2.2);
      pointer.y += (pointer.ty - pointer.y) * Math.min(1, ease * 2.2);
      pointer.presence += (pointer.target - pointer.presence) * Math.min(1, ease * 4);
      const instantWindX = Math.max(-24, Math.min(24, (pointer.x - previousPointerX) * 1.25));
      const instantWindY = Math.max(-24, Math.min(24, (pointer.y - previousPointerY) * 1.25));
      const windEase = Math.min(1, ease * 2);
      pointer.windX += (instantWindX - pointer.windX) * windEase;
      pointer.windY += (instantWindY - pointer.windY) * windEase;
      ctx.clearRect(0, 0, width, height);

      const worldWidth = Math.max(width, 760);
      const worldHeight = Math.max(height, 620);
      const time = reduceMotion ? 0 : now * 0.00012;
      const windSpeed = Math.hypot(pointer.windX, pointer.windY);
      const drawQueue: MoteDraw[] = [];

      for (const mote of motes) {
        const [bandNear, bandFar] = DEPTH_BANDS[mote.band];
        const bandSpan = bandFar - bandNear;
        const bandPosition = mote.z - camera - bandNear;
        const z = bandNear + (((bandPosition % bandSpan) + bandSpan) % bandSpan);
        const logarithmicDepth = Math.log(z / NEAR_PLANE) / Math.log(MAX_WORLD_DEPTH / NEAR_PLANE);
        const opticalZ = NEAR_PLANE + logarithmicDepth * OPTICAL_DEPTH;
        const scale = FOCAL_LENGTH / opticalZ;
        const depth = 1 - logarithmicDepth;
        const floatAmplitude = (6 + depth * 14) * (0.75 + mote.drift * 0.35);
        const driftX =
          (Math.sin(time * mote.drift + mote.phase) +
            Math.cos(time * mote.drift * 0.43 + mote.phase * 1.7) * 0.32) *
          floatAmplitude;
        const driftY =
          (Math.cos(time * mote.drift * 0.72 + mote.phase) +
            Math.sin(time * mote.drift * 0.37 + mote.phase * 1.3) * 0.28) *
          floatAmplitude;
        let x = width / 2 + mote.x * worldWidth * 0.72 * scale + driftX + mote.offsetX;
        const verticalParallax = 0.015 + Math.pow(Math.min(1.2, scale), 1.35) * 0.58;
        const verticalRange = height + 220;
        let y =
          height / 2 +
          mote.y * worldHeight * 0.68 * scale +
          driftY +
          mote.offsetY -
          cameraY * verticalParallax;
        y = ((((y + 110) % verticalRange) + verticalRange) % verticalRange) - 110;
        const radius = mote.radius * scale * 1.35;

        const dx = x - pointer.x;
        const dy = y - pointer.y;
        const distance = Math.hypot(dx, dy) || 1;
        const breeze = Math.max(0, 1 - distance / POINTER_REACH);
        const influence =
          pointer.presence * breeze * breeze * (3 - 2 * breeze) * Math.min(1, 0.25 + depth);
        const windInfluence = influence * Math.min(1, windSpeed / 12);
        const previousOffsetX = mote.offsetX;
        const previousOffsetY = mote.offsetY;
        if (!reduceMotion && windInfluence > 0.001) {
          const flow = 1.1 + depth * 0.9;
          const curl =
            Math.sin(mote.phase + now * 0.0015) * windSpeed * windInfluence * (0.2 + depth * 0.35);
          const deltaX = pointer.windX * windInfluence * flow - (pointer.windY / windSpeed) * curl;
          const deltaY = pointer.windY * windInfluence * flow + (pointer.windX / windSpeed) * curl;
          const acceleration = Math.min(0.1, elapsed / 170);
          mote.velocityX += deltaX * acceleration;
          mote.velocityY += deltaY * acceleration;
        }

        if (!reduceMotion) {
          const frameScale = elapsed / (1000 / 60);
          const maxVelocity = 1.8 + depth * 1.2;
          const velocity = Math.hypot(mote.velocityX, mote.velocityY);
          if (velocity > maxVelocity) {
            mote.velocityX = (mote.velocityX / velocity) * maxVelocity;
            mote.velocityY = (mote.velocityY / velocity) * maxVelocity;
          }
          mote.offsetX += mote.velocityX * frameScale;
          mote.offsetY += mote.velocityY * frameScale;
          const drag = Math.pow(0.992, frameScale);
          mote.velocityX *= drag;
          mote.velocityY *= drag;
          if (Math.abs(mote.velocityX) < 0.002) mote.velocityX = 0;
          if (Math.abs(mote.velocityY) < 0.002) mote.velocityY = 0;

          const horizontalRange = width + 220;
          mote.offsetX =
            ((((mote.offsetX + horizontalRange / 2) % horizontalRange) + horizontalRange) %
              horizontalRange) -
            horizontalRange / 2;
          mote.offsetY =
            ((((mote.offsetY + verticalRange / 2) % verticalRange) + verticalRange) %
              verticalRange) -
            verticalRange / 2;
          x += mote.offsetX - previousOffsetX;
          y += mote.offsetY - previousOffsetY;
        }

        if (x < -radius * 2 || x > width + radius * 2 || y < -radius * 2 || y > height + radius * 2)
          continue;
        const distanceFade = Math.sin(Math.min(1, depth) * Math.PI);
        const nearBoost = Math.pow(depth, 1.7);
        const opacity =
          (0.025 + distanceFade * 0.19 + nearBoost * 0.08) * (1 + windInfluence * 0.45);
        const renderedRadius = Math.min(92, radius);
        const depthBlurIndex = Math.min(
          GLASS_BLUR_INDEX - 1,
          Math.round(logarithmicDepth * (GLASS_BLUR_INDEX - 1))
        );
        const normalSprite = sprites[mote.tint][depthBlurIndex];
        const glassSprite = sprites[mote.tint][GLASS_BLUR_INDEX];
        if (normalSprite && glassSprite) {
          drawQueue.push({ x, y, radius: renderedRadius, opacity, normalSprite, glassSprite });
        }
      }

      for (const moteDraw of drawQueue) {
        drawMote(moteDraw.x, moteDraw.y, moteDraw.radius, moteDraw.opacity, moteDraw.normalSprite);
      }

      if (glassRects.length > 0) {
        ctx.save();
        ctx.beginPath();
        for (const rect of glassRects) {
          ctx.roundRect(
            rect.left,
            rect.top,
            rect.right - rect.left,
            rect.bottom - rect.top,
            rect.radius
          );
        }
        ctx.clip();
        ctx.clearRect(0, 0, width, height);
        for (const moteDraw of drawQueue) {
          drawMote(moteDraw.x, moteDraw.y, moteDraw.radius, moteDraw.opacity, moteDraw.glassSprite);
        }
        ctx.restore();
      }
      if (active) raf = requestAnimationFrame(render);
    };

    const onScroll = () => {
      const next = window.scrollY * CAMERA_SPEED;
      targetCamera = next;
      targetCameraY = window.scrollY;
      trackGlassMovement();
    };
    const onPointerMove = (event: PointerEvent) => {
      const firstMove = pointer.tx < -900;
      if (firstMove) {
        pointer.x = event.clientX;
        pointer.y = event.clientY;
      }
      pointer.tx = event.clientX;
      pointer.ty = event.clientY;
      pointer.target = event.pointerType === 'touch' ? 0.35 : 1;
    };
    const onPointerLeave = () => {
      pointer.target = 0;
    };
    const onVisibility = () => {
      if (reduceMotion) return;
      active = !document.hidden;
      if (active) {
        lastTime = performance.now();
        raf = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(raf);
      }
    };

    const glassObserver = new MutationObserver(trackGlassMovement);
    glassObserver.observe(document.body, { childList: true, subtree: true });

    resize();
    if (reduceMotion) {
      render(performance.now());
      active = false;
    } else {
      raf = requestAnimationFrame(render);
    }
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('blur', onPointerLeave);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      active = false;
      cancelAnimationFrame(raf);
      cancelAnimationFrame(glassRefreshRaf);
      glassObserver.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('blur', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);
  return (
    <div className={'site-backdrop'} aria-hidden={true}>
      <div className={'bokeh-ambient'} />
      <canvas ref={canvasRef} className={'bokeh-canvas'} />
    </div>
  );
}
