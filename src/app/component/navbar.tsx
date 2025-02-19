"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Menu, LogOut, Home } from "lucide-react";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [name, setName] = useState<string>("User Default");
  const [profileImage, setProfileImage] = useState<string>("/default-profile.png");

  const userMenuRef = useRef<HTMLDivElement>(null);
  const transactionMenuRef = useRef<HTMLLIElement>(null); // ✅ Perbaikan tipe elemen

  // Ambil data dari localStorage saat komponen dimuat
  useEffect(() => {
    const loadProfile = () => {
      const savedName = localStorage.getItem("profileName");
      const savedImage = localStorage.getItem("profileImage");

      if (savedName) setName(savedName);
      if (savedImage) setProfileImage(savedImage);
    };

    loadProfile();
    window.addEventListener("storage", loadProfile);

    return () => {
      window.removeEventListener("storage", loadProfile);
    };
  }, []);

  // Tutup menu saat klik di luar area menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (transactionMenuRef.current && !transactionMenuRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isUserMenuOpen || isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserMenuOpen, isDropdownOpen]);

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Home size={28} className="text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">Raga Estate</h1>
        </div>

        {/* Menu Navigasi */}
        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <li>
            <Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link>
          </li>
          <li>
            <Link href="/user" className="hover:text-blue-600">User</Link>
          </li>
          <li>
            <Link href="/room" className="hover:text-blue-600">Properti</Link>
          </li>
          {/* Dropdown Transaction */}
          <li ref={transactionMenuRef} className="relative">
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="hover:text-blue-600">
              Transaction
            </button>
            {isDropdownOpen && (
              <ul className="absolute left-0 mt-2 bg-white border w-40 py-2 rounded shadow-md z-50">
                <li>
                  <Link href="/transaction/booking" className="block px-4 py-2 hover:text-blue-600">
                    Booking
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>

        {/* User Profile / Login */}
        <div className="flex items-center space-x-4">
          <button className="md:hidden">
            <Menu size={28} className="text-gray-700" />
          </button>

          {/* User Menu */}
          <div ref={userMenuRef} className="relative flex items-center space-x-2">
            {/* Foto Profil sebagai tombol */}
            <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="focus:outline-none">
              <img src={profileImage} alt="Profile" className="w-10 h-10 rounded-full border" />
            </button>
            <span className="text-gray-700 font-medium">{name}</span>

            {/* Dropdown Menu */}
            {isUserMenuOpen && (
              <ul className="absolute right-0 mt-40 bg-gray-600 border w-40 py-2 rounded shadow-md z-50">
                <li>
                  <Link href="/profile" className="block px-4 py-2 hover:bg-gray-400">Profile</Link>
                </li>
                <li>
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-400 flex items-center space-x-2">
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
