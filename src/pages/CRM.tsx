import { useState } from "react";
import { Plus, Mail, Phone, Building2, DollarSign, UserCheck, Clock, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DataTable } from "@/components/erp/DataTable";
import { StatusBadge } from "@/components/erp/StatusBadge";
import { StatsCard } from "@/components/erp/StatsCard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { customers } from "@/data/mock";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const customerColumns = [
  {
    key: "name",
    header: "Customer",
    render: (customer: typeof customers[0]) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-9 w-9">
          <AvatarFallback className="bg-accent/20 text-accent text-sm">
            {customer.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{customer.name}</p>
          <p className="text-sm text-muted-foreground">{customer.email}</p>
        </div>
      </div>
    ),
    sortable: true,
  },
  { key: "phone", header: "Phone" },
  { key: "company", header: "Company", render: (c: typeof customers[0]) => c.company || '-' },
  {
    key: "totalOrders",
    header: "Orders",
    sortable: true,
  },
  {
    key: "totalSpent",
    header: "Total Spent",
    render: (c: typeof customers[0]) => `$${c.totalSpent.toLocaleString()}`,
    sortable: true,
  },
  {
    key: "status",
    header: "Status",
    render: (c: typeof customers[0]) => <StatusBadge status={c.status} />,
  },
  {
    key: "actions",
    header: "",
    render: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>View Details</DropdownMenuItem>
          <DropdownMenuItem>Send Email</DropdownMenuItem>
          <DropdownMenuItem>Add Note</DropdownMenuItem>
          <DropdownMenuItem>Schedule Follow-up</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

// Sales Pipeline data
const pipelineStages = [
  { id: 'lead', name: 'New Leads', count: 12, value: 45000, color: 'bg-primary' },
  { id: 'contacted', name: 'Contacted', count: 8, value: 32000, color: 'bg-accent' },
  { id: 'qualified', name: 'Qualified', count: 5, value: 28000, color: 'bg-warning' },
  { id: 'proposal', name: 'Proposal', count: 3, value: 18000, color: 'bg-success' },
  { id: 'closed', name: 'Closed Won', count: 2, value: 12000, color: 'bg-chart-3' },
];

export default function CRM() {
  const activeCustomers = customers.filter(c => c.status === 'active').length;
  const totalRevenue = customers.reduce((acc, c) => acc + c.totalSpent, 0);
  const avgOrderValue = totalRevenue / customers.reduce((acc, c) => acc + c.totalOrders, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">CRM</h1>
          <p className="text-muted-foreground">
            Manage customer relationships and sales pipeline
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Mail className="mr-2 h-4 w-4" />
            Send Campaign
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatsCard
          title="Total Customers"
          value={customers.length}
          icon={<UserCheck className="h-6 w-6" />}
          change={15}
          changeType="increase"
        />
        <StatsCard
          title="Active Customers"
          value={activeCustomers}
          icon={<UserCheck className="h-6 w-6" />}
        />
        <StatsCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          icon={<DollarSign className="h-6 w-6" />}
          change={23}
          changeType="increase"
        />
        <StatsCard
          title="Avg Order Value"
          value={`$${avgOrderValue.toFixed(2)}`}
          icon={<DollarSign className="h-6 w-6" />}
        />
      </div>

      {/* Sales Pipeline */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Pipeline</CardTitle>
          <CardDescription>Track your deals through the sales process</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            {pipelineStages.map((stage) => (
              <div
                key={stage.id}
                className="rounded-xl border border-border p-4 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className={`h-2 w-2 rounded-full ${stage.color}`} />
                  <span className="text-sm font-medium">{stage.name}</span>
                </div>
                <p className="text-2xl font-bold">{stage.count}</p>
                <p className="text-sm text-muted-foreground">
                  ${stage.value.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="customers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
        </TabsList>

        <TabsContent value="customers">
          <Card>
            <CardHeader>
              <CardTitle>Customer List</CardTitle>
              <CardDescription>Manage your customer relationships</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={customers}
                columns={customerColumns}
                searchKey="name"
                pageSize={10}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leads">
          <Card>
            <CardHeader>
              <CardTitle>Lead Management</CardTitle>
              <CardDescription>Track and convert potential customers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {customers.slice(0, 6).map((customer) => (
                  <div
                    key={customer.id}
                    className="rounded-xl border border-border p-4 hover:shadow-lg transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {customer.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-sm text-muted-foreground">{customer.company || 'Individual'}</p>
                        </div>
                      </div>
                      <StatusBadge status={customer.status} />
                    </div>
                    <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        <span>Email</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        <span>Call</span>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Last contact: {customer.lastContact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle>Follow-up Tasks</CardTitle>
              <CardDescription>Manage your customer interaction tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { task: 'Follow up with John Smith', due: 'Today', priority: 'high' },
                  { task: 'Send proposal to Michael Brown', due: 'Tomorrow', priority: 'medium' },
                  { task: 'Schedule demo for Emma Wilson', due: 'In 3 days', priority: 'low' },
                  { task: 'Review contract with Chris Johnson', due: 'Next week', priority: 'medium' },
                ].map((task, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-2 w-2 rounded-full ${
                        task.priority === 'high' ? 'bg-destructive' :
                        task.priority === 'medium' ? 'bg-warning' : 'bg-success'
                      }`} />
                      <span className="font-medium">{task.task}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">{task.due}</span>
                      <Button variant="ghost" size="sm">Complete</Button>
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
