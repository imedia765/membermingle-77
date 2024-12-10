import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FinanceHeader } from "@/components/finance/FinanceHeader";
import { FinanceStats } from "@/components/finance/FinanceStats";
import { SearchTransactions } from "@/components/finance/SearchTransactions";
import { TransactionsTable } from "@/components/finance/TransactionsTable";

// Mock data
const transactions = [
  { id: 1, member: "John Doe", amount: 50, date: "2024-02-15", type: "Collection", collector: "Anjum Riaz" },
  { id: 2, member: "Jane Smith", amount: 100, date: "2024-02-14", type: "Collection", collector: "Zabbie" },
  { id: 3, member: "Mike Johnson", amount: -200, date: "2024-02-13", type: "Expense", category: "Utilities" },
];

const collectors = [
  { id: 1, name: "Anjum Riaz", members: 161 },
  { id: 2, name: "Zabbie", members: 116 },
];

export default function Finance() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");

  const generateReport = () => {
    console.log("Generating report...");
  };

  return (
    <div className="space-y-6 container px-4">
      <FinanceHeader />
      <FinanceStats />

      <div className="flex flex-col sm:flex-row gap-2">
        <SearchTransactions searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Button variant="outline" size="icon" className="w-full sm:w-auto">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto flex-nowrap border-b">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="collectors">Collectors</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Transactions</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <TransactionsTable transactions={transactions} />
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
                <div className="flex flex-col sm:flex-row gap-2">
                  <Select>
                    <SelectTrigger className="w-full sm:w-[200px]">
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
                  <Button variant="outline" className="w-full sm:w-auto">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
                <TransactionsTable 
                  transactions={transactions.filter((t) => t.amount > 0)} 
                />
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
                  <Select>
                    <SelectTrigger className="max-w-xs">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utilities">Utilities</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="supplies">Supplies</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions
                      .filter((t) => t.amount < 0)
                      .map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{transaction.member}</TableCell>
                          <TableCell>{transaction.category}</TableCell>
                          <TableCell className="text-red-500">£{Math.abs(transaction.amount)}</TableCell>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800">
                              Processed
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
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
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Input placeholder="Search collectors..." className="max-w-sm" />
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export List
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Collector</TableHead>
                      <TableHead>Members</TableHead>
                      <TableHead>Total Collections</TableHead>
                      <TableHead>This Month</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {collectors.map((collector) => (
                      <TableRow key={collector.id}>
                        <TableCell>{collector.name}</TableCell>
                        <TableCell>{collector.members}</TableCell>
                        <TableCell>£{(Math.random() * 10000).toFixed(2)}</TableCell>
                        <TableCell>£{(Math.random() * 1000).toFixed(2)}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">View Details</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Monthly Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <Select defaultValue="current">
                    <SelectTrigger>
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current">Current Month</SelectItem>
                      <SelectItem value="last">Last Month</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={generateReport} className="w-full">
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Report
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Collector Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select collector" />
                    </SelectTrigger>
                    <SelectContent>
                      {collectors.map((collector) => (
                        <SelectItem key={collector.id} value={collector.name}>
                          {collector.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button onClick={generateReport} className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
