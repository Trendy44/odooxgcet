import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, LogIn, LogOut, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface AttendanceDay {
  date: string;
  day: string;
  status: 'present' | 'absent' | 'half-day' | 'leave' | 'weekend' | null;
  checkIn?: string;
  checkOut?: string;
  hours?: number;
}

const Attendance: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);

  const handleCheckIn = () => {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    setIsCheckedIn(true);
    setCheckInTime(time);
    toast({
      title: 'Checked In!',
      description: `You checked in at ${time}`,
    });
  };

  const handleCheckOut = () => {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    setIsCheckedIn(false);
    toast({
      title: 'Checked Out!',
      description: `You checked out at ${time}`,
    });
  };

  // Generate week data
  const weekData: AttendanceDay[] = [
    { date: 'Jan 13', day: 'Mon', status: 'present', checkIn: '09:00 AM', checkOut: '06:00 PM', hours: 9 },
    { date: 'Jan 14', day: 'Tue', status: 'present', checkIn: '09:15 AM', checkOut: '05:30 PM', hours: 8.25 },
    { date: 'Jan 15', day: 'Wed', status: 'leave' },
    { date: 'Jan 16', day: 'Thu', status: 'half-day', checkIn: '09:00 AM', checkOut: '01:00 PM', hours: 4 },
    { date: 'Jan 17', day: 'Fri', status: 'present', checkIn: '08:45 AM', checkOut: '06:15 PM', hours: 9.5 },
    { date: 'Jan 18', day: 'Sat', status: 'weekend' },
    { date: 'Jan 19', day: 'Sun', status: 'weekend' },
  ];

  const statusColors = {
    present: 'bg-success/10 text-success border-success/20',
    absent: 'bg-destructive/10 text-destructive border-destructive/20',
    'half-day': 'bg-warning/10 text-warning border-warning/20',
    leave: 'bg-info/10 text-info border-info/20',
    weekend: 'bg-muted text-muted-foreground border-muted',
  };

  const totalHours = weekData.reduce((acc, day) => acc + (day.hours || 0), 0);
  const presentDays = weekData.filter((d) => d.status === 'present' || d.status === 'half-day').length;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Attendance</h1>
        <p className="text-muted-foreground mt-1">Track your daily attendance and work hours</p>
      </div>

      {/* Check-in Card */}
      <Card className="border-2 border-dashed border-primary/20">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className={cn(
                'w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300',
                isCheckedIn ? 'bg-success/10 shadow-glow' : 'bg-muted'
              )}>
                <Clock className={cn(
                  'w-10 h-10 transition-colors',
                  isCheckedIn ? 'text-success' : 'text-muted-foreground'
                )} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
                <h2 className="text-2xl font-bold text-foreground">
                  {isCheckedIn ? 'Currently Working' : 'Not Checked In'}
                </h2>
                {checkInTime && isCheckedIn && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Checked in at {checkInTime}
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              {!isCheckedIn ? (
                <Button onClick={handleCheckIn} size="lg" className="gap-2">
                  <LogIn className="w-5 h-5" />
                  Check In
                </Button>
              ) : (
                <Button onClick={handleCheckOut} variant="outline" size="lg" className="gap-2">
                  <LogOut className="w-5 h-5" />
                  Check Out
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-3xl font-bold text-foreground">{presentDays} days</p>
              </div>
              <Calendar className="w-10 h-10 text-primary/40" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Hours Worked</p>
                <p className="text-3xl font-bold text-foreground">{totalHours}h</p>
              </div>
              <Clock className="w-10 h-10 text-primary/40" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Attendance Rate</p>
                <p className="text-3xl font-bold text-success">92%</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                <span className="text-success font-bold">✓</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly View */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            This Week
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {weekData.map((day) => (
              <div
                key={day.date}
                className={cn(
                  'flex items-center justify-between p-4 rounded-xl border transition-colors',
                  day.status ? statusColors[day.status] : 'bg-muted/30'
                )}
              >
                <div className="flex items-center gap-4">
                  <div className="text-center min-w-[60px]">
                    <p className="text-xs text-current/70">{day.day}</p>
                    <p className="font-semibold">{day.date}</p>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {day.status || 'N/A'}
                  </Badge>
                </div>
                {day.checkIn && (
                  <div className="flex items-center gap-6 text-sm">
                    <span>
                      <span className="text-current/60">In:</span> {day.checkIn}
                    </span>
                    <span>
                      <span className="text-current/60">Out:</span> {day.checkOut || '-'}
                    </span>
                    <span className="font-medium">{day.hours}h</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Attendance;
