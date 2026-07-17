/**
 * FILE: components/lib/Carousel.tsx
 * DESCRIPTION: Reusable carousel component with touch support
 */

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CarouselProps {
  items: React.ReactNode[];
  autoRotate?: boolean;
  autoRotateInterval?: number;
  showControls?: boolean;
  showDots?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  items,
  autoRotate = true,
  autoRotateInterval = 5000,
  showControls = true,
  showDots = true,
}) => {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef(0);

  useEffect(() => {
    if (!autoRotate || isHovered) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length);
    }, autoRotateInterval);

    return () => clearInterval(timer);
  }, [autoRotate, autoRotateInterval, isHovered, items.length]);

  const handlePrev = () => setCurrent((prev) => (prev - 1 + items.length) % items.length);
  const handleNext = () => setCurrent((prev) => (prev + 1) % items.length);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchStartX.current - touchEndX > 50) {
      handleNext();
    } else if (touchEndX - touchStartX.current > 50) {
      handlePrev();
    }
  };

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Items */}
      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          {items[current]}
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      {showControls && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg p-2 rounded-full transition-all z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-neutral-900" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg p-2 rounded-full transition-all z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-neutral-900" />
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && (
        <div className="flex justify-center gap-2 mt-4">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === current ? 'bg-[#C9A84C] w-8' : 'bg-neutral-300 hover:bg-neutral-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export { Carousel };

