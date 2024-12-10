import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Mail, Phone, MapPin, Calendar, ChevronDown } from "lucide-react";
import { SpousesSection } from "@/components/registration/SpousesSection";
import { DependantsSection } from "@/components/registration/DependantsSection";
import { NextOfKinSection } from "@/components/registration/NextOfKinSection";
import { useToast } from "@/components/ui/use-toast";

export default function Profile() {
  const { toast } = useToast();

  const handleGoogleConnect = () => {
    // TODO: Implement actual Google OAuth
    toast({
      title: "Google Account",
      description: "Successfully connected to Google account",
    });
    window.open('https://mail.google.com', '_blank');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
        Profile Settings
      </h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Full Name
                </label>
                <Input defaultValue="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Address
                </label>
                <Textarea defaultValue="123 Main St" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Town</label>
                <Input defaultValue="Burton On Trent" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Post Code</label>
                <Input defaultValue="DE14 1AA" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </label>
                <div className="flex gap-2">
                  <Input defaultValue="john.doe@example.com" type="email" />
                  <Button 
                    variant="outline" 
                    onClick={handleGoogleConnect}
                    className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Connect with Google
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Mobile No
                </label>
                <Input defaultValue="+44 7700 900000" type="tel" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Date of Birth
                </label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Place of Birth</label>
                <Input />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Marital Status</label>
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
                <label className="text-sm font-medium">Gender</label>
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
            <div className="flex justify-end">
              <Button>Update Profile</Button>
            </div>
          </CardContent>
        </Card>

        <NextOfKinSection />
        <SpousesSection />
        <DependantsSection />

        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Current Password</label>
              <Input type="password" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">New Password</label>
              <Input type="password" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Confirm New Password</label>
              <Input type="password" />
            </div>
            <div className="flex justify-end">
              <Button variant="outline">Change Password</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}