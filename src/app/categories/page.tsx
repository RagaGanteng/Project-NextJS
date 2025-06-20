'use client';

import { useEffect, useState } from 'react';

interface Category {
  id: number;
  name: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const accessToken = 'access_token'; // Ganti dengan token asli atau ambil dari session/localStorage

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('https://simaru.amisbudi.cloud/api/categories', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json',
          },
        });

        if (!res.ok) {
          const errText = await res.text();
          throw new Error(`Status ${res.status}: ${errText}`);
        }

        const data = await res.json();
        setCategories(data);
      } catch (err: any) {
        setError(err.message || 'Gagal mengambil data kategori');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Daftar Kategori</h1>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.id} className="p-2 bg-gray-100 rounded shadow">
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
