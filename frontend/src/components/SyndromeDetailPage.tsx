"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
import { SyndromeContent } from "@/lib/syndromeContent";

const SECTION_META: { key: keyof SyndromeContent["sections"]; label: string }[] = [
  { key: "definition",               label: "Definition" },
  { key: "etiology",                 label: "Etiology" },
  { key: "incidence",                label: "Incidence & Prevalence" },
  { key: "classification",           label: "Classification" },
  { key: "pathophysiology",          label: "Pathophysiology" },
  { key: "facial_features",          label: "Facial Features" },
  { key: "physical_characteristics", label: "Physical Characteristics" },
  { key: "associated_features",      label: "Associated Features" },
  { key: "speech_language",          label: "Speech & Language" },
  { key: "recommendations",          label: "Recommendations" },
  { key: "references",               label: "References" },
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

  const images = syndrome.images && syndrome.images.length > 0 
    ? syndrome.images 
    : [syndrome.image];

  const nextImg = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImgIdx((prev) => (prev + 1) % images.length);
  };

  const prevImg = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImgIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div style={{ minHeight: "100vh", paddingBottom: 100 }}>
      {/* Hero Section */}
      <section 
        style={{ height: "70vh", position: "relative", overflow: "hidden", cursor: "zoom-in" }}
        onClick={() => {
          setCurrentImgIdx(0);
          setLightboxOpen(true);
        }}
      >
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          src={syndrome.image} 
          alt={syndrome.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0 }}
        />
        <div style={{ 
          position: "absolute", inset: 0, 
          background: `linear-gradient(to top, var(--bg) 0%, rgba(5,5,10,0.6) 40%, transparent 100%)` 
        }} />
        <div style={{ 
          position: "absolute", inset: 0, 
          background: `linear-gradient(to right, var(--bg) 0%, transparent 80%)`,
          opacity: 0.8
        }} />

        {/* View Gallery Badge */}
        <div style={{ 
          position: "absolute", bottom: 80, right: 40, zIndex: 10,
          display: "flex", alignItems: "center", gap: 10,
          background: "rgba(0,0,0,0.4)", backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.1)", padding: "10px 20px",
          borderRadius: 100, color: "rgba(255,255,255,0.8)", fontSize: "0.8rem",
          fontWeight: 600
        }}>
          <Maximize2 size={14} />
          View Gallery {images.length > 1 && `(${images.length})`}
        </div>

        <div style={{ 
          position: "absolute", top: 100, left: "5%", zIndex: 10,
          maxWidth: 1200, padding: "0 24px"
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

            <div style={{ position: "relative", maxWidth: "90vw", maxHeight: "80vh", display: "flex", alignItems: "center" }} onClick={e => e.stopPropagation()}>
              {images.length > 1 && (
                <button 
                  onClick={prevImg}
                  style={{ position: "absolute", left: -60, background: "rgba(255,255,255,0.1)", border: "none", padding: 12, borderRadius: "50%", color: "#fff", cursor: "pointer" }}
                >
                  <ChevronLeft size={24} />
                </button>
              )}

              <motion.img 
                key={currentImgIdx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                src={images[currentImgIdx]}
                alt={`${syndrome.name} - ${currentImgIdx + 1}`}
                style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: 12 }}
              />

              {images.length > 1 && (
                <button 
                  onClick={nextImg}
                  style={{ position: "absolute", right: -60, background: "rgba(255,255,255,0.1)", border: "none", padding: 12, borderRadius: "50%", color: "#fff", cursor: "pointer" }}
                >
                  <ChevronRight size={24} />
                </button>
              )}

              {/* Counter Indicator */}
              <div style={{ position: "absolute", bottom: -40, left: "50%", transform: "translateX(-50%)", color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", fontFamily: "var(--mono)" }}>
                {currentImgIdx + 1} / {images.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
