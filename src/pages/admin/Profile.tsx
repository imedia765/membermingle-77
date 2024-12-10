import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Cog, Receipt, Ticket, HeadsetIcon, File, Mail, Phone, MapPin, Calendar, User, ChevronDown } from "lucide-react";
import { SpousesSection } from "@/components/registration/SpousesSection";
import { DependantsSection } from "@/components/registration/DependantsSection";
import { NextOfKinSection } from "@/components/registration/NextOfKinSection";
import { useToast } from "@/components/ui/use-toast";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Profile() {
  const { toast } = useToast();

  const handleGoogleConnect = () => {
    toast({
      title: "Google Account",
      description: "Successfully connected to Google account",
    });
    window.open('https://mail.google.com', '_blank');
  };

  // Sample data for the sections
  const paymentHistory = [
    { date: '2024-03-15', amount: '£50.00', status: 'Paid', type: 'Membership Fee' },
    { date: '2024-02-15', amount: '£50.00', status: 'Paid', type: 'Membership Fee' },
  ];

  const tickets = [
    { id: '#1234', date: '2024-03-10', subject: 'Account Access', status: 'Open' },
    { id: '#1233', date: '2024-02-28', subject: 'Payment Issue', status: 'Closed' },
  ];

  const documents = [
    { name: 'ID Document.pdf', uploadDate: '2024-03-01', type: 'Identification' },
    { name: 'Proof of Address.pdf', uploadDate: '2024-02-15', type: 'Address Proof' },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
        Profile Settings
      </h1>

      <div className="space-y-6">
        {/* Settings Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Cog className="h-6 w-6" />
              Account Settings
            </CardTitle>
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

        {/* Payment History Section */}
        <Card>
          <CardContent className="pt-6">
            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button 
                  variant="default"
                  className="flex items-center gap-2 w-full justify-between bg-primary hover:bg-primary/90"
                >
                  <div className="flex items-center gap-2">
                    <Receipt className="h-4 w-4" />
                    <span>Payment History</span>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4">
                <ScrollArea className="h-[300px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paymentHistory.map((payment, index) => (
                        <TableRow key={index}>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell>{payment.type}</TableCell>
                          <TableCell>{payment.amount}</TableCell>
                          <TableCell>{payment.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>

        {/* Tickets Section */}
        <Card>
          <CardContent className="pt-6">
            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button 
                  variant="default"
                  className="flex items-center gap-2 w-full justify-between bg-primary hover:bg-primary/90"
                >
                  <div className="flex items-center gap-2">
                    <Ticket className="h-4 w-4" />
                    <span>Support Tickets</span>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4">
                <ScrollArea className="h-[300px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ticket ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tickets.map((ticket, index) => (
                        <TableRow key={index}>
                          <TableCell>{ticket.id}</TableCell>
                          <TableCell>{ticket.date}</TableCell>
                          <TableCell>{ticket.subject}</TableCell>
                          <TableCell>{ticket.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>

        {/* Support Section */}
        <Card>
          <CardContent className="pt-6">
            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button 
                  variant="default"
                  className="flex items-center gap-2 w-full justify-between bg-primary hover:bg-primary/90"
                >
                  <div className="flex items-center gap-2">
                    <HeadsetIcon className="h-4 w-4" />
                    <span>Support</span>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4">
                <div className="space-y-4 p-4">
                  <p className="text-sm text-muted-foreground">
                    Need help? Contact our support team through any of these channels:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span>support@example.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>+44 (0) 123 456 7890</span>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>

        {/* Documents Section */}
        <Card>
          <CardContent className="pt-6">
            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button 
                  variant="default"
                  className="flex items-center gap-2 w-full justify-between bg-primary hover:bg-primary/90"
                >
                  <div className="flex items-center gap-2">
                    <File className="h-4 w-4" />
                    <span>Uploaded Documents</span>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4">
                <ScrollArea className="h-[300px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Document Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Upload Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {documents.map((doc, index) => (
                        <TableRow key={index}>
                          <TableCell>{doc.name}</TableCell>
                          <TableCell>{doc.type}</TableCell>
                          <TableCell>{doc.uploadDate}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>

        <NextOfKinSection />
        <SpousesSection />
        <DependantsSection />
      </div>
    </div>
  );
}