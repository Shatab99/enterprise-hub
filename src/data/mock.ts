// Mock Data for ERP System

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  salary: number;
  joinDate: string;
  status: 'active' | 'inactive' | 'on-leave';
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  sku: string;
  stock: number;
  costPrice: number;
  sellingPrice: number;
  supplier: string;
  warehouse: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

export interface Order {
  id: string;
  customer: string;
  email: string;
  products: { name: string; quantity: number; price: number }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  paymentStatus: 'paid' | 'pending' | 'failed';
}

export interface Property {
  id: string;
  title: string;
  type: 'house' | 'apartment' | 'land' | 'commercial';
  location: string;
  price: number;
  status: 'available' | 'rented' | 'sold' | 'pending';
  owner: string;
  listingDate: string;
  bedrooms?: number;
  bathrooms?: number;
  area: number;
  image?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  totalOrders: number;
  totalSpent: number;
  status: 'active' | 'inactive';
  lastContact: string;
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending';
}

export const employees: Employee[] = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah@company.com', department: 'Engineering', role: 'Senior Developer', salary: 95000, joinDate: '2022-03-15', status: 'active' },
  { id: '2', name: 'Michael Chen', email: 'michael@company.com', department: 'Design', role: 'UI/UX Lead', salary: 85000, joinDate: '2021-08-20', status: 'active' },
  { id: '3', name: 'Emily Davis', email: 'emily@company.com', department: 'Marketing', role: 'Marketing Manager', salary: 78000, joinDate: '2020-11-10', status: 'active' },
  { id: '4', name: 'James Wilson', email: 'james@company.com', department: 'Sales', role: 'Sales Director', salary: 92000, joinDate: '2019-05-22', status: 'active' },
  { id: '5', name: 'Lisa Anderson', email: 'lisa@company.com', department: 'HR', role: 'HR Manager', salary: 72000, joinDate: '2021-02-14', status: 'active' },
  { id: '6', name: 'David Brown', email: 'david@company.com', department: 'Engineering', role: 'Backend Developer', salary: 88000, joinDate: '2022-07-01', status: 'on-leave' },
  { id: '7', name: 'Amanda Martinez', email: 'amanda@company.com', department: 'Finance', role: 'Accountant', salary: 68000, joinDate: '2020-09-18', status: 'active' },
  { id: '8', name: 'Robert Taylor', email: 'robert@company.com', department: 'Operations', role: 'Operations Lead', salary: 82000, joinDate: '2021-04-25', status: 'active' },
];

export const products: Product[] = [
  { id: '1', name: 'Wireless Bluetooth Headphones', category: 'Electronics', sku: 'WBH-001', stock: 150, costPrice: 45, sellingPrice: 89.99, supplier: 'TechSupply Co', warehouse: 'Warehouse A', status: 'in-stock' },
  { id: '2', name: 'Organic Cotton T-Shirt', category: 'Apparel', sku: 'OCT-002', stock: 8, costPrice: 12, sellingPrice: 34.99, supplier: 'GreenWear Ltd', warehouse: 'Warehouse B', status: 'low-stock' },
  { id: '3', name: 'Stainless Steel Water Bottle', category: 'Home & Living', sku: 'SWB-003', stock: 200, costPrice: 8, sellingPrice: 24.99, supplier: 'EcoProducts Inc', warehouse: 'Warehouse A', status: 'in-stock' },
  { id: '4', name: 'Leather Wallet', category: 'Accessories', sku: 'LW-004', stock: 0, costPrice: 25, sellingPrice: 59.99, supplier: 'LuxuryGoods Co', warehouse: 'Warehouse C', status: 'out-of-stock' },
  { id: '5', name: 'Smart Watch Pro', category: 'Electronics', sku: 'SWP-005', stock: 45, costPrice: 120, sellingPrice: 249.99, supplier: 'TechSupply Co', warehouse: 'Warehouse A', status: 'in-stock' },
  { id: '6', name: 'Yoga Mat Premium', category: 'Sports', sku: 'YMP-006', stock: 5, costPrice: 18, sellingPrice: 45.99, supplier: 'FitLife Supplies', warehouse: 'Warehouse B', status: 'low-stock' },
  { id: '7', name: 'Ceramic Coffee Mug Set', category: 'Home & Living', sku: 'CCM-007', stock: 120, costPrice: 15, sellingPrice: 39.99, supplier: 'HomeDecor Pro', warehouse: 'Warehouse C', status: 'in-stock' },
  { id: '8', name: 'Running Shoes Elite', category: 'Sports', sku: 'RSE-008', stock: 75, costPrice: 65, sellingPrice: 129.99, supplier: 'FitLife Supplies', warehouse: 'Warehouse A', status: 'in-stock' },
];

