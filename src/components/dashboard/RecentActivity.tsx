import React from 'react';
import { Clock, Calendar, FileText, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Activity {
  id: string;
  type: 'attendance' | 'leave' | 'worklog';
  title: string;
  description: string;
  time: string;
  status?: 'success' | 'warning' | 'pending';
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'attendance',
    title: 'Checked in',
    description: 'Started work at 9:00 AM',
    time: '2 hours ago',
    status: 'success',
  },
  {
    id: '2',
    type: 'leave',
    title: 'Leave request approved',
    description: 'Vacation leave for Jan 20-22',
    time: '1 day ago',
    status: 'success',
  },
  {
    id: '3',
    type: 'worklog',
    title: 'Work log submitted',
    description: 'Completed 8 hours of work',
    time: '1 day ago',
    status: 'success',
  },
  {
    id: '4',
    type: 'leave',
    title: 'Leave request pending',
    description: 'Sick leave for tomorrow',
    time: '3 days ago',
    status: 'pending',
  },
];

const typeIcons = {
  attendance: Clock,
  leave: Calendar,
  worklog: FileText,
};

const statusStyles = {
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  pending: 'bg-muted text-muted-foreground',
};

const RecentActivity: React.FC = () => {
  return (
    <div className="glass-card rounded-xl p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = typeIcons[activity.type];
          return (
            <div key={activity.id} className="flex items-start gap-4">
              <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0', statusStyles[activity.status || 'pending'])}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{activity.title}</p>
                <p className="text-sm text-muted-foreground truncate">{activity.description}</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {activity.time}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;
