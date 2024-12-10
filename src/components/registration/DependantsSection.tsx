import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

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
        <Button variant="ghost" className="flex w-full justify-between">
          <h3 className="text-lg font-semibold">Dependants</h3>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        {dependants.map((dependant, index) => (
          <div key={index} className="space-y-4 p-4 border rounded-lg">
            <h4>Dependant {index + 1}</h4>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label>Name</label>
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
                <label>Date of Birth</label>
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
                <label>Gender</label>
                <Select
                  value={dependant.gender}
                  onValueChange={(value) => {
                    const newDependants = [...dependants];
                    newDependants[index].gender = value;
                    setDependants(newDependants);
                  }}
                >
                  <SelectTrigger>
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
                <label>Category</label>
                <Select
                  value={dependant.category}
                  onValueChange={(value) => {
                    const newDependants = [...dependants];
                    newDependants[index].category = value;
                    setDependants(newDependants);
                  }}
                >
                  <SelectTrigger>
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
            <Button type="button" variant="destructive" onClick={() => removeDependant(index)}>
              Remove Dependant
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" onClick={addDependant} className="mt-4">
          Add Dependant
        </Button>
      </CollapsibleContent>
    </Collapsible>
  );
};