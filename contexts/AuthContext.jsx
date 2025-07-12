"use client";

import { createContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    // Try to load the saved user object + token
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser({ ...parsed, token: storedToken });
    } else {
      // If on a protected route, kick to login
      const publicPaths = [
        "/",
        "/customer/login",
        "/customer/register",
      ];
      if (!publicPaths.includes(path)) {
        router.push("/customer/login");
      }
    }
  }, [path, router]);

  const logout = () => {
    // Clear everything
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/customer/login");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
