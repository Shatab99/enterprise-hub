import { useState } from "react";
import { Plus, Download, Filter, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DataTable } from "@/components/erp/DataTable";
import { StatusBadge } from "@/components/erp/StatusBadge";
import { StatsCard } from "@/components/erp/StatsCard";
import { Modal } from "@/components/erp/Modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { employees, departments } from "@/data/mock";
import { Users, UserCheck, UserX, Briefcase } from "lucide-react";

const employeeColumns = [
  {
    key: "name",
    header: "Employee",
    render: (emp: typeof employees[0]) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-9 w-9">
          <AvatarFallback className="bg-primary/10 text-primary text-sm">
            {emp.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{emp.name}</p>
          <p className="text-sm text-muted-foreground">{emp.email}</p>
        </div>
      </div>
    ),
    sortable: true,
  },
  { key: "department", header: "Department", sortable: true },
  { key: "role", header: "Role" },
  {
    key: "salary",
    header: "Salary",
    render: (emp: typeof employees[0]) => `$${emp.salary.toLocaleString()}`,
    sortable: true,
  },
  { key: "joinDate", header: "Join Date", sortable: true },
  {
    key: "status",
    header: "Status",
    render: (emp: typeof employees[0]) => <StatusBadge status={emp.status} />,
  },
];

export default function HR() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const activeCount = employees.filter(e => e.status === 'active').length;
  const onLeaveCount = employees.filter(e => e.status === 'on-leave').length;
  const inactiveCount = employees.filter(e => e.status === 'inactive').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">HR Management</h1>
          <p className="text-muted-foreground">
            Manage employees, departments, and attendance
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatsCard
          title="Total Employees"
          value={employees.length}
          icon={<Users className="h-6 w-6" />}
        />
        <StatsCard
          title="Active"
          value={activeCount}
          icon={<UserCheck className="h-6 w-6" />}
          change={5}
          changeType="increase"
        />
        <StatsCard
          title="On Leave"
          value={onLeaveCount}
          icon={<Briefcase className="h-6 w-6" />}
        />
        <StatsCard
          title="Departments"
          value={departments.length}
          icon={<UserX className="h-6 w-6" />}
        />
      </div>

      {/* Departments Overview */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
        {departments.map((dept) => (
          <Card key={dept.id} className="hover:border-primary/50 transition-colors cursor-pointer">
            <CardContent className="p-4">
              <p className="text-2xl font-bold">{dept.employeeCount}</p>
              <p className="text-sm text-muted-foreground">{dept.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Employee Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>All Employees</CardTitle>
            <CardDescription>A list of all employees in your organization</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            data={employees}
            columns={employeeColumns}
            searchKey="name"
            pageSize={10}
          />
        </CardContent>
      </Card>

      {/* Add Employee Modal */}
      <Modal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        title="Add New Employee"
        description="Fill in the details to add a new employee"
        size="lg"
        footer={
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsAddModalOpen(false)}>
              Add Employee
            </Button>
          </div>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="john@company.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input id="role" placeholder="Software Engineer" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="salary">Salary</Label>
            <Input id="salary" type="number" placeholder="75000" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="joinDate">Join Date</Label>
            <Input id="joinDate" type="date" />
          </div>
        </div>
      </Modal>
    </div>
  );
}
