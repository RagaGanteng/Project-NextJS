"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const defaultName = "";
const defaultProfileImage =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png";

const Profile = () => {
  const router = useRouter();
  const [name, setName] = useState<string>(defaultName);
  const [profileImage, setProfileImage] = useState<string>(defaultProfileImage);

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
    window.dispatchEvent(new Event("storage"));
    router.push("/dashboard");
  };

  const handleResetProfile = () => {
    setName(defaultName);
    setProfileImage(defaultProfileImage);
    localStorage.setItem("profileName", defaultName);
    localStorage.setItem("profileImage", defaultProfileImage);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-600">Edit Profile</h2>

      <div className="flex flex-col items-center">
        <img src={profileImage} alt="Profile" className="w-32 h-32 rounded-full mb-4 border" />
        <input type="file" accept="image/*" onChange={handleImageChange} className="mb-4" />
      </div>

      <label className="block mb-2 text-gray-700">Name</label>
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        className="w-full p-2 border rounded mb-4 text-gray-600"
      />

      <button
        onClick={handleSave}
        className="block w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-2"
      >
        Save
      </button>

      <button
        onClick={handleResetProfile}
        className="block w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Reset Profile
      </button>
    </div>
  );
};

export default Profile;
