import { Plus, Download, Building2, Home, MapPin, DollarSign, TrendingUp, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DataTable } from "@/components/erp/DataTable";
import { StatusBadge } from "@/components/erp/StatusBadge";
import { StatsCard } from "@/components/erp/StatsCard";
import { properties } from "@/data/mock";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const propertyColumns = [
  {
    key: "title",
    header: "Property",
    render: (p: typeof properties[0]) => (
      <div>
        <p className="font-medium">{p.title}</p>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3 w-3" />
          {p.location}
        </div>
      </div>
    ),
    sortable: true,
  },
  {
    key: "type",
    header: "Type",
    render: (p: typeof properties[0]) => (
      <Badge variant="secondary" className="capitalize">{p.type}</Badge>
    ),
  },
  {
    key: "price",
    header: "Price",
    render: (p: typeof properties[0]) => (
      <span className="font-medium">
        ${p.price.toLocaleString()}{p.type !== 'land' ? '/mo' : ''}
      </span>
    ),
    sortable: true,
  },
  {
    key: "area",
    header: "Area",
    render: (p: typeof properties[0]) => `${p.area.toLocaleString()} sqft`,
  },
  {
    key: "status",
    header: "Status",
    render: (p: typeof properties[0]) => <StatusBadge status={p.status} />,
  },
  { key: "listingDate", header: "Listed", sortable: true },
];

const locationData = [
  { location: 'Manhattan', count: 12, value: 85000 },
  { location: 'Brooklyn', count: 8, value: 45000 },
  { location: 'Miami', count: 5, value: 62000 },
  { location: 'Austin', count: 3, value: 28000 },
];

export default function RealEstate() {
  const totalProperties = properties.length;
  const availableCount = properties.filter(p => p.status === 'available').length;
  const rentedCount = properties.filter(p => p.status === 'rented').length;
  const totalValue = properties.reduce((acc, p) => acc + p.price, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">SK Real Estate</h1>
          <p className="text-muted-foreground">
            Property management and rental listings
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Property
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Properties"
          value={totalProperties}
          icon={<Building2 className="h-6 w-6" />}
          change={15}
          changeType="increase"
        />
        <StatsCard
          title="Available"
          value={availableCount}
          icon={<Home className="h-6 w-6" />}
        />
        <StatsCard
          title="Rented"
          value={rentedCount}
          icon={<TrendingUp className="h-6 w-6" />}
        />
        <StatsCard
          title="Monthly Revenue"
          value={`$${totalValue.toLocaleString()}`}
          icon={<DollarSign className="h-6 w-6" />}
          change={23}
          changeType="increase"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Location Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Properties by Location</CardTitle>
            <CardDescription>Distribution and value across locations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={locationData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    type="number"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickFormatter={(value) => `$${value / 1000}k`}
                  />
                  <YAxis 
                    type="category"
                    dataKey="location"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    width={80}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="hsl(var(--primary))" 
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Property Types</CardTitle>
            <CardDescription>By category</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { type: 'Apartments', count: properties.filter(p => p.type === 'apartment').length, icon: Building2 },
              { type: 'Houses', count: properties.filter(p => p.type === 'house').length, icon: Home },
              { type: 'Commercial', count: properties.filter(p => p.type === 'commercial').length, icon: Building2 },
              { type: 'Land', count: properties.filter(p => p.type === 'land').length, icon: MapPin },
            ].map((item) => (
              <div
                key={item.type}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">{item.type}</span>
                </div>
                <Badge variant="secondary">{item.count}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Properties</TabsTrigger>
          <TabsTrigger value="rentals">Rentals</TabsTrigger>
          <TabsTrigger value="offers">Offers</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Property Listings</CardTitle>
              <CardDescription>Manage all property listings</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={properties}
                columns={propertyColumns}
                searchKey="title"
                pageSize={10}
              />
            </CardContent>
          </Card>

          {/* Property Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
            {properties.slice(0, 6).map((property) => (
              <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-all">
                <div className="aspect-video bg-gradient-to-br from-muted to-muted/50" />
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold">{property.title}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {property.location}
                      </div>
                    </div>
                    <StatusBadge status={property.status} />
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    {property.bedrooms && (
                      <span>{property.bedrooms} beds</span>
                    )}
                    {property.bathrooms && (
                      <span>{property.bathrooms} baths</span>
                    )}
                    <span>{property.area.toLocaleString()} sqft</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold">
                      ${property.price.toLocaleString()}
                      {property.type !== 'land' && <span className="text-sm font-normal text-muted-foreground">/mo</span>}
                    </span>
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rentals">
          <Card>
            <CardHeader>
              <CardTitle>Rental Properties</CardTitle>
              <CardDescription>Properties available for rent</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={properties.filter(p => p.status === 'available' || p.status === 'rented')}
                columns={propertyColumns}
                searchKey="title"
                pageSize={10}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="offers">
          <Card>
            <CardHeader>
              <CardTitle>Pending Offers</CardTitle>
              <CardDescription>Manage property offers and negotiations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {properties.filter(p => p.status === 'pending').map((property) => (
                  <div
                    key={property.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                  >
                    <div>
                      <p className="font-medium">{property.title}</p>
                      <p className="text-sm text-muted-foreground">{property.location}</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">${property.price.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Listed Price</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Negotiate</Button>
                      <Button size="sm">Accept</Button>
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
