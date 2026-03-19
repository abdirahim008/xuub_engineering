import { Metadata } from "next";
import ServicesSlider from "@/components/ServicesSlider";
import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import HeroSlideshow from "@/components/HeroSlideshow";
import PortfolioSlider from "@/components/PortfolioSlider";

import { AnimatedSection, CountUp } from "@/components/animations";

/* ─── Structured Data (JSON-LD) ─── */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "XUUB Engineering Limited",
  alternateName: ["XUUB Engineering", "XUUB Eng Ltd"],
  url: "https://www.xuubengineering.com",
  logo: "https://www.xuubengineering.com/logo.png",
  description:
    "Multi-disciplinary civil engineering consultancy in Somalia and Kenya specialising in road design, water supply, drainage, irrigation, and structural engineering across the Horn of Africa.",
  foundingDate: "2016",
  founders: [
    {
      "@type": "Person",
      name: "Eng. Abdullahi Abdulqadir Mohamud",
      jobTitle: "Design Manager / Team Leader",
    },
  ],
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "Hodan District",
      addressLocality: "Mogadishu",
      addressRegion: "Benadir",
      addressCountry: "SO",
    },
    {
      "@type": "PostalAddress",
      addressLocality: "Kismayo",
      addressRegion: "Jubaland",
      addressCountry: "SO",
    },
    {
      "@type": "PostalAddress",
      addressLocality: "Nairobi",
      addressCountry: "KE",
    },
  ],
  email: "info@xuubengineering.com",
  sameAs: [],
  areaServed: [
    { "@type": "Country", name: "Somalia" },
    { "@type": "Country", name: "Kenya" },
    { "@type": "Country", name: "Ethiopia" },
    { "@type": "Country", name: "Djibouti" },
  ],
  knowsAbout: [
    "Civil Engineering",
    "Road Design",
    "Highway Engineering",
    "Feasibility Studies",
    "Detailed Engineering Design",
    "Water Supply Engineering",
    "Drainage Design",
    "Irrigation Engineering",
    "Structural Engineering",
    "Bridge Design",
    "Geotechnical Investigation",
    "Hydrological Studies",
    "Environmental Impact Assessment",
    "Road Safety Auditing",
    "Quantity Surveying",
    "Construction Supervision",
    "Transport Economics",
    "Project Management",
  ],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Professional Registration",
      recognizedBy: {
        "@type": "Organization",
        name: "Engineers Board of Kenya",
      },
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Professional Registration",
      recognizedBy: {
        "@type": "Organization",
        name: "Institution of Engineers, Somalia",
      },
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Professional Registration",
      recognizedBy: {
        "@type": "Organization",
        name: "Board of Registration of Architects and Quantity Surveyors (BORAQS)",
      },
    },
  ],
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "XUUB Engineering Limited",
  image: "https://www.xuubengineering.com/og-image.jpg",
  url: "https://www.xuubengineering.com",
  telephone: "+252-623320906",
  email: "info@xuubengineering.com",
  description:
    "Leading civil engineering consultancy firm in Somalia providing road design, water supply, structural engineering, drainage, and irrigation consultancy services. Offices in Mogadishu, Kismayo, and Nairobi.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Hodan District",
    addressLocality: "Mogadishu",
    addressRegion: "Benadir",
    postalCode: "",
    addressCountry: "SO",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 2.0469,
    longitude: 45.3182,
  },
  priceRange: "$$",
  openingHours: "Mo-Sa 08:00-17:00",
  serviceArea: [
    { "@type": "Country", name: "Somalia" },
    { "@type": "Country", name: "Kenya" },
    { "@type": "AdministrativeArea", name: "Horn of Africa" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Engineering Consultancy Services",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Roads & Highways",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Road Feasibility Studies" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Detailed Engineering Design" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Road Safety Auditing" } },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Water & Sanitation",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Water Supply Design" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Wastewater Treatment Design" } },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Structural Engineering",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Bridge Design" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Building Structural Design" } },
        ],
      },
    ],
  },
};

const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "XUUB Engineering Limited",
  url: "https://www.xuubengineering.com",
  description:
    "Official website of XUUB Engineering Limited — civil engineering consultancy in Somalia and Kenya.",
  publisher: {
    "@type": "Organization",
    name: "XUUB Engineering Limited",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.xuubengineering.com",
    },
  ],
};

