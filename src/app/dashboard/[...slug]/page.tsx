"use client";
import { usePathname } from "next/navigation";
import DashboardSidebar from "../components/sidebar";
import DashboardHeader from "../components/header";
import DashboardGrid from "../components/dashboard";

export default function Dashboard({ slug }: { slug: string[] }) {
  const rawPathname = usePathname().slice(1);
  const pathname = rawPathname.charAt(0).toUpperCase() + rawPathname.slice(1);

  return (
    <div className="bg-white flex flex-row">
      <DashboardSidebar />
      <div className="flex flex-col w-full">
        <DashboardHeader title={pathname} />
        <DashboardGrid />
      </div>
    </div>
  );
}
