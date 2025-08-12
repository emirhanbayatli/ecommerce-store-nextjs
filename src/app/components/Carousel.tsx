"use client";
import { useState, useEffect } from "react";
type CarouselProps = {
  images: string[];
};
export default function Carousel({ images }: CarouselProps) {
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
    <div className="relative max-w-4xl mx-auto overflow-hidden rounded-lg">
      <img
        src={images[currentIndex]}
        alt={`Image ${currentIndex + 1}`}
        width={900}
        height={500}
        className="w-full h-auto object-cover rounded-lg"
      />

      <button
        onClick={prevImage}
        aria-label="Previous Image"
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black  text-white rounded-full w-10 h-10 flex items-center justify-center "
      >
        ‹
      </button>

      <button
        onClick={nextImage}
        aria-label="Next Image"
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black  text-white rounded-full w-10 h-10 flex items-center justify-center "
      >
        ›
      </button>
    </div>
  );
}
