import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  User,
  Clock,
  Calendar,
  FileText,
  DollarSign,
  Users,
  BarChart3,
  LogOut,
  Bell,
  Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const employeeLinks = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/profile', icon: User, label: 'My Profile' },
    { to: '/attendance', icon: Clock, label: 'Attendance' },
    { to: '/leave', icon: Calendar, label: 'Leave Requests' },
    { to: '/worklog', icon: FileText, label: 'Daily Work Log' },
    { to: '/payroll', icon: DollarSign, label: 'Payroll' },
  ];

  const adminLinks = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/employees', icon: Users, label: 'Employees' },
    { to: '/attendance', icon: Clock, label: 'Attendance' },
    { to: '/leave', icon: Calendar, label: 'Leave Management' },
    { to: '/analytics', icon: BarChart3, label: 'Analytics' },
    { to: '/payroll', icon: DollarSign, label: 'Payroll' },
  ];

  const links = user?.role === 'admin' ? adminLinks : employeeLinks;

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar text-sidebar-foreground flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-sidebar-border">
        <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
          <span className="text-xl font-bold text-primary-foreground">D</span>
        </div>
        <div>
          <h1 className="text-lg font-bold text-sidebar-foreground">Dayflow</h1>
          <p className="text-xs text-sidebar-foreground/60">HR Management</p>
        </div>
      </div>

      {/* User Info */}
      <div className="px-4 py-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center">
            <span className="text-sm font-medium text-sidebar-primary">
              {user?.name?.charAt(0) || 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              {user?.name || 'User'}
            </p>
            <p className="text-xs text-sidebar-foreground/60 capitalize">
              {user?.role || 'Employee'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              cn('nav-link', isActive && 'nav-link-active')
            }
          >
            <link.icon className="w-5 h-5" />
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="px-3 py-4 border-t border-sidebar-border space-y-1">
        <NavLink
          to="/notifications"
          className={({ isActive }) =>
            cn('nav-link', isActive && 'nav-link-active')
          }
        >
          <Bell className="w-5 h-5" />
          <span>Notifications</span>
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            cn('nav-link', isActive && 'nav-link-active')
          }
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </NavLink>
        <button
          onClick={handleLogout}
          className="nav-link w-full text-left hover:text-destructive hover:bg-destructive/10"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
