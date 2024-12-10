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
      <TabsList className="w-full grid grid-cols-2 md:grid-cols-5 gap-4 p-4 mb-6 sticky top-0 bg-background z-10">
        <TabsTrigger 
          value="overview" 
          className="w-full h-12 text-sm md:text-base px-2 whitespace-nowrap overflow-hidden text-ellipsis"
        >
          Overview
        </TabsTrigger>
        <TabsTrigger 
          value="payments" 
          className="w-full h-12 text-sm md:text-base px-2 whitespace-nowrap overflow-hidden text-ellipsis"
        >
          Payments
        </TabsTrigger>
        <TabsTrigger 
          value="expenses" 
          className="w-full h-12 text-sm md:text-base px-2 whitespace-nowrap overflow-hidden text-ellipsis"
        >
          Expenses
        </TabsTrigger>
        <TabsTrigger 
          value="collectors" 
          className="w-full h-12 text-sm md:text-base px-2 whitespace-nowrap overflow-hidden text-ellipsis"
        >
          Collectors
        </TabsTrigger>
        <TabsTrigger 
          value="reports" 
          className="w-full h-12 text-sm md:text-base px-2 whitespace-nowrap overflow-hidden text-ellipsis"
        >
          Reports
        </TabsTrigger>
      </TabsList>

      <div className="mt-16">
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
      </div>
    </Tabs>
  );
}