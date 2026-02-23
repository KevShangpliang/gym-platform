"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

type Member = {
  id: string;
  email: string;
};

export default function AssignWorkoutForm() {
  const [members, setMembers] = useState<Member[]>([]);
  const [memberId, setMemberId] = useState("");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Load members
  useEffect(() => {
    async function loadMembers() {
      const data = await apiFetch("/trainer/members");
      setMembers(Array.isArray(data) ? data : []);
    }

    loadMembers();
  }, []);

  async function assignWorkout() {
    if (!memberId || !title) {
      setMessage("Select member and title required");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await apiFetch("/workouts/assign", {
        method: "POST",
        body: JSON.stringify({
          memberId,
          title,
          details,
        }),
      });

      setMessage("Workout assigned ✅");
      setTitle("");
      setDetails("");
    } catch {
      setMessage("Assignment failed ❌");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-lg">
      <h2 className="text-xl font-bold mb-4">Assign Workout</h2>

      {/* Member dropdown */}
      <select
        value={memberId}
        onChange={(e) => setMemberId(e.target.value)}
        className="w-full border p-2 mb-3"
      >
        <option value="">Select member</option>
        {members.map((m) => (
          <option key={m.id} value={m.id}>
            {m.email}
          </option>
        ))}
      </select>

      {/* Title */}
      <input
        type="text"
        placeholder="Workout title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 mb-3"
      />

      {/* Details */}
      <textarea
        placeholder="Workout details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        className="w-full border p-2 mb-3"
      />

      {/* Button */}
      <button
        onClick={assignWorkout}
        disabled={loading}
        className="w-full bg-blue-600 text-white p-2 rounded"
      >
        {loading ? "Assigning..." : "Assign Workout"}
      </button>

      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}