import { Link, Outlet } from "react-router-dom";
import { LayoutDashboard, Users, UserCheck, ClipboardList, Database, DollarSign, UserCircle } from "lucide-react";

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-card border-r">
          <div className="p-6">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Admin Panel
            </h1>
          </div>
          <nav className="space-y-1 px-3">
            <NavLink to="/admin" icon={<LayoutDashboard className="w-4 h-4" />}>Dashboard</NavLink>
            <NavLink to="/admin/members" icon={<Users className="w-4 h-4" />}>Members</NavLink>
            <NavLink to="/admin/collectors" icon={<UserCheck className="w-4 h-4" />}>Collectors</NavLink>
            <NavLink to="/admin/registrations" icon={<ClipboardList className="w-4 h-4" />}>Registrations</NavLink>
            <NavLink to="/admin/database" icon={<Database className="w-4 h-4" />}>Database</NavLink>
            <NavLink to="/admin/finance" icon={<DollarSign className="w-4 h-4" />}>Finance</NavLink>
            <NavLink to="/admin/profile" icon={<UserCircle className="w-4 h-4" />}>Profile</NavLink>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function NavLink({ to, children, icon }: { to: string; children: React.ReactNode; icon: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
    >
      {icon}
      {children}
    </Link>
  );
}