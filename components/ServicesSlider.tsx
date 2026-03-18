"use client";

import { useState, useEffect } from "react";

interface Service {
  title: string;
  desc: string;
  icon: string;
  color?: string;
}

interface ServicesSliderProps {
  services: Service[];
}

export default function ServicesSlider({ services }: ServicesSliderProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const CARD_WIDTH = 320;
  const GAP = 20;
  const STEP = CARD_WIDTH + GAP;

  // Split services into two rows
  const midPoint = Math.ceil(services.length / 2);
  const row1 = services.slice(0, midPoint);
  const row2 = services.slice(midPoint);

  // Buffer for seamless looping
  const displayRow1 = [...row1, ...row1, ...row1];
  const displayRow2 = [...row2, ...row2, ...row2];

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setIndex((prev) => {
        const next = prev + 1;
        // Reset to middle set for infinite feel if needed, 
        // but for stepped, simpler to just wrap around services count
        if (next >= row1.length) {
          return 0;
        }
        return next;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, row1.length]);

  return (
    <div 
      className="flex flex-col gap-8 py-10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Row 1: Stepped Slide */}
      <div className="services-slider-container">
        <div 
          className="services-track"
          style={{ 
            animation: 'none', 
            transform: `translateX(-${index * STEP}px)`,
            transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {displayRow1.map((s, i) => (
            <div key={i} className="service-card-dark">
              <div style={{ fontSize: 28, marginBottom: 14 }} aria-hidden="true">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Stepped Slide (Moving opposite index or same) */}
      {/* User didn't specify opposite for stepped, usually they move together for clarity */}
      <div className="services-slider-container">
        <div 
          className="services-track"
          style={{ 
            animation: 'none', 
            transform: `translateX(-${index * STEP}px)`,
            transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {displayRow2.map((s, i) => (
            <div key={i} className="service-card-dark">
              <div style={{ fontSize: 28, marginBottom: 14 }} aria-hidden="true">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
