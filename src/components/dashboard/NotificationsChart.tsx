import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DashboardMetrics } from '@/types/hotel';

interface NotificationsChartProps {
  data: DashboardMetrics['notificationsByDay'];
}

export function NotificationsChart({ data }: NotificationsChartProps) {
  return (
    <div className="bg-surface rounded-lg border shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4 text-foreground">
        Notificaciones por Día
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border-light" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(value) => new Date(value).toLocaleDateString()}
              className="text-text-muted text-sm"
            />
            <YAxis className="text-text-muted text-sm" />
            <Tooltip 
              labelFormatter={(value) => `Fecha: ${new Date(value).toLocaleDateString()}`}
              formatter={(value) => [`${value}`, 'Notificaciones']}
              contentStyle={{
                backgroundColor: 'hsl(var(--surface))',
                border: '1px solid hsl(var(--border-light))',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px hsl(220 13% 69% / 0.1)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="count" 
              stroke="hsl(var(--primary))" 
              strokeWidth={3}
              dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: 'hsl(var(--primary-dark))' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}