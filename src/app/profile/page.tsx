"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter

const Profile = () => {
  const router = useRouter(); // Inisialisasi router
  const [name, setName] = useState<string>("User Default");
  const [profileImage, setProfileImage] = useState<string>("/default-profile.png");

  useEffect(() => {
    const savedName = localStorage.getItem("profileName");
    const savedImage = localStorage.getItem("profileImage");

    if (savedName) setName(savedName);
    if (savedImage) setProfileImage(savedImage);
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setProfileImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem("profileName", name);
    localStorage.setItem("profileImage", profileImage);

    // Memicu event untuk memberi tahu Navbar ada perubahan data
    window.dispatchEvent(new Event("storage"));

    // Arahkan pengguna ke Dashboard setelah menyimpan
    router.push("/dashboard");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <div className="flex flex-col items-center">
        <img src={profileImage} alt="Profile" className="w-32 h-32 rounded-full mb-4 border" />
        <input type="file" accept="image/*" onChange={handleImageChange} className="mb-4" />
      </div>
      <label className="block mb-2 text-gray-700">Name</label>
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        className="w-full p-2 border rounded mb-4"
      />
      <button
        onClick={handleSave}
        className="block w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save
      </button>
    </div>
  );
};

export default Profile;

