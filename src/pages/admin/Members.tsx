import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { 
  ChevronDown, 
  ChevronRight, 
  Search, 
  UserPlus, 
  Edit2, 
  MessageSquare, 
  TrashIcon,
  Eye,
  Users
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Sample data structure with covered members
const members = [
  { 
    id: 1, 
    name: "John Doe", 
    membershipNo: "M001", 
    status: "Active", 
    joinDate: "2023-01-15",
    paymentHistory: [
      { date: "2024-01-01", amount: 50, status: "Paid" },
      { date: "2023-12-01", amount: 50, status: "Paid" },
      { date: "2023-11-01", amount: 50, status: "Paid" },
    ],
    adminNotes: "Regular payment history. Active member since 2023.",
    email: "john@example.com",
    phone: "+44 7700 900123",
    address: "123 Main St, Burton",
    coveredMembers: {
      spouses: [
        { name: "Jane Doe", dateOfBirth: "1985-06-15" }
      ],
      dependants: [
        { name: "Jimmy Doe", dateOfBirth: "2010-03-20", relationship: "Son" },
        { name: "Jenny Doe", dateOfBirth: "2012-08-10", relationship: "Daughter" }
      ]
    }
  },
  // ... more members
];

export default function Members() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedMember, setExpandedMember] = useState<number | null>(null);
  const [editingNotes, setEditingNotes] = useState<number | null>(null);
  const [showCoveredMembers, setShowCoveredMembers] = useState(false);

  const toggleMember = (memberId: number) => {
    setExpandedMember(expandedMember === memberId ? null : memberId);
  };

  // Calculate total covered members
  const totalCoveredMembers = members.reduce((acc, member) => {
    const spousesCount = member.coveredMembers?.spouses?.length || 0;
    const dependantsCount = member.coveredMembers?.dependants?.length || 0;
    return acc + spousesCount + dependantsCount;
  }, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
          Members Management
        </h1>
        <Button className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Add Member
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search members..." 
            className="pl-8" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card className="mb-4">
        <CardContent className="pt-6">
          <Collapsible>
            <CollapsibleTrigger asChild>
              <Button 
                variant="outline" 
                className="flex items-center gap-2 w-full justify-between"
                onClick={() => setShowCoveredMembers(!showCoveredMembers)}
              >
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Covered Members Overview</span>
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4">
              <div className="space-y-4">
                <div className="text-lg font-semibold">
                  Total Covered Members: {totalCoveredMembers}
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Primary Member</TableHead>
                      <TableHead>Covered Type</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Date of Birth</TableHead>
                      <TableHead>Relationship</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {members.map(member => (
                      <>
                        {member.coveredMembers?.spouses?.map((spouse, index) => (
                          <TableRow key={`spouse-${member.id}-${index}`}>
                            <TableCell>{member.name}</TableCell>
                            <TableCell>Spouse</TableCell>
                            <TableCell>{spouse.name}</TableCell>
                            <TableCell>{spouse.dateOfBirth}</TableCell>
                            <TableCell>Spouse</TableCell>
                          </TableRow>
                        ))}
                        {member.coveredMembers?.dependants?.map((dependant, index) => (
                          <TableRow key={`dependant-${member.id}-${index}`}>
                            <TableCell>{member.name}</TableCell>
                            <TableCell>Dependant</TableCell>
                            <TableCell>{dependant.name}</TableCell>
                            <TableCell>{dependant.dateOfBirth}</TableCell>
                            <TableCell>{dependant.relationship}</TableCell>
                          </TableRow>
                        ))}
                      </>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>

      <ScrollArea className="h-[calc(100vh-220px)]">
        <div className="space-y-4">
          {members.map((member) => (
            <Card key={member.id} className="overflow-hidden">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleMember(member.id)}
                  >
                    {expandedMember === member.id ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                  <div>
                    <h3 className="text-lg font-semibold">
                      {member.membershipNo} - {member.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Status: {member.status} | Joined: {member.joinDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive">
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {expandedMember === member.id && (
                <CardContent className="border-t pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Contact Information</h4>
                      <p className="text-sm">Email: {member.email}</p>
                      <p className="text-sm">Phone: {member.phone}</p>
                      <p className="text-sm">Address: {member.address}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Payment History</h4>
                      <div className="space-y-2">
                        {member.paymentHistory.map((payment, index) => (
                          <div key={index} className="text-sm flex justify-between">
                            <span>{payment.date}</span>
                            <span>£{payment.amount}</span>
                            <span className="text-green-500">{payment.status}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Admin Notes</h4>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setEditingNotes(editingNotes === member.id ? null : member.id)}
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        {editingNotes === member.id ? "Save Notes" : "Edit Notes"}
                      </Button>
                    </div>
                    {editingNotes === member.id ? (
                      <Textarea 
                        defaultValue={member.adminNotes}
                        className="min-h-[100px]"
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground">{member.adminNotes}</p>
                    )}
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