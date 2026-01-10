import React from "react";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 mt-0">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-gray-700 pb-10">
        {/* Brand / Logo */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-4">The Dreams</h2>
          <p className="text-gray-400 leading-relaxed">
            Your trusted partner in finding, buying, and selling properties.  
            Discover your dream home with ease and confidence.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-5">
            <a
              href="#"
              className="p-2 bg-gray-800 hover:bg-blue-600 rounded-full transition-all duration-300"
            >
              <Facebook className="text-white" size={20} />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-800 hover:bg-pink-500 rounded-full transition-all duration-300"
            >
              <Instagram className="text-white" size={20} />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-800 hover:bg-blue-500 rounded-full transition-all duration-300"
            >
              <Linkedin className="text-white" size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/buy" className="hover:text-white transition">Buy</a></li>
            <li><a href="/rent" className="hover:text-white transition">Rent</a></li>
            <li><a href="sell" className="hover:text-white transition">Sell</a></li>
            <li><a href="/buy" className="hover:text-white transition">Post Property</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Company</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition">About Us</a></li>
            <li><a href="#" className="hover:text-white transition">Careers</a></li>
            <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <MapPin size={18} className="text-blue-500" />
              <span>123 Estate Avenue, Mumbai, India</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-blue-500" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-blue-500" />
              <span>support@dreamhome.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center text-gray-500 text-sm mt-8">
        © {new Date().getFullYear()} DreamHome. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
