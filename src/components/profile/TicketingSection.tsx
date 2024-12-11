import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { MessageSquarePlus, Reply, MessageCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Ticket {
  id: string;
  subject: string;
  message: string;
  status: "open" | "closed";
  date: string;
  responses: Response[];
}

interface Response {
  id: string;
  message: string;
  date: string;
  isAdmin: boolean;
}

export function TicketingSection() {
  const { toast } = useToast();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [newTicket, setNewTicket] = useState({ subject: "", message: "" });
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [response, setResponse] = useState("");

  const handleCreateTicket = () => {
    if (!newTicket.subject || !newTicket.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const ticket: Ticket = {
      id: `TICKET-${Math.random().toString(36).substr(2, 9)}`,
      subject: newTicket.subject,
      message: newTicket.message,
      status: "open",
      date: new Date().toISOString(),
      responses: [],
    };

    setTickets([ticket, ...tickets]);
    setNewTicket({ subject: "", message: "" });
    toast({
      title: "Success",
      description: "Ticket created successfully",
    });
  };

  const handleAddResponse = () => {
    if (!response || !selectedTicket) return;

    const newResponse: Response = {
      id: Math.random().toString(36).substr(2, 9),
      message: response,
      date: new Date().toISOString(),
      isAdmin: false,
    };

    const updatedTickets = tickets.map((ticket) =>
      ticket.id === selectedTicket.id
        ? {
            ...ticket,
            responses: [...ticket.responses, newResponse],
          }
        : ticket
    );

    setTickets(updatedTickets);
    setResponse("");
    toast({
      title: "Success",
      description: "Response added successfully",
    });
  };

  return (
    <div className="space-y-6">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full">
            <MessageSquarePlus className="mr-2 h-4 w-4" />
            Create New Ticket
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Support Ticket</DialogTitle>
            <DialogDescription>
              Please provide details about your inquiry
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Subject"
              value={newTicket.subject}
              onChange={(e) =>
                setNewTicket({ ...newTicket, subject: e.target.value })
              }
            />
            <Textarea
              placeholder="Message"
              value={newTicket.message}
              onChange={(e) =>
                setNewTicket({ ...newTicket, message: e.target.value })
              }
            />
          </div>
          <DialogFooter>
            <Button onClick={handleCreateTicket}>Submit Ticket</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ticket ID</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell>{ticket.id}</TableCell>
                <TableCell>{ticket.subject}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      ticket.status === "open"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {ticket.status}
                  </span>
                </TableCell>
                <TableCell>
                  {new Date(ticket.date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedTicket(ticket)}
                      >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        View & Respond
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Ticket: {ticket.id}</DialogTitle>
                        <DialogDescription>{ticket.subject}</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="rounded-lg bg-muted p-4">
                          <p className="text-sm">{ticket.message}</p>
                          <p className="mt-2 text-xs text-muted-foreground">
                            {new Date(ticket.date).toLocaleString()}
                          </p>
                        </div>
                        {ticket.responses.map((response) => (
                          <div
                            key={response.id}
                            className={`rounded-lg p-4 ${
                              response.isAdmin
                                ? "bg-blue-50 ml-8"
                                : "bg-muted mr-8"
                            }`}
                          >
                            <p className="text-sm">{response.message}</p>
                            <p className="mt-2 text-xs text-muted-foreground">
                              {new Date(response.date).toLocaleString()}
                            </p>
                          </div>
                        ))}
                        <div className="flex gap-2">
                          <Textarea
                            placeholder="Type your response..."
                            value={response}
                            onChange={(e) => setResponse(e.target.value)}
                          />
                          <Button onClick={handleAddResponse}>
                            <Reply className="mr-2 h-4 w-4" />
                            Send
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}