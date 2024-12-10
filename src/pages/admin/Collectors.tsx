import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, UserPlus, ChevronDown, ChevronRight, Edit2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

// Sample data structure
const collectors = [
  {
    id: "01",
    name: "Anjum Riaz",
    members: 161,
    membersList: [
      { name: "Mohammed Ali / Micheal Cashmore (updated)", memberId: "AR01001", email: "", contact: "", address: "Askew way, woodville DE11 8FX" },
      { name: "Khadam Hussain", memberId: "AR01002", email: "", contact: "", address: "Ash st" },
      // ... more members
    ]
  },
  {
    id: "02",
    name: "Zabbie",
    members: 116,
    membersList: [
      { name: "Naveed Zabbie", memberId: "Z02001", email: "", contact: "", address: "Grange St" },
      // ... more members
    ]
  },
  // ... other collectors
];

export default function Collectors() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCollector, setExpandedCollector] = useState<string | null>(null);

  const toggleCollector = (collectorId: string) => {
    setExpandedCollector(expandedCollector === collectorId ? null : collectorId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-blue-600">
          Collectors Management
        </h1>
        <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
          <UserPlus className="h-4 w-4" />
          Add Collector
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by member ID or name..." 
            className="pl-8" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-220px)]">
        <div className="space-y-4">
          {collectors.map((collector) => (
            <Card key={collector.id}>
              <CardHeader className="py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleCollector(collector.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {expandedCollector === collector.id ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                    <div>
                      <CardTitle className="text-xl text-blue-600">
                        {collector.id} - {collector.name}
                      </CardTitle>
                      <p className="text-sm text-white bg-blue-600 inline-block px-2 py-0.5 rounded">
                        Members: {collector.members}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </CardHeader>
              {expandedCollector === collector.id && (
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-blue-600">Name</TableHead>
                        <TableHead className="text-blue-600">Member ID</TableHead>
                        <TableHead className="text-blue-600">Email</TableHead>
                        <TableHead className="text-blue-600">Contact Number</TableHead>
                        <TableHead className="text-blue-600">Address</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {collector.membersList.map((member) => (
                        <TableRow key={member.memberId}>
                          <TableCell>{member.name}</TableCell>
                          <TableCell>{member.memberId}</TableCell>
                          <TableCell>{member.email}</TableCell>
                          <TableCell>{member.contact}</TableCell>
                          <TableCell>{member.address}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}