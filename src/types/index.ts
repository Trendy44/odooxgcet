export type UserRole = 'employee' | 'admin';

export interface User {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  position?: string;
  phone?: string;
  address?: string;
  joinDate?: string;
  salary?: number;
}

export interface AttendanceRecord {
  id: string;
  userId: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: 'present' | 'absent' | 'half-day' | 'leave';
  hoursWorked?: number;
}

export interface LeaveRequest {
  id: string;
  userId: string;
  userName?: string;
  type: 'paid' | 'sick' | 'unpaid';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  adminComment?: string;
  createdAt: string;
}

export interface WorkLog {
  id: string;
  userId: string;
  date: string;
  summary: string;
  hoursWorked: number;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

export interface DashboardStats {
  totalEmployees?: number;
  presentToday?: number;
  pendingLeaves?: number;
  averageProductivity?: number;
  attendanceRate?: number;
  monthlyAbsentees?: number;
}
