"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/axios";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/auth/register", form);
      router.push("/customer/login");
    } catch (err) {
      console.error(err);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <main className=" py-20 bg-green-200 w-full">
      <div className=" container max-w-md mx-auto p-6 bg-white shadow-md rounded">
        <h2 className="text-2xl font-semibold mb-4">
          Create Account
        </h2>
        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="name"
              className="block mb-1"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-black rounded hover:bg-green-700"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link
            href="/customer/login"
            className="text-black hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
