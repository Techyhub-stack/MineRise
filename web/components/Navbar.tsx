"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        ...nav,
        background: scrolled
          ? "rgba(11,11,18,0.95)"
          : "rgba(11,11,18,0.6)",
        boxShadow: scrolled
          ? "0 10px 30px rgba(0,0,0,0.4)"
          : "none",
      }}
    >
      {/* LOGO */}
      <div style={logo} onClick={() => router.push("/")}>
        MineRise
      </div>

      {/* LINKS */}
      <div style={links}>
        <NavLink href="/products" active={pathname === "/products"}>
          Store
        </NavLink>
        <NavLink href="/login" active={pathname === "/login"}>
          Login
        </NavLink>
        <NavLink href="/register" active={pathname === "/register"}>
          Register
        </NavLink>
      </div>
    </nav>
  );
}

/* ================= LINK COMPONENT ================= */

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      style={{
        ...link,
        color: active ? "#fff" : "#cfcfe8",
      }}
    >
      {children}
      <span
        style={{
          ...underline,
          opacity: active ? 1 : 0,
          transform: active ? "scaleX(1)" : "scaleX(0)",
        }}
      />
    </Link>
  );
}

/* ================= STYLES ================= */

const nav = {
  position: "sticky" as const,
  top: 0,
  zIndex: 100,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px 48px",
  backdropFilter: "blur(14px)",
  borderBottom: "1px solid rgba(255,255,255,0.06)",
  transition: "all 0.3s ease",
};

const logo = {
  fontSize: 22,
  fontWeight: 800,
  letterSpacing: "0.5px",
  cursor: "pointer",
  background: "linear-gradient(90deg,#9333ea,#ec4899)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textShadow: "0 0 20px rgba(168,85,247,0.4)",
};

const links = {
  display: "flex",
  gap: 28,
  alignItems: "center",
};

const link = {
  position: "relative" as const,
  textDecoration: "none",
  fontSize: 15,
  fontWeight: 500,
  padding: "6px 2px",
  transition: "color 0.2s ease",
};

const underline = {
  position: "absolute" as const,
  left: 0,
  bottom: -4,
  width: "100%",
  height: 2,
  background: "linear-gradient(90deg,#9333ea,#ec4899)",
  transformOrigin: "left",
  transition: "all 0.25s ease",
};
