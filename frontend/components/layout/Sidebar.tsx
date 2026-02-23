import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-60 bg-gray-900 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Gym App</h2>

      <nav className="space-y-3">
        <Link href="/dashboard" className="block hover:text-blue-400">
          Dashboard
        </Link>

        <Link href="/workouts" className="block hover:text-blue-400">
          Workouts
        </Link>
      </nav>
    </div>
  );
}
