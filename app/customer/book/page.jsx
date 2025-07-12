"use client";

import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import api from "@/lib/axios";
import { AuthContext } from "@/contexts/AuthContext";

export default function BookParcel() {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    pickupAddress: "",
    deliveryAddress: "",
    size: "",
    cod: false,
  });
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(null);

  // On mount, grab token from context or localStorage
  useEffect(() => {
    const t = user?.token || localStorage.getItem("token");
    console.log("Loaded token on mount:", t);
    setToken(t);
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setMessage("No auth token—please login first.");
      return;
    }
    console.log(
      "Sending POST /api/parcels with token:",
      token
    );

    try {
      const res = await api.post("/api/parcels", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Booking response:", res.data);
      setMessage("Parcel booked successfully.");
      setForm({
        pickupAddress: "",
        deliveryAddress: "",
        size: "",
        cod: false,
      });
    } catch (err) {
      console.error("Booking error (full):", err);
      setMessage(
        `Booking failed (${err.response?.status}): ${
          err.response?.data?.message || err.message
        }`
      );
    }
  };

  return (
    <div className="flex flex-1 bg-green-200 w-full ">
      <Sidebar />
      <main className="container flex-1 p-6 mt-10 mb-10 bg-white shadow-md rounded max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Book a Parcel
        </h2>
        {message && (
          <p className="text-center mb-4 text-green-600">
            {message}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="pickupAddress"
              className="block mb-1"
            >
              Pickup Address
            </label>
            <input
              id="pickupAddress"
              name="pickupAddress"
              type="text"
              value={form.pickupAddress}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label
              htmlFor="deliveryAddress"
              className="block mb-1"
            >
              Delivery Address
            </label>
            <input
              id="deliveryAddress"
              name="deliveryAddress"
              type="text"
              value={form.deliveryAddress}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label
              htmlFor="size"
              className="block mb-1"
            >
              Size
            </label>
            <input
              id="size"
              name="size"
              type="text"
              value={form.size}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="flex items-center">
            <input
              id="cod"
              name="cod"
              type="checkbox"
              checked={form.cod}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="cod">Cash on Delivery</label>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-400 text-black rounded hover:bg-blue-700"
          >
            Book Parcel
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          <Link
            href="/customer/history"
            className="text-black hover:underline"
          >
            View Booking History
          </Link>
        </p>
      </main>
    </div>
  );
}
