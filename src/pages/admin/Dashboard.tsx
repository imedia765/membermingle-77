import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, ClipboardList, DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Button } from "@/components/ui/button";

const membershipData = [
  { month: 'Jan', members: 220, revenue: 4400 },
  { month: 'Feb', members: 230, revenue: 4600 },
  { month: 'Mar', members: 235, revenue: 4700 },
  { month: 'Apr', members: 240, revenue: 4800 },
  { month: 'May', members: 245, revenue: 4900 },
];

const membershipTypeData = [
  { name: 'Individual', value: 150 },
  { name: 'Family', value: 80 },
  { name: 'Senior', value: 45 },
  { name: 'Student', value: 20 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
          Dashboard Overview
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <Button variant="outline" className="w-full">
            <TrendingUp className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button className="w-full">
            <Activity className="mr-2 h-4 w-4" />
            Quick Analysis
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          icon={<Users className="h-6 w-6" />} 
          title="Total Members" 
          value="245" 
          trend={{ value: "+10%", positive: true }}
        />
        <StatsCard 
          icon={<UserCheck className="h-6 w-6" />} 
          title="Active Collectors" 
          value="12" 
          trend={{ value: "0%", positive: true }}
        />
        <StatsCard 
          icon={<ClipboardList className="h-6 w-6" />} 
          title="Pending Registrations" 
          value="8" 
          trend={{ value: "-25%", positive: false }}
        />
        <StatsCard 
          icon={<DollarSign className="h-6 w-6" />} 
          title="Monthly Revenue" 
          value="£4,900" 
          trend={{ value: "+12%", positive: true }}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <CardHeader>
            <CardTitle>Membership & Revenue Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={membershipData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="members" fill="hsl(var(--primary))" name="Members" />
                  <Bar yAxisId="right" dataKey="revenue" fill="hsl(var(--primary)/0.5)" name="Revenue (£)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="p-6">
          <CardHeader>
            <CardTitle>Membership Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={membershipTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {membershipTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                <Users className="h-6 w-6 mb-2" />
                Export Member List
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                <ClipboardList className="h-6 w-6 mb-2" />
                Review Pending Applications
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                <DollarSign className="h-6 w-6 mb-2" />
                Financial Summary
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatsCard({ 
  icon, 
  title, 
  value, 
  trend 
}: { 
  icon: React.ReactNode; 
  title: string; 
  value: string; 
  trend: { value: string; positive: boolean } 
}) {
  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">{value}</div>
          <div className={`flex items-center text-sm ${trend.positive ? 'text-green-500' : 'text-red-500'}`}>
            {trend.positive ? (
              <ArrowUpRight className="h-4 w-4 mr-1" />
            ) : (
              <ArrowDownRight className="h-4 w-4 mr-1" />
            )}
            {trend.value}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}