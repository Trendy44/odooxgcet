import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, TrendingUp, Calendar, FileText } from 'lucide-react';

const Payroll: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const payrollHistory = [
    { month: 'January 2024', gross: 7083, deductions: 1417, net: 5666, status: 'paid' },
    { month: 'December 2023', gross: 7083, deductions: 1417, net: 5666, status: 'paid' },
    { month: 'November 2023', gross: 7083, deductions: 1417, net: 5666, status: 'paid' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Payroll</h1>
        <p className="text-muted-foreground mt-1">
          {isAdmin ? 'Manage employee compensation' : 'View your salary details'}
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Annual Salary</p>
                <p className="text-4xl font-bold text-foreground mt-1">
                  ${(user?.salary || 85000).toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Monthly: ${Math.round((user?.salary || 85000) / 12).toLocaleString()}
                </p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-success/10 flex items-center justify-center">
                <DollarSign className="w-7 h-7 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Next Payday</p>
                <p className="text-2xl font-bold text-foreground mt-1">Jan 31</p>
                <p className="text-sm text-muted-foreground mt-1">in 16 days</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">YTD Earnings</p>
                <p className="text-2xl font-bold text-foreground mt-1">$5,666</p>
                <p className="text-sm text-success mt-1">+3% from last year</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Salary Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Current Month Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">Base Salary</span>
              <span className="font-medium text-foreground">$7,083.33</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">Bonuses</span>
              <span className="font-medium text-success">+$0.00</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">Federal Tax</span>
              <span className="font-medium text-destructive">-$850.00</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">State Tax</span>
              <span className="font-medium text-destructive">-$354.17</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">Healthcare</span>
              <span className="font-medium text-destructive">-$150.00</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">401(k)</span>
              <span className="font-medium text-destructive">-$62.50</span>
            </div>
            <div className="flex items-center justify-between py-3 text-lg">
              <span className="font-semibold text-foreground">Net Pay</span>
              <span className="font-bold text-success">$5,666.66</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payrollHistory.map((record) => (
              <div
                key={record.month}
                className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div>
                  <p className="font-medium text-foreground">{record.month}</p>
                  <p className="text-sm text-muted-foreground">
                    Gross: ${record.gross.toLocaleString()} | Deductions: ${record.deductions.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-foreground">${record.net.toLocaleString()}</p>
                  <Badge variant="outline" className="text-success border-success/30 bg-success/10">
                    {record.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Payroll;