/* ─── Data ─── */
const sectors = [
  { icon: "🛣️", title: "Roads & Highways", desc: "Feasibility studies, preliminary and detailed engineering design of trunk roads, rural roads, and cross-border corridors across diverse terrain and security environments.", color: "#1a6b5a" },
  { icon: "🌊", title: "Water Supply & Sanitation", desc: "Design of water treatment plants, distribution networks, boreholes, elevated storage tanks, and wastewater collection and treatment systems for urban and rural communities.", color: "#2968a8" },
  { icon: "🏗️", title: "Buildings & Structures", desc: "Structural design for commercial, institutional, and residential buildings including foundations, reinforced concrete, and steel frame design with seismic consideration.", color: "#8b5e3c" },
  { icon: "🌾", title: "Irrigation & Agriculture", desc: "Canal design, sprinkler and drip irrigation systems, dam feasibility, flood control structures, and agricultural water management for arid and semi-arid regions.", color: "#6b8e23" },
  { icon: "🏛️", title: "Drainage & Flood Control", desc: "Stormwater management, urban drainage master planning, culvert and bridge hydraulics, flood risk assessment, and climate-resilient drainage infrastructure.", color: "#4a6fa5" },
  { icon: "⚡", title: "Electrical & Energy", desc: "Power distribution design for infrastructure projects, solar energy systems, street lighting design, and electrical services for buildings and public facilities.", color: "#c4792c" },
];

const services = [
  { icon: "📐", title: "Feasibility Studies", desc: "Technical, economic, environmental, and social feasibility assessments with multi-criteria analysis for investment decision-making." },
  { icon: "🛤️", title: "Detailed Engineering Design", desc: "Full geometric, structural, and pavement design with construction drawings, specifications, and Bills of Quantities." },
  { icon: "🔬", title: "Geotechnical Investigation", desc: "Field sampling, lab testing, DCP, CBR testing, subgrade characterisation, and foundation design recommendations." },
  { icon: "🌊", title: "Hydrology & Hydraulic Design", desc: "Catchment analysis, flood modelling, cross-drainage design, scour protection, and climate change impact assessment." },
  { icon: "🛡️", title: "Road Safety Auditing", desc: "Independent safety assessments at all design stages aligned with iRAP methodology and international best practice." },
  { icon: "🌍", title: "Environmental & Social Safeguards", desc: "ESIA, RAP, stakeholder engagement, and safeguard compliance aligned with World Bank ESF and national frameworks." },
  { icon: "📡", title: "Survey & Remote Sensing", desc: "Topographic survey, cadastral mapping, aerial photography, UAV mapping, and satellite-based corridor assessment." },
  { icon: "💰", title: "Quantity Surveying & Cost Advisory", desc: "BOQ preparation, unit rate analysis, value engineering, cost estimation, and construction procurement support." },
  { icon: "🔧", title: "Construction Supervision", desc: "Site inspection, quality assurance, progress monitoring, interim payment certification, and contract administration." },
  { icon: "📊", title: "Transport Economics", desc: "Traffic surveys, demand forecasting, economic evaluation (HDM-4), cost-benefit analysis, and multi-criteria appraisal." },
  { icon: "🏗️", title: "Structural & Bridge Design", desc: "Reinforced concrete and steel bridge design, structural assessment, load rating, and retrofit design for existing structures." },
  { icon: "📋", title: "Project Management", desc: "Programme planning, resource scheduling, risk management, stakeholder coordination, and reporting for multi-lot projects." },
];

const methodSteps = [
  { phase: "01", title: "Inception & Mobilisation", desc: "Stakeholder consultation, baseline data collection, security assessment, team deployment, and inception report preparation.", duration: "Month 1" },
  { phase: "02", title: "Field Investigation", desc: "Topographic survey, geotechnical testing, traffic counts, hydrological assessment, environmental screening, and material sampling.", duration: "Months 1–3" },
  { phase: "03", title: "Preliminary Design", desc: "Route option analysis, geometric design alternatives, preliminary drainage and pavement design, economic evaluation, and option recommendation.", duration: "Months 2–4" },
  { phase: "04", title: "Detailed Design", desc: "Final geometric design, structural details, drainage design, road safety audit, full BOQ, specifications, and tender documentation.", duration: "Months 4–7" },
  { phase: "05", title: "Review & Delivery", desc: "Quality assurance review, client presentations, document submission, response to review comments, and final design package delivery.", duration: "Month 8" },
];

