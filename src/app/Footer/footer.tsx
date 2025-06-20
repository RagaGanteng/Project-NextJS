"use client";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
	return (
		<footer className="p-10">
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
            © Copyright <span className="font-semibold text-gray-800">RagaEstate</span> All Rights Reserved
          </p>
          <p className="text-blue-600">Designed by TailWind</p>
        </div>
      </footer>
	);
  }