"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "", // Menambahkan password_confirmation
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error message saat submit

    try {
      const res = await fetch("https://simaru.amisbudi.cloud/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      setLoading(false);

      if (!res.ok) {
        // Tangani response error dari API dengan lebih detail
        const data = await res.json();
        setError(data.error || "Terjadi kesalahan, silakan coba lagi.");
      } else {
        alert("Registrasi berhasil! Silakan login.");
        router.push("/login");
      }
    } catch (err) {
      setLoading(false);
      // Tangani kesalahan koneksi atau kesalahan lain
      setError("Terjadi kesalahan pada jaringan. Silakan coba lagi.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('/house123.jpg')", // Ganti dengan path gambar kamu
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto text-black bg-white bg-opacity-80 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center text-black">Register</h2>

        {error && <div className="text-red-600 mb-4">{error}</div>} {/* Tampilkan error jika ada */}

        <input
          type="text"
          placeholder="Name"
          className="w-full border p-2 mb-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          disabled={loading} // Disable input saat loading
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-2"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          disabled={loading} // Disable input saat loading
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-2"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          disabled={loading} // Disable input saat loading
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full border p-2 mb-4"
          value={form.password_confirmation}
          onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })}
          disabled={loading} // Disable input saat loading
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          disabled={loading} // Disable button saat loading
        >
          {loading ? "Loading..." : "Register"} {/* Menampilkan Loading jika sedang dalam proses */}
        </button>
      </form>
    </div>
  );
}
