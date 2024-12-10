import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, UserPlus } from "lucide-react";

const collectors = [
  { id: 1, name: "Ahmed Khan", area: "Burton Central", members: 45, collectionRate: "95%" },
  { id: 2, name: "Sarah Ahmed", area: "Burton North", members: 38, collectionRate: "92%" },
  { id: 3, name: "Imran Ali", area: "Burton South", members: 42, collectionRate: "88%" },
];

export default function Collectors() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
          Collectors Management
        </h1>
        <Button className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Add Collector
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search collectors..." className="pl-8" />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Area</TableHead>
            <TableHead>Members</TableHead>
            <TableHead>Collection Rate</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {collectors.map((collector) => (
            <TableRow key={collector.id}>
              <TableCell>{collector.name}</TableCell>
              <TableCell>{collector.area}</TableCell>
              <TableCell>{collector.members}</TableCell>
              <TableCell>{collector.collectionRate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}