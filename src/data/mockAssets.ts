import { Asset } from '../types/Asset';

export const mockAssets: Asset[] = [
  {
    id: 'AST-001',
    name: 'MacBook Pro M3',
    type: 'Hardware',
    status: 'Active',
    assignedUser: { name: 'Sarah Johnson', initials: 'SJ' },
    location: 'Tokyo Office',
    lastVerified: new Date('2024-01-15'),
    category: 'Hardware',
    auditStatus: 'Up to Date'
  },
  {
    id: 'AST-002',
    name: 'Adobe Creative Suite',
    type: 'Software',
    status: 'Active',
    assignedUser: { name: 'Michael Chen', initials: 'MC' },
    location: 'Remote',
    lastVerified: new Date('2024-01-10'),
    category: 'Software',
    auditStatus: 'Up to Date'
  },
  {
    id: 'AST-003',
    name: 'Honda Civic',
    type: 'Vehicle',
    status: 'Needs Audit',
    assignedUser: { name: 'Alex Rodriguez', initials: 'AR' },
    location: 'San Francisco',
    lastVerified: new Date('2023-11-20'),
    category: 'Vehicle',
    auditStatus: 'Overdue'
  },
  {
    id: 'AST-004',
    name: 'Dell Monitor 27"',
    type: 'Hardware',
    status: 'Active',
    assignedUser: { name: 'Emma Wilson', initials: 'EW' },
    location: 'New York Office',
    lastVerified: new Date('2024-01-12'),
    category: 'Hardware',
    auditStatus: 'Up to Date'
  },
  {
    id: 'AST-005',
    name: 'Office Printer',
    type: 'Equipment',
    status: 'Maintenance',
    assignedUser: { name: 'James Taylor', initials: 'JT' },
    location: 'Tokyo Office',
    lastVerified: new Date('2024-01-08'),
    category: 'Equipment',
    auditStatus: 'Pending'
  },
  {
    id: 'AST-006',
    name: 'iPhone 15 Pro',
    type: 'Hardware',
    status: 'Active',
    assignedUser: { name: 'Lisa Garcia', initials: 'LG' },
    location: 'London Office',
    lastVerified: new Date('2024-01-14'),
    category: 'Hardware',
    auditStatus: 'Up to Date'
  },
  {
    id: 'AST-007',
    name: 'Slack Premium',
    type: 'Software',
    status: 'Active',
    assignedUser: { name: 'David Kim', initials: 'DK' },
    location: 'Remote',
    lastVerified: new Date('2024-01-11'),
    category: 'Software',
    auditStatus: 'Up to Date'
  },
  {
    id: 'AST-008',
    name: 'Ergonomic Chair',
    type: 'Equipment',
    status: 'Active',
    assignedUser: { name: 'Sophie Brown', initials: 'SB' },
    location: 'Berlin Office',
    lastVerified: new Date('2024-01-09'),
    category: 'Equipment',
    auditStatus: 'Up to Date'
  },
  {
    id: 'AST-009',
    name: 'Tesla Model 3',
    type: 'Vehicle',
    status: 'Active',
    assignedUser: { name: 'Robert Davis', initials: 'RD' },
    location: 'Austin Office',
    lastVerified: new Date('2024-01-13'),
    category: 'Vehicle',
    auditStatus: 'Up to Date'
  },
  {
    id: 'AST-010',
    name: 'Microsoft Office 365',
    type: 'Software',
    status: 'Needs Audit',
    assignedUser: { name: 'Maria Lopez', initials: 'ML' },
    location: 'Madrid Office',
    lastVerified: new Date('2023-12-01'),
    category: 'Software',
    auditStatus: 'Overdue'
  }
];