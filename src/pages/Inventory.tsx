import { useState } from "react";
import { Plus, Download, AlertTriangle, Package, Warehouse, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DataTable } from "@/components/erp/DataTable";
import { StatusBadge } from "@/components/erp/StatusBadge";
import { StatsCard } from "@/components/erp/StatsCard";
import { Modal } from "@/components/erp/Modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { products } from "@/data/mock";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const productColumns = [
  {
    key: "name",
    header: "Product",
    render: (product: typeof products[0]) => (
      <div>
        <p className="font-medium">{product.name}</p>
        <p className="text-sm text-muted-foreground">{product.category}</p>
      </div>
    ),
    sortable: true,
  },
  { key: "sku", header: "SKU" },
  {
    key: "stock",
    header: "Stock",
    render: (product: typeof products[0]) => (
      <div className="flex items-center gap-2">
        <span className="font-medium">{product.stock}</span>
        <Progress 
          value={Math.min(product.stock / 2, 100)} 
          className="w-20 h-2"
        />
      </div>
    ),
    sortable: true,
  },
  {
    key: "costPrice",
    header: "Cost",
    render: (product: typeof products[0]) => `$${product.costPrice.toFixed(2)}`,
  },
  {
    key: "sellingPrice",
    header: "Price",
    render: (product: typeof products[0]) => `$${product.sellingPrice.toFixed(2)}`,
    sortable: true,
  },
  { key: "supplier", header: "Supplier" },
  { key: "warehouse", header: "Warehouse" },
  {
    key: "status",
    header: "Status",
    render: (product: typeof products[0]) => <StatusBadge status={product.status} />,
  },
];

const categories = ["Electronics", "Apparel", "Home & Living", "Accessories", "Sports"];
const warehouses = ["Warehouse A", "Warehouse B", "Warehouse C"];
const suppliers = ["TechSupply Co", "GreenWear Ltd", "EcoProducts Inc", "LuxuryGoods Co", "FitLife Supplies"];

export default function Inventory() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const totalProducts = products.length;
  const totalStock = products.reduce((acc, p) => acc + p.stock, 0);
  const lowStockCount = products.filter(p => p.status === 'low-stock').length;
  const outOfStockCount = products.filter(p => p.status === 'out-of-stock').length;
  const totalValue = products.reduce((acc, p) => acc + (p.stock * p.costPrice), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
          <p className="text-muted-foreground">
            Track products, stock levels, and warehouse inventory
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <StatsCard
          title="Total Products"
          value={totalProducts}
          icon={<Package className="h-6 w-6" />}
          change={12}
          changeType="increase"
        />
        <StatsCard
          title="Total Stock"
          value={totalStock.toLocaleString()}
          icon={<Warehouse className="h-6 w-6" />}
        />
        <StatsCard
          title="Low Stock"
          value={lowStockCount}
          icon={<TrendingDown className="h-6 w-6" />}
        />
        <StatsCard
          title="Out of Stock"
          value={outOfStockCount}
          icon={<AlertTriangle className="h-6 w-6" />}
        />
        <StatsCard
          title="Inventory Value"
          value={`$${totalValue.toLocaleString()}`}
          icon={<Package className="h-6 w-6" />}
          change={8}
          changeType="increase"
        />
      </div>

      {/* Alerts */}
      {(lowStockCount > 0 || outOfStockCount > 0) && (
        <Card className="border-warning/50 bg-warning/5">
          <CardContent className="flex items-center gap-4 py-4">
            <AlertTriangle className="h-6 w-6 text-warning" />
            <div>
              <p className="font-medium">Stock Alert</p>
              <p className="text-sm text-muted-foreground">
                {lowStockCount} products are low on stock and {outOfStockCount} are out of stock
              </p>
            </div>
            <Button variant="outline" size="sm" className="ml-auto">
              View All
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Products</TabsTrigger>
          <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
          <TabsTrigger value="out-of-stock">Out of Stock</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Product Inventory</CardTitle>
              <CardDescription>Manage your product catalog and stock levels</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={products}
                columns={productColumns}
                searchKey="name"
                pageSize={10}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="low-stock">
          <Card>
            <CardHeader>
              <CardTitle>Low Stock Products</CardTitle>
              <CardDescription>Products that need restocking</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={products.filter(p => p.status === 'low-stock')}
                columns={productColumns}
                searchKey="name"
                pageSize={10}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="out-of-stock">
          <Card>
            <CardHeader>
              <CardTitle>Out of Stock Products</CardTitle>
              <CardDescription>Products that are currently unavailable</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={products.filter(p => p.status === 'out-of-stock')}
                columns={productColumns}
                searchKey="name"
                pageSize={10}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Product Modal */}
      <Modal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        title="Add New Product"
        description="Fill in the details to add a new product"
        size="lg"
        footer={
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsAddModalOpen(false)}>
              Add Product
            </Button>
          </div>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="productName">Product Name</Label>
            <Input id="productName" placeholder="Enter product name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat.toLowerCase()}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="sku">SKU</Label>
            <Input id="sku" placeholder="ABC-001" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="costPrice">Cost Price</Label>
            <Input id="costPrice" type="number" placeholder="0.00" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sellingPrice">Selling Price</Label>
            <Input id="sellingPrice" type="number" placeholder="0.00" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stock">Initial Stock</Label>
            <Input id="stock" type="number" placeholder="0" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="warehouse">Warehouse</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select warehouse" />
              </SelectTrigger>
              <SelectContent>
                {warehouses.map((wh) => (
                  <SelectItem key={wh} value={wh.toLowerCase()}>
                    {wh}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="supplier">Supplier</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select supplier" />
              </SelectTrigger>
              <SelectContent>
                {suppliers.map((sup) => (
                  <SelectItem key={sup} value={sup.toLowerCase()}>
                    {sup}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Modal>
    </div>
  );
}