export const orders: Order[] = [
  { id: 'ORD-001', customer: 'John Smith', email: 'john@email.com', products: [{ name: 'Wireless Bluetooth Headphones', quantity: 2, price: 89.99 }], total: 179.98, status: 'delivered', date: '2024-01-15', paymentStatus: 'paid' },
  { id: 'ORD-002', customer: 'Emma Wilson', email: 'emma@email.com', products: [{ name: 'Smart Watch Pro', quantity: 1, price: 249.99 }, { name: 'Leather Wallet', quantity: 1, price: 59.99 }], total: 309.98, status: 'shipped', date: '2024-01-18', paymentStatus: 'paid' },
  { id: 'ORD-003', customer: 'Michael Brown', email: 'michael@email.com', products: [{ name: 'Running Shoes Elite', quantity: 1, price: 129.99 }], total: 129.99, status: 'processing', date: '2024-01-20', paymentStatus: 'paid' },
  { id: 'ORD-004', customer: 'Sophie Davis', email: 'sophie@email.com', products: [{ name: 'Yoga Mat Premium', quantity: 2, price: 45.99 }], total: 91.98, status: 'pending', date: '2024-01-21', paymentStatus: 'pending' },
  { id: 'ORD-005', customer: 'Chris Johnson', email: 'chris@email.com', products: [{ name: 'Ceramic Coffee Mug Set', quantity: 3, price: 39.99 }], total: 119.97, status: 'cancelled', date: '2024-01-19', paymentStatus: 'failed' },
  { id: 'ORD-006', customer: 'Anna Taylor', email: 'anna@email.com', products: [{ name: 'Organic Cotton T-Shirt', quantity: 4, price: 34.99 }], total: 139.96, status: 'delivered', date: '2024-01-14', paymentStatus: 'paid' },
];

export const properties: Property[] = [
  { id: '1', title: 'Modern Downtown Apartment', type: 'apartment', location: 'Downtown, NYC', price: 2500, status: 'available', owner: 'SK Real Estate', listingDate: '2024-01-10', bedrooms: 2, bathrooms: 2, area: 1200 },
  { id: '2', title: 'Suburban Family House', type: 'house', location: 'Brooklyn, NYC', price: 4500, status: 'rented', owner: 'SK Real Estate', listingDate: '2023-12-15', bedrooms: 4, bathrooms: 3, area: 2800 },
  { id: '3', title: 'Commercial Office Space', type: 'commercial', location: 'Manhattan, NYC', price: 8500, status: 'available', owner: 'SK Real Estate', listingDate: '2024-01-05', area: 3500 },
  { id: '4', title: 'Beachfront Villa', type: 'house', location: 'Miami, FL', price: 12000, status: 'pending', owner: 'SK Real Estate', listingDate: '2024-01-18', bedrooms: 5, bathrooms: 4, area: 4500 },
  { id: '5', title: 'Investment Land Plot', type: 'land', location: 'Austin, TX', price: 150000, status: 'available', owner: 'SK Real Estate', listingDate: '2023-11-20', area: 10000 },
  { id: '6', title: 'Luxury Penthouse Suite', type: 'apartment', location: 'Manhattan, NYC', price: 15000, status: 'available', owner: 'SK Real Estate', listingDate: '2024-01-12', bedrooms: 3, bathrooms: 3, area: 2200 },
];

