import { Download, Calendar, FileText, BarChart3, Users, DollarSign, Package, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { revenueData, employees, products, properties, orders, transactions } from "@/data/mock";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

const reportCards = [
  { title: 'HR Analytics', description: 'Employee metrics and trends', icon: Users, color: 'text-primary' },
  { title: 'Payroll Summary', description: 'Salary and compensation data', icon: DollarSign, color: 'text-success' },
  { title: 'Product Sales', description: 'Inventory and sales analysis', icon: Package, color: 'text-accent' },
  { title: 'Rental Earnings', description: 'Property income reports', icon: Building2, color: 'text-warning' },
];

const departmentData = [
  { name: 'Engineering', value: 24 },
  { name: 'Sales', value: 20 },
  { name: 'Marketing', value: 15 },
  { name: 'Design', value: 12 },
  { name: 'Others', value: 29 },
];

const salesByCategory = [
  { category: 'Electronics', sales: 45000 },
  { category: 'Apparel', sales: 28000 },
  { category: 'Home', sales: 32000 },
  { category: 'Sports', sales: 18000 },
  { category: 'Accessories', sales: 15000 },
];

export default function Reports() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">
            Analytics and insights across all modules
          </p>
        </div>
        <div className="flex gap-3">
          <Select defaultValue="month">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export All
          </Button>
        </div>
      </div>

      {/* Report Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {reportCards.map((report) => (
          <Card key={report.title} className="cursor-pointer hover:shadow-lg transition-all hover:border-primary/50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className={`rounded-lg bg-muted p-3 ${report.color}`}>
                  <report.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">{report.title}</h3>
                  <p className="text-sm text-muted-foreground">{report.description}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="mt-4 w-full">
                <FileText className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="hr">HR</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="finance">Finance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Revenue Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Monthly revenue over the year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `$${v/1000}k`} />
                      <Tooltip
                        contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }}
                        formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                      />
                      <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorRev)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Sales by Category */}
            <Card>
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
                <CardDescription>Product category performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesByCategory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `$${v/1000}k`} />
                      <Tooltip
                        contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }}
                        formatter={(value: number) => [`$${value.toLocaleString()}`, 'Sales']}
                      />
                      <Bar dataKey="sales" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Total Employees</p>
                <p className="text-3xl font-bold">{employees.length}</p>
                <p className="text-sm text-success">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Total Products</p>
                <p className="text-3xl font-bold">{products.length}</p>
                <p className="text-sm text-success">+8% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Total Properties</p>
                <p className="text-3xl font-bold">{properties.length}</p>
                <p className="text-sm text-success">+15% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-3xl font-bold">{orders.length}</p>
                <p className="text-sm text-destructive">-3% from last month</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="hr" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Department Distribution</CardTitle>
                <CardDescription>Employees by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={departmentData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={4}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {departmentData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Employee Status</CardTitle>
                <CardDescription>Active, on leave, and inactive</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-success/10">
                    <span>Active</span>
                    <span className="font-bold text-success">{employees.filter(e => e.status === 'active').length}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-warning/10">
                    <span>On Leave</span>
                    <span className="font-bold text-warning">{employees.filter(e => e.status === 'on-leave').length}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
                    <span>Inactive</span>
                    <span className="font-bold">{employees.filter(e => e.status === 'inactive').length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sales" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Status Overview</CardTitle>
              <CardDescription>Orders by current status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-5">
                {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                  <div key={status} className="text-center p-4 rounded-lg bg-muted/50">
                    <p className="text-2xl font-bold">{orders.filter(o => o.status === status).length}</p>
                    <p className="text-sm text-muted-foreground capitalize">{status}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="finance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Income vs Expenses</CardTitle>
              <CardDescription>Financial comparison</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `$${v/1000}k`} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="hsl(var(--success))" strokeWidth={2} name="Revenue" />
                    <Line type="monotone" dataKey="expenses" stroke="hsl(var(--destructive))" strokeWidth={2} name="Expenses" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
