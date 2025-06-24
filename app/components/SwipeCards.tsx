'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Profile {
  id: number;
  name: string;
  info: string;
  img: string;
}

interface SwipeCarouselProps {
  profiles: Profile[];
}

const SwipeCarousel: React.FC<SwipeCarouselProps> = ({ profiles }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);

  const currentProfile = profiles[currentIndex];
  const nextProfile = profiles[currentIndex + 1];

  const handleSwipe = (swipeDirection: 'left' | 'right') => {
    if (!nextProfile) return;
    setDirection(swipeDirection);
    // Wait a bit before updating the index (matches exit animation)
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setDirection(null);
    }, 300); // Should match duration in exit animation
  };

  return (
    <div className="relative w-full max-w-md mx-auto h-[70vh] flex flex-col">
      {/* Card Container */}
      <div className="relative flex-1">
        {/* Next Profile Preview */}
        {nextProfile && (
          <motion.div
            key={`preview-${nextProfile.id}`}
            className="absolute inset-0 bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-200"
            initial={{ x: 20, y: 20, scale: 0.9, opacity: 0.7 }}
            animate={{ x: 20, y: 20, scale: 0.9, opacity: 0.7 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <Image
              src={nextProfile.img}
              alt={nextProfile.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
            />
          </motion.div>
        )}

        {/* Current Profile Card */}
        <AnimatePresence mode="wait">
          {currentProfile && (
            <motion.div
              key={currentProfile.id}
              className="absolute inset-0 bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-300"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{
                x: direction === 'left' ? -500 : 500,
                opacity: 0,
                rotate: direction === 'left' ? -15 : 15
              }}
              transition={{
                type: 'spring',
                damping: 30,
                stiffness: 300,
                duration: 0.3
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={currentProfile.img}
                  alt={currentProfile.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                  priority
                />
              </div>

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 text-white">
                <div className="flex justify-between items-end">
                  <div>
                    <h2 className="text-2xl font-bold">{currentProfile.name}</h2>
                    <p className="text-gray-300 mt-1">{currentProfile.info}</p>
                  </div>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                    Next info
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-8 mt-8">
        <button
          onClick={() => handleSwipe('left')}
          disabled={!nextProfile}
          className="w-16 h-16 rounded-full bg-white border-2 border-gray-300 shadow-lg flex items-center justify-center disabled:opacity-50 transition-all hover:scale-105 active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <button
          onClick={() => handleSwipe('right')}
          disabled={!nextProfile}
          className="w-16 h-16 rounded-full bg-white border-2 border-red-300 shadow-lg flex items-center justify-center disabled:opacity-50 transition-all hover:scale-105 active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SwipeCarousel;
