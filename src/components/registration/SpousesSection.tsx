import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

interface Spouse {
  name: string;
  dateOfBirth: string;
}

export const SpousesSection = () => {
  const [spouses, setSpouses] = useState<Spouse[]>([{ name: "", dateOfBirth: "" }]);

  const addSpouse = () => {
    setSpouses([...spouses, { name: "", dateOfBirth: "" }]);
  };

  const removeSpouse = (index: number) => {
    setSpouses(spouses.filter((_, i) => i !== index));
  };

  return (
    <Collapsible className="space-y-4">
      <CollapsibleTrigger asChild>
        <Button 
          variant="ghost" 
          className="flex w-full justify-between bg-primary/5 hover:bg-primary/10 text-primary"
        >
          <h3 className="text-lg font-semibold">Spouses</h3>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        {spouses.map((spouse, index) => (
          <div key={index} className="space-y-4 p-4 border rounded-lg">
            <h4>Spouse {index + 1}</h4>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label>Name</label>
                <Input
                  value={spouse.name}
                  onChange={(e) => {
                    const newSpouses = [...spouses];
                    newSpouses[index].name = e.target.value;
                    setSpouses(newSpouses);
                  }}
                />
              </div>
              <div className="space-y-2">
                <label>Date of Birth</label>
                <Input
                  type="date"
                  value={spouse.dateOfBirth}
                  onChange={(e) => {
                    const newSpouses = [...spouses];
                    newSpouses[index].dateOfBirth = e.target.value;
                    setSpouses(newSpouses);
                  }}
                />
              </div>
            </div>
            <Button type="button" variant="destructive" onClick={() => removeSpouse(index)}>
              Remove Spouse
            </Button>
          </div>
        ))}
        <Button 
          type="button" 
          variant="outline" 
          onClick={addSpouse} 
          className="mt-4 w-full bg-primary/5 hover:bg-primary/10 text-primary border-primary/20"
        >
          Add Spouse
        </Button>
      </CollapsibleContent>
    </Collapsible>
  );
};