"use client";

import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";

import Link from "next/link";
import socket from "@/lib/socket";
import api from "@/lib/axios";

export default function AgentDashboard() {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAssigned() {
      try {
        const res = await api.get("/api/parcels/assigned");
        setParcels(res.data);
      } catch (err) {
        console.error(
          "Failed to load assigned parcels",
          err
        );
      } finally {
        setLoading(false);
      }
    }
    fetchAssigned();
  }, []);
  useEffect(() => {
    socket.on("parcelAssigned", (newParcel) => {
      setParcels((prev) => [...prev, newParcel]);
    });
    return () => socket.off("parcelAssigned");
  }, []);

  return (
    <div className="flex flex-1">
      <Sidebar />
      <main className="container flex-1 p-6 bg-green-200 shadow-md rounded">
        <h2 className="text-2xl font-semibold mb-4">
          Assigned Parcels
        </h2>
        {loading ? (
          <p>Loading parcels...</p>
        ) : parcels.length === 0 ? (
          <p>No parcels assigned to you.</p>
        ) : (
          <ul className="space-y-4">
            {parcels.map((p) => (
              <li
                key={p._id}
                className="p-4 border rounded flex justify-between items-center"
              >
                <div>
                  <p>
                    <strong>From:</strong> {p.pickupAddress}
                  </p>
                  <p>
                    <strong>To:</strong> {p.deliveryAddress}
                  </p>
                  <p>
                    <strong>Status:</strong> {p.status}
                  </p>
                </div>
                <Link
                  href={`/agent/update-status/${p._id}`}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                  Update Status
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
