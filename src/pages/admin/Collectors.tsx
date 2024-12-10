import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, UserPlus, ChevronDown, ChevronRight, Edit2, Trash2, UserCheck, Ban } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Collectors() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCollector, setExpandedCollector] = useState<string | null>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const toggleCollector = (collectorId: string) => {
    setExpandedCollector(expandedCollector === collectorId ? null : collectorId);
  };

  const handleDeleteCollector = (collectorId: string) => {
    toast({
      title: "Collector deleted",
      description: `Collector ${collectorId} has been removed.`,
    });
  };

  const handleActivateCollector = (collectorId: string) => {
    toast({
      title: "Collector activated",
      description: `Collector ${collectorId} has been activated.`,
    });
  };

  const handleDeactivateCollector = (collectorId: string) => {
    toast({
      title: "Collector deactivated",
      description: `Collector ${collectorId} has been deactivated.`,
    });
  };

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

  return (
    <div className="space-y-6">
      <div className={`${isMobile ? 'space-y-4' : 'flex justify-between items-center'}`}>
        <h1 className="text-4xl font-bold text-white">
          Collectors Management
        </h1>
        <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
          <UserPlus className="h-4 w-4" />
          Add New Collector
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
              <CardHeader className={`py-3 ${isMobile ? 'space-y-4' : ''}`}>
                <div className={`flex flex-col gap-4`}>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleCollector(collector.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white shrink-0"
                      title={expandedCollector === collector.id ? "Collapse" : "Expand"}
                    >
                      {expandedCollector === collector.id ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                    <div>
                      <CardTitle className="text-xl text-white">
                        {collector.id} - {collector.name}
                      </CardTitle>
                      <p className="text-sm text-white inline-block py-0.5">
                        Members: {collector.members}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant="outline" 
                      size="default"
                      className="bg-green-600 hover:bg-green-700 text-white min-w-[120px]"
                      onClick={() => handleActivateCollector(collector.id)}
                    >
                      <UserCheck className="h-4 w-4 mr-2" />
                      Activate
                    </Button>
                    <Button 
                      variant="outline" 
                      size="default"
                      className="bg-yellow-600 hover:bg-yellow-700 text-white min-w-[120px]"
                      onClick={() => handleDeactivateCollector(collector.id)}
                    >
                      <Ban className="h-4 w-4 mr-2" />
                      Deactivate
                    </Button>
                    <Button 
                      variant="outline" 
                      size="default"
                      className="bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]"
                    >
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit Details
                    </Button>
                    <Button 
                      variant="outline" 
                      size="default"
                      className="bg-red-600 hover:bg-red-700 text-white min-w-[120px]"
                      onClick={() => handleDeleteCollector(collector.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardHeader>
              {expandedCollector === collector.id && (
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-white">Name</TableHead>
                          <TableHead className="text-white">Member ID</TableHead>
                          <TableHead className="text-white">Email</TableHead>
                          <TableHead className="text-white">Contact Number</TableHead>
                          <TableHead className="text-white">Address</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {collector.membersList.map((member) => (
                          <TableRow key={member.memberId}>
                            <TableCell className="text-white">{member.name}</TableCell>
                            <TableCell className="text-white">{member.memberId}</TableCell>
                            <TableCell className="text-white">{member.email}</TableCell>
                            <TableCell className="text-white">{member.contact}</TableCell>
                            <TableCell className="text-white">{member.address}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
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