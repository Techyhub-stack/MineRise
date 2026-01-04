"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import SneakPeek from "@/components/SneakPeek";
import AnimatedNumber from "@/components/AnimatedNumber";
import footer from "@/components/footer";

const slides = [
  { title: "VIP Rank", desc: "Permanent rank with exclusive perks" },
  { title: "Gems", desc: "Purchase in-game currency packs" },
  { title: "Bundles", desc: "Best value combined packages" },
];

const CARD_WIDTH = 320;

export default function Home() {
  const [index, setIndex] = useState(1);
  const [hovering, setHovering] = useState(false);
  const [serverStats, setServerStats] = useState({ online: 0, max: 0 });

  const router = useRouter();
  const wheelLock = useRef(false);

  const prev = () =>
    setIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
  const next = () =>
    setIndex((i) => (i === slides.length - 1 ? 0 : i + 1));

  useEffect(() => {
    if (hovering) return;
    const id = setInterval(next, 3500);
    return () => clearInterval(id);
  }, [hovering]);

  useEffect(() => {
    fetch("http://localhost:5000/stats")
      .then((r) => r.json())
      .then((d) =>
        setServerStats({
          online: d.onlinePlayers ?? 0,
          max: d.maxPlayers ?? 0,
        })
      )
      .catch(() => {});
  }, []);

  function onWheel(e: React.WheelEvent) {
    e.preventDefault();
    if (wheelLock.current) return;
    e.deltaY > 0 ? next() : prev();
    wheelLock.current = true;
    setTimeout(() => (wheelLock.current = false), 450);
  }

  return (
    <>
      <video autoPlay loop muted playsInline style={videoBg as React.CSSProperties}>
        <source src="/bg.mp4" type="video/mp4" />
      </video>

      <div style={videoOverlay} />

      <main style={page}>
        <section style={hero}>
          <h1 style={heroTitle}>MineRise Store</h1>
          <p style={heroSubtitle}>
            Premium ranks, gems & perks for our Minecraft server
          </p>

          <div
            style={carousel}
            onWheelCapture={onWheel}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            <button onClick={prev} style={{ ...arrow, left: -70 }}>
              ‹
            </button>

            <div style={track as React.CSSProperties}>
              {slides.map((s, i) => {
                const offset = i - index;

                return (
                  <motion.div
                    key={i}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -80) next();
                      if (info.offset.x > 80) prev();
                    }}
                    animate={{
                      x: offset * CARD_WIDTH,
                      scale: offset === 0 ? 1.12 : 0.85,
                      rotateY: offset * -18,
                      opacity: offset === 0 ? 1 : 0.55,
                      filter:
                        offset === 0 ? "blur(0px)" : "blur(2px)",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 30,
                    }}
                    style={{
                      ...card,
                      pointerEvents: offset === 0 ? "auto" : "none",
                      zIndex: offset === 0 ? 3 : 1,
                    }}
                  >
                    <h2>{s.title}</h2>
                    <p style={{ opacity: 0.8 }}>{s.desc}</p>

                    {offset === 0 && (
                      <button
                        style={cardButton}
                        onClick={() => router.push("/products")}
                      >
                        View in Store
                      </button>
                    )}
                  </motion.div>
                );
              })}
            </div>

            <button onClick={next} style={{ ...arrow, right: -70 }}>
              ›
            </button>
          </div>
        </section>

        <SneakPeek />

        <section style={statsSection}>
          <div style={statCard}>
            <h2 style={statValue}>
              <AnimatedNumber value={serverStats.online} />
            </h2>
            <p style={statLabel}>Players Online</p>
          </div>

          <div style={statCard}>
            <h2 style={statValue}>
              <AnimatedNumber value={serverStats.max} />
            </h2>
            <p style={statLabel}>Max Slots</p>
          </div>

          <div style={statCard}>
            <h2 style={statValue}>54K+</h2>
            <p style={statLabel}>Products Sold</p>
          </div>

          <div style={statCard}>
            <h2 style={statValue}>99.9%</h2>
            <p style={statLabel}>Uptime</p>
          </div>
        </section>

        {footer()}
      </main>
    </>
  );
}

const videoBg = {
  position: "fixed" as const,
  inset: 0,
  width: "100vw",
  height: "100vh",
  objectFit: "cover",
  zIndex: -3,
};

const videoOverlay = {
  position: "fixed" as const,
  inset: 0,
  background:
    "linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.85))",
  zIndex: -2,
};

const page = {
  position: "relative" as const,
  zIndex: 1,
  color: "white",
};

const hero = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  justifyContent: "center",
};

const heroTitle = { fontSize: 60, fontWeight: 900 };
const heroSubtitle = { opacity: 0.8, marginBottom: 40 };

const carousel = {
  position: "relative" as const,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const track = {
  position: "relative" as const,
  width: CARD_WIDTH,
  height: 380,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  perspective: 1200,
  pointerEvents: "none",
};

const card = {
  position: "absolute" as const,
  left: "50%",
  transform: "translateX(-50%)",
  width: 280,
  height: 360,
  background: "rgba(20,20,25,0.92)",
  borderRadius: 16,
  padding: 24,
  border: "1px solid rgba(255,255,255,0.1)",
  boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
};

const cardButton = {
  marginTop: 20,
  background: "linear-gradient(90deg,#b11212,#22c55e)",
  border: "none",
  padding: "10px 16px",
  borderRadius: 8,
  color: "white",
  fontWeight: 700,
  cursor: "pointer",
};

const arrow = {
  position: "absolute" as const,
  zIndex: 10,
  top: "50%",
  transform: "translateY(-50%)",
  fontSize: 32,
  width: 48,
  height: 48,
  borderRadius: "50%",
  background: "rgba(255,255,255,0.12)",
  border: "1px solid rgba(255,255,255,0.25)",
  color: "white",
  cursor: "pointer",
};

const statsSection = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: 24,
  maxWidth: 1000,
  margin: "140px auto",
  padding: "0 20px",
};

const statCard = {
  background: "rgba(20,20,25,0.9)",
  borderRadius: 14,
  padding: 24,
  textAlign: "center" as const,
  border: "1px solid rgba(255,255,255,0.1)",
};

const statValue = {
  fontSize: 36,
  fontWeight: 900,
  color: "#22c55e",
};

const statLabel = { opacity: 0.8 };
