import { Header } from "@/components/layout/Header";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { NotificationsChart } from "@/components/dashboard/NotificationsChart";
import { ServicesChart } from "@/components/dashboard/ServicesChart";
import { mockDashboardMetrics } from "@/data/mockData";
import { 
  BarChart3, 
  TrendingUp, 
  Calendar,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function Reports() {
  const metrics = mockDashboardMetrics;
  const { toast } = useToast();

  const handleExportReport = () => {
    toast({
      title: "Exportar Reporte",
      description: "Funcionalidad de exportación próximamente disponible.",
    });
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-background">
      <Header 
        title="Reportes y Métricas" 
        subtitle="Análisis detallado del rendimiento del sistema" 
      />
      
      <main className="flex-1 p-6">
        <div className="space-y-6">
          {/* Header Actions */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Métricas Detalladas</h2>
              <p className="text-text-muted">
                Análisis completo del rendimiento y uso del sistema
              </p>
            </div>
            <Button onClick={handleExportReport} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Exportar Reporte
            </Button>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Tasa de Entrega"
              value={`${metrics.successRate}%`}
              subtitle="Notificaciones exitosas"
              icon={TrendingUp}
              variant="success"
              trend={{
                value: 2.1,
                label: "vs mes anterior",
                positive: true
              }}
            />
            
            <MetricCard
              title="Promedio Diario"
              value={Math.round(metrics.totalNotifications / 30)}
              subtitle="Notificaciones por día"
              icon={Calendar}
              variant="info"
            />
            
            <MetricCard
              title="Servicios Activos"
              value={metrics.topServices.length}
              subtitle="En uso actualmente"
              icon={BarChart3}
              variant="primary"
            />
            
            <MetricCard
              title="Tiempo de Respuesta"
              value="1.2s"
              subtitle="Promedio de entrega"
              icon={TrendingUp}
              variant="default"
              trend={{
                value: -5.2,
                label: "vs mes anterior",
                positive: true
              }}
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <NotificationsChart data={metrics.notificationsByDay} />
            <ServicesChart data={metrics.topServices} />
          </div>

          {/* Detailed Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-surface rounded-lg border shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">
                Rendimiento por Servicio
              </h3>
              <div className="space-y-4">
                {metrics.topServices.map((service, index) => {
                  const successRate = 95 - (index * 2); // Mock success rates
                  return (
                    <div key={service.name} className="flex items-center justify-between p-3 bg-background rounded-lg">
                      <div>
                        <div className="font-medium text-foreground">{service.name}</div>
                        <div className="text-sm text-text-muted">{service.count} notificaciones</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-success">{successRate}%</div>
                        <div className="text-xs text-text-muted">Éxito</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-surface rounded-lg border shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">
                Estadísticas por Canal
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                  <div>
                    <div className="font-medium text-foreground">Email</div>
                    <div className="text-sm text-text-muted">Canal principal</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-primary">78%</div>
                    <div className="text-xs text-text-muted">Del total</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                  <div>
                    <div className="font-medium text-foreground">WhatsApp</div>
                    <div className="text-sm text-text-muted">Canal secundario</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-success">22%</div>
                    <div className="text-xs text-text-muted">Del total</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}