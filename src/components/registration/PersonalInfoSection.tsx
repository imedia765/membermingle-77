import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import { useState, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";

interface PersonalInfoProps {
  register: any; // Replace with proper type when form handling is implemented
}

const libraries: ("places")[] = ["places"];

export const PersonalInfoSection = ({ register }: PersonalInfoProps) => {
  const { toast } = useToast();
  const [address, setAddress] = useState("");
  const [town, setTown] = useState("");
  const [postCode, setPostCode] = useState("");

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  const handlePlaceSelect = useCallback((place: google.maps.places.PlaceResult) => {
    if (!place.address_components) return;

    let streetNumber = "";
    let route = "";
    let locality = "";
    let postalCode = "";

    place.address_components.forEach((component) => {
      const types = component.types;
      if (types.includes("street_number")) {
        streetNumber = component.long_name;
      }
      if (types.includes("route")) {
        route = component.long_name;
      }
      if (types.includes("postal_town") || types.includes("locality")) {
        locality = component.long_name;
      }
      if (types.includes("postal_code")) {
        postalCode = component.long_name;
      }
    });

    const fullAddress = `${streetNumber} ${route}`.trim();
    setAddress(fullAddress);
    setTown(locality);
    setPostCode(postalCode);

    toast({
      title: "Address Selected",
      description: "Address details have been automatically filled.",
    });
  }, [toast]);

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
          {isLoaded ? (
            <Autocomplete
              onLoad={(autocomplete) => {
                autocomplete.setFields(['address_components', 'formatted_address']);
              }}
              onPlaceChanged={() => {
                const autocomplete = document.querySelector<HTMLInputElement>('input[id="address"]');
                if (autocomplete) {
                  const place = (autocomplete as any).getPlace();
                  handlePlaceSelect(place);
                }
              }}
            >
              <Textarea 
                id="address" 
                required 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Autocomplete>
          ) : (
            <Textarea id="address" required />
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="town">Town</label>
          <Input 
            id="town" 
            required 
            value={town}
            onChange={(e) => setTown(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="postCode">Post Code</label>
          <Input 
            id="postCode" 
            required 
            value={postCode}
            onChange={(e) => setPostCode(e.target.value)}
          />
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
