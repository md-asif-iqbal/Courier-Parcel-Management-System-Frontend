"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import api from "@/lib/axios";

export default function UpdateStatusPage() {
  const { id } = useParams(); // now defined
  const router = useRouter();

  const [parcel, setParcel] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  // ① Fetch parcel when 'id' is available
  useEffect(() => {
    if (!id) return;

    async function fetchParcel() {
      try {
        const res = await api.get(`/api/parcels/${id}`);
        setParcel(res.data);
        setNewStatus(res.data.status);
      } catch (err) {
        console.error("Failed to fetch parcel", err);
        setError("Could not load parcel");
      } finally {
        setLoading(false);
      }
    }

    fetchParcel();
  }, [id]);

  // ② Handle status update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newStatus) return;

    setSaving(true);
    try {
      await api.put(`/api/parcels/${id}/status`, {
        status: newStatus,
      });
      router.push("/agent/dashboard");
    } catch (err) {
      console.error("Status update failed", err);
      setError("Update failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // ③ Render loading / error states first
  if (loading)
    return <p className="p-6">Loading parcel…</p>;
  if (error)
    return <p className="p-6 text-red-500">{error}</p>;
  if (!parcel)
    return <p className="p-6">Parcel not found.</p>;

  // ④ Render the form
  return (
    <div className="flex h-screen w-full bg-green-200">
      <Sidebar />

      <main className="flex-1 p-6 bg-gray-50 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">
          Update Parcel Status
        </h1>

        <div className="mb-6">
          <p>
            <strong>From:</strong> {parcel.pickupAddress}
          </p>
          <p>
            <strong>To:</strong> {parcel.deliveryAddress}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 max-w-md"
        >
          <label className="block">
            <span className="block mb-1">Status</span>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full p-2 border rounded"
            >
              {[
                "Booked",
                "Picked Up",
                "In Transit",
                "Delivered",
                "Failed",
              ].map((s) => (
                <option
                  key={s}
                  value={s}
                >
                  {s}
                </option>
              ))}
            </select>
          </label>

          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-700"
          >
            {saving ? "Updating…" : "Update Status"}
          </button>
        </form>
      </main>
    </div>
  );
}
