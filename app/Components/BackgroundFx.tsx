'use client';

import { useEffect, useRef } from 'react';

const BackgroundFX = () => {
  const grainRef = useRef<HTMLCanvasElement>(null);
  const lineRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const grainCanvas = grainRef.current;
    const lineCanvas = lineRef.current;

    if (!grainCanvas || !lineCanvas) return;

    /* const grainCtx = grainCanvas.getContext("2d")!; */
    const lineCtx = lineCanvas.getContext('2d')!;

    const resize = () => {
      [grainCanvas, lineCanvas].forEach((canvas) => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      });
    };

    let animationFrameId: number;
    let time = 0;

    const drawMovingLines = () => {
      lineCtx.clearRect(0, 0, lineCanvas.width, lineCanvas.height);
      lineCtx.lineWidth = 1;

      const width = lineCanvas.width;
      const height = lineCanvas.height;
      const spacing = 18;

      time += 0.003;

      for (let y = -100; y < height + 100; y += spacing) {
        lineCtx.beginPath();

        const normalizedY = y / height;
        const distFromCenterY = Math.abs(normalizedY - 0.5);
        const opacity = 0.015 + 0.15 * Math.max(0, 1 - distFromCenterY * 2.5);

        for (let x = -50; x <= width + 50; x += 10) {
          const nx = x / width;
          const ny = y / height;

          // Multi-frequency dispersed coordinate warping (Simulating Simplex Noise)
          // Low frequency, high amplitude macro movement
          const warp1 = Math.sin(nx * 2 + time * 0.4) * Math.cos(ny * 3 - time * 0.3) * 0.25;
          // Medium frequency swirling
          const warp2 = Math.sin(nx * 5 - ny * 4 + time * 0.8) * 0.15;
          // High frequency detail ripples
          const warp3 = Math.cos(nx * 12 + ny * 10 - time * 1.5) * 0.05;

          const warpedNx = nx + warp1 + warp2;
          const warpedNy = ny + warp2 + warp3;

          // Main flowing topographic waves across the warped space
          const wave1 = Math.sin(warpedNx * 4.5 - time * 1.2 + warpedNy * 3.0) * 65;
          const wave2 = Math.cos(warpedNx * 8.0 + time * 1.6 - warpedNy * 5.5) * 40;
          const wave3 = Math.sin(warpedNx * 16.0 - time * 2.2 + warpedNy * 8.0) * 15;

          // Additional dispersed vertical distortion
          const verticalWarp = Math.sin(nx * 8 - time) * Math.cos(ny * 6 + time * 1.5) * 20;

          const combinedWave = wave1 + wave2 + wave3 + verticalWarp;

          if (x === -50) {
            lineCtx.moveTo(x, y + combinedWave);
          } else {
            lineCtx.lineTo(x, y + combinedWave);
          }
        }

        lineCtx.strokeStyle = `rgba(153, 172, 199, ${Math.max(0.01, opacity)})`;
        lineCtx.stroke();
      }
    };

    /* const drawGrain = () => {
      const imageData = grainCtx.createImageData(
        grainCanvas.width,
        grainCanvas.height
      );
      for (let i = 0; i < imageData.data.length; i += 4) {
        const value = Math.random() * 60;
        imageData.data[i] = value;
        imageData.data[i + 1] = value;
        imageData.data[i + 2] = value;
        imageData.data[i + 3] = Math.random() * 25;
      }
      grainCtx.putImageData(imageData, 0, 0);
    }; */

    const animate = () => {
      drawMovingLines();
      /* drawGrain(); */
      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        /* backgroundColor: '#101724', */
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* Film Grain */}
      <canvas ref={grainRef} style={canvasStyle} />

      {/* Moving Canvas Lines */}
      <canvas ref={lineRef} style={canvasStyle} />

      {/* Diagonal CSS Lines */}
      <div style={overlayStyle} />
    </div>
  );
};

const canvasStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: '-50%',
  width: '200%',
  height: '100%',
};

const overlayStyle: React.CSSProperties = {
  width: '200%',
  height: '200%',
  animation: 'moveLines 30s linear infinite',
  position: 'absolute',
  top: 0,
  left: 0,
};

export default BackgroundFX;
