"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/footer";



const slides = [
  { title: "VIP Rank", desc: "Permanent rank with exclusive perks" },
  { title: "Gems", desc: "Purchase in-game currency packs" },
  { title: "Bundles", desc: "Best value combined packages" },
];


export default function Home() {
  const [index, setIndex] = useState(1);
  const router = useRouter();
  const startX = useRef<number | null>(null);
  const wheelLock = useRef(false);

  const prev = () =>
    setIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
  const next = () =>
    setIndex((i) => (i === slides.length - 1 ? 0 : i + 1));

  useEffect(() => {
    const interval = setInterval(next, 3500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
  const h = (e: any) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  window.addEventListener("keydown", h);
  return () => window.removeEventListener("keydown", h);
}, []);


  function onWheel(e: React.WheelEvent) {
  e.preventDefault();      
  e.stopPropagation();     

  if (wheelLock.current) return;

  if (e.deltaY > 0) next();
  if (e.deltaY < 0) prev();

  wheelLock.current = true;
  setTimeout(() => {
    wheelLock.current = false;
  }, 500);
}


  
  const onTouchStart = (e: React.TouchEvent) =>
    (startX.current = e.touches[0].clientX);

  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    const diff = e.changedTouches[0].clientX - startX.current;
    if (diff > 60) prev();
    if (diff < -60) next();
    startX.current = null;
  };

  return (
    <main style={page}>
      
      <section style={hero}>
        <h1 style={heroTitle}>MineRise Store</h1>
        <p style={heroSubtitle}>
          Premium ranks, gems & perks for our Minecraft server
        </p>

        <div
          style={carousel}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onWheel={onWheel}   
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
                onClick={() => router.push("/products")}
              />
            ))}
          </div>

          <button onClick={next} style={arrow}>›</button>
        </div>
      </section>

      
      <section style={layer}>
        <div style={section}>
          <h2 style={sectionTitle}>What is MineRise?</h2>
          <p style={sectionText}>
            MineRise is a premium Minecraft server store where players can
            purchase ranks, gems, and exclusive bundles. All purchases are
            delivered instantly and securely.
          </p>
        </div>
      </section>

     
      <section style={layer}>
        <div style={features}>
          <Feature title="Instant Delivery" text="Items delivered immediately." />
          <Feature title="Secure Payments" text="Safe and protected checkout." />
          <Feature title="Exclusive Content" text="Unique perks and bonuses." />
        </div>
      </section>

    
      <section style={ctaSection}>
        <h2 style={{ fontSize: 38, marginBottom: 12 }}>
          Ready to power up your gameplay?
        </h2>
        <p style={{ opacity: 0.85, marginBottom: 30 }}>
          Enter the MineRise store and claim your advantages.
        </p>
        <button style={ctaButton} onClick={() => router.push("/products")}>
          Go to Store
        </button>
      </section>

      <Footer />
    </main>
  );
}



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
        filter: active ? "blur(0)" : "blur(2px)",
        pointerEvents: active ? "auto" : "none", // 👈 IMPORTANT
        boxShadow: active
          ? "0 0 70px rgba(177,18,18,0.75)"
          : "0 20px 40px rgba(0,0,0,0.6)",
        zIndex: active ? 2 : 1,
      }}
    >
      <h2>{title}</h2>
      <p style={{ opacity: 0.8 }}>{desc}</p>
      {active && <div style={glow} />}
    </div>
  );
}



const baseTransform = (active: boolean, offset: number) => `
  translateX(${offset * 280}px)
  scale(${active ? 1.1 : 0.9})
  rotateY(${offset * -25}deg)
`;



const page = { background: "#0b0b12", color: "white" };

const hero = {
  minHeight: "100vh",
  background: `
    radial-gradient(circle at top, rgba(177,18,18,0.45), transparent 55%),
    radial-gradient(circle at bottom, rgba(34,197,94,0.15), transparent 60%),
    #0b0b12
  `,
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  justifyContent: "center",
  paddingBottom: 120,
};

const heroTitle = {
  fontSize: 60,
  fontWeight: 900,
  textShadow: "0 0 30px rgba(177,18,18,0.6)",
};

const heroSubtitle = { fontSize: 18, color: "#d1d5db", marginBottom: 50 };

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
  background: "linear-gradient(180deg,#1b1b21,#101014)",
  borderRadius: 16,
  padding: 24,
  border: "1px solid rgba(255,255,255,0.06)",
  transition: "all 0.4s ease",
  cursor: "pointer",
};

const glow = {
  position: "absolute" as const,
  inset: -20,
  background:
    "radial-gradient(circle, rgba(177,18,18,0.25), transparent 60%)",
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

const layer = {
  background: "linear-gradient(180deg, transparent, #0f0f15)",
  padding: "120px 20px",
};

const section = {
  maxWidth: 900,
  margin: "0 auto",
  textAlign: "center" as const,
};

const sectionTitle = { fontSize: 36, marginBottom: 16 };
const sectionText = { fontSize: 18, opacity: 0.85 };

const features = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 24,
  maxWidth: 1100,
  margin: "0 auto",
};

const featureCard = {
  background: "#141419",
  padding: 24,
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.06)",
};

const ctaSection = {
  textAlign: "center" as const,
  padding: "120px 20px",
  background:
    "radial-gradient(circle at center, rgba(177,18,18,0.2), transparent 70%)",
};

const ctaButton = {
  background: "linear-gradient(90deg,#b11212,#22c55e)",
  border: "none",
  padding: "16px 32px",
  borderRadius: 10,
  color: "white",
  fontSize: 18,
  fontWeight: 700,
  cursor: "pointer",
  boxShadow: "0 0 30px rgba(177,18,18,0.5)",
};
