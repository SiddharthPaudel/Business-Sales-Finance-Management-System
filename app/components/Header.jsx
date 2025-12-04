"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-gray-800 tracking-wide">SkillSphere</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
          {["Home", "Dashboard", "Modules", "Contact"].map((item) => (
            <li key={item} className="cursor-pointer hover:text-blue-600 transition">
              {item}
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <button className="hidden md:block bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
          Get Started
        </button>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg w-full px-6 py-4 flex flex-col gap-4 text-gray-700 font-medium">
          {["Home", "Dashboard", "Modules", "Contact"].map((item) => (
            <li
              key={item}
              className="hover:text-blue-600 cursor-pointer list-none"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </li>
          ))}
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
            Get Started
          </button>
        </div>
      )}
    </header>
  );
}
