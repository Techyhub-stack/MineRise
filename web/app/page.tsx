"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";

/* ================= DATA ================= */

const slides = [
  { title: "VIP Rank", desc: "Permanent rank with exclusive perks" },
  { title: "Gems", desc: "Purchase in-game currency packs" },
  { title: "Bundles", desc: "Best value combined packages" },
];

/* ================= PAGE ================= */

export default function Home() {
  const [index, setIndex] = useState(1);
  const router = useRouter();
  const startX = useRef<number | null>(null);

  function prev() {
    setIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
  }

  function next() {
    setIndex((i) => (i === slides.length - 1 ? 0 : i + 1));
  }

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(next, 3500);
    return () => clearInterval(interval);
  }, []);

  // Keyboard arrows
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Mobile swipe
  function onTouchStart(e: React.TouchEvent) {
    startX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (startX.current === null) return;
    const diff = e.changedTouches[0].clientX - startX.current;
    if (diff > 60) prev();
    if (diff < -60) next();
    startX.current = null;
  }

  return (
    <main style={bg}>
      {/* ================= HERO ================= */}
      <section style={hero}>
        <h1 style={heroTitle}>MineRise Store</h1>
        <p style={heroSubtitle}>
          Premium ranks, gems & perks for our Minecraft server
        </p>

        <div
          style={carousel}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button onClick={prev} style={arrow}>‹</button>

          <div style={track}>
            {slides.map((s, i) => (
              <TiltCard
                key={i}
                title={s.title}
                desc={s.desc}
                active={i === index}
                offset={i - index}
                onClick={() => router.push("/products?from=hero")}
              />
            ))}
          </div>

          <button onClick={next} style={arrow}>›</button>
        </div>
      </section>

      {/* ================= INFO ================= */}
      <section className="fade-up" style={section}>
        <h2 style={sectionTitle}>What is MineRise?</h2>
        <p style={sectionText}>
          MineRise is a premium Minecraft server store where players can purchase
          ranks, gems, and exclusive bundles to enhance gameplay. All purchases
          are delivered instantly and securely.
        </p>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="fade-up" style={features}>
        <Feature title="Instant Delivery" text="Items are delivered immediately after purchase." />
        <Feature title="Secure Payments" text="All transactions are handled safely." />
        <Feature title="Exclusive Content" text="Unlock special ranks, perks, and bonuses." />
      </section>

      {/* ================= CTA ================= */}
      <section className="fade-up" style={ctaSection}>
        <h2 style={{ fontSize: 36, marginBottom: 10 }}>
          Ready to upgrade your gameplay?
        </h2>
        <p style={{ opacity: 0.85, marginBottom: 30 }}>
          Explore the store and unlock premium features today.
        </p>
        <button
          style={ctaButton}
          onClick={() => router.push("/products")}
        >
          Go to Store
        </button>
      </section>

      <Footer />
    </main>
  );
}

/* ================= COMPONENTS ================= */

function Feature({ title, text }: { title: string; text: string }) {
  return (
    <div style={featureCard}>
      <h3>{title}</h3>
      <p style={{ opacity: 0.8 }}>{text}</p>
    </div>
  );
}

function TiltCard({
  title,
  desc,
  active,
  offset,
  onClick,
}: {
  title: string;
  desc: string;
  active: boolean;
  offset: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMouseMove(e: React.MouseEvent) {
    if (!ref.current || !active) return;
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const rx = ((y / r.height) - 0.5) * -10;
    const ry = ((x / r.width) - 0.5) * 10;
    ref.current.style.transform += ` rotateX(${rx}deg) rotateY(${ry}deg)`;
  }

  function reset() {
    if (!ref.current) return;
    ref.current.style.transform = baseTransform(active, offset);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={reset}
      onClick={onClick}
      style={{
        ...card,
        transform: baseTransform(active, offset),
        opacity: Math.abs(offset) > 2 ? 0 : 1,
        filter: active ? "blur(0)" : "blur(2px)",
        zIndex: active ? 2 : 1,
        boxShadow: active
          ? "0 0 60px rgba(168,85,247,0.7)"
          : "0 20px 40px rgba(0,0,0,0.6)",
      }}
    >
      <h2>{title}</h2>
      <p style={{ opacity: 0.8 }}>{desc}</p>
      {active && <div style={glow} />}
    </div>
  );
}

/* ================= HELPERS ================= */

function baseTransform(active: boolean, offset: number) {
  return `
    translateX(${offset * 280}px)
    scale(${active ? 1.1 : 0.9})
    rotateY(${offset * -25}deg)
  `;
}

/* ================= STYLES ================= */

const bg = {
  background: "#0b0b12",
  color: "white",
};

const hero = {
  minHeight: "100vh",
  background: "radial-gradient(circle at top, #5b0f9b, #0b0b12 65%)",
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  justifyContent: "center",
  paddingBottom: 120,
};

const heroTitle = { fontSize: 56, marginBottom: 12 };
const heroSubtitle = { fontSize: 18, opacity: 0.85, marginBottom: 50 };

const carousel = { display: "flex", alignItems: "center", gap: 40 };
const track = { position: "relative" as const, width: 280, height: 360, perspective: 1200 };

const card = {
  position: "absolute" as const,
  width: 280,
  height: 360,
  background: "#16161d",
  borderRadius: 16,
  padding: 24,
  border: "1px solid #222",
  transition: "all 0.4s ease",
  cursor: "pointer",
};

const glow = {
  position: "absolute" as const,
  inset: -20,
  background: "radial-gradient(circle, rgba(168,85,247,0.25), transparent 60%)",
  zIndex: -1,
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

const section = {
  maxWidth: 900,
  margin: "120px auto",
  textAlign: "center" as const,
};

const sectionTitle = { fontSize: 36, marginBottom: 16 };
const sectionText = { fontSize: 18, opacity: 0.85 };

const features = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 24,
  maxWidth: 1100,
  margin: "0 auto 120px",
};

const featureCard = {
  background: "#16161d",
  padding: 24,
  borderRadius: 14,
  border: "1px solid #222",
};

const ctaSection = {
  textAlign: "center" as const,
  padding: "120px 20px",
  background: "radial-gradient(circle at center, rgba(168,85,247,0.15), transparent 70%)",
};

const ctaButton = {
  background: "linear-gradient(90deg,#9333ea,#ec4899)",
  border: "none",
  padding: "14px 28px",
  borderRadius: 10,
  color: "white",
  fontSize: 18,
  cursor: "pointer",
};
