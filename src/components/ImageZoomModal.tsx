"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface ImageZoomModalProps {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}

const MIN_SCALE = 1;
const MAX_SCALE = 5;
const ZOOM_STEP = 0.3;

export default function ImageZoomModal({ src, alt, isOpen, onClose }: ImageZoomModalProps) {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const lastOffset = useRef({ x: 0, y: 0 });
  const lastTouchDist = useRef<number | null>(null);
  const lastTouchMid = useRef<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset state whenever modal opens with a new src
  useEffect(() => {
    if (isOpen) {
      setScale(1);
      setOffset({ x: 0, y: 0 });
      lastOffset.current = { x: 0, y: 0 };
    }
  }, [isOpen, src]);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  const clampOffset = useCallback(
    (newOffset: { x: number; y: number }, currentScale: number) => {
      const container = containerRef.current;
      if (!container) return newOffset;
      const { width, height } = container.getBoundingClientRect();
      const maxX = ((currentScale - 1) * width) / 2;
      const maxY = ((currentScale - 1) * height) / 2;
      return {
        x: Math.max(-maxX, Math.min(maxX, newOffset.x)),
        y: Math.max(-maxY, Math.min(maxY, newOffset.y)),
      };
    },
    []
  );

  // --- Wheel (desktop scroll zoom) ---
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP;
      setScale((prev) => {
        const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, prev + delta));
        if (next === MIN_SCALE) {
          setOffset({ x: 0, y: 0 });
          lastOffset.current = { x: 0, y: 0 };
        } else {
          setOffset((o) => {
            const clamped = clampOffset(o, next);
            lastOffset.current = clamped;
            return clamped;
          });
        }
        return next;
      });
    },
    [clampOffset]
  );

  // --- Mouse drag ---
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = { x: e.clientX - lastOffset.current.x, y: e.clientY - lastOffset.current.y };
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !dragStart.current) return;
      const raw = {
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y,
      };
      const clamped = clampOffset(raw, scale);
      lastOffset.current = clamped;
      setOffset(clamped);
    },
    [isDragging, scale, clampOffset]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    dragStart.current = null;
  }, []);

  // --- Touch events (pinch + drag) ---
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dx = e.touches[1].clientX - e.touches[0].clientX;
      const dy = e.touches[1].clientY - e.touches[0].clientY;
      lastTouchDist.current = Math.hypot(dx, dy);
      lastTouchMid.current = {
        x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
        y: (e.touches[0].clientY + e.touches[1].clientY) / 2,
      };
    } else if (e.touches.length === 1) {
      dragStart.current = {
        x: e.touches[0].clientX - lastOffset.current.x,
        y: e.touches[0].clientY - lastOffset.current.y,
      };
    }
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      if (e.touches.length === 2 && lastTouchDist.current !== null) {
        // Pinch zoom
        const dx = e.touches[1].clientX - e.touches[0].clientX;
        const dy = e.touches[1].clientY - e.touches[0].clientY;
        const dist = Math.hypot(dx, dy);
        const ratio = dist / lastTouchDist.current;
        lastTouchDist.current = dist;

        setScale((prev) => {
          const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, prev * ratio));
          if (next === MIN_SCALE) {
            setOffset({ x: 0, y: 0 });
            lastOffset.current = { x: 0, y: 0 };
          } else {
            setOffset((o) => {
              const clamped = clampOffset(o, next);
              lastOffset.current = clamped;
              return clamped;
            });
          }
          return next;
        });
      } else if (e.touches.length === 1 && dragStart.current) {
        // Single-finger pan
        const raw = {
          x: e.touches[0].clientX - dragStart.current.x,
          y: e.touches[0].clientY - dragStart.current.y,
        };
        const clamped = clampOffset(raw, scale);
        lastOffset.current = clamped;
        setOffset(clamped);
      }
    },
    [scale, clampOffset]
  );

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (e.touches.length < 2) {
      lastTouchDist.current = null;
      lastTouchMid.current = null;
    }
    if (e.touches.length === 0) {
      dragStart.current = null;
    }
  }, []);

  const zoomIn = () =>
    setScale((prev) => {
      const next = Math.min(MAX_SCALE, prev + ZOOM_STEP);
      setOffset((o) => {
        const clamped = clampOffset(o, next);
        lastOffset.current = clamped;
        return clamped;
      });
      return next;
    });

  const zoomOut = () =>
    setScale((prev) => {
      const next = Math.max(MIN_SCALE, prev - ZOOM_STEP);
      if (next === MIN_SCALE) {
        setOffset({ x: 0, y: 0 });
        lastOffset.current = { x: 0, y: 0 };
      } else {
        setOffset((o) => {
          const clamped = clampOffset(o, next);
          lastOffset.current = clamped;
          return clamped;
        });
      }
      return next;
    });

  const reset = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
    lastOffset.current = { x: 0, y: 0 };
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col"
      style={{ backgroundColor: "rgba(0,0,0,0.92)" }}
      aria-modal="true"
      role="dialog"
      aria-label={`Zoom view of ${alt}`}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 shrink-0">
        <p className="text-white/70 text-xs font-semibold uppercase tracking-widest truncate max-w-[60%]">
          {alt}
        </p>
        <div className="flex items-center gap-2">
          {/* Zoom percentage */}
          <span className="text-white/50 text-xs font-mono tabular-nums">
            {Math.round(scale * 100)}%
          </span>
          {/* Zoom Out */}
          <button
            onClick={zoomOut}
            disabled={scale <= MIN_SCALE}
            title="Zoom out"
            className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ZoomOut className="w-4 h-4 text-white" />
          </button>
          {/* Zoom In */}
          <button
            onClick={zoomIn}
            disabled={scale >= MAX_SCALE}
            title="Zoom in"
            className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ZoomIn className="w-4 h-4 text-white" />
          </button>
          {/* Reset */}
          <button
            onClick={reset}
            disabled={scale === 1}
            title="Reset zoom"
            className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <RotateCcw className="w-4 h-4 text-white" />
          </button>
          {/* Close */}
          <button
            onClick={onClose}
            title="Close"
            className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-red-600/80 transition-colors ml-1"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Image canvas */}
      <div
        ref={containerRef}
        className="flex-1 overflow-hidden relative select-none"
        style={{ cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in" }}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        // Backdrop click closes only when not dragging and scale is 1
        onClick={(e) => {
          if (e.target === e.currentTarget && scale === 1) onClose();
        }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
            transformOrigin: "center center",
            transition: isDragging ? "none" : "transform 0.15s ease-out",
            willChange: "transform",
          }}
        >
          <div className="relative w-full h-full max-w-4xl max-h-full mx-auto">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain pointer-events-none"
              sizes="100vw"
              priority
              draggable={false}
            />
          </div>
        </div>
      </div>

      {/* Bottom hint */}
      <div className="shrink-0 pb-4 pt-2 text-center">
        <p className="text-white/30 text-[10px] uppercase tracking-widest">
          <span className="hidden sm:inline">Scroll to zoom • Drag to pan • </span>
          <span className="sm:hidden">Pinch to zoom • Drag to pan • </span>
          Press Esc to close
        </p>
      </div>
    </div>
  );
}
