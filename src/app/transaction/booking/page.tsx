"use client";

import { useSearchParams } from "next/navigation";

const properties = [
  {
    id: 1,
    name: "204 Mount Olive Road Two",
    price: "$1200",
    area: "340m2",
    beds: 5,
    baths: 2,
    garages: 1,
    image: "https://i.pinimg.com/474x/c7/33/fd/c733fd6e22d884f725d5de7daa7e1771.jpg",
    description: "A beautiful and spacious home in a quiet neighborhood with modern amenities."
  },
  {
    id: 2,
    name: "Luxury Villa in Beverly Hills",
    price: "$2500",
    area: "500m2",
    beds: 6,
    baths: 4,
    garages: 2,
    image: "https://silpibuilders.com/wp-content/uploads/2021/12/w1.jpg",
    description: "A stunning villa in the heart of Beverly Hills, offering luxury and comfort."
  },
  {
    id: 3,
    name: "Modern Apartment Downtown",
    price: "$900",
    area: "200m2",
    beds: 3,
    baths: 2,
    garages: 1,
    image: "https://www.hillam.com.au/wp-content/uploads/2015/08/South-Perth-Residence-II-400x300-c-default.jpg",
    description: "A modern apartment in a prime downtown location, perfect for city living."
  }
];

export default function BookingPage() {
  const searchParams = useSearchParams();
  const propertyId = searchParams.get("id");
  
  const selectedProperty = properties.find((prop) => prop.id === Number(propertyId));

  if (!selectedProperty) {
    return <p className="text-center text-red-500">Properti tidak ditemukan.</p>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
      {/* Image Section */}
      <div className="w-full lg:w-1/2">
        <img 
          src={selectedProperty.image} 
          alt={selectedProperty.name} 
          className="w-full h-96 object-cover rounded-lg shadow-md" 
        />
      </div>

      {/* Details Section */}
      <div className="w-full lg:w-1/2">
        <h1 className="text-3xl font-bold text-gray-800">{selectedProperty.name}</h1>
        <p className="text-lg text-blue-500 font-bold mt-2">{selectedProperty.price}</p>
        <p className="text-gray-700 mt-4">{selectedProperty.description}</p>

        <table className="mt-6 w-full border border-gray-600 text-left">
          <tbody>
            <tr className="border-b border-gray-600">
              <td className="p-2 font-semibold text-gray-600">Area</td>
              <td className="p-2 text-gray-600">{selectedProperty.area}</td>
            </tr>
            <tr className="border-b border-gray-600">
              <td className="p-2 font-semibold text-gray-600">Beds</td>
              <td className="p-2 text-gray-600">{selectedProperty.beds}</td>
            </tr>
            <tr className="border-b border-gray-600">
              <td className="p-2 font-semibold text-gray-600">Baths</td>
              <td className="p-2 text-gray-600">{selectedProperty.baths}</td>
            </tr>
            <tr>
              <td className="p-2 font-semibold text-gray-600">Garages</td>
              <td className="p-2 text-gray-600">{selectedProperty.garages}</td>
            </tr>
          </tbody>
        </table>

        <button className="mt-6 w-full bg-yellow-500 text-black py-3 rounded-lg font-semibold text-lg hover:bg-yellow-600 transition">
          Lanjutkan Booking
        </button>
      </div>
    </div>
  );
}
