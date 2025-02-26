"use client";
import { useState } from "react";

const users = [
  { id: 1, name: "Raga Kusnira", email: "raga@gmail.com" },
  { id: 2, name: "Adi Apriyanto", email: "adi@gmail.com" },
  { id: 3, name: "Djohara", email: "djo@gmail.com" },
  { id: 4, name: "Rizki", email: "rzk@gmail.com" },
  { id: 5, name: "Khalil", email: "khl@gmail.com" }
];

export default function UserTable() {
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().startsWith(search.toLowerCase()) ||
      user.email.toLowerCase().startsWith(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Daftar Pengguna</h1>
      <input
        type="text"
        placeholder="Cari berdasarkan nama atau email..."
        className="w-full p-2 mb-4 border border-gray-800 rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-800 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-600 text-white">
              <th className="py-2 px-4 border-b text-left">ID</th>
              <th className="py-2 px-4 border-b text-left">Nama</th>
              <th className="py-2 px-4 border-b text-left">Email</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100 text-gray-800">
                <td className="py-2 px-4 border-b">{user.id}</td>
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}