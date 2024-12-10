import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
        Dashboard Overview
      </h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Members</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">245</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Collectors</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">12</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">8</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">£4,320</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}