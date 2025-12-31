"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Registration failed");

      router.push("/login");
    } catch (err: any) {
      setError(err.message || "Register failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={page}>
      <form style={card} onSubmit={submit}>
        <h1 style={title}>Register</h1>

        <input
          style={input}
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />

        <input
          style={input}
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          style={input}
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        {error && <p style={errorStyle}>{error}</p>}

        <button style={button} disabled={loading}>
          {loading ? "Creating account..." : "Register"}
        </button>

        <p style={switchText}>
          Already have an account?{" "}
          <span style={link} onClick={() => router.push("/login")}>
            Login
          </span>
        </p>
      </form>
    </main>
  );
}

const page = {
  minHeight: "100vh",
  background: "#0b0b12",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
};

const card = {
  width: 360,
  padding: 32,
  borderRadius: 16,
  background: "#141419",
  border: "1px solid rgba(255,255,255,0.06)",
};

const title = {
  fontSize: 32,
  marginBottom: 24,
  textAlign: "center" as const,
};

const input = {
  width: "100%",
  padding: "12px 14px",
  marginBottom: 16,
  borderRadius: 8,
  border: "1px solid #333",
  background: "#0b0b12",
  color: "white",
};

const button = {
  width: "100%",
  padding: "12px",
  borderRadius: 10,
  border: "none",
  background: "linear-gradient(90deg,#b11212,#22c55e)",
  color: "white",
  fontWeight: 700,
  cursor: "pointer",
};

const errorStyle = {
  color: "#ef4444",
  marginBottom: 12,
  textAlign: "center" as const,
};

const switchText = {
  marginTop: 18,
  textAlign: "center" as const,
  opacity: 0.8,
};

const link = {
  color: "#22c55e",
  cursor: "pointer",
};
