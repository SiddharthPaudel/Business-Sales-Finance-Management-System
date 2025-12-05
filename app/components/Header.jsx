"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6 md:px-12">
        {/* Logo */}
        <Link href="/">
          <span className="text-xl md:text-2xl font-bold text-gray-600 font-heading">
            SalesDash
          </span>
        </Link>

        {/* CTA Button */}
        <Link
          href="#get-started"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium shadow hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
      </div>
    </header>
  );
}
