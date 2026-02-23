"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { getUserRole } from "@/lib/auth";
import AppLayout from "@/components/layout/AppLayout";
import SkeletonCard from "@/components/SkeletonCard";

type Workout = {
  id: string;
  title: string;
  details: string;
};

type Member = {
  id: string;
  email: string;
};

export default function WorkoutsPage() {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // member view state
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  // trainer view state
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedMember, setSelectedMember] = useState("");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const userRole = getUserRole();
        setRole(userRole);

        if (userRole === "TRAINER") {
          const data = await apiFetch("/trainer/members");
          setMembers(Array.isArray(data) ? data : []);
        }

        if (userRole === "MEMBER") {
          const data = await apiFetch("/workouts/my");
          setWorkouts(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error("Workout load error:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  async function assignWorkout() {
    if (!selectedMember || !title) return;

    try {
      await apiFetch("/workouts/create", {
        method: "POST",
        body: JSON.stringify({
          memberId: selectedMember,
          title,
          details,
        }),
      });

      alert("Workout assigned!");
      setTitle("");
      setDetails("");
    } catch (err) {
      alert("Failed to assign workout");
    }
  }

  if (loading) {
    return (
      <AppLayout>
        <div className="p-6 space-y-4">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Workouts</h1>

        {/* ================= TRAINER VIEW ================= */}
        {role === "TRAINER" && (
          <div className="space-y-4 max-w-lg">
            <h2 className="font-semibold">Assign Workout</h2>

            <select
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="">Select member</option>
              {members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.email}
                </option>
              ))}
            </select>

            <input
              placeholder="Workout title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border p-2 rounded"
            />

            <textarea
              placeholder="Workout details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full border p-2 rounded"
            />

            <button
              onClick={assignWorkout}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Assign Workout
            </button>
          </div>
        )}

        {/* ================= MEMBER VIEW ================= */}
        {role === "MEMBER" && (
          <div className="space-y-4">
            {workouts.length === 0 ? (
              <p className="text-gray-500">
                No workouts assigned yet
              </p>
            ) : (
              workouts.map((w) => (
                <div
                  key={w.id}
                  className="p-4 bg-white rounded shadow border"
                >
                  <h2 className="font-semibold">{w.title}</h2>
                  <p className="text-gray-600">{w.details}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
}