import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';

export type ImageGalleryProps = {
  title?: string;
};

const images = [
  {
    src: '/screenshots/cryptech-dashboard.png',
    alt: 'Cryptech Dashboard',
    category: 'Cryptech',
  },
  {
    src: '/screenshots/cryptech-homepage.png',
    alt: 'Cryptech Homepage',
    category: 'Cryptech',
  },
  {
    src: '/screenshots/cryptech-style-guides.png',
    alt: 'Cryptech Style Guides',
    category: 'Cryptech',
  },
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function ImageGallery({ title }: ImageGalleryProps) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [imgDims, setImgDims] = useState({ width: 0, height: 0 });
  const [isFullSize, setIsFullSize] = useState(false);
  const [parallax, setParallax] = useState({ tx: 0, ty: 0 });
  const imgContainerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | undefined>(undefined);
  const targetRef = useRef<{ tx: number; ty: number }>({ tx: 0, ty: 0 });
  const [imgVisible, setImgVisible] = useState(false);
  const [showImage, setShowImage] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  // Filter images by title if provided
  const filteredImages = title
    ? images.filter((img) => img.category?.toLowerCase() === title.toLowerCase())
    : images;

  useEffect(() => {
    setMounted(true);
  }, []);

  const openModal = (idx: number) => {
    setCurrent(idx);
    setOpen(true);
    setIsFullSize(false); // Reset to fit-to-window on open
    setImgDims({ width: 0, height: 0 }); // Reset dims on open
    setShowImage(true); // Always show image on modal open
    setModalVisible(false);
  };

  const closeModal = () => {
    setOpen(false);
    setModalVisible(false);
  };

  const nextImage = useCallback(
    (e?: React.MouseEvent | React.KeyboardEvent) => {
      e?.stopPropagation();
      setShowImage(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % filteredImages.length);
        setIsFullSize(false);
        setShowImage(true);
      }, 10);
    },
    [filteredImages.length]
  );

  const prevImage = useCallback(
    (e?: React.MouseEvent | React.KeyboardEvent) => {
      e?.stopPropagation();
      setShowImage(false);
      setTimeout(() => {
        setCurrent((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
        setIsFullSize(false);
        setShowImage(true);
      }, 10);
    },
    [filteredImages.length]
  );

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [nextImage, open, prevImage]);

  // Parallax effect: track mouse movement over the image container
  useEffect(() => {
    if (!open) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (!imgContainerRef.current) return;
      const rect = imgContainerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMouse({ x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) });
    };
    const container = imgContainerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [open]);

  // When current changes, fade in after image loads
  useEffect(() => {
    if (showImage) {
      // Wait for image to load before fading in
      // handled in handleImgLoad
    }
  }, [current, showImage]);

  const handleImgLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    setImgDims({ width: target.naturalWidth, height: target.naturalHeight });
    setImgVisible(true);
  };

  // On modal open, always show image and trigger fade-in
  useEffect(() => {
    if (open) {
      setShowImage(true);
      setImgVisible(false);
    }
  }, [open]);

  // Fade in the modal overlay on open
  useEffect(() => {
    if (open) {
      setTimeout(() => setModalVisible(true), 10);
    } else {
      setModalVisible(false);
    }
  }, [open]);

  // Calculate display size and parallax translation
  let displayW = imgDims.width;
  let displayH = imgDims.height;
  let overflowX = 0;
  let overflowY = 0;
  let canZoom = false;
  if (typeof window !== 'undefined' && open && imgDims.width && imgDims.height) {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    if (!isFullSize) {
      // Fit to window
      const scale = Math.min(vw / imgDims.width, vh / imgDims.height, 1);
      displayW = imgDims.width * scale;
      displayH = imgDims.height * scale;
    }
    overflowX = displayW > vw ? displayW - vw : 0;
    overflowY = displayH > vh ? displayH - vh : 0;
    // Only allow zoom if the image is larger than the window in at least one dimension
    canZoom = imgDims.width > vw || imgDims.height > vh;
  }

  // Smooth parallax animation and clamp so image never overscrolls
  useEffect(() => {
    if (!open) return;
    let running = true;
    function animate() {
      if (!running) return;
      // Target translation
      const tx = overflowX ? -overflowX * (mouse.x - 0.5) * 2 : 0;
      const ty = overflowY ? -overflowY * (mouse.y - 0.5) * 2 : 0;
      // Clamp so image never overscrolls
      const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));
      const minTx = overflowX ? -overflowX / 2 : 0;
      const maxTx = overflowX ? overflowX / 2 : 0;
      const minTy = overflowY ? -overflowY / 2 : 0;
      const maxTy = overflowY ? overflowY / 2 : 0;
      targetRef.current.tx = clamp(tx, minTx, maxTx);
      targetRef.current.ty = clamp(ty, minTy, maxTy);
      setParallax((prev) => {
        const newTx = lerp(prev.tx, targetRef.current.tx, 0.15);
        const newTy = lerp(prev.ty, targetRef.current.ty, 0.15);
        return { tx: newTx, ty: newTy };
      });
      animRef.current = requestAnimationFrame(animate);
    }
    animRef.current = requestAnimationFrame(animate);
    return () => {
      running = false;
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [mouse, open, overflowX, overflowY]);

  // Reset imgDims and visibility when current image changes
  useEffect(() => {
    setImgDims({ width: 0, height: 0 });
    setImgVisible(false);
  }, [current]);

  // Disable scrolling on the parent page while modal is open
  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  // If no images to show, render nothing
  if (!filteredImages.length) return null;

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!canZoom) return;
    setIsFullSize((prev) => !prev);
  };

  const parallaxStyle: React.CSSProperties = {
    transform: `translate(${parallax.tx}px, ${parallax.ty}px)`,
    transition: 'transform 0.1s cubic-bezier(.4,0,.2,1)',
    willChange: 'transform',
    width: displayW,
    height: displayH,
    maxWidth: 'none',
    maxHeight: 'none',
    borderRadius: '0.5rem',
    border: '4px solid white',
    boxShadow: '0 4px 32px rgba(0,0,0,0.5)',
    cursor: canZoom ? (isFullSize ? 'zoom-out' : 'zoom-in') : 'default',
  };

  const modal = (
    <div
      className="fixed inset-0 z-[9999] bg-[rgba(15,23,42,0.9)] flex items-center justify-center transition-all"
      style={{
        opacity: modalVisible ? 1 : 0,
        transition: 'opacity 0.4s cubic-bezier(.4,0,.2,1)',
      }}
      onClick={closeModal}
    >
      <button
        className="absolute top-6 right-8 text-white text-3xl font-bold z-60 cursor-pointer drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
        onClick={(e) => {
          e.stopPropagation();
          closeModal();
        }}
        aria-label="Close"
      >
        &times;
      </button>
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl z-60 px-2 cursor-pointer drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
        onClick={prevImage}
        aria-label="Previous"
      >
        &#8592;
      </button>
      <div
        ref={imgContainerRef}
        className="relative max-h-[100vh] max-w-[100vw] w-auto h-auto flex items-center justify-center overflow-hidden"
        style={{ width: '100vw', height: '100vh' }}
      >
        {showImage && (
          <Image
            key={filteredImages[current].src}
            src={filteredImages[current].src}
            alt={filteredImages[current].alt}
            width={8000}
            height={8000}
            style={{
              ...(imgDims.width > 0 && imgDims.height > 0 ? parallaxStyle : {}),
              opacity: imgVisible ? 1 : 0,
              transition: 'opacity 0.4s cubic-bezier(.4,0,.2,1)',
            }}
            className="rounded shadow-lg border-4 border-white"
            onClick={handleImageClick}
            onLoad={handleImgLoad}
          />
        )}
        {canZoom && (
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-slate-900 bg-opacity-40 px-3 py-1 rounded text-xs pointer-events-none select-none">
            {isFullSize ? 'Click to fit to window' : 'Click to view full size'}
          </span>
        )}
      </div>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl z-60 px-2 cursor-pointer drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
        onClick={nextImage}
        aria-label="Next"
      >
        &#8594;
      </button>
    </div>
  );

  return (
    <div className="my-8 z-200">
      <h3 className="text-lg font-bold mb-4">Project Gallery</h3>
      <div className="flex gap-4 flex-wrap">
        {filteredImages.map((img, idx) => (
          <div
            key={img.src}
            className="w-40 h-28 relative rounded shadow cursor-pointer hover:scale-105 transition overflow-hidden"
            onClick={() => openModal(idx)}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              style={{ objectFit: 'cover' }}
              sizes="160px"
              className="rounded"
              priority={idx === 0}
            />
          </div>
        ))}
      </div>
      {open && mounted && typeof window !== 'undefined' && createPortal(modal, document.body)}
    </div>
  );
}
