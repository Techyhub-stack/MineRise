"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav style={nav}>
      <div style={logo} onClick={() => router.push("/")}>
        MineRise
      </div>

      <div style={links}>
        <Link href="/products">Store</Link>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
      </div>
    </nav>
  );
}

const nav = {
  position: "sticky" as const,
  top: 0,
  zIndex: 50,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "14px 40px",
  background: "rgba(11,11,18,0.8)",
  backdropFilter: "blur(10px)",
  borderBottom: "1px solid #222",
};

const logo = {
  fontSize: 20,
  fontWeight: 700,
  cursor: "pointer",
};

const links = {
  display: "flex",
  gap: 24,
};
