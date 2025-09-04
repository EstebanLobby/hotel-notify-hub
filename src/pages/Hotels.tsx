import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { HotelsTable } from "@/components/hotels/HotelsTable";
import { Button } from "@/components/ui/button";
import { mockHotels } from "@/data/mockData";
import { Hotel } from "@/types/hotel";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Hotels() {
  const [hotels, setHotels] = useState<Hotel[]>(mockHotels);
  const { toast } = useToast();

  const handleEdit = (hotel: Hotel) => {
    toast({
      title: "Editar Hotel",
      description: `Funcionalidad de edición para ${hotel.hotel_name} próximamente disponible.`,
    });
  };

  const handleDelete = (hotel: Hotel) => {
    toast({
      title: "Eliminar Hotel",
      description: `¿Confirma eliminar ${hotel.hotel_name}? Esta acción no se puede deshacer.`,
      variant: "destructive"
    });
  };

  const handleViewServices = (hotel: Hotel) => {
    toast({
      title: "Servicios del Hotel",
      description: `Configuración de servicios para ${hotel.hotel_name} próximamente disponible.`,
    });
  };

  const handleAddHotel = () => {
    toast({
      title: "Nuevo Hotel",
      description: "Formulario de creación próximamente disponible.",
    });
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-background">
      <Header 
        title="Gestión de Hoteles" 
        subtitle="Administra los hoteles registrados en el sistema" 
      />
      
      <main className="flex-1 p-6">
        <div className="space-y-6">
          {/* Header Actions */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Lista de Hoteles</h2>
              <p className="text-text-muted">
                Gestiona la información y configuración de cada hotel
              </p>
            </div>
            <Button onClick={handleAddHotel} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nuevo Hotel
            </Button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-surface rounded-lg border shadow-sm p-4">
              <div className="text-2xl font-bold text-foreground">{hotels.length}</div>
              <div className="text-sm text-text-muted">Total Hoteles</div>
            </div>
            <div className="bg-surface rounded-lg border shadow-sm p-4">
              <div className="text-2xl font-bold text-success">
                {hotels.filter(h => h.active).length}
              </div>
              <div className="text-sm text-text-muted">Activos</div>
            </div>
            <div className="bg-surface rounded-lg border shadow-sm p-4">
              <div className="text-2xl font-bold text-warning">
                {hotels.filter(h => !h.active).length}
              </div>
              <div className="text-sm text-text-muted">Inactivos</div>
            </div>
            <div className="bg-surface rounded-lg border shadow-sm p-4">
              <div className="text-2xl font-bold text-primary">
                {hotels.reduce((acc, h) => acc + (h.active_services?.length || 0), 0)}
              </div>
              <div className="text-sm text-text-muted">Servicios Totales</div>
            </div>
          </div>

          {/* Hotels Table */}
          <HotelsTable
            hotels={hotels}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onViewServices={handleViewServices}
          />
        </div>
      </main>
    </div>
  );
}