import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";

export default function Register() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [spouses, setSpouses] = useState([{ name: "", dateOfBirth: "" }]);
  const [dependants, setDependants] = useState([{ name: "", dateOfBirth: "", gender: "", category: "" }]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Registration submitted",
      description: "Your registration has been submitted successfully.",
    });
    navigate("/login");
  };

  const addSpouse = () => {
    setSpouses([...spouses, { name: "", dateOfBirth: "" }]);
  };

  const removeSpouse = (index: number) => {
    setSpouses(spouses.filter((_, i) => i !== index));
  };

  const addDependant = () => {
    setDependants([...dependants, { name: "", dateOfBirth: "", gender: "", category: "" }]);
  };

  const removeDependant = (index: number) => {
    setDependants(dependants.filter((_, i) => i !== index));
  };

  return (
    <div className="container py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">PWA Burton On Trent Registration Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="fullName">Full Name</label>
                  <Input id="fullName" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="address">Address</label>
                  <Textarea id="address" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="town">Town</label>
                  <Input id="town" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="postCode">Post Code</label>
                  <Input id="postCode" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email">Email</label>
                  <Input type="email" id="email" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="mobile">Mobile No</label>
                  <Input type="tel" id="mobile" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="dob">Date of Birth</label>
                  <Input type="date" id="dob" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="pob">Place of Birth</label>
                  <Input id="pob" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="maritalStatus">Marital Status</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Marital Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married</SelectItem>
                      <SelectItem value="divorced">Divorced</SelectItem>
                      <SelectItem value="widowed">Widowed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="gender">Gender</label>
                  <Select>
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
              </div>
            </div>

            {/* Next of Kin */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Next of Kin Information</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="kinName">Name</label>
                  <Input id="kinName" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="kinAddress">Address</label>
                  <Textarea id="kinAddress" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="kinPhone">Phone</label>
                  <Input type="tel" id="kinPhone" required />
                </div>
              </div>
            </div>

            {/* Spouses */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Spouses</h3>
              {spouses.map((spouse, index) => (
                <div key={index} className="space-y-4 p-4 border rounded-lg">
                  <h4>Spouse {index + 1}</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label>Name</label>
                      <Input value={spouse.name} onChange={(e) => {
                        const newSpouses = [...spouses];
                        newSpouses[index].name = e.target.value;
                        setSpouses(newSpouses);
                      }} />
                    </div>
                    <div className="space-y-2">
                      <label>Date of Birth</label>
                      <Input type="date" value={spouse.dateOfBirth} onChange={(e) => {
                        const newSpouses = [...spouses];
                        newSpouses[index].dateOfBirth = e.target.value;
                        setSpouses(newSpouses);
                      }} />
                    </div>
                  </div>
                  <Button type="button" variant="destructive" onClick={() => removeSpouse(index)}>
                    Remove Spouse
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addSpouse}>
                Add Spouse
              </Button>
            </div>

            {/* Dependants */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Dependants</h3>
              {dependants.map((dependant, index) => (
                <div key={index} className="space-y-4 p-4 border rounded-lg">
                  <h4>Dependant {index + 1}</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label>Name</label>
                      <Input value={dependant.name} onChange={(e) => {
                        const newDependants = [...dependants];
                        newDependants[index].name = e.target.value;
                        setDependants(newDependants);
                      }} />
                    </div>
                    <div className="space-y-2">
                      <label>Date of Birth</label>
                      <Input type="date" value={dependant.dateOfBirth} onChange={(e) => {
                        const newDependants = [...dependants];
                        newDependants[index].dateOfBirth = e.target.value;
                        setDependants(newDependants);
                      }} />
                    </div>
                    <div className="space-y-2">
                      <label>Gender</label>
                      <Select value={dependant.gender} onValueChange={(value) => {
                        const newDependants = [...dependants];
                        newDependants[index].gender = value;
                        setDependants(newDependants);
                      }}>
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
                      <Select value={dependant.category} onValueChange={(value) => {
                        const newDependants = [...dependants];
                        newDependants[index].category = value;
                        setDependants(newDependants);
                      }}>
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
              <Button type="button" variant="outline" onClick={addDependant}>
                Add Dependant
              </Button>
            </div>

            {/* Membership Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Membership Information</h3>
              <div className="space-y-2">
                <h4 className="font-medium">Membership Fee</h4>
                <p>Registration fee: £150</p>
                <p>Annual fee: £40 (collected £20 in January and £20 in June)</p>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="giftAid" />
                <label htmlFor="giftAid">
                  I am eligible for Gift Aid
                </label>
              </div>
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <Checkbox id="terms" required />
                  <label htmlFor="terms" className="text-sm">
                    I/We Hereby confirm the above details provided are genuine and valid. I/We also understand that submitting an application or making payment does not obligate PWA Burton On Trent to grant Membership. Membership will only be approved once all criteria are met, Supporting documents presented, Payment made in Full and approval is informed by the Management of PWA Burton On Trent. I/We understand and agree that it is my/our duty and responsibility to notify PWA Burton On Trent of ALL changes in circumstance in relation to myself/ALL those under this Membership, at my/our earliest convenience.
                  </label>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full">
              Submit Registration
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}