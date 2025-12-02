import { Download, Plus, TrendingUp, TrendingDown, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DataTable } from "@/components/erp/DataTable";
import { StatusBadge } from "@/components/erp/StatusBadge";
import { StatsCard } from "@/components/erp/StatsCard";
import { transactions, revenueData } from "@/data/mock";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const transactionColumns = [
  {
    key: "date",
    header: "Date",
    sortable: true,
  },
  {
    key: "description",
    header: "Description",
  },
  { key: "category", header: "Category" },
  {
    key: "type",
    header: "Type",
    render: (t: typeof transactions[0]) => (
      <div className="flex items-center gap-2">
        {t.type === 'income' ? (
          <ArrowUpRight className="h-4 w-4 text-success" />
        ) : (
          <ArrowDownRight className="h-4 w-4 text-destructive" />
        )}
        <span className="capitalize">{t.type}</span>
      </div>
    ),
  },
  {
    key: "amount",
    header: "Amount",
    render: (t: typeof transactions[0]) => (
      <span className={t.type === 'income' ? 'text-success font-medium' : 'text-destructive font-medium'}>
        {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString()}
      </span>
    ),
    sortable: true,
  },
  {
    key: "status",
    header: "Status",
    render: (t: typeof transactions[0]) => <StatusBadge status={t.status} />,
  },
];

export default function Finance() {
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const netProfit = totalIncome - totalExpense;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Finance</h1>
          <p className="text-muted-foreground">
            Track income, expenses, and financial reports
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatsCard
          title="Total Income"
          value={`$${totalIncome.toLocaleString()}`}
          icon={<TrendingUp className="h-6 w-6" />}
          change={18}
          changeType="increase"
        />
        <StatsCard
          title="Total Expenses"
          value={`$${totalExpense.toLocaleString()}`}
          icon={<TrendingDown className="h-6 w-6" />}
          change={5}
          changeType="increase"
        />
        <StatsCard
          title="Net Profit"
          value={`$${netProfit.toLocaleString()}`}
          icon={<DollarSign className="h-6 w-6" />}
          change={netProfit > 0 ? 23 : -8}
          changeType={netProfit > 0 ? "increase" : "decrease"}
        />
        <StatsCard
          title="Profit Margin"
          value={`${((netProfit / totalIncome) * 100).toFixed(1)}%`}
          icon={<DollarSign className="h-6 w-6" />}
        />
      </div>

      {/* Profit & Loss Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Profit & Loss Overview</CardTitle>
          <CardDescription>Monthly revenue vs expenses comparison</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--success))" }}
                  name="Revenue"
                />
                <Line 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="hsl(var(--destructive))" 
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--destructive))" }}
                  name="Expenses"
                />
                <Line 
                  type="monotone" 
                  dataKey="profit" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))" }}
                  name="Profit"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Transactions */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Transactions</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>All financial transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={transactions}
                columns={transactionColumns}
                searchKey="description"
                pageSize={10}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="income">
          <Card>
            <CardHeader>
              <CardTitle>Income Transactions</CardTitle>
              <CardDescription>All incoming payments</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={transactions.filter(t => t.type === 'income')}
                columns={transactionColumns}
                searchKey="description"
                pageSize={10}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses">
          <Card>
            <CardHeader>
              <CardTitle>Expense Transactions</CardTitle>
              <CardDescription>All outgoing payments</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={transactions.filter(t => t.type === 'expense')}
                columns={transactionColumns}
                searchKey="description"
                pageSize={10}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
