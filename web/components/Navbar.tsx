"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        ...nav,
        background: scrolled
          ? "rgba(11,11,18,0.96)"
          : "rgba(11,11,18,0.65)",
        boxShadow: scrolled
          ? "0 10px 30px rgba(0,0,0,0.6)"
          : "none",
      }}
    >
      {/* LOGO */}
      <div
        style={logoWrap}
        onClick={() => router.push("/")}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Image
          src="/logo/logo.png"
          alt="MineRise Logo"
          width={44}
          height={44}
          priority
          style={{
            transition: "filter 0.3s ease",
            filter: hover
              ? "drop-shadow(0 0 22px rgba(177,18,18,0.9))"
              : "drop-shadow(0 0 14px rgba(177,18,18,0.7))",
          }}
        />
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

/* ================= LINK ================= */

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
        color: active ? "#fff" : "#cbd5e1",
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
  padding: "14px 48px",
  backdropFilter: "blur(14px)",
  borderBottom: "1px solid rgba(255,255,255,0.05)",
  transition: "all 0.3s ease",
};

const logoWrap = {
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
};

const links = {
  display: "flex",
  gap: 30,
};

const link = {
  position: "relative" as const,
  textDecoration: "none",
  fontSize: 15,
  fontWeight: 500,
  padding: "6px 2px",
};

const underline = {
  position: "absolute" as const,
  left: 0,
  bottom: -4,
  width: "100%",
  height: 2,
  background: "linear-gradient(90deg,#b11212,#22c55e)",
  transformOrigin: "left",
  transition: "all 0.25s ease",
};
