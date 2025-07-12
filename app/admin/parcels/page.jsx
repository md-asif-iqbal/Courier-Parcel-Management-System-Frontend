"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import api from "@/lib/axios";

const STATUS_OPTIONS = [
  "Booked",
  "Picked Up",
  "In Transit",
  "Delivered",
  "Failed",
];

export default function ManageParcels() {
  const [parcels, setParcels] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load all parcels and all agents
  useEffect(() => {
    async function loadData() {
      try {
        const [pRes, uRes] = await Promise.all([
          api.get("/api/admin/parcels"), // all parcels
          api.get("/api/admin/users"), // all users, to filter agents
        ]);
        const agentList = uRes.data.filter(
          (u) => u.role === "agent"
        );
        setAgents(agentList);
        setParcels(pRes.data);
      } catch (err) {
        console.error(
          "Failed to load parcels or agents",
          err
        );
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Assign agent to a parcel
  const handleAssign = async (parcelId, agentId) => {
    try {
      const res = await api.put(
        `/api/admin/parcels/${parcelId}/assign`,
        { agent: agentId }
      );
      setParcels((ps) =>
        ps.map((p) =>
          p._id === parcelId
            ? { ...p, agent: res.data.agent }
            : p
        )
      );
    } catch (err) {
      console.error("Assignment failed", err);
    }
  };

  // Update status of a parcel
  const handleStatusChange = async (parcelId, status) => {
    try {
      const res = await api.put(
        `/api/parcels/${parcelId}/status`,
        { status }
      );
      setParcels((ps) =>
        ps.map((p) => (p._id === parcelId ? res.data : p))
      );
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  if (loading)
    return <p className="p-6">Loading parcels…</p>;
  if (error)
    return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="flex h-full bg-green-200 w-full">
      <Sidebar />

      <main className="flex-1 p-6  shadow-md overflow-auto">
        <h1 className="text-2xl font-bold mb-4">
          Manage Parcels
        </h1>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">#</th>
              <th className="border p-2 text-left">
                Pickup
              </th>
              <th className="border p-2 text-left">
                Delivery
              </th>
              <th className="border p-2 text-left">
                Agent
              </th>
              <th className="border p-2 text-left">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((p, idx) => (
              <tr
                key={p._id}
                className={
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                }
              >
                <td className="border p-2">{idx + 1}</td>

                {/* Pickup & Delivery */}
                <td className="border p-2">
                  <p className="font-medium">
                    {p.pickupAddress}
                  </p>
                </td>
                <td className="border p-2">
                  <p className="font-medium">
                    {p.deliveryAddress}
                  </p>
                </td>

                {/* Agent Assignment */}
                <td className="border p-2">
                  <select
                    value={p.agent?._id || ""}
                    onChange={(e) =>
                      handleAssign(p._id, e.target.value)
                    }
                    className="w-full p-1 border rounded"
                  >
                    <option value="">— Unassigned —</option>
                    {agents.map((a) => (
                      <option
                        key={a._id}
                        value={a._id}
                      >
                        {a.name} ({a.email})
                      </option>
                    ))}
                  </select>
                </td>

                {/* Status Selector */}
                <td className="border p-2">
                  <select
                    value={p.status}
                    onChange={(e) =>
                      handleStatusChange(
                        p._id,
                        e.target.value
                      )
                    }
                    className="w-full p-1 border rounded"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option
                        key={s}
                        value={s}
                      >
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
