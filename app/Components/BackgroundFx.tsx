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
    let offset = 4;

    const drawMovingLines = () => {
      lineCtx.clearRect(0, 0, lineCanvas.width, lineCanvas.height);
      lineCtx.lineWidth = 1.2;
      const spacing = 14;
      const amplitude1 = 8;
      const frequency1 = 0.02;
      const amplitude2 = 3;
      const frequency2 = 0.06;
      offset += 0.02;

      for (let y = 0; y < lineCanvas.height; y += spacing) {
        lineCtx.beginPath();
        for (let x = 0; x <= lineCanvas.width; x++) {
          const wave1 =
            Math.sin(x * frequency1 + offset + y * 0.05) *
            (amplitude1 + Math.sin(y * 0.02 + offset * 4) * 3);

          const wave2 =
            Math.sin(x * frequency2 - offset * 1.2 + y * 0.1) *
            (amplitude2 + Math.cos(x * 0.015 + offset * 2) * 2);

          const combinedWave = wave1 + wave2;

          lineCtx.lineTo(x, y + combinedWave);
        }
        lineCtx.strokeStyle = `rgba(245, 245, 255, 0.05)`;
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
