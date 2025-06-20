"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Menu, LogOut, Home } from "lucide-react";
import { useRouter } from "next/navigation"; // Import useRouter

const Navbar = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserMenuOpen]);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("user");

    // Redirect to the home page (localhost:3000)
    router.push("/");
  };

   

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Home size={28} className="text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">Raga Estate</h1>
        </div>

        <div className="flex items-center space-x-4">
          <button className="md:hidden">
            <Menu size={28} className="text-gray-700" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
