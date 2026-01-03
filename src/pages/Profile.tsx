import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, Mail, Phone, MapPin, Building, Briefcase, Calendar, DollarSign, Edit } from 'lucide-react';

const Profile: React.FC = () => {
  const { user } = useAuth();

  const profileSections = [
    {
      title: 'Personal Information',
      items: [
        { icon: User, label: 'Full Name', value: user?.name || 'Not set' },
        { icon: Mail, label: 'Email', value: user?.email || 'Not set' },
        { icon: Phone, label: 'Phone', value: user?.phone || '+1 234 567 8900' },
        { icon: MapPin, label: 'Address', value: user?.address || '123 Tech Street, San Francisco, CA' },
      ],
    },
    {
      title: 'Job Details',
      items: [
        { icon: Building, label: 'Department', value: user?.department || 'Engineering' },
        { icon: Briefcase, label: 'Position', value: user?.position || 'Senior Developer' },
        { icon: Calendar, label: 'Join Date', value: user?.joinDate || '2022-03-15' },
      ],
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
        <p className="text-muted-foreground mt-1">View and manage your personal information</p>
      </div>

      {/* Profile Card */}
      <Card className="overflow-hidden">
        <div className="h-32 gradient-primary" />
        <CardContent className="relative pt-0">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-16">
            <div className="w-32 h-32 rounded-2xl bg-card border-4 border-card flex items-center justify-center shadow-lg">
              <span className="text-4xl font-bold text-primary">
                {user?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="flex-1 pb-2">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-foreground">{user?.name || 'User'}</h2>
                <Badge variant="secondary" className="capitalize">
                  {user?.role || 'Employee'}
                </Badge>
              </div>
              <p className="text-muted-foreground">{user?.position || 'Team Member'}</p>
              <p className="text-sm text-muted-foreground">ID: {user?.employeeId || 'EMP001'}</p>
            </div>
            <Button variant="outline" className="gap-2">
              <Edit className="w-4 h-4" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Profile Sections */}
      <div className="grid gap-6">
        {profileSections.map((section) => (
          <Card key={section.title}>
            <CardHeader>
              <CardTitle className="text-lg">{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-6">
                {section.items.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="font-medium text-foreground">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Salary (Read Only for Employees) */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Compensation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Annual Salary</p>
                <p className="text-2xl font-bold text-foreground">
                  ${(user?.salary || 85000).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