const portfolioProjects = [
  {
    title: "CONSULTANCY SERVICES FOR THE DETAILED ENGINEERING DESIGN OF PRESIDENTIAL PALACE – SEA PORT ROAD",
    client: "Benadir Regional Administration (BRA)",
    location: "Mogadishu, Somalia",
    amount: "$251,673.14",
    year: "2023"
  },
  {
    title: "CONSULTANCY SERVICES FOR THE DETAILED ENGINEERING DESIGN OF 15 MAY – IFKA WARSHADAHA ROAD",
    client: "Benadir Regional Administration (BRA)",
    location: "Mogadishu, Somalia",
    amount: "$206,590.00",
    year: "2024"
  },
  {
    title: "CONSULTANCY SERVICES FOR THE DETAILED ENGINEERING DESIGN OF JAALE SEYAD ROAD",
    client: "Benadir Regional Administration (BRA)",
    location: "Mogadishu, Somalia",
    amount: "$245,283.25",
    year: "2022"
  },
  {
    title: "DETAILED ENGINEERING DESIGN AND BILL OF QUANTITIES FOR REHABILITATION OF KISMAYO AIRPORT RUNWAY",
    client: "KULMIYE GENERAL SERVICES LIMITED",
    location: "Kismayo, Somalia",
    amount: "$281,120.00",
    year: "2021"
  },
  {
    title: "FEASIBILITY STUDY AND DETAILED ENGINEERING DESIGN FOR THE WAJIR TOWNSHIP ROADS (7kM) ",
    client: "County Government of Wajir",
    location: "Wajir, Kenya",
    amount: "$185,000.00",
    year: "2018"
  },
  {
    title: "CONSULTANCY SERVICES FOR PRELIMINARY AND DETAILED DESIGN OF DOHO, KARAMA-2 AND DIBIRO ASPHALT ROADS IN ADADO GALGADUD REGION GALMUDUG STATE SOMALIA",
    client: "Centre for Peace and Democracy (CPD)",
    location: "Adado, Galmudug State, Somalia",
    amount: "$142,500.00",
    year: "2020"
  },
  {
    title: "PROPOSED TOPOGRAPHICAL SURVEYING, MATERIAL INVESTIGATION, AND DETAILED DESIGN OF GOBWEYN -SACMOJA CHECKPOINT 10KM AND 7M WIDE ROAD",
    client: "Alight Somalia",
    location: "Kismayo, Somalia",
    amount: "$142,500.00",
    year: "2020"
  },



];

const teamMembers = [
  { name: "Eng. Abdullahi A. Mohamud", role: "Design Manager / Team Leader", quals: "M.Sc. Structural Eng. (USM Malaysia) · B.Sc. Civil Eng. (UET Pakistan)", exp: "15+ years", flag: "🇸🇴", languages: "Somali · English · Arabic", initials: "AA" },
  { name: "Eng. Butichi R. Khamisi", role: "Materials / Geotechnical Engineer", quals: "B.Sc. Civil Eng. · EBK Registered (E441)", exp: "12+ years", flag: "🇰🇪", languages: "English · Kiswahili", initials: "BK" },
  { name: "Eng. Andrew M. Mungo", role: "Structural / Bridge Engineer", quals: "MBA (JKUAT) · M.Sc. Structural Eng. · EBK A3151", exp: "14+ years", flag: "🇰🇪", languages: "English · Kiswahili", initials: "AM" },
  { name: "Eng. Ahmed A. Mohamud", role: "Hydrologist / Hydraulics Engineer", quals: "M.Sc. Structural Eng. (UPM Malaysia) · B.Sc. Civil Eng.", exp: "10+ years", flag: "🇸🇴", languages: "Somali · English", initials: "AH" },
  { name: "Eng. Francis N. Kunina", role: "Road Safety Specialist", quals: "B.Sc. Civil Eng. · EBK Registered", exp: "10+ years", flag: "🇰🇪", languages: "English · Kiswahili", initials: "FK" },
  { name: "Nelson N. Ndiritu", role: "Quantity Surveyor", quals: "B.Sc. QS (UoN) · BORAQS Reg. Q832", exp: "12+ years", flag: "🇰🇪", languages: "English · Kiswahili", initials: "NN" },
  { name: "Eng. Nyateko A. Samuel", role: "Electrical Engineer", quals: "B.Sc. Electrical Eng.", exp: "8+ years", flag: "🇰🇪", languages: "English · Kiswahili", initials: "NS" },
  { name: "Eng. Omar Abdi Arab", role: "Hydrologist", quals: "B.Sc. Hydrology & Civil Eng.", exp: "10+ years", flag: "🇸🇴", languages: "Somali · English · Arabic", initials: "OA" },
];

