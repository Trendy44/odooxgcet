import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Users, Clock, Calendar, TrendingUp } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import ProductivityScore from '@/components/dashboard/ProductivityScore';
import AttendanceChart from '@/components/dashboard/AttendanceChart';
import QuickActions from '@/components/dashboard/QuickActions';
import RecentActivity from '@/components/dashboard/RecentActivity';
import { calculateProductivityScore, mockUsers, mockAttendance, mockLeaveRequests } from '@/lib/mockData';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const productivityScore = user ? calculateProductivityScore(user.id) : 0;
  const presentToday = mockAttendance.filter(
    (a) => a.date === '2024-01-15' && a.status === 'present'
  ).length;
  const pendingLeaves = mockLeaveRequests.filter((l) => l.status === 'pending').length;

  // Get current time for greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {greeting}, {user?.name?.split(' ')[0] || 'User'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {isAdmin
              ? 'Here\'s an overview of your organization'
              : 'Here\'s what\'s happening with your work today'}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Today</p>
            <p className="font-medium text-foreground">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'short',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions (Employee Only) */}
      {!isAdmin && <QuickActions />}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isAdmin ? (
          <>
            <StatCard
              title="Total Employees"
              value={mockUsers.length}
              subtitle="Active workforce"
              icon={Users}
              variant="primary"
            />
            <StatCard
              title="Present Today"
              value={presentToday}
              subtitle={`${Math.round((presentToday / mockUsers.length) * 100)}% attendance`}
              icon={Clock}
              variant="success"
              trend={{ value: 5, isPositive: true }}
            />
            <StatCard
              title="Pending Leaves"
              value={pendingLeaves}
              subtitle="Awaiting approval"
              icon={Calendar}
              variant="warning"
            />
            <StatCard
              title="Avg Productivity"
              value="78%"
              subtitle="This month"
              icon={TrendingUp}
              variant="accent"
              trend={{ value: 3, isPositive: true }}
            />
          </>
        ) : (
          <>
            <StatCard
              title="Days Present"
              value="18"
              subtitle="This month"
              icon={Clock}
              variant="success"
            />
            <StatCard
              title="Leave Balance"
              value="12"
              subtitle="Days remaining"
              icon={Calendar}
              variant="primary"
            />
            <StatCard
              title="Work Logs"
              value="15"
              subtitle="Submitted this month"
              icon={TrendingUp}
              variant="accent"
            />
            <div className="stat-card flex items-center justify-center">
              <ProductivityScore score={productivityScore} size="md" />
            </div>
          </>
        )}
      </div>

      {/* Charts & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AttendanceChart />
        <RecentActivity />
      </div>

      {/* Admin: Pending Approvals */}
      {isAdmin && (
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Pending Leave Requests</h3>
          <div className="space-y-4">
            {mockLeaveRequests
              .filter((l) => l.status === 'pending')
              .map((leave) => (
                <div
                  key={leave.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {leave.userName?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{leave.userName}</p>
                      <p className="text-sm text-muted-foreground">
                        {leave.type} leave • {leave.startDate} to {leave.endDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 text-sm font-medium text-success bg-success/10 rounded-lg hover:bg-success/20 transition-colors">
                      Approve
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-destructive bg-destructive/10 rounded-lg hover:bg-destructive/20 transition-colors">
                      Reject
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
