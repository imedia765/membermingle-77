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
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="w-full grid grid-cols-3 sm:grid-cols-5 gap-2">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="payments">Payments</TabsTrigger>
        <TabsTrigger value="expenses">Expenses</TabsTrigger>
        <TabsTrigger value="collectors">Collectors</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
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