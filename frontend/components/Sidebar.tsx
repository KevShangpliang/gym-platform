"use client";

import { useEffect, useState } from "react";
import { getUserRole } from "@/lib/auth";
import Link from "next/link";

export default function Sidebar() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setRole(getUserRole());
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Gym Panel</h2>

      <ul className="space-y-3">
        <li>
            <Link href="/dashboard">Dashboard</Link>
        </li>

        {role === "OWNER" && (
            <>
            <li>
                <Link href="/dashboard/trainers">Manage Trainers</Link>
            </li>
            <li>
                <Link href="/dashboard/settings">Gym Settings</Link>
            </li>
            </>
        )}

        <li>
            <Link href="/dashboard/members">Members</Link>
        </li>

        <li>
            <Link href="/workouts">Workouts</Link>
        </li>
        </ul>
    </div>
  );
}
