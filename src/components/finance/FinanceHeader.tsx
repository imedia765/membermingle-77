import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { AddPaymentDialog } from "./AddPaymentDialog";
import { AddExpenseDialog } from "./AddExpenseDialog";

export function FinanceHeader() {
  return (
    <div className="flex justify-between items-center mb-6">
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
          <AddPaymentDialog />
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Add Expense
            </Button>
          </DialogTrigger>
          <AddExpenseDialog />
        </Dialog>
      </div>
    </div>
  );
}