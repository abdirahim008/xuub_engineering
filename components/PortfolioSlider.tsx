"use client";

import { useState, useEffect, useRef } from "react";

interface Project {
  title: string;
  client: string;
  amount: string;
  location: string;
  year: string;
}

interface PortfolioSliderProps {
  projects: Project[];
}

export default function PortfolioSlider({ projects }: PortfolioSliderProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const CARD_WIDTH = 580;
  const GAP = 20;
  const STEP = CARD_WIDTH + GAP;

  const displayProjects = [...projects, ...projects];

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setIndex((prev) => {
        const next = prev + 1;
        if (next >= projects.length) {
          return 0;
        }
        return next;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, projects.length]);

  return (
    <div 
      className="portfolio-slider-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div 
        className="portfolio-track"
        style={{ transform: `translateX(-${index * STEP}px)` }}
      >
        {displayProjects.map((project, i) => (
          <div key={i} className="project-card">
            <div className="project-card-header">
              <h3 className="project-card-title">{project.title}</h3>
            </div>
            <div className="project-card-details">
              <div className="project-detail-item">
                <span className="project-detail-label">Client</span>
                <span className="project-detail-value">{project.client}</span>
              </div>
              <div className="project-detail-item">
                <span className="project-detail-label">Location</span>
                <span className="project-detail-value">{project.location}</span>
              </div>
              <div className="project-detail-item">
                <span className="project-detail-label">Contract Amount</span>
                <span className="project-detail-value">{project.amount}</span>
              </div>
            </div>
            <div className="project-year">{project.year}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
