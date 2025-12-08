"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function Header() {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6 md:px-12">
        
        {/* Logo */}
        <Link href="/">
          <span className="text-2xl md:text-2xl font-bold text-gray-600 font-heading">
            Sales <span className="text-blue-600">Dash</span>
          </span>
        </Link>

        {/* Navigation */}
        {session ? (
          <nav className="flex items-center gap-6 font-medium text-gray-700 relative">
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

            {/* User Profile / Dropdown */}
            <div className="ml-4 relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 focus:outline-none"
              >
                {session.user.image && (
                  <img
                    src={session.user.image}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <span className="text-gray-600 font-medium">{session.user.name}</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </nav>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium shadow hover:bg-blue-700 transition"
          >
            Get Started
          </button>
        )}
      </div>
    </header>
  );
}
