"use client";

import Carousel from "@/components/Carousel";
import ServerStats from "@/components/ServerStats";
import SneakPeek from "@/components/SneakPeek";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <video autoPlay loop muted playsInline style={videoBg as React.CSSProperties}>
        <source src="/bg.mp4" type="video/mp4" />
      </video>

      <div style={overlay as React.CSSProperties} />

      <main style={page as React.CSSProperties}>
        <section style={hero as React.CSSProperties}>
          <h1 style={title}>MineRise Store</h1>
          <p style={subtitle}>
            Premium ranks, gems & perks for our Minecraft server
          </p>
          <Carousel />
        </section>
        <ServerStats />
        <SneakPeek />
        <Footer />
      </main>
    </>
  );
}

/* styles */

const videoBg = {
  position: "fixed",
  inset: 0,
  width: "100vw",
  height: "100vh",
  objectFit: "cover",
  zIndex: -3,
};

const overlay = {
  position: "fixed",
  inset: 0,
  background:
    "linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.85))",
  zIndex: -2,
};

const page = {
  position: "relative",
  zIndex: 1,
  color: "white",
};

const hero = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
};

const title = {
  fontSize: 64,
  fontWeight: 900,
};

const subtitle = {
  opacity: 0.85,
  marginBottom: 40,
  maxWidth: 520,
};
