import { Link, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, UserCheck, ClipboardList, Database, DollarSign, UserCircle, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", to: "/admin" },
  { icon: Users, label: "Members", to: "/admin/members" },
  { icon: UserCheck, label: "Collectors", to: "/admin/collectors" },
  { icon: ClipboardList, label: "Registrations", to: "/admin/registrations" },
  { icon: Database, label: "Database", to: "/admin/database" },
  { icon: DollarSign, label: "Finance", to: "/admin/finance" },
  { icon: UserCircle, label: "Profile", to: "/admin/profile" },
];

export function AdminLayout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col w-full bg-background">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container py-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between"
              >
                <span className="font-semibold">Menu</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              {menuItems.map((item) => (
                <DropdownMenuItem
                  key={item.to}
                  onClick={() => navigate(item.to)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <main className="flex-1">
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}