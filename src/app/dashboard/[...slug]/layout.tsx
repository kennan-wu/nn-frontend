import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { BiImport } from "react-icons/bi";
import { HiOutlineSparkles, HiOutlineTemplate } from "react-icons/hi";
import DashboardActionButtonCluster from "../components/action-button-cluster";

const nonActiveSidebarData = [
  {
    title: "Neural Networks",
    url: "#",
    items: [
      {
        title: "Projects",
        url: "/dashboard/projects",
        isActive: false,
      },
      {
        title: "Templates",
        url: "/dashboard/templates",
        isActive: false,
      },
    ],
  },
  {
    title: "Recents",
    url: "#",
    items: [],
  },
  {
    title: "Favorites",
    url: "#",
    items: [],
  },
];

export default async function DashboardLayout({
  params,
}: {
  params: { slug?: string[] };
}) {
  const awaitedParams = await params;
  const slug = awaitedParams?.slug;
  const activeSidebarData = nonActiveSidebarData.map((section) => ({
    ...section,
    items: section.items.map((item) => ({
      ...item,
      isActive: slug && item.url.includes(slug[0]),
    })),
  }));

  const currentPage =
    slug && slug[0]
      ? slug[0].charAt(0).toUpperCase() + slug[0].slice(1)
      : "Projects";

  return (
    <SidebarProvider>
      <AppSidebar navMain={activeSidebarData} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <BreadcrumbPage>{currentPage}</BreadcrumbPage>
          </div>
        </header>
        <DashboardActionButtonCluster />
      </SidebarInset>
    </SidebarProvider>
  );
}
