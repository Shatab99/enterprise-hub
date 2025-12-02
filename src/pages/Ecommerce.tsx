import { Download, ShoppingCart, Package, Users, DollarSign, Eye, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DataTable } from "@/components/erp/DataTable";
import { StatusBadge } from "@/components/erp/StatusBadge";
import { StatsCard } from "@/components/erp/StatsCard";
import { orders, products, customers } from "@/data/mock";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const orderColumns = [
  { key: "id", header: "Order ID" },
  {
    key: "customer",
    header: "Customer",
    render: (order: typeof orders[0]) => (
      <div>
        <p className="font-medium">{order.customer}</p>
        <p className="text-sm text-muted-foreground">{order.email}</p>
      </div>
    ),
    sortable: true,
  },
  {
    key: "products",
    header: "Items",
    render: (order: typeof orders[0]) => (
      <span>{order.products.length} item(s)</span>
    ),
  },
  {
    key: "total",
    header: "Total",
    render: (order: typeof orders[0]) => `$${order.total.toFixed(2)}`,
    sortable: true,
  },
  {
    key: "paymentStatus",
    header: "Payment",
    render: (order: typeof orders[0]) => <StatusBadge status={order.paymentStatus} />,
  },
  {
    key: "status",
    header: "Status",
    render: (order: typeof orders[0]) => <StatusBadge status={order.status} />,
  },
  { key: "date", header: "Date", sortable: true },
];

// Order status stepper
function OrderStepper({ status }: { status: string }) {
  const steps = ['pending', 'processing', 'shipped', 'delivered'];
  const currentIndex = steps.indexOf(status);

  return (
    <div className="flex items-center gap-2">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          <div
            className={`h-2 w-2 rounded-full ${
              index <= currentIndex
                ? 'bg-primary'
                : 'bg-muted'
            }`}
          />
          {index < steps.length - 1 && (
            <div
              className={`h-0.5 w-8 ${
                index < currentIndex
                  ? 'bg-primary'
                  : 'bg-muted'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default function Ecommerce() {
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const deliveredOrders = orders.filter(o => o.status === 'delivered').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Shokher Mela</h1>
          <p className="text-muted-foreground">
            E-commerce management dashboard
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Orders
          </Button>
          <Button>
            <Eye className="mr-2 h-4 w-4" />
            View Storefront
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <StatsCard
          title="Total Orders"
          value={totalOrders}
          icon={<ShoppingCart className="h-6 w-6" />}
          change={12}
          changeType="increase"
        />
        <StatsCard
          title="Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          icon={<DollarSign className="h-6 w-6" />}
          change={23}
          changeType="increase"
        />
        <StatsCard
          title="Pending"
          value={pendingOrders}
          icon={<Package className="h-6 w-6" />}
        />
        <StatsCard
          title="Delivered"
          value={deliveredOrders}
          icon={<TrendingUp className="h-6 w-6" />}
        />
        <StatsCard
          title="Customers"
          value={customers.length}
          icon={<Users className="h-6 w-6" />}
          change={8}
          changeType="increase"
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="orders" className="space-y-4">
        <TabsList>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>All Orders</CardTitle>
              <CardDescription>Manage and track customer orders</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={orders}
                columns={orderColumns}
                searchKey="customer"
                pageSize={10}
              />
            </CardContent>
          </Card>

          {/* Recent Orders with Tracking */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Order Tracking</CardTitle>
              <CardDescription>Track active orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled').map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                  >
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.customer}</p>
                    </div>
                    <OrderStepper status={order.status} />
                    <div className="text-right">
                      <p className="font-medium">${order.total.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground capitalize">{order.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Store Products</CardTitle>
              <CardDescription>Products available in the storefront</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {products.slice(0, 8).map((product) => (
                  <div
                    key={product.id}
                    className="rounded-xl border border-border p-4 hover:shadow-lg transition-all"
                  >
                    <div className="aspect-square rounded-lg bg-muted mb-3" />
                    <h3 className="font-medium truncate">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold">${product.sellingPrice}</span>
                      <StatusBadge status={product.status} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers">
          <Card>
            <CardHeader>
              <CardTitle>Customer List</CardTitle>
              <CardDescription>E-commerce customers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customers.map((customer) => (
                  <div
                    key={customer.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                  >
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-sm text-muted-foreground">{customer.email}</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">{customer.totalOrders}</p>
                      <p className="text-sm text-muted-foreground">Orders</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${customer.totalSpent.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Total Spent</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
