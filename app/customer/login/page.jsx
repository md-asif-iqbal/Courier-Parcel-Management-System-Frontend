// frontend/app/(customer)/login/page.jsx
"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/axios";
import { AuthContext } from "@/contexts/AuthContext";

export default function LoginPage() {
  const { setUser } = useContext(AuthContext);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call backend and destructure token, role, id
      const {
        data: { token, role, id },
      } = await api.post("/api/auth/login", {
        email,
        password,
      });

      // Persist to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem(
        "user",
        JSON.stringify({ id, role })
      );

      // Update context so Navbar/Sidebar render correctly
      setUser({ id, role, token });

      // Redirect based on role
      if (role === "customer") {
        router.push("/customer/dashboard");
      } else if (role === "agent") {
        router.push("/agent/dashboard");
      } else if (role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid credentials, please try again.");
    }
  };

  return (
    <main className="w-full  py-20 bg-green-200">
      <div className="container max-w-md  py-20 mx-auto p-6 bg-white shadow-md rounded">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Login
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
              htmlFor="email"
              className="block mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Don’t have an account?{" "}
          <Link
            href="/customer/register"
            className="text-indigo-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}
