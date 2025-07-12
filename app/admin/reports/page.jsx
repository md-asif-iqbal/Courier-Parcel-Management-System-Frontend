// frontend/app/(admin)/reports/page.jsx
"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import api from "@/lib/axios";

export default function ReportsPage() {
  const [parcels, setParcels] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [dlLoading, setDlLoading] = useState({
    csv: false,
    excel: false,
    pdf: false,
  });
  const [error, setError] = useState("");

  // Load and display parcel list
  useEffect(() => {
    async function load() {
      try {
        const res = await api.get("/api/admin/parcels");
        setParcels(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load parcels");
      } finally {
        setLoadingList(false);
      }
    }
    load();
  }, []);

  // Generic downloader
  const download = async (type) => {
    setError("");
    setDlLoading((l) => ({ ...l, [type]: true }));
    try {
      const urlMap = {
        csv: "/api/admin/reports/parcels",
        excel: "/api/admin/reports/parcels/excel",
        pdf: "/api/admin/reports/parcels/pdf",
      };
      const res = await api.get(urlMap[type], {
        responseType: "blob",
      });
      const mime = {
        csv: "text/csv",
        excel:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        pdf: "application/pdf",
      };
      const ext = { csv: "csv", excel: "xlsx", pdf: "pdf" };
      const blob = new Blob([res.data], {
        type: mime[type],
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `parcels_report.${ext[type]}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      setError(`Failed to download ${type.toUpperCase()}`);
    } finally {
      setDlLoading((l) => ({ ...l, [type]: false }));
    }
  };

  return (
    <div className="flex h-screen w-full bg-green-200">
      <Sidebar />

      <main className="flex-1 p-6  overflow-auto">
        <h1 className="text-2xl font-bold mb-4">
          Generate Reports
        </h1>
        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}

        <div className="space-x-2 mb-6 justify-end ">
          <button
            onClick={() => download("csv")}
            disabled={dlLoading.csv}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            {dlLoading.csv
              ? "Downloading CSV…"
              : "Download CSV"}
          </button>
          <button
            onClick={() => download("excel")}
            disabled={dlLoading.excel}
            className="px-4 py-2 bg-indigo-500 text-white rounded disabled:opacity-50"
          >
            {dlLoading.excel
              ? "Downloading XLSX…"
              : "Download XLSX"}
          </button>
          <button
            onClick={() => download("pdf")}
            disabled={dlLoading.pdf}
            className="px-4 py-2 bg-rose-500 text-white rounded disabled:opacity-50"
          >
            {dlLoading.pdf
              ? "Downloading PDF…"
              : "Download PDF"}
          </button>
        </div>

        {/* Parcel List */}
        {loadingList ? (
          <p>Loading parcels…</p>
        ) : (
          <table className="w-full table-auto bg-white rounded shadow">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">ID</th>
                <th className="border p-2">Customer</th>
                <th className="border p-2">Agent</th>
                <th className="border p-2">Pickup</th>
                <th className="border p-2">Delivery</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Created</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((p) => (
                <tr
                  key={p._id}
                  className="odd:bg-white even:bg-gray-50"
                >
                  <td className="border p-2 text-sm">
                    {p._id}
                  </td>
                  <td className="border p-2 text-sm">
                    {p.customer.name}
                  </td>
                  <td className="border p-2 text-sm">
                    {p.agent?.name || "—"}
                  </td>
                  <td className="border p-2 text-sm">
                    {p.pickupAddress}
                  </td>
                  <td className="border p-2 text-sm">
                    {p.deliveryAddress}
                  </td>
                  <td className="border p-2 text-sm">
                    {p.status}
                  </td>
                  <td className="border p-2 text-sm">
                    {new Date(p.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}
