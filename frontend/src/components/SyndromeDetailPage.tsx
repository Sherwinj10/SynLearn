"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
import { SyndromeContent } from "@/lib/syndromeContent";
import { FEATURE_LABELS, SYNDROMES } from "@/lib/data";
import { FEATURE_DEFINITIONS } from "@/lib/feature_definitions";

const SECTION_META: { key: keyof SyndromeContent["sections"]; label: string }[] = [
  { key: "definition", label: "Definition" },
  { key: "etiology", label: "Etiology" },
  { key: "incidence", label: "Incidence & Prevalence" },
  { key: "classification", label: "Classification" },
  { key: "pathophysiology", label: "Pathophysiology" },
  { key: "facial_features", label: "Facial Features" },
  { key: "physical_characteristics", label: "Physical Characteristics" },
  { key: "associated_features", label: "Associated Features" },
  { key: "speech_language", label: "Speech & Language" },
  { key: "recommendations", label: "Recommendations" },
  { key: "references", label: "References" },
];

function SectionCard({
  label,
  sectionKey,
  content,
  color,
  index
}: {
  label: string;
  sectionKey: string;
  content: string | string[];
  color: string;
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(index < 2); // Open first two by default
  const isArray = Array.isArray(content);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
      style={{
        background: "var(--surface)",
        border: `1px solid ${isOpen ? color + '44' : 'var(--border)'}`,
        borderRadius: 24,
        overflow: "hidden",
        marginBottom: 16,
        transition: "border-color 0.4s"
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "100%",
          padding: "24px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{
            width: 8, height: 24, borderRadius: 4,
            background: isOpen ? color : "var(--border)",
            transition: "background 0.4s"
          }} />
          <span style={{
            fontFamily: "var(--display)",
            fontSize: "1.1rem",
            fontWeight: 700,
            color: isOpen ? "var(--text)" : "var(--text-muted)",
            transition: "color 0.4s"
          }}>
            {label}
          </span>
        </div>
        <div style={{
          color: isOpen ? color : "var(--text-muted)",
          transition: "color 0.4s"
        }}>
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ padding: "0 32px 32px 56px", color: "var(--text-subtle)", fontSize: "0.95rem", lineHeight: 1.7 }}>
              {isArray ? (
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                  {(content as string[]).map((item, i) => (
                    <li key={i} style={{ display: "flex", gap: 12 }}>
                      <span style={{ color: color, marginTop: 4 }}>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ whiteSpace: "pre-line" }}>{content as string}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function SyndromeDetailPage({ syndrome }: { syndrome: SyndromeContent }) {
  const router = useRouter();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  // ─── Resolve Feature Images ──────────────────────────────────────────────────
  const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
  const labelToId = Object.entries(FEATURE_LABELS).reduce((acc, [fid, label]) => {
    acc[normalize(label)] = fid;
    return acc;
  }, {} as Record<string, string>);

  const allFeatures = [
    ...syndrome.sections.facial_features,
    ...syndrome.sections.physical_characteristics,
    ...syndrome.sections.associated_features
  ];

  const matchedFeatureIds = allFeatures.map(f => {
    const norm = normalize(f);
    if (labelToId[norm]) return labelToId[norm];
    for (const [normLabel, fid] of Object.entries(labelToId)) {
      if (normLabel.length > 5 && (norm.includes(normLabel) || normLabel.includes(norm))) {
        return fid;
      }
    }
    return null;
  }).filter(Boolean) as string[];

  const uniqueFeatureIds = Array.from(new Set(matchedFeatureIds));

  // Find the base data from SYNDROMES to get the correct main image and shortDesc
  const baseData = SYNDROMES.find(s => s.id === syndrome.slug);

  const galleryItems = [
    { 
      type: 'syndrome', 
      src: baseData?.image || syndrome.image, 
      title: syndrome.name, 
      description: baseData?.shortDesc || syndrome.subtitle 
    },
    ...uniqueFeatureIds.map(fid => ({
      type: 'feature',
      src: `/features/${fid}.jpeg`,
      title: FEATURE_LABELS[fid] ?? fid,
      description: FEATURE_DEFINITIONS[normalize(FEATURE_LABELS[fid] ?? "")]
    }))
  ];

  const nextImg = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImgIdx((prev) => (prev + 1) % galleryItems.length);
  };

  const prevImg = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImgIdx((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  return (
    <div style={{ minHeight: "100vh", paddingBottom: 100 }}>
      {/* Hero Section */}
      <section
        style={{ minHeight: "50vh", paddingBottom: 120, position: "relative", overflow: "hidden" }}
      >
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(circle at top right, ${syndrome.color}20, transparent 60%), linear-gradient(to bottom, var(--bg) 0%, ${syndrome.color}05 100%)`
        }} />

        <div style={{
          padding: "100px 5% 40px", position: "relative", zIndex: 10,
          maxWidth: 1200
        }}
          onClick={e => e.stopPropagation()}
        >
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            onClick={() => router.back()}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              background: "rgba(255,255,255,0.05)", backdropFilter: "blur(12px)",
              border: "1px solid var(--border)", padding: "10px 16px", borderRadius: 100,
              color: "var(--text)", fontSize: "0.85rem", fontWeight: 500,
              cursor: "pointer", marginBottom: 40
            }}
          >
            <ArrowLeft size={16} />
            Back
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{
              fontFamily: "var(--mono)", fontSize: "0.75rem", letterSpacing: "0.2em",
              textTransform: "uppercase", color: syndrome.color, marginBottom: 16,
              display: "flex", alignItems: "center", gap: 8
            }}>
              <span style={{ width: 24, height: 1, background: syndrome.color }} />
              Syndrome Intelligence
            </div>
            <h1 style={{
              fontFamily: "var(--display)", fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: 800, color: "var(--text)", letterSpacing: "-0.04em",
              lineHeight: 1.1, marginBottom: 20
            }}>
              {syndrome.name}
            </h1>
            <p style={{
              fontSize: "1.1rem", color: "var(--text-subtle)", maxWidth: 600,
              lineHeight: 1.6, marginBottom: 32
            }}>
              {syndrome.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <div style={{ maxWidth: 1000, margin: "-60px auto 0", padding: "0 24px", position: "relative", zIndex: 20 }}>
        {/* Feature Image Gallery (Moved to top) */}
        {galleryItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ marginBottom: 40, background: "var(--surface)", padding: 24, borderRadius: 24, border: "1px solid var(--border)", boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}
          >
            <div className="divider" style={{ marginBottom: 24 }}>
              <span>Clinical Features Gallery</span>
            </div>
            <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 16, scrollbarWidth: "none", msOverflowStyle: "none" }}>
              {galleryItems.map((item, idx) => (
                <div key={idx} style={{ flexShrink: 0, width: 170 }}>
                  <div 
                    style={{ width: 170, height: 170, borderRadius: 16, overflow: "hidden", background: "var(--bg)", border: "1px solid var(--border)", marginBottom: 14, cursor: "zoom-in" }}
                    onClick={() => {
                      setCurrentImgIdx(idx);
                      setLightboxOpen(true);
                    }}
                  >
                    <img
                      src={item.src}
                      alt={item.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <p style={{ fontSize: "0.95rem", color: "var(--text)", textAlign: "center", lineHeight: 1.3, fontWeight: 600 }}>
                    {item.title}
                  </p>
                  {item.description && (
                    <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", textAlign: "center", lineHeight: 1.4, marginTop: 8, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Description Sections */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 0 }}>
          {SECTION_META.map((meta, i) => (
            <SectionCard
              key={meta.key}
              index={i}
              label={meta.label}
              sectionKey={meta.key}
              content={syndrome.sections[meta.key]}
              color={syndrome.color}
            />
          ))}
        </div>
      </div>

      {/* Gallery Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)",
              zIndex: 1000, display: "flex", alignItems: "center",
              justifyContent: "center", backdropFilter: "blur(20px)"
            }}
            onClick={() => setLightboxOpen(false)}
          >
            <button
              style={{ position: "absolute", top: 40, right: 40, background: "none", border: "none", color: "#fff", cursor: "pointer" }}
              onClick={() => setLightboxOpen(false)}
            >
              <X size={32} />
            </button>

            <div 
              style={{ 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center", 
                gap: 24, 
                maxWidth: "90vw", 
                maxHeight: "90vh",
                position: "relative" 
              }} 
              onClick={e => e.stopPropagation()}
            >
              <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {galleryItems.length > 1 && (
                  <button
                    onClick={prevImg}
                    style={{ position: "absolute", left: -60, background: "rgba(255,255,255,0.1)", border: "none", padding: 12, borderRadius: "50%", color: "#fff", cursor: "pointer", zIndex: 10 }}
                  >
                    <ChevronLeft size={24} />
                  </button>
                )}

                <motion.img
                  key={currentImgIdx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  src={galleryItems[currentImgIdx].src}
                  alt={`${syndrome.name} - slide ${currentImgIdx + 1}`}
                  style={{ 
                    maxWidth: "100%", 
                    maxHeight: "60vh", 
                    objectFit: "contain", 
                    borderRadius: 16,
                    boxShadow: "0 20px 50px rgba(0,0,0,0.5)" 
                  }}
                />

                {galleryItems.length > 1 && (
                  <button
                    onClick={nextImg}
                    style={{ position: "absolute", right: -60, background: "rgba(255,255,255,0.1)", border: "none", padding: 12, borderRadius: "50%", color: "#fff", cursor: "pointer", zIndex: 10 }}
                  >
                    <ChevronRight size={24} />
                  </button>
                )}
              </div>

              {/* Description Container Below Image */}
              <div style={{ textAlign: "center", width: "100%", maxWidth: 700 }}>
                <div style={{ color: "#fff", fontSize: "1.2rem", fontWeight: 800, fontFamily: "var(--display)", marginBottom: 8, letterSpacing: "-0.02em" }}>
                  {galleryItems[currentImgIdx].title} <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem", fontWeight: 400 }}>({currentImgIdx + 1} / {galleryItems.length})</span>
                </div>
                {galleryItems[currentImgIdx].description && (
                  <div style={{ 
                    color: "rgba(255,255,255,0.9)", 
                    fontSize: "1.2rem", 
                    fontWeight: 700,
                    lineHeight: 1.5, 
                    maxHeight: "150px", 
                    overflowY: "auto",
                    padding: "12px 20px",
                    background: "rgba(255,255,255,0.08)",
                    borderRadius: 12,
                    border: "1px solid rgba(255,255,255,0.1)"
                  }}>
                    {galleryItems[currentImgIdx].description}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
