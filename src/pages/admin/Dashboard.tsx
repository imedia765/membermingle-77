import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, ClipboardList, DollarSign } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
        Dashboard Overview
      </h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard icon={<Users className="h-6 w-6" />} title="Total Members" value="245" />
        <StatsCard icon={<UserCheck className="h-6 w-6" />} title="Active Collectors" value="12" />
        <StatsCard icon={<ClipboardList className="h-6 w-6" />} title="Pending Registrations" value="8" />
        <StatsCard icon={<DollarSign className="h-6 w-6" />} title="Monthly Revenue" value="£4,320" />
      </div>
    </div>
  );
}

function StatsCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}