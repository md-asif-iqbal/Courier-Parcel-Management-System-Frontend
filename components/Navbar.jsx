"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import { AuthContext } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center h-16 px-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-extrabold text-indigo-600 hover:text-black"
        >
          Courier & Parcel Management System
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className="text-black font-semibold  px-6 py-2 rounded-md "
          >
            Home
          </Link>
          {!user ? (
            <>
              <Link
                href="/customer/login"
                className="text-white  px-6 py-2 rounded-md bg-green-400"
              >
                Login
              </Link>
            </>
          ) : (
            <>
              {user.role === "customer" && (
                <Link
                  href="/customer/dashboard"
                  className="text-gray-600 hover:text-black px-3 py-2 rounded-md hover:bg-gray-100"
                >
                  Dashboard
                </Link>
              )}
              {user.role === "agent" && (
                <Link
                  href="/agent/dashboard"
                  className="text-gray-600 hover:text-black px-3 py-2 rounded-md hover:bg-gray-100"
                >
                  Agent Dashboard
                </Link>
              )}
              {user.role === "admin" && (
                <>
                  <Link
                    href="/admin/dashboard"
                    className="text-gray-600 hover:text-black px-3 py-2 rounded-md hover:bg-gray-100"
                  >
                    Admin Dashboard
                  </Link>
                  <Link
                    href="/admin/users"
                    className="text-gray-600 hover:text-black px-3 py-2 rounded-md hover:bg-gray-100"
                  >
                    Manage Users
                  </Link>
                </>
              )}
              {/* Logout button last */}
              <button
                onClick={logout}
                className="ml-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 shadow-sm"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle navigation"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          {!user ? (
            <>
              <Link
                href="/customer/login"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Login
              </Link>
              <Link
                href="/"
                className="text-black font-semibold  px-6 py-2 rounded-md "
              >
                Home
              </Link>
            </>
          ) : (
            <>
                {user.role === "customer" && (
                <Link
                  href="/customer/dashboard"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Dashboard
                </Link>
              )}
              {user.role === "agent" && (
                <Link
                  href="/agent/dashboard"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Agent Dashboard
                </Link>
              )}
              {user.role === "admin" && (
                <>
                  <Link
                    href="/admin/dashboard"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Admin Dashboard
                  </Link>
                  <Link
                    href="/admin/users"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Manage Users
                  </Link>
                </>
              )}
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 text-black bg-red-500 hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
