"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
type CarouselProps = {
  images: string[];
  className?: string;
};
export default function Carousel({ images, className }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  function nextImage() {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }

  function prevImage() {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }

  return (
    <div
      data-testid="carousel"
      className={`flex items-center relative max-w-4xl mx-auto overflow-hidden rounded-lg ${className}`}
    >
      <Image
        data-testid={`carousel-images-${currentIndex}`}
        src={images[currentIndex]}
        alt={`Image ${currentIndex + 1}`}
        width={900}
        height={500}
        className="rounded-lg"
        sizes="(max-width: 640px) 100vw, 
                 (max-width: 768px) 80vw, 
                 (max-width: 1024px) 60vw, 
                 50vw"
      />
      <button
        data-testid="carousel-prev-button"
        onClick={prevImage}
        aria-label="Previous Image"
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white  text-black rounded-full w-10 h-10 flex items-center justify-center"
      >
        ‹
      </button>
      <button
        data-testid="carousel-next-button"
        onClick={nextImage}
        aria-label="Next Image"
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white  text-black rounded-full w-10 h-10 flex items-center justify-center "
      >
        ›
      </button>
    </div>
  );
}
