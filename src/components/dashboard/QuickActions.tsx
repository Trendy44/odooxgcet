import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, FileText, User, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickAction {
  to: string;
  icon: LucideIcon;
  label: string;
  description: string;
  color: string;
}

const actions: QuickAction[] = [
  {
    to: '/attendance',
    icon: Clock,
    label: 'Check In',
    description: 'Record your attendance',
    color: 'bg-primary/10 text-primary',
  },
  {
    to: '/leave',
    icon: Calendar,
    label: 'Request Leave',
    description: 'Apply for time off',
    color: 'bg-accent/10 text-accent',
  },
  {
    to: '/worklog',
    icon: FileText,
    label: 'Work Log',
    description: 'Submit daily summary',
    color: 'bg-success/10 text-success',
  },
  {
    to: '/profile',
    icon: User,
    label: 'My Profile',
    description: 'View your details',
    color: 'bg-info/10 text-info',
  },
];

const QuickActions: React.FC = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action) => (
        <Link
          key={action.to}
          to={action.to}
          className="glass-card rounded-xl p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
        >
          <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mb-4', action.color)}>
            <action.icon className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {action.label}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {action.description}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default QuickActions;
