"use client";

import { useState, useEffect } from "react";

const sections = [
  "home",
  "portfolio",
  "about",
  "sectors",
  "services",
  "methodology",
  "team",
  "contact",
];

const labels: Record<string, string> = {
  home: "Home",
  portfolio: "Portfolio",
  about: "About",
  sectors: "Sectors",
  services: "Services",
  methodology: "Approach",
  team: "Team",
  contact: "Contact",
};

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offsets = sections
        .map((id) => {
          const el = document.getElementById(id);
          return el ? { id, top: el.offsetTop - 120 } : null;
        })
        .filter(Boolean) as { id: string; top: number }[];
      const current = [...offsets].reverse().find((s) => window.scrollY >= s.top);
      if (current) setActiveSection(current.id);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      className="nav-glass"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: "0 clamp(16px, 4vw, 60px)",
      }}
      aria-label="Main navigation"
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 90,
        }}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo("home")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            cursor: "pointer",
            background: "none",
            border: "none",
            padding: 0,
          }}
          aria-label="Back to top"
        >
          <img 
            src="/images/xuub_engineering_logo.png" 
            alt="XUUB Engineering Logo" 
            style={{ height: 80, width: "auto", objectFit: "contain" }} 
          />
        </button>

        {/* Desktop Nav */}
        <div
          className="desktop-nav"
          style={{ display: "flex", gap: 2, alignItems: "center" }}
        >
          {sections.map((s) => (
            <button
              key={s}
              className="nav-link"
              data-active={activeSection === s}
              onClick={() => scrollTo(s)}
            >
              {labels[s]}
            </button>
          ))}
        </div>

        {/* Flags + Mobile Toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            className="desktop-nav"
            style={{ display: "flex", gap: 6, alignItems: "center" }}
          >
            <span style={{ fontSize: 16 }} aria-label="Somalia">🇸🇴</span>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>|</span>
            <span style={{ fontSize: 16 }} aria-label="Kenya">🇰🇪</span>
          </div>
          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            style={{
              display: "none",
              background: "none",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "white",
              fontSize: 18,
              cursor: "pointer",
              borderRadius: 8,
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            padding: "12px 0 20px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            flexDirection: "column" as const,
            gap: 4,
          }}
        >
          {sections.map((s) => (
            <button
              key={s}
              className="nav-link"
              onClick={() => scrollTo(s)}
              style={{ padding: "12px 16px", textAlign: "left" as const }}
            >
              {labels[s]}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
