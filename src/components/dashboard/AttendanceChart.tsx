import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AttendanceChartProps {
  data?: { day: string; hours: number }[];
}

const defaultData = [
  { day: 'Mon', hours: 8 },
  { day: 'Tue', hours: 9 },
  { day: 'Wed', hours: 7.5 },
  { day: 'Thu', hours: 8.5 },
  { day: 'Fri', hours: 8 },
  { day: 'Sat', hours: 0 },
  { day: 'Sun', hours: 0 },
];

const AttendanceChart: React.FC<AttendanceChartProps> = ({ data = defaultData }) => {
  return (
    <div className="glass-card rounded-xl p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Weekly Hours</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="day" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Bar 
              dataKey="hours" 
              fill="hsl(var(--primary))" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AttendanceChart;
