import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";

export const ImagesSlider = ({
  images,
  children,
  overlay = true,
  overlayClassName,
  className,
  autoplay = true,
}: {
  images: string[];
  children: React.ReactNode;
  overlay?: React.ReactNode;
  overlayClassName?: string;
  className?: string;
  autoplay?: boolean;
  direction?: "up" | "down";
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);

  useEffect(() => {
    let isMounted = true;

    Promise.all(
      images.map((image) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = image;
          img.onload = () => resolve(image);
          img.onerror = () => resolve(image);
        });
      })
    ).then(() => {
      if (isMounted) {
        setLoadedImages(images);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [images]);

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1 === images.length ? 0 : prev + 1));
    }, 6000);

    return () => clearInterval(interval);
  }, [autoplay, images.length]);

  const slideVariants = {
    initial: {
      scale: 1.05,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: 'easeInOut' as const,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 1.2,
      },
    },
  };

  return (
    <div
      className={cn(
        "overflow-hidden h-full w-full relative flex justify-center items-center",
        className
      )}
    >
      {loadedImages.length > 0 && (
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={loadedImages[currentIndex]}
            initial="initial"
            animate="visible"
            exit="exit"
            variants={slideVariants}
            className="h-full w-full absolute inset-0 object-cover object-center pointer-events-none select-none"
          />
        </AnimatePresence>
      )}

      {overlay && (
        <div
          className={cn(
            "absolute inset-0 bg-[#030303]/85 pointer-events-none z-10",
            overlayClassName
          )}
        />
      )}

      <div className="relative z-20 w-full flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};
