import { Header } from "@/components/layout/Header";
import { mockServices } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Settings, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Services() {
  const services = mockServices;
  const { toast } = useToast();

  const handleViewHotels = (serviceCode: string) => {
    toast({
      title: "Hoteles Suscritos",
      description: `Lista de hoteles que usan el servicio ${serviceCode} próximamente disponible.`,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-background">
      <Header 
        title="Servicios de Notificación" 
        subtitle="Gestiona los servicios disponibles para los hoteles" 
      />
      
      <main className="flex-1 p-6">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Lista de Servicios</h2>
            <p className="text-text-muted">
              Configura y administra los diferentes tipos de notificaciones
            </p>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-surface rounded-lg border shadow-sm p-4">
              <div className="text-2xl font-bold text-foreground">{services.length}</div>
              <div className="text-sm text-text-muted">Total Servicios</div>
            </div>
            <div className="bg-surface rounded-lg border shadow-sm p-4">
              <div className="text-2xl font-bold text-success">
                {services.filter(s => s.active).length}
              </div>
              <div className="text-sm text-text-muted">Activos</div>
            </div>
            <div className="bg-surface rounded-lg border shadow-sm p-4">
              <div className="text-2xl font-bold text-text-muted">
                {services.filter(s => !s.active).length}
              </div>
              <div className="text-sm text-text-muted">Inactivos</div>
            </div>
          </div>

          {/* Services Table */}
          <div className="data-table">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Servicio</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Creado</TableHead>
                  <TableHead>Hoteles Suscritos</TableHead>
                  <TableHead className="w-[100px]">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id} className="table-row-hover">
                    <TableCell>
                      <div>
                        <div className="font-medium text-foreground">
                          {service.service_name}
                        </div>
                        <div className="text-sm text-text-muted">
                          {service.service_code}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-foreground">
                        {service.description}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={service.active ? "default" : "secondary"}>
                        {service.active ? 'Activo' : 'Inactivo'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-text-muted">
                        {formatDate(service.created_at)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewHotels(service.service_code)}
                        className="flex items-center gap-2 text-primary hover:text-primary-dark"
                      >
                        <Eye className="h-4 w-4" />
                        Ver hoteles
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <Settings className="h-4 w-4" />
                        Configurar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
}