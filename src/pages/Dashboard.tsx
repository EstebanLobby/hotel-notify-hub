import { Header } from "@/components/layout/Header";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { NotificationsChart } from "@/components/dashboard/NotificationsChart";
import { ServicesChart } from "@/components/dashboard/ServicesChart";
import { mockDashboardMetrics } from "@/data/mockData";
import { 
  Building2, 
  Bell, 
  TrendingUp, 
  CheckCircle,
  Users,
  Activity
} from "lucide-react";

export default function Dashboard() {
  const metrics = mockDashboardMetrics;

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-background">
      <Header 
        title="Dashboard de Notificaciones" 
        subtitle="Vista general del sistema hotelero" 
      />
      
      <main className="flex-1 p-6">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Hoteles"
            value={metrics.totalHotels}
            subtitle="Registrados en el sistema"
            icon={Building2}
            variant="primary"
            trend={{
              value: 12.5,
              label: "vs mes anterior",
              positive: true
            }}
          />
          
          <MetricCard
            title="Hoteles Activos"
            value={metrics.activeHotels}
            subtitle={`${Math.round((metrics.activeHotels / metrics.totalHotels) * 100)}% del total`}
            icon={Users}
            variant="success"
            trend={{
              value: 8.3,
              label: "vs mes anterior", 
              positive: true
            }}
          />
          
          <MetricCard
            title="Notificaciones Enviadas"
            value={metrics.totalNotifications}
            subtitle="Último mes"
            icon={Bell}
            variant="info"
            trend={{
              value: 23.1,
              label: "vs mes anterior",
              positive: true
            }}
          />
          
          <MetricCard
            title="Tasa de Éxito"
            value={`${metrics.successRate}%`}
            subtitle="Notificaciones entregadas"
            icon={CheckCircle}
            variant="default"
            trend={{
              value: 2.4,
              label: "vs mes anterior",
              positive: true
            }}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <NotificationsChart data={metrics.notificationsByDay} />
          <ServicesChart data={metrics.topServices} />
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface rounded-lg border shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Actividad Reciente</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-border-light last:border-b-0">
                <span className="text-sm text-foreground">Portal del Lago</span>
                <span className="text-xs text-text-muted">Hace 2 min</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border-light last:border-b-0">
                <span className="text-sm text-foreground">Hagrids Alquileres</span>
                <span className="text-xs text-text-muted">Hace 15 min</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border-light last:border-b-0">
                <span className="text-sm text-foreground">Plaza Central</span>
                <span className="text-xs text-text-muted">Hace 1 hora</span>
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-lg border shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="h-6 w-6 text-success" />
              <h3 className="text-lg font-semibold text-foreground">Top Servicios</h3>
            </div>
            <div className="space-y-3">
              {metrics.topServices.slice(0, 4).map((service, index) => (
                <div key={service.name} className="flex justify-between items-center">
                  <span className="text-sm text-foreground">{service.name}</span>
                  <span className="text-sm font-medium text-primary">{service.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface rounded-lg border shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="h-6 w-6 text-success" />
              <h3 className="text-lg font-semibold text-foreground">Estado del Sistema</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground">API Status</span>
                <span className="status-active">Operativo</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground">Email Service</span>
                <span className="status-active">Operativo</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground">WhatsApp Service</span>
                <span className="status-active">Operativo</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground">Database</span>
                <span className="status-active">Operativo</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}