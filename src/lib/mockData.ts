import { User, AttendanceRecord, LeaveRequest, WorkLog, Notification } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    employeeId: 'EMP001',
    name: 'John Doe',
    email: 'john@dayflow.com',
    role: 'employee',
    department: 'Engineering',
    position: 'Senior Developer',
    phone: '+1 234 567 8900',
    address: '123 Tech Street, San Francisco, CA',
    joinDate: '2022-03-15',
    salary: 85000,
  },
  {
    id: '2',
    employeeId: 'EMP002',
    name: 'Sarah Chen',
    email: 'sarah@dayflow.com',
    role: 'admin',
    department: 'Human Resources',
    position: 'HR Manager',
    phone: '+1 234 567 8901',
    address: '456 Business Ave, San Francisco, CA',
    joinDate: '2021-01-10',
    salary: 95000,
  },
  {
    id: '3',
    employeeId: 'EMP003',
    name: 'Michael Brown',
    email: 'michael@dayflow.com',
    role: 'employee',
    department: 'Marketing',
    position: 'Marketing Specialist',
    phone: '+1 234 567 8902',
    address: '789 Market Road, San Francisco, CA',
    joinDate: '2023-06-01',
    salary: 65000,
  },
  {
    id: '4',
    employeeId: 'EMP004',
    name: 'Emily Wilson',
    email: 'emily@dayflow.com',
    role: 'employee',
    department: 'Design',
    position: 'UI/UX Designer',
    phone: '+1 234 567 8903',
    address: '321 Creative Lane, San Francisco, CA',
    joinDate: '2022-09-20',
    salary: 75000,
  },
];

export const mockAttendance: AttendanceRecord[] = [
  { id: '1', userId: '1', date: '2024-01-15', checkIn: '09:00', checkOut: '18:00', status: 'present', hoursWorked: 9 },
  { id: '2', userId: '1', date: '2024-01-14', checkIn: '09:15', checkOut: '17:30', status: 'present', hoursWorked: 8.25 },
  { id: '3', userId: '1', date: '2024-01-13', status: 'leave' },
  { id: '4', userId: '1', date: '2024-01-12', checkIn: '09:00', checkOut: '13:00', status: 'half-day', hoursWorked: 4 },
  { id: '5', userId: '1', date: '2024-01-11', checkIn: '08:45', checkOut: '18:15', status: 'present', hoursWorked: 9.5 },
  { id: '6', userId: '3', date: '2024-01-15', checkIn: '09:30', checkOut: '18:00', status: 'present', hoursWorked: 8.5 },
  { id: '7', userId: '4', date: '2024-01-15', status: 'absent' },
];

export const mockLeaveRequests: LeaveRequest[] = [
  {
    id: '1',
    userId: '1',
    userName: 'John Doe',
    type: 'paid',
    startDate: '2024-01-20',
    endDate: '2024-01-22',
    reason: 'Family vacation',
    status: 'pending',
    createdAt: '2024-01-10T10:00:00Z',
  },
  {
    id: '2',
    userId: '3',
    userName: 'Michael Brown',
    type: 'sick',
    startDate: '2024-01-13',
    endDate: '2024-01-13',
    reason: 'Not feeling well',
    status: 'approved',
    adminComment: 'Get well soon!',
    createdAt: '2024-01-12T08:00:00Z',
  },
  {
    id: '3',
    userId: '4',
    userName: 'Emily Wilson',
    type: 'unpaid',
    startDate: '2024-01-25',
    endDate: '2024-01-30',
    reason: 'Personal matters',
    status: 'pending',
    createdAt: '2024-01-14T14:00:00Z',
  },
];

export const mockWorkLogs: WorkLog[] = [
  {
    id: '1',
    userId: '1',
    date: '2024-01-15',
    summary: 'Completed the user authentication module. Fixed 3 bugs in the dashboard. Started working on the API integration.',
    hoursWorked: 8,
    createdAt: '2024-01-15T18:00:00Z',
  },
  {
    id: '2',
    userId: '1',
    date: '2024-01-14',
    summary: 'Code review for team members. Documentation updates. Team meeting.',
    hoursWorked: 7,
    createdAt: '2024-01-14T17:30:00Z',
  },
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    title: 'Leave Approved',
    message: 'Your leave request for Jan 13 has been approved.',
    type: 'success',
    read: false,
    createdAt: '2024-01-12T10:00:00Z',
  },
  {
    id: '2',
    userId: '1',
    title: 'Profile Updated',
    message: 'Your profile information has been updated by HR.',
    type: 'info',
    read: true,
    createdAt: '2024-01-10T14:00:00Z',
  },
];

export const calculateProductivityScore = (userId: string): number => {
  const userAttendance = mockAttendance.filter(a => a.userId === userId);
  const userWorkLogs = mockWorkLogs.filter(w => w.userId === userId);
  
  const attendanceScore = userAttendance.filter(a => a.status === 'present').length / Math.max(userAttendance.length, 1) * 40;
  const workLogScore = userWorkLogs.length > 0 ? 30 : 0;
  const avgHours = userWorkLogs.reduce((acc, log) => acc + log.hoursWorked, 0) / Math.max(userWorkLogs.length, 1);
  const hoursScore = Math.min(avgHours / 8 * 30, 30);
  
  return Math.round(attendanceScore + workLogScore + hoursScore);
};
