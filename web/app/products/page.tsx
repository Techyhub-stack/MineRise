"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function getUserCurrency() {
  const locale = navigator.language || "en-US";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
  }).resolvedOptions().currency;
}

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
};

export default function Products() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const currency = getUserCurrency();

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main style={page}>
      <section style={header}>
        <h1 style={title}>Products</h1>
        <p style={subtitle}>Choose what you want to purchase</p>
      </section>

      <section style={layout}>
        <div style={grid}>
          {loading && <p>Loading...</p>}

          {!loading &&
            products.map((p) => (
              <div key={p.id} style={card}>
                <h2>{p.name}</h2>
                <p style={{ opacity: 0.8 }}>{p.description}</p>
                <h3 style={price}>${p.price.toFixed(2)}</h3>
                <button
                  style={button}
                  onClick={() => router.push(`/products/${p.id}`)}
                >
                  View Product
                </button>
              </div>
            ))}
        </div>

        <aside style={sidebar}>
          <h3 style={sidebarTitle}>Why buy from us?</h3>
          <ul style={perkList}>
            <li style={perkItem}>Instant delivery</li>
            <li style={perkItem}>Secure payments</li>
            <li style={perkItem}>24/7 availability</li>
            <li style={perkItem}>No chargeback abuse</li>
          </ul>
        </aside>
      </section>
    </main>
  );
}

const page = {
  minHeight: "100vh",
  background: "#0b0b12",
  color: "white",
  paddingBottom: 120,
};

const header = {
  padding: "120px 20px 60px",
  textAlign: "center" as const,
};

const title = {
  fontSize: 52,
  fontWeight: 900,
};

const subtitle = {
  marginTop: 12,
  color: "#d1d5db",
};

const layout = {
  display: "flex",
  gap: 40,
  maxWidth: 1200,
  margin: "0 auto",
  padding: "0 20px",
};

const grid = {
  flex: 1,
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
  gap: 24,
};

const card = {
  background: "#141419",
  borderRadius: 16,
  padding: 24,
  border: "1px solid rgba(255,255,255,0.06)",
  display: "flex",
  flexDirection: "column" as const,
};

const price = {
  marginTop: 12,
  fontSize: 24,
  fontWeight: 800,
  color: "#22c55e",
};

const button = {
  marginTop: "auto",
  padding: "12px",
  borderRadius: 10,
  border: "none",
  background: "linear-gradient(90deg,#b11212,#22c55e)",
  color: "white",
  fontWeight: 700,
  cursor: "pointer",
};

const sidebar = {
  width: 320,
  background: "#141419",
  borderRadius: 16,
  padding: 24,
  border: "1px solid rgba(255,255,255,0.06)",
  height: "fit-content",
};

const sidebarTitle = {
  marginBottom: 16,
  fontSize: 20,
};

const perkList = {
  listStyle: "none",
  padding: 0,
  margin: 0,
};

const perkItem = {
  marginBottom: 12,
  opacity: 0.85,
};
