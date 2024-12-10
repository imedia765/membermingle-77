import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Dependant {
  name: string;
  dateOfBirth: string;
  gender: string;
  category: string;
}

export const DependantsSection = () => {
  const [dependants, setDependants] = useState<Dependant[]>([
    { name: "", dateOfBirth: "", gender: "", category: "" },
  ]);

  const addDependant = () => {
    setDependants([...dependants, { name: "", dateOfBirth: "", gender: "", category: "" }]);
  };

  const removeDependant = (index: number) => {
    setDependants(dependants.filter((_, i) => i !== index));
  };

  return (
    <Collapsible className="space-y-4">
      <CollapsibleTrigger asChild>
        <Button 
          variant="ghost" 
          className="flex w-full justify-between bg-primary/5 hover:bg-primary/10 text-primary"
        >
          <h3 className="text-lg font-semibold">Dependants</h3>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-4">
        {dependants.map((dependant, index) => (
          <Card key={index} className="p-4 space-y-4">
            <h4 className="font-medium text-primary">Dependant {index + 1}</h4>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input
                  value={dependant.name}
                  onChange={(e) => {
                    const newDependants = [...dependants];
                    newDependants[index].name = e.target.value;
                    setDependants(newDependants);
                  }}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Date of Birth</label>
                <Input
                  type="date"
                  value={dependant.dateOfBirth}
                  onChange={(e) => {
                    const newDependants = [...dependants];
                    newDependants[index].dateOfBirth = e.target.value;
                    setDependants(newDependants);
                  }}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Gender</label>
                <Select
                  value={dependant.gender}
                  onValueChange={(value) => {
                    const newDependants = [...dependants];
                    newDependants[index].gender = value;
                    setDependants(newDependants);
                  }}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select
                  value={dependant.category}
                  onValueChange={(value) => {
                    const newDependants = [...dependants];
                    newDependants[index].category = value;
                    setDependants(newDependants);
                  }}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="child">Child</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button 
              type="button" 
              variant="destructive" 
              onClick={() => removeDependant(index)}
              className="mt-2"
            >
              Remove Dependant
            </Button>
          </Card>
        ))}
        <Button 
          type="button" 
          variant="outline" 
          onClick={addDependant} 
          className="w-full bg-primary/5 hover:bg-primary/10 text-primary border-primary/20"
        >
          Add Dependant
        </Button>
      </CollapsibleContent>
    </Collapsible>
  );
};