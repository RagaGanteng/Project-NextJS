"use client";

import { useRouter } from "next/navigation"; // Import useRouter
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

const properties = [
  {
    id: 1,
    name: "204 Mount Olive Road Two",
    price: "$1200",
    area: "340m2",
    beds: 5,
    baths: 2,
    garages: 1,
    image: "https://i.pinimg.com/474x/c7/33/fd/c733fd6e22d884f725d5de7daa7e1771.jpg"
  },
  {
    id: 2,
    name: "Luxury Villa in Beverly Hills",
    price: "$2500",
    area: "500m2",
    beds: 6,
    baths: 4,
    garages: 2,
    image: "https://silpibuilders.com/wp-content/uploads/2021/12/w1.jpg"
  },
  {
    id: 3,
    name: "Modern Apartment Downtown",
    price: "$900",
    area: "200m2",
    beds: 3,
    baths: 2,
    garages: 1,
    image: "https://www.hillam.com.au/wp-content/uploads/2015/08/South-Perth-Residence-II-400x300-c-default.jpg"
  }
];

export default function PropertyList() {
  const router = useRouter(); // Inisialisasi router

  const handleCardClick = (id: number) => {
    router.push(`/transaction/booking?id=${id}`); // Redirect dengan query parameter
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800">Daftar Properti</h1>
      <p className="text-gray-600 mt-2">Temukan properti impian Anda.</p>

      <div className="grid grid-cols-3 gap-6 mt-6">
        {properties.map((property) => (
          <div
            key={property.id}
            className="relative group bg-white rounded-lg overflow-hidden shadow-md cursor-pointer"
            onClick={() => handleCardClick(property.id)} // Tambahkan event click
          >
            <img src={property.image} alt={property.name} className="w-full h-60 object-cover" />

            <div className="absolute bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 w-full">
              <span className="bg-blue-500 text-white px-3 py-1 rounded text-sm">Rent | {property.price}</span>
              <h2 className="text-white text-lg font-semibold mt-2">{property.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
