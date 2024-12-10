import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, ClipboardList, DollarSign } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', members: 220 },
  { month: 'Feb', members: 230 },
  { month: 'Mar', members: 235 },
  { month: 'Apr', members: 240 },
  { month: 'May', members: 245 },
];

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

      <Card className="p-6">
        <CardHeader>
          <CardTitle>Membership Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="members" stroke="hsl(var(--primary))" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
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