import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusType = 'active' | 'inactive' | 'on-leave' | 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'paid' | 'failed' | 'in-stock' | 'low-stock' | 'out-of-stock' | 'available' | 'rented' | 'sold' | 'completed';

interface StatusBadgeProps {
  status: StatusType | string;
  className?: string;
}

const statusConfig: Record<string, { variant: 'success' | 'warning' | 'destructive' | 'secondary' | 'info' | 'default'; label?: string }> = {
  active: { variant: 'success' },
  inactive: { variant: 'secondary' },
  'on-leave': { variant: 'warning', label: 'On Leave' },
  pending: { variant: 'warning' },
  processing: { variant: 'info' },
  shipped: { variant: 'info' },
  delivered: { variant: 'success' },
  cancelled: { variant: 'destructive' },
  paid: { variant: 'success' },
  failed: { variant: 'destructive' },
  'in-stock': { variant: 'success', label: 'In Stock' },
  'low-stock': { variant: 'warning', label: 'Low Stock' },
  'out-of-stock': { variant: 'destructive', label: 'Out of Stock' },
  available: { variant: 'success' },
  rented: { variant: 'info' },
  sold: { variant: 'secondary' },
  completed: { variant: 'success' },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || { variant: 'default' as const };
  const label = config.label || status.charAt(0).toUpperCase() + status.slice(1);
  
  return (
    <Badge variant={config.variant} className={cn("capitalize", className)}>
      {label}
    </Badge>
  );
}
