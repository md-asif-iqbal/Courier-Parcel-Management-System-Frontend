"use client";
import { useState, useContext } from "react";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";
import { AuthContext } from "@/contexts/AuthContext";

const LINKS_BY_ROLE = {
  customer: [
    { href: "/customer/dashboard", label: "Dashboard" },
    { href: "/customer/book", label: "Book Parcel" },
    { href: "/customer/history", label: "History" },
  ],
  agent: [
    { href: "/agent/dashboard", label: "Agent Dashboard" },
    
  ],
  admin: [
    { href: "/admin/dashboard", label: "Admin Dashboard" },
    { href: "/admin/users", label: "Manage Users" },
    { href: "/admin/parcels", label: "Manage Parcels" },
    { href: "/admin/analytics", label: "View Analytics" },
    { href: "/admin/reports", label: "Generate Reports" },
  ],
};

export default function Sidebar() {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const links = user?.role
    ? LINKS_BY_ROLE[user.role] || []
    : [];

  return (
    <div className="flex bg-sky-400 h-screen">
      <button
        className="md:hidden m-2 text-2xl"
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle sidebar"
      >
        {open ? <HiX /> : <HiMenu />}
      </button>
      <aside
        className={`bg-sky-200  shadow-md h-full ${
          open ? "block" : "hidden"
        } md:block w-56`}
      >
        <nav className="flex flex-col p-4 space-y-2">
          {links.map((ln, i) => (
            <Link
              key={ln.href}
              href={ln.href}
              className="px-2 py-1 font-semibold rounded hover:bg-gray-100 hover:border-1 hover:border-rose-500"
            >
              {ln.label}
            </Link>
          ))}
        </nav>
      </aside>
    </div>
  );
}
