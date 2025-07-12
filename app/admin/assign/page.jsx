"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import api from "@/lib/axios";

export default function AssignParcel() {
  const [parcels, setParcels] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const [pRes, uRes] = await Promise.all([
          api.get("/api/parcels"),
          api.get("/api/admin/users"), 
        ]);
        setParcels(pRes.data.filter((p) => !p.agent));
        setAgents(
          uRes.data.filter((u) => u.role === "agent")
        );
      } catch (err) {
        console.error(err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const assign = async (parcelId, agentId) => {
    try {
      await api.put(
        `/api/admin/parcels/${parcelId}/assign`,
        { agent: agentId }
      );
      setParcels((ps) =>
        ps.filter((p) => p._id !== parcelId)
      );
    } catch (err) {
      console.error("Assignment failed", err);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (error)
    return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="flex flex-1 bg-green-200">
      <Sidebar />
      <main className="container flex-1 p-6  shadow-md rounded">
        <h2 className="text-2xl font-semibold mb-4">
          Assign Parcels
        </h2>
        {parcels.length === 0 ? (
          <p>No unassigned parcels.</p>
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
                </div>
                <select
                  defaultValue=""
                  onChange={(e) =>
                    assign(p._id, e.target.value)
                  }
                  className="p-2 border rounded"
                >
                  <option
                    value=""
                    disabled
                  >
                    Select agent
                  </option>
                  {agents.map((a) => (
                    <option
                      key={a._id}
                      value={a._id}
                    >
                      {a.name}
                    </option>
                  ))}
                </select>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
