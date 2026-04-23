"use client";
import { useEffect, useRef } from "react";

export function CursorGlow() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dot.current) {
        dot.current.style.left = `${e.clientX - 4}px`;
        dot.current.style.top = `${e.clientY - 4}px`;
      }
    };

    let raf: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const animate = () => {
      target.current.x = lerp(target.current.x, pos.current.x, 0.12);
      target.current.y = lerp(target.current.y, pos.current.y, 0.12);
      if (ring.current) {
        ring.current.style.left = `${target.current.x - 18}px`;
        ring.current.style.top = `${target.current.y - 18}px`;
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.matches("button, a, [role=button], .chip, .card-hover")) {
        ring.current?.style.setProperty("width", "52px");
        ring.current?.style.setProperty("height", "52px");
        ring.current?.style.setProperty("border-color", "rgba(34,211,238,0.8)");
        ring.current?.style.setProperty("margin", "-8px");
      } else {
        ring.current?.style.setProperty("width", "36px");
        ring.current?.style.setProperty("height", "36px");
        ring.current?.style.setProperty("border-color", "rgba(99,102,241,0.6)");
        ring.current?.style.setProperty("margin", "0");
      }
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" style={{ position: "fixed", pointerEvents: "none" }} />
      <div ref={ring} className="cursor-ring" style={{ position: "fixed", pointerEvents: "none" }} />
    </>
  );
}
