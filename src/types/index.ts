export type UserRole = 'super-admin' | 'hr-manager' | 'accountant' | 'inventory-manager' | 'sales-manager';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  children?: NavItem[];
}

export interface StatsCardData {
  title: string;
  value: string | number;
  change?: number;
  changeType?: 'increase' | 'decrease';
  icon: React.ComponentType<{ className?: string }>;
}

export type StatusType = 'success' | 'warning' | 'error' | 'info' | 'default';

export interface TableColumn<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
}
