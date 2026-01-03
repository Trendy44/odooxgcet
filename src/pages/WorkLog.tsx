import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FileText, Clock, Calendar, Plus, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { mockWorkLogs } from '@/lib/mockData';

const WorkLog: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    summary: '',
    hoursWorked: '8',
  });

  const userLogs = mockWorkLogs.filter((log) => log.userId === user?.id);
  const today = new Date().toISOString().split('T')[0];
  const hasLoggedToday = userLogs.some((log) => log.date === today);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Work Log Submitted',
      description: 'Your daily work summary has been recorded.',
    });
    setShowForm(false);
    setFormData({ summary: '', hoursWorked: '8' });
  };

  const totalHoursThisMonth = userLogs.reduce((acc, log) => acc + log.hoursWorked, 0);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Daily Work Log</h1>
          <p className="text-muted-foreground mt-1">Record your daily work activities and hours</p>
        </div>
        {!hasLoggedToday && (
          <Button onClick={() => setShowForm(!showForm)} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Today's Log
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Logs This Month</p>
                <p className="text-2xl font-bold text-foreground">{userLogs.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Hours Logged</p>
                <p className="text-2xl font-bold text-foreground">{totalHoursThisMonth}h</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${hasLoggedToday ? 'bg-success/10' : 'bg-warning/10'}`}>
                <Calendar className={`w-6 h-6 ${hasLoggedToday ? 'text-success' : 'text-warning'}`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Today's Log</p>
                <p className="text-lg font-bold text-foreground">
                  {hasLoggedToday ? 'Submitted ✓' : 'Pending'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Work Log Form */}
      {showForm && (
        <Card className="animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Today's Work Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label>What did you work on today?</Label>
                <Textarea
                  placeholder="Describe your tasks, accomplishments, and any blockers..."
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="min-h-[150px]"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Hours Worked</Label>
                <Input
                  type="number"
                  min="1"
                  max="16"
                  step="0.5"
                  value={formData.hoursWorked}
                  onChange={(e) => setFormData({ ...formData, hoursWorked: e.target.value })}
                  className="max-w-[150px]"
                  required
                />
              </div>
              <div className="flex gap-3">
                <Button type="submit" className="gap-2">
                  <Send className="w-4 h-4" />
                  Submit Log
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Previous Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Work Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userLogs.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No work logs yet. Start by adding today's log!
              </div>
            ) : (
              userLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-4 rounded-xl bg-muted/30 border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-medium text-foreground">{log.date}</span>
                        <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                          {log.hoursWorked}h
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{log.summary}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkLog;
