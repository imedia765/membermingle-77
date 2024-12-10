import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, TrendingUp, TrendingDown, Plus, FileText, Download } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";

// Mock data - replace with actual data from your backend
const transactions = [
  { id: 1, member: "John Doe", amount: 50, date: "2024-02-15", type: "Collection", collector: "Anjum Riaz" },
  { id: 2, member: "Jane Smith", amount: 100, date: "2024-02-14", type: "Collection", collector: "Zabbie" },
  { id: 3, member: "Mike Johnson", amount: -200, date: "2024-02-13", type: "Expense", category: "Utilities" },
];

const collectors = [
  { id: 1, name: "Anjum Riaz", members: 161 },
  { id: 2, name: "Zabbie", members: 116 },
  // ... Add other collectors
];

export default function Finance() {
  const [activeTab, setActiveTab] = useState("overview");
  const form = useForm();

  const handleAddPayment = (data: any) => {
    console.log("Adding payment:", data);
    // Implement payment addition logic
  };

  const handleAddExpense = (data: any) => {
    console.log("Adding expense:", data);
    // Implement expense addition logic
  };

  const generateReport = () => {
    console.log("Generating report...");
    // Implement report generation logic
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
          Financial Overview
        </h1>
        <div className="space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Payment
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Payment</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleAddPayment)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="paymentType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="individual">Individual Member</SelectItem>
                            <SelectItem value="collector">Collector Group</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Enter amount" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Submit Payment</Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Expense</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleAddExpense)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="utilities">Utilities</SelectItem>
                            <SelectItem value="maintenance">Maintenance</SelectItem>
                            <SelectItem value="supplies">Supplies</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Enter amount" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Submit Expense</Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">£24,680</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">£4,320</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">£1,250</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="collectors">Collectors</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member/Description</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.member}</TableCell>
                      <TableCell>{transaction.type}</TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell className={transaction.amount < 0 ? "text-red-500" : "text-green-500"}>
                        £{Math.abs(transaction.amount)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Payment Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Input placeholder="Search payments..." />
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by collector" />
                    </SelectTrigger>
                    <SelectContent>
                      {collectors.map((collector) => (
                        <SelectItem key={collector.id} value={collector.name}>
                          {collector.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Table>
                  {/* Add payment-specific table content */}
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses">
          <Card>
            <CardHeader>
              <CardTitle>Expense Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Input placeholder="Search expenses..." />
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utilities">Utilities</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="supplies">Supplies</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Table>
                  {/* Add expense-specific table content */}
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="collectors">
          <Card>
            <CardHeader>
              <CardTitle>Collector Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Collector</TableHead>
                    <TableHead>Members</TableHead>
                    <TableHead>Total Collections</TableHead>
                    <TableHead>This Month</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {collectors.map((collector) => (
                    <TableRow key={collector.id}>
                      <TableCell>{collector.name}</TableCell>
                      <TableCell>{collector.members}</TableCell>
                      <TableCell>£{(Math.random() * 10000).toFixed(2)}</TableCell>
                      <TableCell>£{(Math.random() * 1000).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Financial Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Monthly Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={generateReport} className="w-full">
                      <FileText className="mr-2 h-4 w-4" />
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Collector Reports</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={generateReport} className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Download Report
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}