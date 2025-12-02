import { useState } from "react";
import { Plus, Calendar, Users, Clock, MoreVertical, CheckCircle2, Circle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { StatsCard } from "@/components/erp/StatsCard";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
}

const tasks: Task[] = [
  { id: '1', title: 'Design new dashboard layout', description: 'Create wireframes for the new admin dashboard', assignee: 'Sarah Johnson', priority: 'high', dueDate: '2024-01-25', status: 'in-progress' },
  { id: '2', title: 'Implement user authentication', description: 'Add OAuth support for Google and GitHub', assignee: 'Michael Chen', priority: 'high', dueDate: '2024-01-28', status: 'todo' },
  { id: '3', title: 'Fix payment gateway bug', description: 'Resolve timeout issues with Stripe integration', assignee: 'David Brown', priority: 'high', dueDate: '2024-01-24', status: 'review' },
  { id: '4', title: 'Update inventory module', description: 'Add barcode scanning functionality', assignee: 'Emily Davis', priority: 'medium', dueDate: '2024-01-30', status: 'todo' },
  { id: '5', title: 'Create API documentation', description: 'Document all REST endpoints', assignee: 'James Wilson', priority: 'low', dueDate: '2024-02-05', status: 'in-progress' },
  { id: '6', title: 'Performance optimization', description: 'Optimize database queries for reports', assignee: 'Lisa Anderson', priority: 'medium', dueDate: '2024-02-01', status: 'done' },
];

const columns = ['todo', 'in-progress', 'review', 'done'];
const columnLabels: Record<string, string> = {
  'todo': 'To Do',
  'in-progress': 'In Progress',
  'review': 'Review',
  'done': 'Done',
};

const priorityColors: Record<string, string> = {
  low: 'bg-success/20 text-success',
  medium: 'bg-warning/20 text-warning',
  high: 'bg-destructive/20 text-destructive',
};

function TaskCard({ task }: { task: Task }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 hover:shadow-md transition-all cursor-move">
      <div className="flex items-start justify-between mb-2">
        <Badge className={priorityColors[task.priority]} variant="secondary">
          {task.priority}
        </Badge>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Move</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <h4 className="font-medium mb-1">{task.title}</h4>
      <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
      <div className="flex items-center justify-between">
        <Avatar className="h-6 w-6">
          <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
            {task.assignee.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Calendar className="h-3 w-3" />
          {task.dueDate}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length;
  const overdueTasks = tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'done').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Manage tasks and track project progress
          </p>
        </div>
        <div className="flex gap-3">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatsCard
          title="Total Tasks"
          value={totalTasks}
          icon={<CheckCircle2 className="h-6 w-6" />}
        />
        <StatsCard
          title="Completed"
          value={completedTasks}
          icon={<Circle className="h-6 w-6" />}
          change={Math.round((completedTasks / totalTasks) * 100)}
          changeType="increase"
        />
        <StatsCard
          title="In Progress"
          value={inProgressTasks}
          icon={<Clock className="h-6 w-6" />}
        />
        <StatsCard
          title="Overdue"
          value={overdueTasks}
          icon={<AlertCircle className="h-6 w-6" />}
        />
      </div>

      {/* Project Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Project Progress</CardTitle>
          <CardDescription>Overall task completion</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {completedTasks} of {totalTasks} tasks completed
              </span>
              <span className="text-sm font-medium">
                {Math.round((completedTasks / totalTasks) * 100)}%
              </span>
            </div>
            <Progress value={(completedTasks / totalTasks) * 100} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Kanban Board */}
      <Card>
        <CardHeader>
          <CardTitle>Task Board</CardTitle>
          <CardDescription>Drag and drop tasks to update their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            {columns.map((column) => (
              <div key={column} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{columnLabels[column]}</h3>
                  <Badge variant="secondary">
                    {tasks.filter(t => t.status === column).length}
                  </Badge>
                </div>
                <div className="space-y-3 min-h-[400px] rounded-lg bg-muted/30 p-3">
                  {tasks
                    .filter((task) => task.status === column)
                    .map((task) => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Team Members */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>People working on this project</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {['Sarah Johnson', 'Michael Chen', 'David Brown', 'Emily Davis', 'James Wilson', 'Lisa Anderson'].map((name) => (
              <div key={name} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Avatar>
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{name}</p>
                  <p className="text-sm text-muted-foreground">
                    {tasks.filter(t => t.assignee === name).length} tasks
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
