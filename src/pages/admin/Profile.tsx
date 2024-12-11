import { Receipt, Ticket, HeadsetIcon, File, MailIcon, PhoneCall } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { AccountSettingsSection } from "@/components/profile/AccountSettingsSection";
import { TicketingSection } from "@/components/profile/TicketingSection";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
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

  const paymentHistory = [
    { date: '2024-03-15', amount: '£50.00', status: 'Paid', type: 'Membership Fee' },
    { date: '2024-02-15', amount: '£50.00', status: 'Paid', type: 'Membership Fee' },
  ];

  const documents = [
    { name: 'ID Document.pdf', uploadDate: '2024-03-01', type: 'Identification' },
    { name: 'Proof of Address.pdf', uploadDate: '2024-02-15', type: 'Address Proof' },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
        Members Profile
      </h1>

      <div className="space-y-6">
        <AccountSettingsSection />

        {/* Support Tickets Section */}
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
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <TicketingSection />
          </CollapsibleContent>
        </Collapsible>

        {/* Payment History Section */}
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

        {/* Support Section */}
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
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <div className="space-y-4 p-4">
              <p className="text-sm text-muted-foreground">
                Need help? Contact our support team through any of these channels:
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MailIcon className="h-4 w-4" />
                  <span>support@example.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneCall className="h-4 w-4" />
                  <span>+44 (0) 123 456 7890</span>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Documents Section */}
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
      </div>
    </div>
  );
}