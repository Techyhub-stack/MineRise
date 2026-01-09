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
                scale: offset === 0 ? 1.1 : 0.85,
                opacity: offset === 0 ? 1 : 0.5,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              style={{
                ...card,
                pointerEvents: offset === 0 ? "auto" : "none",
              }}
            >
              <h2>{s.title}</h2>
              <p>{s.desc}</p>
              {offset === 0 && (
                <button onClick={() => router.push("/products")}>
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

const carousel: CSSProperties = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const track: CSSProperties = {
  position: "relative",
  width: CARD_WIDTH,
  height: 360,
};

const card: CSSProperties = {
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  width: 280,
  height: 340,
  background: "#141419",
  borderRadius: 16,
  padding: 24,
};

const arrow: CSSProperties = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  fontSize: 32,
  background: "transparent",
  color: "white",
  border: "none",
  cursor: "pointer",
};
