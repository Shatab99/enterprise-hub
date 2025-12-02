import {
  Users,
  Package,
  ShoppingCart,
  Building2,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import { StatsCard } from "@/components/erp/StatsCard";
import { RevenueChart } from "@/components/charts/RevenueChart";
import { DepartmentChart } from "@/components/charts/DepartmentChart";
import { DataTable } from "@/components/erp/DataTable";
import { StatusBadge } from "@/components/erp/StatusBadge";
import { orders, employees, properties, products } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const statsCards = [
  {
    title: "Total Employees",
    value: "127",
    change: 12,
    changeType: "increase" as const,
    icon: <Users className="h-6 w-6" />,
  },
  {
    title: "Total Products",
    value: "1,245",
    change: 8,
    changeType: "increase" as const,
    icon: <Package className="h-6 w-6" />,
  },
  {
    title: "Total Orders",
    value: "3,842",
    change: -3,
    changeType: "decrease" as const,
    icon: <ShoppingCart className="h-6 w-6" />,
  },
  {
    title: "Properties",
    value: "48",
    change: 15,
    changeType: "increase" as const,
    icon: <Building2 className="h-6 w-6" />,
  },
  {
    title: "Revenue",
    value: "$284,532",
    change: 23,
    changeType: "increase" as const,
    icon: <DollarSign className="h-6 w-6" />,
  },
  {
    title: "Growth",
    value: "+18.2%",
    change: 5,
    changeType: "increase" as const,
    icon: <TrendingUp className="h-6 w-6" />,
  },
];

const recentOrderColumns = [
  { key: "id", header: "Order ID" },
  { key: "customer", header: "Customer" },
  {
    key: "total",
    header: "Total",
    render: (order: typeof orders[0]) => `$${order.total.toFixed(2)}`,
  },
  {
    key: "status",
    header: "Status",
    render: (order: typeof orders[0]) => <StatusBadge status={order.status} />,
  },
  { key: "date", header: "Date" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your business.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Clock className="mr-2 h-4 w-4" />
            Last 30 days
          </Button>
          <Button className="gap-2">
            <ArrowUpRight className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {statsCards.map((stat, index) => (
          <StatsCard
            key={stat.title}
            {...stat}
            delay={index * 50}
            className="animate-fade-up"
          />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue and profit trends</CardDescription>
          </CardHeader>
          <CardContent>
            <RevenueChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Department Distribution</CardTitle>
            <CardDescription>Employees by department</CardDescription>
          </CardHeader>
          <CardContent>
            <DepartmentChart />
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest e-commerce orders</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              View all
            </Button>
          </CardHeader>
          <CardContent>
            <DataTable
              data={orders.slice(0, 5)}
              columns={recentOrderColumns}
              pageSize={5}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Low Stock Alert</CardTitle>
              <CardDescription>Products that need restocking</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              View all
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products
                .filter((p) => p.status !== "in-stock")
                .slice(0, 4)
                .map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  >
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        SKU: {product.sku}
                      </p>
                    </div>
                    <div className="text-right">
                      <StatusBadge status={product.status} />
                      <p className="text-sm text-muted-foreground mt-1">
                        {product.stock} units
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <Button variant="outline" className="h-24 flex-col gap-2">
              <Users className="h-6 w-6" />
              <span>Add Employee</span>
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-2">
              <Package className="h-6 w-6" />
              <span>New Product</span>
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-2">
              <Building2 className="h-6 w-6" />
              <span>Add Property</span>
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-2">
              <DollarSign className="h-6 w-6" />
              <span>Record Transaction</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
