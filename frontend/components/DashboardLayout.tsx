"use client";

import { ReactNode } from "react";

type Props = {
  sidebar: ReactNode;
  children: ReactNode;
};

export default function DashboardLayout({ sidebar, children }: Props) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6">
        {sidebar}
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-100">
        {children}
      </main>
    </div>
  );
}
