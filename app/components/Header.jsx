"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import ConfirmationModal from "./ConfirmationModal";
export default function Header() {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <header className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6 md:px-12">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-700 font-heading">
          Sales <span className="text-blue-600">Dash</span>
        </Link>

        {/* Navigation */}
        {session ? (
          <nav className="flex items-center gap-8 text-gray-700 font-medium">
            <Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link>
            <Link href="/sales" className="hover:text-blue-600">Sales</Link>
            <Link href="/product" className="hover:text-blue-600">Product</Link>
            <Link href="/reports" className="hover:text-blue-600">Reports</Link>

            {/* Profile */}
            <div className="flex items-center gap-3 ml-6 relative">

              {/* Avatar & Username */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2"
              >
                {session.user?.image ? (
                  <img
                    src={session.user.image}
                    alt="Avatar"
                    className="w-9 h-9 rounded-full border"
                  />
                ) : (
                  <FaUserCircle className="text-gray-500" size={32} />
                )}
                <span className="font-semibold">{session.user.name}</span>
              </button>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 ml-4 px-3 py-1.5 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition"
              >
                Logout
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l3 3m0 0l-3 3m3-3H3"
                  />
                </svg>
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 top-12 w-40 bg-white border rounded-xl shadow-lg py-2">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Settings
                  </Link>
                </div>
              )}
            </div>
          </nav>
        ) : (
          <Link
            href="/login"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium shadow hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
  <ConfirmationModal
    title="Confirm Logout"
    message="Are you sure you want to logout?"
    onCancel={() => setShowLogoutModal(false)}
    onConfirm={() => signOut({ callbackUrl: "/" })}
  />
)}
    </header>
  );
}
