import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { DashboardMetrics } from '@/types/hotel';

interface ServicesChartProps {
  data: DashboardMetrics['topServices'];
}

const COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--success))',
  'hsl(var(--warning))',
  'hsl(var(--error))',
  'hsl(var(--text-muted))'
];

export function ServicesChart({ data }: ServicesChartProps) {
  return (
    <div className="bg-surface rounded-lg border shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4 text-foreground">
        Servicios Más Utilizados
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="count"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value, name) => [`${value}`, 'Notificaciones']}
              contentStyle={{
                backgroundColor: 'hsl(var(--surface))',
                border: '1px solid hsl(var(--border-light))',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px hsl(220 13% 69% / 0.1)'
              }}
            />
            <Legend 
              wrapperStyle={{
                fontSize: '14px',
                color: 'hsl(var(--text-muted))'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}