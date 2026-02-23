"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { getUserRole } from "@/lib/auth";
import SkeletonCard from "@/components/SkeletonCard";

type User = {
id: string;
email: string;
};

export default function Dashboard() {
const [trainers, setTrainers] = useState<User[]>([]);
const [members, setMembers] = useState<User[]>([]);
const [loading, setLoading] = useState(true);
const [role, setRole] = useState<string | null>(null);

useEffect(() => {
async function load() {
    setLoading(true);
try {
const userRole = getUserRole();
setRole(userRole);

    if (userRole === "OWNER") {
      const [trainersData, membersData] = await Promise.all([
        apiFetch("/gyms/trainers"),
        apiFetch("/gyms/members"),
      ]);

      setTrainers(Array.isArray(trainersData) ? trainersData : []);
      setMembers(Array.isArray(membersData) ? membersData : []);
    } else {
      const membersData = await apiFetch("/trainer/members");
      setMembers(Array.isArray(membersData) ? membersData : []);
    }
  } catch (err) {
    console.error("Dashboard load error:", err);
  } finally {
  setTimeout(() => setLoading(false), 500);
}
}

load();

}, []);

/*if (loading) {
    return (
    <div className="grid grid-cols-2 gap-6">

  {/* Trainers Card *//*}
  <div className="bg-white p-4 rounded shadow">
    <h2 className="font-semibold mb-2">Trainers</h2>

    {trainers.length === 0 ? (
      <p className="text-gray-500">No trainers</p>
    ) : (
      <ul className="space-y-1">
        {trainers.map((t) => (
          <li key={t.id}>{t.email}</li>
        ))}
      </ul>
    )}
  </div>

  {/* Members Card *//*}
  <div className="bg-white p-4 rounded shadow">
    <h2 className="font-semibold mb-2">Members</h2>

    {members.length === 0 ? (
      <p className="text-gray-500">No members</p>
    ) : (
      <ul className="space-y-1">
        {members.map((m) => (
          <li key={m.id}>{m.email}</li>
        ))}
      </ul>
    )}
  </div>

</div>
  );
}*/

return (
  <div>
    <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

    {role === "OWNER" && (
      <>
        <h2 className="font-semibold mb-2">Trainers</h2>
        <ul>
          {trainers.map((t) => (
            <li key={t.id}>{t.email}</li>
          ))}
        </ul>
      </>
    )}

    <h2 className="font-semibold mb-2">Members</h2>
    <ul>
      {members.map((m) => (
        <li key={m.id}>{m.email}</li>
      ))}
    </ul>
  </div>
);
}