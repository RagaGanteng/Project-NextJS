"use client";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([
	{ id: 1, name: "Raga Kusnira", email: "ragakusnira7@gmail.com" },
  ]);

  const [formData, setFormData] = useState<User>({ id: 0, name: "", email: "" });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddUser = () => {
    if (!formData.name || !formData.email) return;

    setUsers([...users, { ...formData, id: users.length + 1 }]); // Pastikan id tetap number
    setFormData({ id: 0, name: "", email: "" });
  };

  const handleEditUser = (user: User) => {
    setFormData(user);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    setUsers(users.map((user) => (user.id === formData.id ? { ...formData, id: Number(formData.id) } : user)));
    setFormData({ id: 0, name: "", email: "" });
    setIsEditing(false);
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

	return (
<div className="w-full p-6">
  <h2 className="text-black text-2xl font-bold mb-4">User Management</h2>

  {/* Form untuk menambah/edit user */}
  <div className="w-full mb-6 flex flex-wrap gap-4 border-blue-950">
    <input
      type="text"
      name="name"
      placeholder="Name"
      value={formData.name}
      onChange={handleChange}
      className="border p-2 rounded flex-grow min-w-[200px]"
    />
    <input
      type="email"
      name="email"
      placeholder="Email"
      value={formData.email}
      onChange={handleChange}
      className="border p-2 rounded flex-grow min-w-[200px]"
    />
    {isEditing ? (
      <button onClick={handleSaveEdit} className="bg-blue-500 text-white px-4 py-2 rounded">
        Save
      </button>
    ) : (
      <button onClick={handleAddUser} className="bg-green-500 text-white px-4 py-2 rounded">
        Add
      </button>
    )}
  </div>

  {/* Tabel user */}
  <div className="overflow-x-auto">
    <table className="min-w-full border-collapse border border-gray-600">
      <thead>
        <tr className="bg-gray-600 text-left">
          <th className="border p-3">ID</th>
          <th className="border p-3">Nama</th>
          <th className="border p-3">Email</th>
          <th className="border p-3 text-center">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} className="text-left text-white bg-slate-500">
            <td className="border p-3">{user.id}</td>
            <td className="border p-3">{user.name}</td>
            <td className="border p-3">{user.email}</td>
            <td className="border p-3 text-center">
              <button onClick={() => handleEditUser(user)} className="bg-yellow-500 text-white px-3 py-1 rounded mx-1">
                Edit
              </button>
              <button onClick={() => handleDeleteUser(user.id)} className="bg-red-500 text-white px-3 py-1 rounded mx-1">
                Hapus
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  {/* Footer */}
  <footer className="py-10 mt-64">
			  <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-700">
				{/* Address */}
				<div>
				  <h3 className="font-semibold">Address</h3>
				  <p>A108 Adam Street</p>
				  <p>New York, NY 535022</p>
				</div>
		
				{/* Contact */}
				<div>
				  <h3 className="font-semibold">Contact</h3>
				  <p>
					<span className="font-bold">Phone:</span> +1 5589 55488 55
				  </p>
				  <p>
					<span className="font-bold">Email:</span> info@example.com
				  </p>
				</div>
		
				{/* Opening Hours */}
				<div>
				  <h3 className="font-semibold">Opening Hours</h3>
				  <p>
					<span className="font-bold">Mon-Sat:</span> 11AM - 11PM
				  </p>
				  <p>
					<span className="font-bold">Sunday:</span> Closed
				  </p>
				</div>
		
				{/* Follow Us */}
				<div>
				  <h3 className="font-semibold">Follow Us</h3>
				  <div className="flex space-x-3 mt-3">
					<div className="p-2 rounded-full border border-gray-400 hover:bg-gray-200 cursor-pointer">
					  <FaXTwitter className="text-gray-500" />
					</div>
					<div className="p-2 rounded-full border border-gray-400 hover:bg-gray-200 cursor-pointer">
					  <FaFacebookF className="text-gray-500" />
					</div>
					<div className="p-2 rounded-full border border-gray-400 hover:bg-gray-200 cursor-pointer">
					  <FaInstagram className="text-gray-500" />
					</div>
					<div className="p-2 rounded-full border border-gray-400 hover:bg-gray-200 cursor-pointer">
					  <FaLinkedinIn className="text-gray-500" />
					</div>
				  </div>
				</div>
			  </div>
		
			  {/* Copyright */}
			  <div className="text-center text-gray-600 mt-8 border-t pt-6">
				<p>
				  © Copyright <span className="font-semibold text-gray-800">EstateAgency</span> All Rights Reserved
				</p>
				<p className="text-blue-600">Designed by BootstrapMade</p>
			  </div>
		
			  {/* Scroll to Top Button */}
			  <button
				className="fixed bottom-6 right-6 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600"
				onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
			  >
				↑
			  </button>
			</footer>
	  </div>	
	);
  }
  