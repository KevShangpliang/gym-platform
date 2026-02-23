import { redirect } from "next/navigation";
import { getUserRole } from "@/lib/auth";

export default function OwnerPage() {
  const role = getUserRole();

  if (role !== "OWNER") {
    redirect("/dashboard");
  }

  redirect("/owner/dashboard");
}