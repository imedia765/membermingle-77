import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

const registrations = [
  { id: 1, name: "Zain Abbas", age: 25, area: "Burton Central", status: "Pending", date: "2024-02-15" },
  { id: 2, name: "Fatima Khan", age: 30, area: "Burton North", status: "Pending", date: "2024-02-14" },
  { id: 3, name: "Ali Hassan", age: 28, area: "Burton South", status: "Pending", date: "2024-02-13" },
];

export default function Registrations() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
        Registration Requests
      </h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Area</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {registrations.map((registration) => (
            <TableRow key={registration.id}>
              <TableCell>{registration.name}</TableCell>
              <TableCell>{registration.age}</TableCell>
              <TableCell>{registration.area}</TableCell>
              <TableCell>{registration.date}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" className="text-green-500">
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-red-500">
                    <XCircle className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}