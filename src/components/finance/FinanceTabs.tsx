import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FinanceOverviewTab } from "./tabs/FinanceOverviewTab";
import { FinancePaymentsTab } from "./tabs/FinancePaymentsTab";
import { FinanceExpensesTab } from "./tabs/FinanceExpensesTab";
import { FinanceCollectorsTab } from "./tabs/FinanceCollectorsTab";
import { FinanceReportsTab } from "./tabs/FinanceReportsTab";

interface FinanceTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

export function FinanceTabs({ activeTab, setActiveTab }: FinanceTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-4">
      <TabsList className="w-full grid grid-cols-2 sm:grid-cols-3 gap-2">
        <TabsTrigger value="overview" className="w-full">Overview</TabsTrigger>
        <TabsTrigger value="payments" className="w-full">Payments</TabsTrigger>
        <TabsTrigger value="expenses" className="w-full">Expenses</TabsTrigger>
        <TabsTrigger value="collectors" className="w-full sm:col-span-2">Collectors</TabsTrigger>
        <TabsTrigger value="reports" className="w-full">Reports</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <FinanceOverviewTab />
      </TabsContent>
      <TabsContent value="payments">
        <FinancePaymentsTab />
      </TabsContent>
      <TabsContent value="expenses">
        <FinanceExpensesTab />
      </TabsContent>
      <TabsContent value="collectors">
        <FinanceCollectorsTab />
      </TabsContent>
      <TabsContent value="reports">
        <FinanceReportsTab />
      </TabsContent>
    </Tabs>
  );
}