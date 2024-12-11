import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, UserCheck } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface CollectorDetailsProps {
  collector?: {
    id: string;
    name: string;
    phoneNumber: string;
    email: string;
    area: string;
    membersCount: number;
  };
}

export const CollectorDetails = ({ collector }: CollectorDetailsProps) => {
  // If no collector is assigned
  if (!collector) {
    return (
      <Card className="mb-4">
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            No collector assigned yet
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Collapsible>
      <CollapsibleTrigger asChild>
        <Button 
          variant="default"
          className="flex items-center gap-2 w-full justify-between bg-primary hover:bg-primary/90"
        >
          <div className="flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            <span>Your Collector Details</span>
          </div>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-4 pt-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Collector Name</label>
            <div className="text-sm">{collector.name}</div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone Number</label>
            <div className="text-sm">{collector.phoneNumber}</div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <div className="text-sm">{collector.email}</div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Collection Area</label>
            <div className="text-sm">{collector.area}</div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Total Members</label>
            <div className="text-sm">{collector.membersCount} members</div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};