const clients = [
  { name: "ActionAid", logo: "/images/ActionAid.png" },
  { name: "Alight", logo: "/images/Alight.png" },
  { name: "Benadir Regional Administration", logo: "/images/BRA.jpg" },
  { name: "CPD Somalia", logo: "/images/CPD.jpg" },
  { name: "CRS", logo: "/images/CRS.png" },
  { name: "DAI", logo: "/images/DAI logo.jpg" },
  { name: "DKH", logo: "/images/DKH.png" },
  { name: "EDC", logo: "/images/EDC.png" },
  { name: "FAO", logo: "/images/FAO.png" },
  { name: "Global Giving", logo: "/images/Global Giving.jpg" },
  { name: "IOM", logo: "/images/IOM.png" },
  { name: "IRC", logo: "/images/IRC.png" },
  { name: "KeNHA", logo: "/images/KENHA.jpg" },
  { name: "LOOP", logo: "/images/LOOP.png" },
  { name: "MENTOR Initiative", logo: "/images/MENTOR.png" },
  { name: "NIS Foundation", logo: "/images/NIS foundation.png" },
  { name: "Oxfam", logo: "/images/Oxfam.png" },
  { name: "SSWC", logo: "/images/SSWC.jpg" },
  { name: "Save the Children", logo: "/images/Save the Children.jpg" },
  { name: "Somalia Stability Fund", logo: "/images/Somalia Stability Fund.png" },
  { name: "UNDP", logo: "/images/UNDP.png" },
  { name: "UNOCHA-SHF", logo: "/images/UNOCHA-SHF.png" },
  { name: "UNICEF", logo: "/images/Unicef.png" },
  { name: "Welthungerhilfe", logo: "/images/WHH.jpg" },
];

const registrations = [
  { org: "Engineers Board of Kenya (EBK)", detail: "Multiple registered professional engineers (A3151, E441, A3478 & others)" },
  { org: "Institution of Engineers, Somalia", detail: "Registered professional engineering consultancy" },
  { org: "BORAQS — Kenya", detail: "Registered Quantity Surveyor, Serial No. Q 832" },
  { org: "Communications Authority of Kenya", detail: "Licensed telecommunications survey (TL/TP/IMWE)" },
  { org: "World Bank", detail: "ESF-trained practitioners across environmental & social safeguards" },
  { org: "UNOPS Vendor Registry", detail: "Registered supplier for infrastructure consultancy services" },
];

const designStandards = [
  "AASHTO – Geometric & Pavement Design",
  "ERA / Kenya Road Design Manual",
  "BS & Eurocode – Structural Design",
  "HEC-RAS / Rational Method – Hydraulics",
  "HDM-4 – Economic Evaluation",
  "iRAP – Road Safety Assessment",
  "World Bank ESF – Safeguards",
];

