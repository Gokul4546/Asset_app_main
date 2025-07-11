export interface Asset {
  id: string;
  name: string;
  type: 'Hardware' | 'Software' | 'Vehicle' | 'Equipment';
  status: 'Active' | 'Needs Audit' | 'Inactive' | 'Maintenance';
  assignedUser: {
    name: string;
    initials: string;
  };
  location: string;
  lastVerified: Date;
  category: string;
  auditStatus: 'Up to Date' | 'Overdue' | 'Pending';
}

export interface FilterChip {
  id: string;
  label: string;
  value: string;
  icon: string;
}

export interface BulkAction {
  id: string;
  label: string;
  icon: string;
  variant: 'default' | 'destructive';
}