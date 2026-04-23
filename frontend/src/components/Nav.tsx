"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brain, Dna, BookOpen, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export function Nav() {
  const path = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!headerRef.current) return;
      if (window.scrollY > 40) {
        headerRef.current.style.background = "rgba(5,5,10,0.85)";
        headerRef.current.style.backdropFilter = "blur(20px)";
        headerRef.current.style.borderBottomColor = "rgba(255,255,255,0.07)";
      } else {
        headerRef.current.style.background = "transparent";
        headerRef.current.style.backdropFilter = "none";
        headerRef.current.style.borderBottomColor = "transparent";
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      ref={headerRef}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        borderBottom: "1px solid transparent",
        transition: "background 0.4s, backdrop-filter 0.4s, border-color 0.4s",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{
            width: 32, height: 32, borderRadius: 10,
            background: "linear-gradient(135deg,#6366f1,#22d3ee)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Brain size={16} color="#fff" />
          </div>
          <span style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: "1.1rem", color: "var(--text)", letterSpacing: "-0.02em" }}>
            Syn<span style={{ color: "var(--primary)" }}>Learn</span>
          </span>
        </Link>

        {/* Nav links */}
        <nav style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {[
            { href: "/", label: "Predict", icon: Dna },
            { href: "/learn", label: "Learn", icon: BookOpen },
          ].map(({ href, label, icon: Icon }) => {
            const active = path === href || (href === "/learn" && path.startsWith("/learn"));
            return (
              <Link key={href} href={href} style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "6px 14px", borderRadius: 8,
                fontSize: "0.82rem", fontWeight: 500,
                color: active ? "var(--text)" : "var(--text-muted)",
                background: active ? "var(--surface-2)" : "transparent",
                border: active ? "1px solid var(--border)" : "1px solid transparent",
                textDecoration: "none",
                transition: "all 0.2s",
              }}>
                <Icon size={13} />
                <span className="nav-label">{label}</span>
              </Link>
            );
          })}
        </nav>

      </div>
    </motion.header>
  );
}
