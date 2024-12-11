import { AccountSettingsSection } from "@/components/profile/AccountSettingsSection";
import { CollectorDetails } from "@/components/profile/CollectorDetails";

// Sample collector data - this would typically come from your backend
const sampleCollector = {
  id: "1",
  name: "Anjum Riaz",
  phoneNumber: "+44 7700 900123",
  email: "anjum.riaz@example.com",
  area: "Burton On Trent",
  membersCount: 161
};

export default function Profile() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
        Profile Settings
      </h1>

      <div className="space-y-6">
        <CollectorDetails collector={sampleCollector} />
        <AccountSettingsSection />
      </div>
    </div>
  );
}