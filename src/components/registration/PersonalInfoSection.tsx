import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PersonalInfoProps {
  register: any; // Replace with proper type when form handling is implemented
}

export const PersonalInfoSection = ({ register }: PersonalInfoProps) => {
  return (
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
  );
};