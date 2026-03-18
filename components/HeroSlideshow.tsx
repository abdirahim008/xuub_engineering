"use client";

import { useState, useEffect } from "react";

const heroImages = [
  "/images/hero/hero_1.png",
  // Add more image paths here as you upload them to public/images/hero/
  // Example: "/images/hero/hero_2.png",
];

export default function HeroSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (heroImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 8000); // 8 seconds per slide

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-bg-container">
      {heroImages.map((image, index) => (
        <div
          key={image}
          className="hero-slide"
          data-active={index === currentIndex}
          style={{ backgroundImage: `url('${image}')` }}
        />
      ))}
      <div className="hero-bg-overlay" />
    </div>
  );
}
