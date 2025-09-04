import { useState } from "react";
import { Hotel } from "@/types/hotel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  Settings
} from "lucide-react";

interface HotelsTableProps {
  hotels: Hotel[];
  onEdit: (hotel: Hotel) => void;
  onDelete: (hotel: Hotel) => void;
  onViewServices: (hotel: Hotel) => void;
}

export function HotelsTable({ hotels, onEdit, onDelete, onViewServices }: HotelsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter hotels based on search query
  const filteredHotels = hotels.filter((hotel) =>
    hotel.hotel_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hotel.hotel_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hotel.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Paginate results
  const totalPages = Math.ceil(filteredHotels.length / itemsPerPage);
  const paginatedHotels = filteredHotels.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getLanguageLabel = (language: string) => {
    const labels: Record<string, string> = {
      'es': 'Español',
      'en': 'English', 
      'pt': 'Português'
    };
    return labels[language] || language;
  };

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-muted" />
          <Input
            placeholder="Buscar por nombre, código o email..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset to first page when searching
            }}
            className="pl-10"
          />
        </div>
        <div className="text-sm text-text-muted">
          {filteredHotels.length} de {hotels.length} hoteles
        </div>
      </div>

      {/* Table */}
      <div className="data-table">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Hotel</TableHead>
              <TableHead>Contacto</TableHead>
              <TableHead>Idioma</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Servicios</TableHead>
              <TableHead>Creado</TableHead>
              <TableHead className="w-[50px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedHotels.map((hotel) => (
              <TableRow key={hotel.id} className="table-row-hover">
                <TableCell>
                  <div>
                    <div className="font-medium text-foreground">{hotel.hotel_name}</div>
                    <div className="text-sm text-text-muted">{hotel.hotel_code}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="text-sm text-foreground">{hotel.email}</div>
                    {hotel.phone && (
                      <div className="text-sm text-text-muted">{hotel.phone}</div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{getLanguageLabel(hotel.language)}</span>
                </TableCell>
                <TableCell>
                  <Badge variant={hotel.active ? "default" : "secondary"}>
                    {hotel.active ? 'Activo' : 'Inactivo'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-foreground">
                      {hotel.active_services?.length || 0}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewServices(hotel)}
                      className="h-6 w-6 p-0"
                    >
                      <Settings className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-text-muted">
                    {formatDate(hotel.created_at)}
                  </span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem 
                        onClick={() => onEdit(hotel)}
                        className="flex items-center gap-2"
                      >
                        <Edit className="h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => onViewServices(hotel)}
                        className="flex items-center gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        Ver Servicios
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => onDelete(hotel)}
                        className="flex items-center gap-2 text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {paginatedHotels.length === 0 && (
          <div className="text-center py-8 text-text-muted">
            {searchQuery ? 'No se encontraron hoteles con ese criterio' : 'No hay hoteles registrados'}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-text-muted">
            Página {currentPage} de {totalPages}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              Anterior
            </Button>
            <Button
              variant="outline" 
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}