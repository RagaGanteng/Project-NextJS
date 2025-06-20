'use client';

import { useEffect, useState } from 'react';

interface Room {
  id: number;
  name: string;
  categoryId: number;
  price: number;
  capacity: number;
  description: string;
}

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [formData, setFormData] = useState<Omit<Room, 'id'>>({
    name: '',
    categoryId: 0,
    price: 0,
    capacity: 0,
    description: '',
  });

  const token = localStorage.getItem('access_token');

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://simaru.amisbudi.cloud/api/rooms?status=approved', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error('Gagal mengambil data ruangan');
      }
      const data = await res.json();
      setRooms(data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'categoryId' || name === 'price' || name === 'capacity' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing
      ? `https://simaru.amisbudi.cloud/api/rooms/${selectedRoom?.id}`
      : 'https://simaru.amisbudi.cloud/api/rooms';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error(isEditing ? 'Gagal mengupdate ruangan' : 'Gagal menambahkan ruangan');
      }
      await fetchRooms();
      setShowModal(false);
      setFormData({
        name: '',
        categoryId: 0,
        price: 0,
        capacity: 0,
        description: '',
      });
      setIsEditing(false);
      setSelectedRoom(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEdit = (room: Room) => {
    setIsEditing(true);
    setSelectedRoom(room);
    setFormData({
      name: room.name,
      categoryId: room.categoryId,
      price: room.price,
      capacity: room.capacity,
      description: room.description,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus ruangan ini?')) return;
    try {
      const res = await fetch(`https://simaru.amisbudi.cloud/api/rooms/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error('Gagal menghapus ruangan');
      }
      await fetchRooms();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Daftar Ruangan</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={() => {
          setShowModal(true);
          setIsEditing(false);
          setFormData({
            name: '',
            categoryId: 0,
            price: 0,
            capacity: 0,
            description: '',
          });
        }}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Tambah Ruangan
      </button>
      {loading ? (
        <p>Memuat data...</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Nama</th>
              <th className="border px-4 py-2">Kategori</th>
              <th className="border px-4 py-2">Harga</th>
              <th className="border px-4 py-2">Kapasitas</th>
              <th className="border px-4 py-2">Deskripsi</th>
              <th className="border px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id}>
                <td className="border px-4 py-2">{room.name}</td>
                <td className="border px-4 py-2">{room.categoryId}</td>
                <td className="border px-4 py-2">{room.price}</td>
                <td className="border px-4 py-2">{room.capacity}</td>
                <td className="border px-4 py-2">{room.description}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEdit(room)}
                    className="mr-2 px-3 py-1 bg-yellow-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(room.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96 text-black">
            <h2 className="text-xl font-bold mb-4">
              {isEditing ? 'Edit Ruangan' : 'Tambah Ruangan'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="block mb-1">Nama</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block mb-1">Kategori ID</label>
                <input
                  type="number"
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block mb-1">Harga</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block mb-1">Kapasitas</label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Deskripsi</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="mr-2 px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  {isEditing ? 'Update' : 'Tambah'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
