import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, UserPlus, Eye, Edit2, XCircle } from "lucide-react";

// Sample data structure (matching the style of Members and Collectors)
const registrations = [
  { 
    id: 1, 
    name: "Zain Abbas", 
    age: 25, 
    area: "Burton Central", 
    status: "Pending", 
    date: "2024-02-15",
    email: "zain@example.com",
    contact: "+44 7700 900777",
    address: "123 Central St, Burton"
  },
  { 
    id: 2, 
    name: "Fatima Khan", 
    age: 30, 
    area: "Burton North", 
    status: "Pending", 
    date: "2024-02-14",
    email: "fatima@example.com",
    contact: "+44 7700 900888",
    address: "45 North Road, Burton"
  },
  { 
    id: 3, 
    name: "Ali Hassan", 
    age: 28, 
    area: "Burton South", 
    status: "Pending", 
    date: "2024-02-13",
    email: "ali@example.com",
    contact: "+44 7700 900999",
    address: "67 South Lane, Burton"
  },
];

export default function Registrations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedRegistration, setExpandedRegistration] = useState<number | null>(null);

  const toggleRegistration = (registrationId: number) => {
    setExpandedRegistration(expandedRegistration === registrationId ? null : registrationId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
          Registration Requests
        </h1>
        <Button className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          New Registration
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search registrations..." 
            className="pl-8" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-220px)]">
        <div className="space-y-4">
          {registrations.map((registration) => (
            <Card key={registration.id} className="overflow-hidden">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {registration.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Status: {registration.status} | Submitted: {registration.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="text-blue-500">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-green-500">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive">
                    <XCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {expandedRegistration === registration.id && (
                <CardContent className="border-t pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Contact Information</h4>
                      <p className="text-sm">Email: {registration.email}</p>
                      <p className="text-sm">Phone: {registration.contact}</p>
                      <p className="text-sm">Address: {registration.address}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Additional Details</h4>
                      <p className="text-sm">Age: {registration.age}</p>
                      <p className="text-sm">Area: {registration.area}</p>
                      <p className="text-sm">Registration Date: {registration.date}</p>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}