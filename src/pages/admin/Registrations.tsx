import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, UserPlus, Eye, ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Sample data structure
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
    address: "123 Central St, Burton",
    personalInfo: {
      fullName: "Zain Abbas",
      address: "123 Central St, Burton",
      town: "Burton",
      postCode: "DE14 1AA",
      email: "zain@example.com",
      mobile: "+44 7700 900777",
      dateOfBirth: "1999-05-15",
      placeOfBirth: "Burton",
      maritalStatus: "Single",
      gender: "Male"
    },
    nextOfKin: {
      name: "Sarah Abbas",
      address: "123 Central St, Burton",
      phone: "+44 7700 900888"
    },
    spouses: [],
    dependants: []
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
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
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
            <Card key={registration.id}>
              <Collapsible
                open={openItems.includes(registration.id)}
                onOpenChange={() => toggleItem(registration.id)}
              >
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
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </CollapsibleTrigger>
                </div>

                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-2 text-primary">Personal Information</h4>
                        <div className="grid grid-cols-2 gap-4">
                          {Object.entries(registration.personalInfo).map(([key, value]) => (
                            <div key={key} className="space-y-1">
                              <p className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                              <p className="text-sm text-muted-foreground">{value}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 text-primary">Next of Kin</h4>
                        <div className="grid grid-cols-2 gap-4">
                          {Object.entries(registration.nextOfKin).map(([key, value]) => (
                            <div key={key} className="space-y-1">
                              <p className="text-sm font-medium capitalize">{key}</p>
                              <p className="text-sm text-muted-foreground">{value}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {registration.spouses.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2 text-primary">Spouses</h4>
                          <div className="space-y-4">
                            {registration.spouses.map((spouse, index) => (
                              <div key={index} className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                  <p className="text-sm font-medium">Name</p>
                                  <p className="text-sm text-muted-foreground">{spouse.name}</p>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-sm font-medium">Date of Birth</p>
                                  <p className="text-sm text-muted-foreground">{spouse.dateOfBirth}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {registration.dependants.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2 text-primary">Dependants</h4>
                          <div className="space-y-4">
                            {registration.dependants.map((dependant, index) => (
                              <div key={index} className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                  <p className="text-sm font-medium">Name</p>
                                  <p className="text-sm text-muted-foreground">{dependant.name}</p>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-sm font-medium">Date of Birth</p>
                                  <p className="text-sm text-muted-foreground">{dependant.dateOfBirth}</p>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-sm font-medium">Gender</p>
                                  <p className="text-sm text-muted-foreground">{dependant.gender}</p>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-sm font-medium">Category</p>
                                  <p className="text-sm text-muted-foreground">{dependant.category}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
