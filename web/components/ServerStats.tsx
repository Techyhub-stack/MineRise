"use client";

import { useEffect, useState } from "react";
import AnimatedNumber from "@/components/AnimatedNumber";

export default function ServerStats() {
  const [stats, setStats] = useState({
    online: 0,
    max: 0,
  });

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "/stats"
        );
        const data = await res.json();

        if (!alive) return;

        setStats({
          online: data.onlinePlayers ?? 0,
          max: data.maxPlayers ?? 0,
        });
      } catch {
        if (!alive) return;
        setStats({ online: 0, max: 0 });
      }
    }

    load();
    const id = setInterval(load, 15000);

    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  return (
    <section style={wrap as React.CSSProperties}>
      <div style={card as React.CSSProperties}>
        <h2 style={value}>
          <AnimatedNumber value={stats.online} />
        </h2>
        <p style={label}>Players Online</p>
      </div>

      <div style={card as React.CSSProperties}>
        <h2 style={value}>
          <AnimatedNumber value={stats.max} />
        </h2>
        <p style={label}>Max Slots</p>
      </div>
    </section>
  );
}

const wrap = {
  display: "flex",
  justifyContent: "center",
  gap: 40,
  margin: "120px auto",
};

const card = {
  minWidth: 220,
  padding: 28,
  textAlign: "center" as const,
  background: "rgba(20,20,25,0.85)",
  borderRadius: 16,
  border: "1px solid rgba(255,255,255,0.1)",
};

const value = {
  fontSize: 42,
  fontWeight: 900,
  color: "#22c55e",
};

const label = {
  opacity: 0.8,
};
