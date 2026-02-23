import DashboardLayout from "@/components/DashboardLayout";
import Sidebar from "@/components/Sidebar";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout sidebar={<Sidebar />}>
      {children}
    </DashboardLayout>
  );
}
