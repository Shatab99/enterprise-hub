import { Download, Printer, Calendar, DollarSign, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DataTable } from "@/components/erp/DataTable";
import { StatsCard } from "@/components/erp/StatsCard";
import { employees } from "@/data/mock";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const payrollData = employees.map((emp) => ({
  id: emp.id,
  name: emp.name,
  department: emp.department,
  basic: Math.round(emp.salary * 0.6),
  bonus: Math.round(emp.salary * 0.15),
  overtime: Math.round(Math.random() * 500),
  tax: Math.round(emp.salary * 0.12),
  deductions: Math.round(emp.salary * 0.05),
  netSalary: Math.round(emp.salary * 0.98),
  status: 'processed' as const,
}));

const monthlyPayrollExpense = [
  { month: 'Jan', expense: 385000 },
  { month: 'Feb', expense: 392000 },
  { month: 'Mar', expense: 388000 },
  { month: 'Apr', expense: 405000 },
  { month: 'May', expense: 412000 },
  { month: 'Jun', expense: 420000 },
];

const payrollColumns = [
  {
    key: "name",
    header: "Employee",
    render: (row: typeof payrollData[0]) => (
      <div>
        <p className="font-medium">{row.name}</p>
        <p className="text-sm text-muted-foreground">{row.department}</p>
      </div>
    ),
    sortable: true,
  },
  {
    key: "basic",
    header: "Basic",
    render: (row: typeof payrollData[0]) => `$${row.basic.toLocaleString()}`,
    sortable: true,
  },
  {
    key: "bonus",
    header: "Bonus",
    render: (row: typeof payrollData[0]) => `$${row.bonus.toLocaleString()}`,
  },
  {
    key: "overtime",
    header: "Overtime",
    render: (row: typeof payrollData[0]) => `$${row.overtime.toLocaleString()}`,
  },
  {
    key: "tax",
    header: "Tax",
    render: (row: typeof payrollData[0]) => (
      <span className="text-destructive">-${row.tax.toLocaleString()}</span>
    ),
  },
  {
    key: "deductions",
    header: "Deductions",
    render: (row: typeof payrollData[0]) => (
      <span className="text-destructive">-${row.deductions.toLocaleString()}</span>
    ),
  },
  {
    key: "netSalary",
    header: "Net Salary",
    render: (row: typeof payrollData[0]) => (
      <span className="font-bold text-success">${row.netSalary.toLocaleString()}</span>
    ),
    sortable: true,
  },
];

export default function Payroll() {
  const totalPayroll = payrollData.reduce((acc, p) => acc + p.netSalary, 0);
  const avgSalary = Math.round(totalPayroll / payrollData.length);
  const totalTax = payrollData.reduce((acc, p) => acc + p.tax, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payroll Management</h1>
          <p className="text-muted-foreground">
            Process salaries, generate payslips, and track expenses
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            January 2024
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export All
          </Button>
          <Button>
            <Printer className="mr-2 h-4 w-4" />
            Generate Payslips
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatsCard
          title="Total Payroll"
          value={`$${totalPayroll.toLocaleString()}`}
          icon={<DollarSign className="h-6 w-6" />}
          change={5}
          changeType="increase"
        />
        <StatsCard
          title="Employees"
          value={payrollData.length}
          icon={<Users className="h-6 w-6" />}
        />
        <StatsCard
          title="Avg. Salary"
          value={`$${avgSalary.toLocaleString()}`}
          icon={<TrendingUp className="h-6 w-6" />}
        />
        <StatsCard
          title="Total Tax"
          value={`$${totalTax.toLocaleString()}`}
          icon={<DollarSign className="h-6 w-6" />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Payroll Expense</CardTitle>
            <CardDescription>Track payroll costs over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyPayrollExpense}>
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
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Expense']}
                  />
                  <Bar 
                    dataKey="expense" 
                    fill="hsl(var(--primary))" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Salary Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Salary Distribution</CardTitle>
            <CardDescription>By department</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { dept: 'Engineering', amount: 185000, total: totalPayroll },
              { dept: 'Sales', amount: 92000, total: totalPayroll },
              { dept: 'Marketing', amount: 78000, total: totalPayroll },
              { dept: 'Design', amount: 85000, total: totalPayroll },
              { dept: 'HR', amount: 72000, total: totalPayroll },
            ].map((item) => (
              <div key={item.dept} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>{item.dept}</span>
                  <span className="font-medium">${item.amount.toLocaleString()}</span>
                </div>
                <Progress value={(item.amount / totalPayroll) * 100} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Payroll Table */}
      <Card>
        <CardHeader>
          <CardTitle>Payroll Summary</CardTitle>
          <CardDescription>Detailed breakdown for all employees</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={payrollData}
            columns={payrollColumns}
            searchKey="name"
            pageSize={10}
          />
        </CardContent>
      </Card>
    </div>
  );
}
