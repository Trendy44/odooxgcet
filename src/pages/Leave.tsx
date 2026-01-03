import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, Plus, Clock, Check, X, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { mockLeaveRequests } from '@/lib/mockData';
import { cn } from '@/lib/utils';

const Leave: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const isAdmin = user?.role === 'admin';
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    type: 'paid',
    startDate: '',
    endDate: '',
    reason: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Leave Request Submitted',
      description: 'Your leave request has been sent for approval.',
    });
    setShowForm(false);
    setFormData({ type: 'paid', startDate: '', endDate: '', reason: '' });
  };

  const handleApprove = (id: string) => {
    toast({
      title: 'Leave Approved',
      description: 'The leave request has been approved.',
    });
  };

  const handleReject = (id: string) => {
    toast({
      title: 'Leave Rejected',
      description: 'The leave request has been rejected.',
      variant: 'destructive',
    });
  };

  const userLeaves = isAdmin
    ? mockLeaveRequests
    : mockLeaveRequests.filter((l) => l.userId === user?.id);

  const statusStyles = {
    pending: 'bg-warning/10 text-warning border-warning/30',
    approved: 'bg-success/10 text-success border-success/30',
    rejected: 'bg-destructive/10 text-destructive border-destructive/30',
  };

  const typeStyles = {
    paid: 'bg-primary/10 text-primary',
    sick: 'bg-info/10 text-info',
    unpaid: 'bg-muted text-muted-foreground',
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {isAdmin ? 'Leave Management' : 'Leave Requests'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {isAdmin ? 'Review and manage employee leave requests' : 'Apply for leave and track your requests'}
          </p>
        </div>
        {!isAdmin && (
          <Button onClick={() => setShowForm(!showForm)} className="gap-2">
            <Plus className="w-4 h-4" />
            Request Leave
          </Button>
        )}
      </div>

      {/* Leave Balance (Employee) */}
      {!isAdmin && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Paid Leave</p>
                  <p className="text-2xl font-bold text-foreground">12 days</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-info/10 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-info" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sick Leave</p>
                  <p className="text-2xl font-bold text-foreground">5 days</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-foreground">
                    {userLeaves.filter((l) => l.status === 'pending').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Leave Request Form */}
      {showForm && !isAdmin && (
        <Card className="animate-scale-in">
          <CardHeader>
            <CardTitle>New Leave Request</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Leave Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paid">Paid Leave</SelectItem>
                      <SelectItem value="sick">Sick Leave</SelectItem>
                      <SelectItem value="unpaid">Unpaid Leave</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Reason</Label>
                <Textarea
                  placeholder="Enter the reason for your leave..."
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  required
                />
              </div>
              <div className="flex gap-3">
                <Button type="submit">Submit Request</Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Leave Requests List */}
      <Card>
        <CardHeader>
          <CardTitle>{isAdmin ? 'All Leave Requests' : 'Your Leave Requests'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userLeaves.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No leave requests found
              </div>
            ) : (
              userLeaves.map((leave) => (
                <div
                  key={leave.id}
                  className={cn(
                    'p-4 rounded-xl border transition-colors',
                    statusStyles[leave.status]
                  )}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      {isAdmin && (
                        <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center border">
                          <span className="text-sm font-medium">
                            {leave.userName?.charAt(0) || 'U'}
                          </span>
                        </div>
                      )}
                      <div>
                        {isAdmin && (
                          <p className="font-medium text-foreground">{leave.userName}</p>
                        )}
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={typeStyles[leave.type as keyof typeof typeStyles]}>
                            {leave.type}
                          </Badge>
                          <span className="text-sm">
                            {leave.startDate} → {leave.endDate}
                          </span>
                        </div>
                        <p className="text-sm mt-2">{leave.reason}</p>
                        {leave.adminComment && (
                          <p className="text-sm mt-2 italic">
                            Admin: {leave.adminComment}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="capitalize">
                        {leave.status}
                      </Badge>
                      {isAdmin && leave.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-success hover:text-success hover:bg-success/10"
                            onClick={() => handleApprove(leave.id)}
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleReject(leave.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </>
                      )}
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

export default Leave;
