import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ padding: 40 }}>
      <h1>MineRise Store</h1>
      <p>Welcome to the official store</p>

      <div style={{ marginTop: 20 }}>
        <Link href="/login">Login</Link>
        <br />
        <Link href="/register">Register</Link>
        <br />
        <Link href="/products">View Store</Link>
      </div>
    </main>
  );
}
