"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const slides = [
  { title: "VIP Rank", desc: "Permanent rank with exclusive perks" },
  { title: "Gems", desc: "Purchase in-game currency packs" },
  { title: "Bundles", desc: "Best value combined packages" },
];

export default function Home() {
  const [index, setIndex] = useState(1);

  function prev() {
    setIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
  }

  function next() {
    setIndex((i) => (i === slides.length - 1 ? 0 : i + 1));
  }

  // 🔁 Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i === slides.length - 1 ? 0 : i + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main style={bg}>
      {/* Top CTA */}
      <header style={header}>
        <Link href="/products" style={cta}>
          View Store
        </Link>
      </header>

      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <h1 style={{ fontSize: 56, marginBottom: 12 }}>MineRise Store</h1>
        <p style={{ fontSize: 18, opacity: 0.85 }}>
          Premium ranks, gems & perks for our Minecraft server
        </p>
      </div>

      {/* Carousel */}
      <div style={carousel}>
        <button onClick={prev} style={arrow}>‹</button>

        <div style={track}>
          {slides.map((s, i) => {
            const offset = i - index;

            return (
              <div
                key={i}
                style={{
                  ...card,
                  transform: `
                    translateX(${offset * 280}px)
                    scale(${i === index ? 1.1 : 0.9})
                    rotateY(${offset * -25}deg)
                  `,
                  opacity: Math.abs(offset) > 2 ? 0 : 1,
                  filter: i === index ? "blur(0px)" : "blur(2px)",
                  zIndex: i === index ? 2 : 1,
                  boxShadow:
                    i === index
                      ? "0 0 50px rgba(168,85,247,0.6)"
                      : "0 20px 40px rgba(0,0,0,0.6)",
                }}
              >
                <h2 style={{ fontSize: 24 }}>{s.title}</h2>
                <p style={{ opacity: 0.8 }}>{s.desc}</p>
              </div>
            );
          })}
        </div>

        <button onClick={next} style={arrow}>›</button>
      </div>
    </main>
  );
}

/* ================= STYLES ================= */

const bg = {
  minHeight: "100vh",
  background:
    "radial-gradient(circle at top, #5b0f9b, #0b0b12 65%)",
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  justifyContent: "center",
  color: "white",
};

const header = {
  position: "absolute" as const,
  top: 30,
};

const cta = {
  background: "linear-gradient(90deg,#9333ea,#ec4899)",
  padding: "12px 22px",
  borderRadius: 8,
  color: "white",
  textDecoration: "none",
  fontWeight: 600,
};

const carousel = {
  display: "flex",
  alignItems: "center",
  gap: 40,
};

const track = {
  position: "relative" as const,
  width: 280,
  height: 360,
  perspective: 1200,
};

const card = {
  position: "absolute" as const,
  width: 280,
  height: 360,
  background: "#16161d",
  borderRadius: 16,
  padding: 24,
  border: "1px solid #222",
  transition: "all 0.45s ease",
};

const arrow = {
  fontSize: 32,
  width: 48,
  height: 48,
  borderRadius: "50%",
  background: "rgba(255,255,255,0.08)",
  border: "1px solid #333",
  color: "white",
  cursor: "pointer",
};
