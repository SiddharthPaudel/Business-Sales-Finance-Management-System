"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header({ user }) {
  // user = null if not logged in
  return (
    <header className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6 md:px-12">
        {/* Logo */}
        <Link href="/">
          <span className="text-2xl md:text-2xl font-bold text-gray-600 font-heading">
            Sales <span className="text-blue-600">Dash</span>
          </span>
        </Link>

        {/* Navigation / CTA */}
        {user ? (
          // Logged-in menu
          <nav className="flex items-center gap-6 font-medium text-gray-700">
            <Link href="/dashboard" className="hover:text-blue-600 transition">
              Dashboard
            </Link>
            <Link href="/sales" className="hover:text-blue-600 transition">
              Sales
            </Link>
            <Link href="/customers" className="hover:text-blue-600 transition">
              Customers
            </Link>
            <Link href="/reports" className="hover:text-blue-600 transition">
              Reports
            </Link>
            <Link href="/settings" className="hover:text-blue-600 transition">
              Settings
            </Link>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              onClick={() => {
                // logout logic here
              }}
            >
              Logout
            </button>
          </nav>
        ) : (
          // Not logged-in
          <Link
            href="/login"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium shadow hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
        )}
      </div>
    </header>
  );
}
