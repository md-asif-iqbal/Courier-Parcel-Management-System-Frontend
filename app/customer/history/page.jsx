"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import api from "@/lib/axios";

export default function BookingHistory() {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await api.get("/api/parcels");
        setParcels(res.data);
      } catch (err) {
        console.error(
          "Failed to load booking history",
          err
        );
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  return (
    <div className="flex flex-1 bg-green-200 w-full">
      <Sidebar />
      <main className="container flex-1 p-6  shadow-md rounded">
        <h2 className="text-2xl font-semibold mb-4">
          Booking History
        </h2>
        {loading ? (
          <p>Loading...</p>
        ) : parcels.length === 0 ? (
          <p>No parcels booked yet.</p>
        ) : (
          <ul className="space-y-3 bg-white">
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
                <div>
                  <p className="text-sm text-gray-500">
                    Booked:{" "}
                    {new Date(
                      p.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
