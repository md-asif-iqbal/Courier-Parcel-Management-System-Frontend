"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import api from "@/lib/axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    agents: 0,
    parcels: 0,
  });
  useEffect(() => {
    api
      .get("/api/admin/stats")
      .then((res) => setStats(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="flex h-screen w-full bg-green-200">
      <Sidebar />
      <main className="flex-1 p-6  overflow-auto">
        <h1 className="text-3xl font-bold mb-6">
          Admin Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            href="/admin/users"
            className="p-4 bg-white rounded shadow hover:bg-gray-100"
          >
            <h2 className="text-xl">Users</h2>
            <p className="text-3xl font-semibold">
              {stats.users}
            </p>
          </Link>
          <Link
            href="/admin/parcels"
            className="p-4 bg-white rounded shadow hover:bg-gray-100"
          >
            <h2 className="text-xl">Parcels</h2>
            <p className="text-3xl font-semibold">
              {stats.parcels}
            </p>
          </Link>
          <Link
            href="/admin/analytics"
            className="p-4 bg-white rounded shadow hover:bg-gray-100"
          >
            <h2 className="text-xl">Analytics</h2>
            <p className="text-xl font-semibold">View</p>
          </Link>
          <Link
            href="/admin/reports"
            className="p-4 bg-white rounded shadow hover:bg-gray-100 md:col-span-2"
          >
            <h2 className="text-xl">Generate Reports</h2>
            <p className="text-xl font-semibold">
              ↓ Download
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
}
