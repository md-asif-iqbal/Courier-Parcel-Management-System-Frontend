"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import api from "@/lib/axios";

export default function AnalyticsPage() {
  const [data, setData] = useState(null);
  useEffect(() => {
    api
      .get("/api/admin/analytics")
      .then((res) => setData(res.data.statusCounts))
      .catch(console.error);
  }, []);

  if (!data)
    return <p className="p-6">Loading analytics…</p>;

  return (
    <div className="flex h-screen bg-green-200 w-full text-center">
      <Sidebar />
      <main className="flex-1 p-6  overflow-auto">
        <h1 className="text-2xl font-bold mb-4">
          Parcel Status Distribution
        </h1>
        <table className="w-full border-collapse bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Status</th>
              <th className="border p-2">Count</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data).map(([status, count]) => (
              <tr key={status}>
                <td className="border p-2">{status}</td>
                <td className="border p-2">{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
