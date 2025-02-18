"use client";
import DashboardSidebar from "../components/sidebar";
import DashboardHeader from "../components/header";
import DashboardGrid from "../components/dashboard";
import { use } from "react";

export default function Dashboard({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const unwrappedParams = use(params);
  const { slug } = unwrappedParams;

  return (
    <div className="bg-white flex flex-row">
      <DashboardSidebar selected={slug[0]} />
      <div className="flex flex-col w-full">
        <DashboardHeader
          title={slug[0].charAt(0).toUpperCase() + slug[0].slice(1)}
        />
        <DashboardGrid />
      </div>
    </div>
  );
}
