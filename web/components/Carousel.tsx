"use client";

import { useState, useEffect, useRef, CSSProperties } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const slides = [
  { title: "VIP Rank", desc: "Permanent rank with exclusive perks" },
  { title: "Gems", desc: "Purchase in-game currency packs" },
  { title: "Bundles", desc: "Best value combined packages" },
];

const CARD_WIDTH = 320;
const TRACK_WIDTH = 960;

export default function Carousel() {
  const [index, setIndex] = useState(1);
  const [hovering, setHovering] = useState(false);
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

  function onWheel(e: React.WheelEvent) {
    e.preventDefault();
    if (wheelLock.current) return;
    e.deltaY > 0 ? next() : prev();
    wheelLock.current = true;
    setTimeout(() => (wheelLock.current = false), 450);
  }

  return (
    <div
      style={carousel}
      onWheelCapture={onWheel}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <button onClick={prev} style={{ ...arrow, left: -70 }}>‹</button>

      <div style={track}>
        {slides.map((s, i) => {
          const offset = i - index;

          return (
            <motion.div
              key={i}
              animate={{
                x: offset * CARD_WIDTH,
                scale: offset === 0 ? 1.12 : 0.85,
                rotateY: offset * -18,
                opacity: offset === 0 ? 1 : 0.5,
                filter: offset === 0 ? "blur(0px)" : "blur(2px)",
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

      <button onClick={next} style={{ ...arrow, right: -70 }}>›</button>
    </div>
  );
}

/* STYLES */

const carousel: CSSProperties = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const track: CSSProperties = {
  position: "relative",
  width: TRACK_WIDTH,
  height: 380,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  perspective: 1200,
  overflow: "visible",
};

const card: CSSProperties = {
  position: "absolute",
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

const cardButton: CSSProperties = {
  marginTop: 20,
  background: "linear-gradient(90deg,#b11212,#22c55e)",
  border: "none",
  padding: "10px 16px",
  borderRadius: 8,
  color: "white",
  fontWeight: 700,
  cursor: "pointer",
};

const arrow: CSSProperties = {
  position: "absolute",
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
