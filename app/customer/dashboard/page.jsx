"use client";

import { useState, useEffect, useContext } from "react";
import Sidebar from "@/components/Sidebar";
import api from "@/lib/axios";
import socket from "@/lib/socket";
import { AuthContext } from "@/contexts/AuthContext";

// Map parcel status to a progress percentage
const STATUS_PROGRESS = {
  Booked: 25,
  "Picked Up": 50,
  "In Transit": 75,
  Delivered: 100,
};

export default function CustomerDashboard() {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    total: 0,
    inTransit: 0,
    delivered: 0,
  });
  const [parcels, setParcels] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingParcels, setLoadingParcels] =
    useState(true);

  // ① Join this user's private socket room
  useEffect(() => {
    if (user?.id) {
      socket.emit("joinRoom", user.id);
      console.log("📡 Joined room for user:", user.id);
    }
  }, [user?.id]);

  // ② Fetch summary stats
  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await api.get("/api/parcels/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to load stats", err);
      } finally {
        setLoadingStats(false);
      }
    }
    fetchStats();
  }, []);

  // ③ Fetch recent parcels
  useEffect(() => {
    async function fetchParcels() {
      try {
        const res = await api.get("/api/parcels");
        setParcels(res.data.reverse());
      } catch (err) {
        console.error("Failed to load parcels", err);
      } finally {
        setLoadingParcels(false);
      }
    }
    fetchParcels();
  }, []);

  // ④ Listen for status updates for this customer
  useEffect(() => {
    socket.on(
      "parcelStatusUpdated",
      ({ statusKey, count }) => {
        setStats((prev) => ({
          ...prev,
          [statusKey]: count,
        }));
      }
    );
    return () => socket.off("parcelStatusUpdated");
  }, []);

  return (
    <div className="flex h-screen w-full bg-green-200">
      <Sidebar />

      <div className="flex-1 overflow-auto p-6 bg-gray-50">
        <h1 className="text-3xl font-bold mb-6">
          Welcome,{" "}
          {user?.role === "customer"
            ? "Customer"
            : user?.role}
        </h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="flex items-center p-4 bg-white rounded-lg shadow">
            <div className="p-3 bg-blue-100 rounded-full">
              📦
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                Total Parcels
              </p>
              <p className="text-2xl font-semibold">
                {loadingStats ? "–" : stats.total}
              </p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-white rounded-lg shadow">
            <div className="p-3 bg-yellow-100 rounded-full">
              🚚
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                In Transit
              </p>
              <p className="text-2xl font-semibold">
                {loadingStats ? "–" : stats.inTransit}
              </p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-white rounded-lg shadow">
            <div className="p-3 bg-green-100 rounded-full">
              ✅
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                Delivered
              </p>
              <p className="text-2xl font-semibold">
                {loadingStats ? "–" : stats.delivered}
              </p>
            </div>
          </div>
        </div>

        {/* Recent Parcels List */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Recent Parcels
          </h2>

          {loadingParcels ? (
            <p>Loading parcels…</p>
          ) : parcels.length === 0 ? (
            <p>No parcels booked yet.</p>
          ) : (
            <ul className="space-y-4">
              {parcels.slice(0, 5).map((parcel) => {
                const progress =
                  STATUS_PROGRESS[parcel.status] || 0;
                return (
                  <li
                    key={parcel._id}
                    className="p-4 bg-white rounded-lg shadow"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <p className="font-medium">
                          {parcel.pickupAddress} →{" "}
                          {parcel.deliveryAddress}
                        </p>
                        <p className="text-sm text-gray-500">
                          Booked on{" "}
                          {new Date(
                            parcel.createdAt
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="text-sm font-semibold capitalize">
                        {parcel.status}
                      </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
