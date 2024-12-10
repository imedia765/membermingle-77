import { Link, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, UserCheck, ClipboardList, Database, DollarSign, UserCircle } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", to: "/admin" },
  { icon: Users, label: "Members", to: "/admin/members" },
  { icon: UserCheck, label: "Collectors", to: "/admin/collectors" },
  { icon: ClipboardList, label: "Registrations", to: "/admin/registrations" },
  { icon: Database, label: "Database", to: "/admin/database" },
  { icon: DollarSign, label: "Finance", to: "/admin/finance" },
  { icon: UserCircle, label: "Profile", to: "/admin/profile" },
];

function AdminLayoutContent() {
  const { setOpenMobile } = useSidebar();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    setOpenMobile(false);
    navigate(path);
  };

  return (
    <div className="min-h-screen flex w-full bg-background">
      <Sidebar>
        <SidebarHeader className="p-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Admin Panel
          </h1>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.to}>
                <SidebarMenuButton
                  tooltip={item.label}
                  onClick={() => handleNavigation(item.to)}
                  className="flex items-center gap-3"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>

      {/* Main content */}
      <main className="flex-1 p-8">
        <div className="mb-6">
          <SidebarTrigger className="md:hidden" />
        </div>
        <Outlet />
      </main>
    </div>
  );
}

export function AdminLayout() {
  return (
    <SidebarProvider>
      <AdminLayoutContent />
    </SidebarProvider>
  );
}