export const customers: Customer[] = [
  { id: '1', name: 'John Smith', email: 'john@email.com', phone: '+1 234 567 8901', company: 'Smith Corp', totalOrders: 15, totalSpent: 2450.00, status: 'active', lastContact: '2024-01-20' },
  { id: '2', name: 'Emma Wilson', email: 'emma@email.com', phone: '+1 234 567 8902', totalOrders: 8, totalSpent: 1890.50, status: 'active', lastContact: '2024-01-18' },
  { id: '3', name: 'Michael Brown', email: 'michael@email.com', phone: '+1 234 567 8903', company: 'Brown Industries', totalOrders: 22, totalSpent: 5670.00, status: 'active', lastContact: '2024-01-21' },
  { id: '4', name: 'Sophie Davis', email: 'sophie@email.com', phone: '+1 234 567 8904', totalOrders: 3, totalSpent: 340.00, status: 'inactive', lastContact: '2023-12-15' },
  { id: '5', name: 'Chris Johnson', email: 'chris@email.com', phone: '+1 234 567 8905', company: 'Johnson LLC', totalOrders: 11, totalSpent: 3200.00, status: 'active', lastContact: '2024-01-19' },
];

export const transactions: Transaction[] = [
  { id: '1', type: 'income', category: 'Product Sales', amount: 15420.00, description: 'January product sales revenue', date: '2024-01-20', status: 'completed' },
  { id: '2', type: 'expense', category: 'Payroll', amount: 45000.00, description: 'Monthly payroll expenses', date: '2024-01-15', status: 'completed' },
  { id: '3', type: 'income', category: 'Rental Income', amount: 28500.00, description: 'Property rental income', date: '2024-01-18', status: 'completed' },
  { id: '4', type: 'expense', category: 'Inventory', amount: 12300.00, description: 'Stock replenishment', date: '2024-01-17', status: 'completed' },
  { id: '5', type: 'expense', category: 'Utilities', amount: 2800.00, description: 'Office utilities', date: '2024-01-10', status: 'completed' },
  { id: '6', type: 'income', category: 'Services', amount: 8500.00, description: 'Consulting services', date: '2024-01-21', status: 'pending' },
];

export const departments = [
  { id: '1', name: 'Engineering', employeeCount: 24, budget: 450000 },
  { id: '2', name: 'Design', employeeCount: 12, budget: 180000 },
  { id: '3', name: 'Marketing', employeeCount: 15, budget: 220000 },
  { id: '4', name: 'Sales', employeeCount: 20, budget: 350000 },
  { id: '5', name: 'HR', employeeCount: 8, budget: 120000 },
  { id: '6', name: 'Finance', employeeCount: 10, budget: 150000 },
  { id: '7', name: 'Operations', employeeCount: 18, budget: 280000 },
];

export const revenueData = [
  { month: 'Jan', revenue: 45000, expenses: 32000, profit: 13000 },
  { month: 'Feb', revenue: 52000, expenses: 35000, profit: 17000 },
  { month: 'Mar', revenue: 48000, expenses: 33000, profit: 15000 },
  { month: 'Apr', revenue: 61000, expenses: 38000, profit: 23000 },
  { month: 'May', revenue: 55000, expenses: 36000, profit: 19000 },
  { month: 'Jun', revenue: 67000, expenses: 42000, profit: 25000 },
  { month: 'Jul', revenue: 72000, expenses: 45000, profit: 27000 },
  { month: 'Aug', revenue: 69000, expenses: 43000, profit: 26000 },
  { month: 'Sep', revenue: 75000, expenses: 47000, profit: 28000 },
  { month: 'Oct', revenue: 82000, expenses: 51000, profit: 31000 },
  { month: 'Nov', revenue: 88000, expenses: 54000, profit: 34000 },
  { month: 'Dec', revenue: 95000, expenses: 58000, profit: 37000 },
];

export const userRoles = [
  { id: 'super-admin', name: 'Super Admin', permissions: ['all'] },
  { id: 'hr-manager', name: 'HR Manager', permissions: ['hr', 'payroll', 'reports'] },
  { id: 'accountant', name: 'Accountant', permissions: ['finance', 'payroll', 'reports'] },
  { id: 'inventory-manager', name: 'Inventory Manager', permissions: ['inventory', 'ecommerce', 'reports'] },
  { id: 'sales-manager', name: 'Sales Manager', permissions: ['crm', 'ecommerce', 'reports'] },
];
