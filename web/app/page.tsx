"use client";

import { useState } from "react";
import Link from "next/link";

const slides = [
  { title: "Ranks", desc: "Permanent rank with perks" },
  { title: "Gems", desc: "In-game currency packs" },
  { title: "Bundles", desc: "Best value packages" },
];

export default function Home() {
  const [index, setIndex] = useState(1);

  function prev() {
    setIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
  }

  function next() {
    setIndex((i) => (i === slides.length - 1 ? 0 : i + 1));
  }

  return (
    <main style={bg}>
      <header style={header}>
        <Link href="/products" style={cta}>View Store</Link>
      </header>

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
                    translateX(${offset * 260}px)
                    scale(${i === index ? 1.1 : 0.9})
                    rotateY(${offset * -25}deg)
                  `,
                  opacity: Math.abs(offset) > 2 ? 0 : 1,
                  zIndex: i === index ? 2 : 1,
                  boxShadow:
                    i === index
                      ? "0 0 50px rgba(168,85,247,0.6)"
                      : "0 20px 40px rgba(0,0,0,0.6)",
                }}
              >
                <h2>{s.title}</h2>
                <p>{s.desc}</p>
              </div>
            );
          })}
        </div>

        <button onClick={next} style={arrow}>›</button>
      </div>
    </main>
  );
}
const bg = {
  minHeight: "100vh",
  background:
    "radial-gradient(circle at top, #5b0f9b, #0b0b12 65%)",
  display: "flex",
  flexDirection: "column",
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
  width: 260,
  height: 360,
  perspective: 1200,
};

const card = {
  position: "absolute" as const,
  width: 260,
  height: 360,
  background: "#16161d",
  borderRadius: 16,
  padding: 24,
  border: "1px solid #222",
  transition: "all 0.45s ease",
};

const arrow = {
  fontSize: 36,
  background: "transparent",
  border: "none",
  color: "white",
  cursor: "pointer",
};
