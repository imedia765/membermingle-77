import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { UserCircle, Users, Calendar, AlertCircle } from "lucide-react";
import { MembersList } from "@/components/members/MembersList";

const data = [
  { month: 'Jan', members: 40 },
  { month: 'Feb', members: 45 },
  { month: 'Mar', members: 48 },
  { month: 'Apr', members: 52 },
  { month: 'May', members: 55 },
  { month: 'Jun', members: 58 },
];

const chartConfig = {
  members: {
    color: "#4a9eed",
  },
};

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1f2c] to-[#151821] text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#4a9eed] to-[#63b3ff] text-transparent bg-clip-text">
            Dashboard
          </h1>
          <Button className="bg-[#4a9eed] hover:bg-[#3182ce]">
            <UserCircle className="mr-2" />
            View Profile
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-[#1e2430] to-[#252b3b] border-[#2a3040] text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                Total Members
              </CardTitle>
              <Users className="h-4 w-4 text-[#4a9eed]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">245</div>
              <p className="text-xs text-gray-400 mt-1">+12% from last month</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-[#1e2430] to-[#252b3b] border-[#2a3040] text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                Upcoming Events
              </CardTitle>
              <Calendar className="h-4 w-4 text-[#4a9eed]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-gray-400 mt-1">Next event in 5 days</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-[#1e2430] to-[#252b3b] border-[#2a3040] text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                Pending Actions
              </CardTitle>
              <AlertCircle className="h-4 w-4 text-[#4a9eed]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-gray-400 mt-1">2 require immediate attention</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-br from-[#1e2430] to-[#252b3b] border-[#2a3040] text-white">
          <CardHeader>
            <CardTitle className="text-[#4a9eed]">Membership Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a3040" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-[#1e2430] border border-[#2a3040] p-2 rounded">
                              <p className="text-white">{`${payload[0].value} members`}</p>
                            </div>
                          );
                        }
                        return null;
                      }} 
                    />
                    <Bar dataKey="members" fill="#4a9eed" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#1e2430] to-[#252b3b] border-[#2a3040] text-white p-6">
          <MembersList />
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;