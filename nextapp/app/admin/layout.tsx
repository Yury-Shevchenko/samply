import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import AdminNav from "./AdminNav";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session || session.user.level <= 100) redirect("/login");

  return (
    <div style={{ background: "var(--paper)", minHeight: "100vh", color: "var(--ink)" }}>
      <AdminNav />
      {children}
    </div>
  );
}
