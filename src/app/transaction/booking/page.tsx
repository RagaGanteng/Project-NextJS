"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

interface Booking {
  id: number;
  bookingDate: string;
  roomId: number;
}

export default function TransactionPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const name = searchParams.get("name") ?? "Unknown Property";
  const price = searchParams.get("price") ?? "N/A";
  const image = searchParams.get("image") ?? "/default-image.jpg";

  const [showSidebar, setShowSidebar] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState<string | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const accessToken = "MASUKKAN_TOKEN_DISINI"; // Ganti token dengan dinamis jika pakai auth

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("https://simaru.amisbudi.cloud/api/bookings", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
        });
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        setBookings(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchBookings();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setShowSidebar(false);
      }
    }

    if (showSidebar) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSidebar]);

  return (
    <div className="p-6">
      <button
        onClick={() => setShowSidebar(true)}
        className="text-white px-2 py-0 rounded-full size-9 bg-gray-200 mb-4"
      >
        <img src="/menu.png" className="size-5" />
      </button>

      <h1 className="text-2xl font-bold text-gray-800 mb-4">Transaction Status</h1>

      {showSidebar && (
        <div
          ref={sidebarRef}
          className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-50 p-6 transition-transform duration-300"
        >
          <h2 className="text-xl font-bold mb-4 text-black">Sidebar Menu</h2>
          <ul className="space-y-2 text-black">
            <li><button onClick={() => router.push("/dashboard")} className="w-full text-left hover:bg-gray-100 p-2 rounded">Dashboard</button></li>
            <li><button onClick={() => router.push("/room")} className="w-full text-left hover:bg-gray-100 p-2 rounded">Properti</button></li>
            <li><button onClick={() => router.push("/transaction/booking")} className="w-full text-left hover:bg-gray-100 p-2 rounded">Transaksi</button></li>
            <li><button onClick={() => router.push("/categories")} className="w-full text-left hover:bg-gray-100 p-2 rounded">Kategori</button></li>
            <li><button onClick={() => router.push("/user")} className="w-full text-left hover:bg-gray-100 p-2 rounded">User</button></li>
            <li><button onClick={() => router.push("/")} className="w-full text-left hover:bg-gray-100 p-2 rounded">LogOut</button></li>
          </ul>
        </div>
      )}

      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        bookings.map((booking) => (
          <div
            key={booking.id}
            className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl mb-4"
          >
            <div className="w-full md:w-1/2">
              <img src={image} alt={name} className="w-full h-40 object-cover rounded-lg shadow-md" />
              <h2 className="text-xl font-semibold text-gray-700 mt-4">{name}</h2>
              <p className="text-blue-500 font-bold">{price}</p>
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center bg-gray-100 p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800">Booking #{booking.id}</h3>
              <p className="text-yellow-500 font-medium">Booking Date: {booking.bookingDate}</p>
              <p className="text-gray-600 mt-2 text-sm">Room ID: {booking.roomId}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}