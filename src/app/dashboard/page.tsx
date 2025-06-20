"use client";

import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";


const data = [
  { name: "Users", value: 120 },
  { name: "Rooms", value: 45 },
  { name: "Transactions", value: 30 },
];

const testimonials = [
  {
    name: "Jake Bale",
    message: "Layanan luar biasa! Sangat merekomendasikan.",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    name: "Jane Smith",
    message: "Properti yang sangat nyaman dan proses booking cepat!",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    name: "David Mauser",
    message: "Pelayanan customer support sangat membantu!",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    name: "Emily Davis",
    message: "Harga terjangkau dengan kualitas terbaik!",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
];

// Foto yang bisa Anda ubah sendiri
const carouselImages = [
  "https://cdn.luxe.digital/media/20240606123225/most-expensive-houses-in-the-world-luxe-digital-2.jpg",
  "https://hips.hearstapps.com/hmg-prod/images/944airoleway-print-64-1642088897.jpg",
  "https://www.contemporist.com/wp-content/uploads/2020/08/modern-house-lighting-architecture-260820-1114-01.jpg",
];

export default function Dashboard() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += 300;
        if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth - scrollRef.current.clientWidth) {
          scrollRef.current.scrollLeft = 0;
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Auto-slide untuk carousel
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 3000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // data agent
  const agents = [
	{
	  name: "Walter White",
	  role: "Chief Executive Officer",
	  image: "https://randomuser.me/api/portraits/men/32.jpg",
	},
	{
	  name: "Sarah Johnson",
	  role: "Rent Manager",
	  image: "https://randomuser.me/api/portraits/women/45.jpg",
	},
	{
	  name: "William Anderson",
	  role: "Sales Manager",
	  image: "https://randomuser.me/api/portraits/men/28.jpg",
	},
  ];
  

   {/*sidebar logic*/}
        
          const [showSidebar, setShowSidebar] = useState(false);
          const router = useRouter();
  
          const sidebarRef = useRef<HTMLDivElement>(null);
        
          useEffect(() => {
            function handleClickOutside(event: MouseEvent) {
              if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                setShowSidebar(false);
              }
            }
          
            if (showSidebar) {
              document.addEventListener("mousedown", handleClickOutside);
            }
          
            return () => {
              document.removeEventListener("mousedown", handleClickOutside);
            };
          }, [showSidebar]);
  

  return (
    <div className="p-0">

        <button
          onClick={() => setShowSidebar(true)}
          className="text-white px-2 py-0 rounded-full size-9 bg-gray-200 mb-4"
        >
          <img src="/menu.png" className="size-5"></img>
        </button>

      {/* Carousel */}
      <div className="relative w-full h-[300px] overflow-hidden rounded-lg shadow-md">

        {carouselImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
      

      {/* Statistik Card */}
      <div className="grid grid-cols-3 gap-6 mt-6">
        <div className="bg-blue-100 p-6 rounded-lg shadow-md">
          <h2 className="text-gray-900 text-xl font-semibold">Total Users</h2>
          <p className="text-gray-700 text-lg">120</p>
        </div>
        <div className="bg-blue-100 p-6 rounded-lg shadow-md">
          <h2 className="text-gray-900 text-xl font-semibold">Total Rooms</h2>
          <p className="text-gray-700 text-lg">45</p>
        </div>
        <div className="bg-blue-100 p-6 rounded-lg shadow-md">
          <h2 className="text-gray-900 text-xl font-semibold">Active Transactions</h2>
          <p className="text-gray-700 text-lg">30</p>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-8 p-6 bg-gray-100 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Data Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="name" stroke="#000000" />
            <YAxis stroke="#000000" />
            <Tooltip
              labelStyle={{ color: "#000000" }}
              contentStyle={{ backgroundColor: "#fff", color: "#000", borderRadius: "10px" }}
            />
            <Bar dataKey="value" fill="url(#colorGradient)" radius={[10, 10, 0, 0]} />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#60A5FA" stopOpacity={0.4} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Testimonials */}
      <div className="mt-8 p-6 bg-white">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Apa Kata Mereka?</h2>
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scroll-smooth scrollbar-hide space-x-4 p-4"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="min-w-[300px] bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center text-center transition-transform hover:scale-105"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mb-3"
              />
              <p className="text-gray-700 italic">"{testimonial.message}"</p>
              <h3 className="mt-2 font-semibold text-lg text-gray-600">{testimonial.name}</h3>
            </div>
          ))}
        </div>
      </div>

	  {/* Agent */}
	  <div className="py-12 bg-gray-100 rounded-xl">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Our Agents</h2>
        <p className="text-gray-600 text-center mb-10">
          Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {agents.map((agent, index) => (
            <div
              key={index}
              className="relative group rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={agent.image}
                alt={agent.name}
                className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4 flex flex-col items-center">
                <h3 className="text-lg font-bold text-gray-900">{agent.name}</h3>
                <p className="text-gray-600">{agent.role}</p>
                <div className="flex space-x-3 mt-3">
                  <FaFacebookF className="text-gray-500 hover:text-blue-600 cursor-pointer" />
                  <FaTwitter className="text-gray-500 hover:text-blue-400 cursor-pointer" />
                  <FaInstagram className="text-gray-500 hover:text-pink-600 cursor-pointer" />
                  <FaLinkedinIn className="text-gray-500 hover:text-blue-700 cursor-pointer" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

	{/* About */}
	<section className="bg-white py-16">
      <div className="container mx-auto text-center px-6">
        <h2 className="text-3xl font-bold text-gray-900">About Us</h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          We are dedicated to providing the best services to our clients. Our team is
          passionate about delivering high-quality work with creativity and innovation.
        </p>
      </div>
    </section>
	<section className="bg-white py-16">
      <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center gap-12">
        {/* Bagian Kiri: Teks */}
        <div className="lg:w-1/2 text-left">
          <p className="text-gray-500 uppercase tracking-widest">Who We Are</p>
          <h2 className="text-4xl font-bold text-gray-900 mt-2">
            Unleashing Potential with Creative Strategy
          </h2>
          <p className="text-gray-600 mt-4 italic">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          {/* List dengan Icon Checklist */}
          <div className="mt-6 space-y-4">
            {[
              "Ullamco laboris nisi ut aliquip ex ea commodo consequat.",
              "Duis aute irure dolor in reprehenderit in voluptate velit.",
              "Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate."
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="text-green-500 w-6 h-6" />
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          	</div>
        	</div>
			{/* Bagian Kanan: Gambar */}
		<div className="lg:w-1/2 grid grid-cols-2 gap-4">
			<div className="row-span-2">
				<img
				src="https://fellow.app/wp-content/uploads/2022/01/team-collaboration.jpg"
				alt="Team Collaboration"
				className="rounded-xl w-full h-auto object-cover"
				/>
			</div>
			<img
				src="https://talent500.com/blog/wp-content/uploads/sites/42/2023/09/gd-group-discussion-tips.jpg"
				alt="Discussion"
				className="rounded-xl w-full h-auto object-cover"
			/>
			<img
				src="https://www.firstfinancial.org/assets/1561580754-BlogHandshake.jpg"
				alt="Handshake"
				className="rounded-xl w-full h-auto object-cover"
			/>
		</div>
		</div>
    </section>

    {showSidebar && (
        <div
          ref={sidebarRef}
          className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-50 p-6 transition-transform duration-300"
        >
          <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-50 p-6 transition-transform duration-300">
          <h2 className="text-xl font-bold mb-4 text-black">Sidebar Menu</h2>
          <ul className="space-y-2 text-black">
            <li>
              <button
                onClick={() => router.push("/dashboard")}
                className="w-full text-left hover:bg-gray-100 p-2 rounded"
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push("/room")}
                className="w-full text-left hover:bg-gray-100 p-2 rounded"
              >
                Properti
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push("/transaction/booking")}
                className="w-full text-left hover:bg-gray-100 p-2 rounded"
              >
                Transaksi
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push("/categories")}
                className="w-full text-left hover:bg-gray-100 p-2 rounded"
              >
                Kategori
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push("/user")}
                className="w-full text-left hover:bg-gray-100 p-2 rounded"
              >
                User
              </button>
            </li>
            <li>
               <button
                onClick={() => router.push("/")}
                className="w-full text-left hover:bg-gray-100 p-2 rounded"
                >
                LogOut
              </button>   
            </li>
          </ul>
          
        </div>
        </div>
      )}


    </div>
  );
}
