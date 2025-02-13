import DashboardHeader from "./dashboard/components/header";
import DashboardSidebar from "./dashboard/components/sidebar";

export default function Home() {
  return (
    <div className="bg-white flex flex-row">
      <DashboardSidebar />
      <DashboardHeader />
    </div>
  );
}
