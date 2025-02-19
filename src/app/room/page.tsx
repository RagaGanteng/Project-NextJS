"use client";

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
    image: "https://i.pinimg.com/474x/c7/33/fd/c733fd6e22d884f725d5de7daa7e1771.jpg" // Ganti dengan URL gambar asli
  },
  {
    id: 1,
    name: "204 Mount Olive Road Two",
    price: "$1200",
    area: "340m2",
    beds: 5,
    baths: 2,
    garages: 1,
    image: "https://i.pinimg.com/474x/c7/33/fd/c733fd6e22d884f725d5de7daa7e1771.jpg" // Ganti dengan URL gambar asli
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
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800">Daftar Properti</h1>
      <p className="text-gray-600 mt-2">Temukan properti impian Anda.</p>

      <div className="grid grid-cols-3 gap-6 mt-6">
        {properties.map((property) => (
          <div
            key={property.id}
            className="relative group bg-white rounded-lg overflow-hidden shadow-md"
          >
            <img src={property.image} alt={property.name} className="w-full h-60 object-cover" />

            <div className="absolute bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 w-full">
              <span className="bg-blue-500 text-white px-3 py-1 rounded text-sm">Rent | {property.price}</span>
              <h2 className="text-white text-lg font-semibold mt-2">{property.name}</h2>
            </div>

            <div className="absolute bottom-0 left-0 w-full bg-blue-500 text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="grid grid-cols-4 text-center">
                <div>
                  <p className="text-sm">Area</p>
                  <p className="font-semibold">{property.area}</p>
                </div>
                <div>
                  <p className="text-sm">Beds</p>
                  <p className="font-semibold">{property.beds}</p>
                </div>
                <div>
                  <p className="text-sm">Baths</p>
                  <p className="font-semibold">{property.baths}</p>
                </div>
                <div>
                  <p className="text-sm">Garages</p>
                  <p className="font-semibold">{property.garages}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
       {/* Footer */}
  <footer className="py-10 mt-72">
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