/* ─── Page Component ─── */
export default function HomePage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <Navbar />

      {/* ═══ HERO ═══ */}
      <header id="home" className="hero-bg" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px clamp(16px,4vw,60px) 100px", position: "relative" }}>
        <HeroSlideshow />
        <div className="topo-pattern" aria-hidden="true" style={{ zIndex: 3 }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", position: "relative", zIndex: 5 }}>

          <AnimatedSection delay={0.15}>
            <h1 style={{ fontFamily: "var(--font-display), 'Playfair Display', serif", fontSize: "clamp(38px,6.5vw,70px)", fontWeight: 800, color: "white", lineHeight: 1.05, maxWidth: 850, marginBottom: 24 }}>
              Building <span style={{ color: "var(--gold)" }}>Resilient Infrastructure</span> Across the Horn of Africa
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <p style={{ fontSize: "clamp(16px,2vw,19px)", color: "rgba(255,255,255,0.65)", maxWidth: 620, lineHeight: 1.75, marginBottom: 40, fontWeight: 300 }}>
              Multi-disciplinary civil engineering consultancy specialising in road design, water supply, structural engineering, drainage, and irrigation — delivering technically excellent solutions in complex operating environments since 2016.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.45}>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 64 }}>
              <a href="#sectors" className="cta-btn cta-primary">Explore Our Sectors →</a>
              <a href="#contact" className="cta-btn cta-secondary">Contact Us</a>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.6}>
            <div className="hero-stats" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, maxWidth: 720 }}>
              {[
                { val: 8, suffix: "+", label: "Years Operating" },
                { val: 6, suffix: "", label: "Core Sectors" },
                { val: 11, suffix: "+", label: "Specialist Engineers" },
                { val: 3, suffix: "", label: "Office Locations" },
              ].map((s, i) => (
                <div key={i} className="stat-card">
                  <div style={{ fontFamily: "var(--font-display), 'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: "var(--gold)", lineHeight: 1 }}>
                    <CountUp end={s.val} />{s.suffix && <span style={{ fontSize: 22 }}>{s.suffix}</span>}
                  </div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 8, textTransform: "uppercase", letterSpacing: 1.2, fontWeight: 600 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </header>

      {/* ═══ PORTFOLIO ═══ */}
      <section id="portfolio" className="portfolio-section" aria-labelledby="portfolio-heading">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: 15 }}>
              <div className="gold-line" style={{ margin: "0 auto 15px" }} />
              <h2 id="portfolio-heading" style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, textAlign: "center", textTransform: "uppercase", letterSpacing: 2 }}>
                Portfolio of <span style={{ color: "var(--gold)" }}>Completed Projects</span>
              </h2>
            </div>
          </AnimatedSection>

          <PortfolioSlider projects={portfolioProjects} />
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section id="about" style={{ padding: "100px clamp(16px,4vw,60px)", background: "var(--cream)" }} aria-labelledby="about-heading">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <AnimatedSection>
            <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 80, alignItems: "start" }}>
              <article>
                <div className="gold-line" style={{ marginBottom: 20 }} />
                <h2 id="about-heading" className="section-title" style={{ marginBottom: 24 }}>Deep Regional Expertise.<br /><span style={{ color: "var(--teal)" }}>Global Standards.</span></h2>
                <p style={{ fontSize: 16, lineHeight: 1.85, color: "var(--slate)", marginBottom: 20 }}>
                  XUUB Engineering Limited is a multi-disciplinary civil engineering consultancy registered in both <strong style={{ color: "var(--navy)" }}>Somalia</strong> and <strong style={{ color: "var(--navy)" }}>Kenya</strong>, with operational offices in Mogadishu, Kismayo, and Nairobi. Founded in 2016 in Kenya and 2022 in Somalia, we deliver end-to-end engineering design and consultancy services across the full spectrum of civil infrastructure — from roads and bridges to water supply systems, buildings, drainage, and irrigation schemes.
                </p>
                <p style={{ fontSize: 16, lineHeight: 1.85, color: "var(--slate)", marginBottom: 20 }}>
                  Our team combines deep working knowledge of Somalia&apos;s security, logistical, and environmental conditions with internationally-qualified engineers experienced in World Bank, UNOPS, and UN-Habitat funded programmes. We maintain established partnerships with local entities and bring proven familiarity with regional regulatory frameworks, land tenure systems, and humanitarian operating environments.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
                  <div style={{ background: "#152a23", borderRadius: 16, padding: "24px", border: "1px solid rgba(200,164,78,0.2)" }}>
                    <h3 style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.5, color: "var(--gold)", fontWeight: 700, marginBottom: 12 }}>Our Mission</h3>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.65 }}>To deliver technically excellent, context-sensitive engineering solutions that connect communities, enable trade, and build climate resilience across the Horn of Africa.</p>
                  </div>
                  <div style={{ background: "#152a23", borderRadius: 16, padding: "24px", border: "1px solid rgba(200,164,78,0.2)" }}>
                    <h3 style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.5, color: "var(--gold)", fontWeight: 700, marginBottom: 12 }}>Our Vision</h3>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.65 }}>To be the Horn of Africa&apos;s most trusted engineering consultancy — recognised for technical rigour, local knowledge, and an unwavering commitment to quality.</p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {["World Bank ESF", "AASHTO Standards", "Climate-Resilient Design", "ISO 9001 Aligned", "iRAP Methodology", "Sphere Standards"].map(tag => (
                    <span key={tag} className="badge" style={{ background: "rgba(200,164,78,0.05)", color: "#9a7d3a", border: "1px solid rgba(200,164,78,0.3)", fontSize: 11, fontWeight: 700, letterSpacing: 0.5 }}>{tag}</span>
                  ))}
                </div>
              </article>
              <aside style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ background: "linear-gradient(135deg,var(--navy),#1a3358)", borderRadius: 24, padding: 36, color: "white", boxShadow: "none", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <h3 style={{ fontFamily: "var(--font-display), 'Playfair Display', serif", fontSize: 20, marginBottom: 24, color: "var(--gold)" }}>Why Choose XUUB</h3>
                  {[
                    { n: "01", t: "Somalia-Based Operations", d: "Offices in Mogadishu & Kismayo with field access across Jubaland, Southwest, Hirshabelle, and Benadir" },
                    { n: "02", t: "Security-Adapted Methods", d: "Hybrid field-remote approaches combining concentrated field campaigns with satellite/UAV remote sensing" },
                    { n: "03", t: "Full-Spectrum Civil Engineering", d: "Roads, water, buildings, drainage, irrigation, and electrification — one firm for all infrastructure needs" },
                    { n: "04", t: "Dual-Jurisdiction Registration", d: "Registered in Kenya (EBK, BORAQS) and Somalia, ensuring compliance across both regulatory frameworks" },
                    { n: "05", t: "International Development Experience", d: "Track record with World Bank, UNOPS, UN-Habitat, IOM, and UNICEF-funded projects in the region" },
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: 14, marginBottom: i < 4 ? 20 : 0 }}>
                      <span style={{ fontFamily: "var(--font-display), 'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: "var(--gold)", opacity: 0.35, lineHeight: 1 }}>{item.n}</span>
                      <div>
                        <h4 style={{ fontWeight: 600, fontSize: 14, marginBottom: 3 }}>{item.t}</h4>
                        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>{item.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ background: "#152a23", borderRadius: 16, padding: "28px", border: "1px solid rgba(200,164,78,0.2)" }}>
                  <h3 style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.5, color: "var(--gold)", fontWeight: 700, marginBottom: 18 }}>Core Values</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {["Technical Rigour", "Integrity", "Safety First", "Community Impact", "Sustainability", "Innovation"].map(v => (
                      <span key={v} style={{ padding: "6px 14px", borderRadius: 100, background: "rgba(255,255,255,0.05)", fontSize: 11, fontWeight: 600, color: "white", border: "1px solid rgba(255,255,255,0.1)", letterSpacing: 0.5 }}>{v}</span>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ SECTORS ═══ */}
      <section id="sectors" style={{ padding: "60px clamp(16px,4vw,60px)", background: "var(--sand)" }} aria-labelledby="sectors-heading">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <div className="gold-line" style={{ margin: "0 auto 20px" }} />
              <h2 id="sectors-heading" className="section-title">Sectors We Serve</h2>
              <p style={{ color: "var(--slate)", maxWidth: 620, margin: "16px auto 0", fontSize: 16, lineHeight: 1.7 }}>
                Comprehensive civil engineering consultancy across six core infrastructure sectors — each delivered with the same commitment to quality and regional understanding.
              </p>
            </div>
          </AnimatedSection>
          <div className="sectors-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {sectors.map((s, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <article className="sector-card">
                  <div className="sector-icon-wrap" aria-hidden="true"><span>{s.icon}</span></div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <div style={{ marginTop: 16, width: 40, height: 3, background: s.color, borderRadius: 2, opacity: 0.4 }} aria-hidden="true" />
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section id="services" style={{ padding: "60px clamp(16px,4vw,60px)", background: "var(--cream)" }} aria-labelledby="services-heading">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <div className="gold-line" style={{ margin: "0 auto 20px" }} />
              <h2 id="services-heading" className="section-title">Technical Services</h2>
              <p style={{ color: "var(--slate)", maxWidth: 600, margin: "16px auto 0", fontSize: 16, lineHeight: 1.7 }}>
                End-to-end consultancy capabilities from inception through design, tendering, and construction supervision.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <ServicesSlider services={services} />
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ METHODOLOGY ═══ */}
      <section id="methodology" style={{ padding: "100px clamp(16px,4vw,60px)", background: "var(--sand)" }} aria-labelledby="methodology-heading">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "0.4fr 0.6fr", gap: 80, alignItems: "start" }}>
            <AnimatedSection>
              <div style={{ position: "sticky", top: 100 }}>
                <div className="gold-line" style={{ marginBottom: 20 }} />
                <h2 id="methodology-heading" className="section-title" style={{ marginBottom: 20 }}>Our <span style={{ color: "var(--teal)" }}>Approach</span></h2>
                <p style={{ fontSize: 16, lineHeight: 1.8, color: "var(--slate)", marginBottom: 24 }}>
                  A proven five-phase methodology refined through delivery of complex infrastructure design assignments in security-constrained environments. Each phase builds upon rigorous quality gates to ensure technically sound, client-accepted deliverables.
                </p>
                <div style={{ background: "white", borderRadius: 16, padding: "24px 28px", border: "1px solid #e8e4dc" }}>
                  <h3 style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.5, color: "var(--slate)", fontWeight: 700, marginBottom: 12 }}>Design Standards We Apply</h3>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8, padding: 0 }}>
                    {designStandards.map((std, i) => (
                      <li key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--teal)", flexShrink: 0 }} aria-hidden="true" />
                        <span style={{ fontSize: 13, color: "var(--charcoal)" }}>{std}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>
            <div role="list" aria-label="Methodology phases">
              {methodSteps.map((step, i) => (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <div className="method-step" role="listitem">
                    <div className="method-number" aria-hidden="true">{step.phase}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, flexWrap: "wrap", gap: 8 }}>
                        <h3 style={{ fontFamily: "var(--font-display), 'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: "var(--navy)" }}>{step.title}</h3>
                        <span className="badge" style={{ background: "rgba(200,164,78,0.1)", color: "#9a7d3a" }}>{step.duration}</span>
                      </div>
                      <p style={{ fontSize: 14, color: "var(--slate)", lineHeight: 1.7 }}>{step.desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CLIENTS ═══ */}
      <section style={{ padding: "80px clamp(16px,4vw,60px)", background: "var(--cream)" }} aria-labelledby="clients-heading">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <p style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 2, color: "var(--slate)", fontWeight: 600, marginBottom: 12 }}>Trusted By</p>
              <h2 id="clients-heading" style={{ fontFamily: "var(--font-display), 'Playfair Display', serif", fontSize: 28, color: "var(--navy)" }}>Our Clients &amp; Development Partners</h2>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <div className="clients-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 20, alignItems: "center" }} role="list" aria-label="Client organisations">
              {clients.map((client, i) => (
                <div key={i} className="client-logo-box" role="listitem">
                  <img src={client.logo} alt={client.name} />
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ TEAM ═══ */}
      <section id="team" style={{ padding: "100px clamp(16px,4vw,60px)", background: "var(--sand)" }} aria-labelledby="team-heading">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <div className="gold-line" style={{ margin: "0 auto 20px" }} />
              <h2 id="team-heading" className="section-title">Our Leadership Team</h2>
              <p style={{ color: "var(--slate)", maxWidth: 620, margin: "16px auto 0", fontSize: 16, lineHeight: 1.7 }}>
                Named, qualified specialists with direct experience in Somalia&apos;s operating environment — professionally registered across both Kenya and Somalia.
              </p>
            </div>
          </AnimatedSection>
          <div className="team-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
            {teamMembers.map((m, i) => (
              <AnimatedSection key={i} delay={i * 0.06}>
                <article className="team-card" itemScope itemType="https://schema.org/Person">
                  <div className="avatar" aria-hidden="true">{m.initials}</div>
                  <div style={{ fontSize: 14, marginBottom: 6 }}>{m.flag}</div>
                  <h3 itemProp="name" style={{ fontFamily: "var(--font-display), 'Playfair Display', serif", fontSize: 15, fontWeight: 600, color: "var(--navy)", marginBottom: 4 }}>{m.name}</h3>
                  <p itemProp="jobTitle" style={{ fontSize: 12.5, fontWeight: 600, color: "var(--teal)", marginBottom: 8 }}>{m.role}</p>
                  <p style={{ fontSize: 11.5, color: "var(--slate)", lineHeight: 1.5, marginBottom: 10 }}>{m.quals}</p>
                  <span className="badge" style={{ background: "rgba(10,22,40,0.05)", color: "var(--navy)" }}>{m.exp}</span>
                  <p style={{ fontSize: 10.5, color: "var(--slate)", marginTop: 8 }}>{m.languages}</p>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="contact" style={{ padding: "100px clamp(16px,4vw,60px)", background: "linear-gradient(165deg,var(--navy) 0%,#122240 100%)", position: "relative", overflow: "hidden" }} aria-labelledby="contact-heading">
        <div className="topo-pattern" aria-hidden="true" />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <AnimatedSection>
            <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
              <div>
                <div className="gold-line" style={{ marginBottom: 20 }} />
                <h2 id="contact-heading" style={{ fontFamily: "var(--font-display), 'Playfair Display', serif", fontSize: "clamp(32px,5vw,44px)", fontWeight: 700, color: "white", lineHeight: 1.15, marginBottom: 24 }}>
                  Let&apos;s Build <span style={{ color: "var(--gold)" }}>Together</span>
                </h2>
                <p style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.55)", marginBottom: 40 }}>
                  Whether you&apos;re a development partner, government agency, contractor, or fellow consultant — we welcome enquiries about our engineering consultancy services across Somalia, Kenya, and the wider Horn of Africa region.
                </p>
                <address style={{ fontStyle: "normal", display: "flex", flexDirection: "column", gap: 24 }}>
                  {[
                    { icon: "🏢", label: "Head Office", value: "Mogadishu, Somalia", sub: "Hodan District" },
                    { icon: "🏢", label: "Southern Office", value: "Kismayo, Jubaland State", sub: "Field operations base" },
                    { icon: "🏢", label: "Kenya Office", value: "Nairobi, Kenya", sub: "Regional coordination" },
                    { icon: "📧", label: "Enquiries", value: "xuubengineering@gmail.com", sub: null },
                    { icon: "📞", label: "Phone", value: "+254 722 232 675 / +252 615 924 574", sub: null },
                  ].map((c, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(200,164,78,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }} aria-hidden="true">{c.icon}</div>
                      <div>
                        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: 1, fontWeight: 600 }}>{c.label}</div>
                        <div style={{ fontSize: 15, color: "white", fontWeight: 500 }}>{c.value}</div>
                        {c.sub && <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>{c.sub}</div>}
                      </div>
                    </div>
                  ))}
                </address>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: 36 }}>
                  <h3 style={{ fontFamily: "var(--font-display), 'Playfair Display', serif", fontSize: 20, color: "white", marginBottom: 6 }}>Registrations &amp; Affiliations</h3>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginBottom: 24 }}>Our professional credentials</p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {registrations.map((item, i) => (
                      <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 16, paddingBottom: 16, borderBottom: i < registrations.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                        <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--gold)", marginTop: 7, flexShrink: 0 }} aria-hidden="true" />
                        <div>
                          <div style={{ fontSize: 14, color: "white", fontWeight: 600 }}>{item.org}</div>
                          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{item.detail}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ background: "rgba(200,164,78,0.06)", border: "1px solid rgba(200,164,78,0.15)", borderRadius: 16, padding: "24px 28px" }}>
                  <h3 style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.5, color: "var(--gold)", fontWeight: 700, marginBottom: 10 }}>Areas of Operation</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {["Somalia — Nationwide", "Kenya", "Ethiopia (Cross-border)", "Djibouti", "Horn of Africa Region"].map(a => (
                      <span key={a} style={{ padding: "6px 14px", borderRadius: 100, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", fontSize: 12, color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>{a}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ background: "var(--navy)", color: "rgba(255,255,255,0.6)", padding: "60px 0 30px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(16px,4vw,60px)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20, paddingBottom: 30, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <img
                src="/images/xuub_engineering_logo.png"
                alt="XUUB Engineering Logo"
                style={{ height: 45, width: "auto", objectFit: "contain" }}
              />
            </div>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              {["Mogadishu", "Kismayo", "Nairobi"].map(city => (
                <span key={city} style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>📍 {city}</span>
              ))}
            </div>
          </div>
          <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 40, padding: "30px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <nav aria-label="Footer - Sectors">
              <h4 style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.5, color: "rgba(255,255,255,0.25)", fontWeight: 700, marginBottom: 14 }}>Sectors</h4>
              {["Roads & Highways", "Water & Sanitation", "Buildings & Structures", "Irrigation & Agriculture", "Drainage & Flood Control", "Electrical & Energy"].map(s => (
                <div key={s} style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 8 }}>{s}</div>
              ))}
            </nav>
            <nav aria-label="Footer - Services">
              <h4 style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.5, color: "rgba(255,255,255,0.25)", fontWeight: 700, marginBottom: 14 }}>Services</h4>
              {["Feasibility Studies", "Detailed Engineering Design", "Construction Supervision", "Environmental Safeguards", "Quantity Surveying", "Project Management"].map(s => (
                <div key={s} style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 8 }}>{s}</div>
              ))}
            </nav>
            <div>
              <h4 style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.5, color: "rgba(255,255,255,0.25)", fontWeight: 700, marginBottom: 14 }}>Connect</h4>
              <address style={{ fontStyle: "normal" }}>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 8 }}>xuubengineering@gmail.com</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 8 }}>+254 722 232 675</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 8 }}>+252 615 924 574</div>
              </address>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 24, flexWrap: "wrap", gap: 12 }}>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>© {new Date().getFullYear()} XUUB Engineering Limited. All rights reserved. Registered in Kenya &amp; Somalia.</p>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.15)" }}>Designed with precision. Built for impact.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
