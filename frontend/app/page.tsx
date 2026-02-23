"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const login = async () => {
  try {
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard";
    } else {
      setMessage(data.message || "Login failed ❌");
    }

  } catch (err) {
    setMessage("Server error ❌");
  }
};


  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-96 bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Gym Login</h1>

        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 mb-3 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>

        {message && (
          <p className="mt-3 text-center text-sm">{message}</p>
        )}
      </div>
    </main>
  );
}
