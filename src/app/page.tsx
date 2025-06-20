"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  const handleRegisterRedirect = () => {
    router.push("/register");
  };

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: "url('/house123.jpg')", // Ganti dengan path gambar kamu
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ><main className="flex flex-col gap-8 row-start-1 items-center justify-center min-h-screen bg-opacity-70 bg-black p-8 rounded-md">
    <h1 className="text-3xl font-bold text-center sm:text-left text-white">
      Selamat datang di Raga Estate
    </h1>
    <p className="text-center text-lg mb-4 text-white">
      Raga Estate adalah platform penjualan properti yang menyediakan berbagai pilihan rumah, apartemen, dan tanah di lokasi strategis. Temukan hunian impian Anda di sini dengan harga yang bersaing dan kualitas terbaik.
    </p>

    <button
      onClick={handleRegisterRedirect}
      className="bg-blue-600 text-white px-6 py-3 rounded-md mb-4 transition-colors hover:bg-blue-700"
    >
      Daftar Sekarang
    </button>

    <div className="text-center sm:text-left">
      <p className="text-lg text-white">
        Sudah punya akun?{" "}
        <button
          onClick={handleLoginRedirect}
          className="text-blue-600 underline hover:text-blue-800"
        >
          Login
        </button>
      </p>
    </div>
  </main>
      
    </div>
  );
}
