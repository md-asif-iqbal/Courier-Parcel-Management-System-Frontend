"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import api from "@/lib/axios";

const ROLES = ["customer", "agent", "admin"];

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await api.get("/api/admin/users");
        setUsers(res.data);
      } catch {
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  const changeRole = async (id, role) => {
    try {
      const res = await api.put(`/api/admin/users/${id}`, {
        role,
      });
      setUsers((u) =>
        u.map((u) => (u._id === id ? res.data : u))
      );
    } catch {
      console.error("Role update failed");
    }
  };

  const deleteUser = async (id) => {
    if (
      !confirm("Are you sure you want to delete this user?")
    )
      return;
    try {
      await api.delete(`/api/admin/users/${id}`);
      setUsers((u) => u.filter((u) => u._id !== id));
    } catch {
      console.error("Delete failed");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (error)
    return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="flex flex-1 h-screen bg-green-200">
      <Sidebar />
      <main className="container flex-1 p-6  shadow-md rounded">
        <h2 className="text-2xl font-semibold mb-4">
          User Management
        </h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2 text-left">Name</th>
              <th className="border p-2 text-left">
                Email
              </th>
              <th className="border p-2 text-left">Role</th>
              <th className="border p-2 text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td className="border p-2">{u.name}</td>
                <td className="border p-2">{u.email}</td>
                <td className="border p-2">
                  <select
                    value={u.role}
                    onChange={(e) =>
                      changeRole(u._id, e.target.value)
                    }
                    className="p-1 border rounded"
                  >
                    {ROLES.map((r) => (
                      <option
                        key={r}
                        value={r}
                      >
                        {r}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => deleteUser(u._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
