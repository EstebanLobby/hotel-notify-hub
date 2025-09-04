import { Hotel, NotificationService, DashboardMetrics } from '@/types/hotel';

export const mockHotels: Hotel[] = [
  {
    id: 1,
    hotel_code: "lago",
    hotel_name: "Portal del Lago",
    email: "hotel@portaldelago.com",
    phone: "+54 9 11 1234-5678",
    language: "es",
    active: true,
    created_at: "2025-08-22T18:42:21.186Z",
    updated_at: "2025-08-22T18:42:21.186Z",
    active_services: [
      {
        service_id: 1,
        service_code: "BOENGINE",
        send_by_email: true,
        send_by_whatsapp: true
      },
      {
        service_id: 2,
        service_code: "CHECKOUT",
        send_by_email: true,
        send_by_whatsapp: false
      }
    ]
  },
  {
    id: 87,
    hotel_code: "hagrid54",
    hotel_name: "Hagrids Alquileres Turísticos",
    email: "hagridsvla@gmail.com",
    phone: null,
    language: "es",
    active: true,
    created_at: "2025-08-20T15:30:00.000Z",
    updated_at: "2025-08-22T10:15:30.000Z",
    active_services: [
      {
        service_id: 1,
        service_code: "BOENGINE",
        send_by_email: true,
        send_by_whatsapp: true
      }
    ]
  },
  {
    id: 15,
    hotel_code: "plaza_central",
    hotel_name: "Hotel Plaza Central",
    email: "reservas@plazacentral.com",
    phone: "+34 91 123 4567",
    language: "es",
    active: true,
    created_at: "2025-08-15T12:00:00.000Z",
    updated_at: "2025-08-21T14:22:15.000Z",
    active_services: [
      {
        service_id: 1,
        service_code: "BOENGINE",
        send_by_email: true,
        send_by_whatsapp: true
      },
      {
        service_id: 2,
        service_code: "CHECKOUT",
        send_by_email: true,
        send_by_whatsapp: false
      },
      {
        service_id: 3,
        service_code: "CANCELLATION",
        send_by_email: true,
        send_by_whatsapp: true
      }
    ]
  },
  {
    id: 25,
    hotel_code: "ocean_view",
    hotel_name: "Ocean View Resort",
    email: "info@oceanview.com",
    phone: "+1 555 0123",
    language: "en",
    active: false,
    created_at: "2025-08-10T09:30:00.000Z",
    updated_at: "2025-08-18T16:45:00.000Z",
    active_services: []
  },
  {
    id: 33,
    hotel_code: "montanha_verde",
    hotel_name: "Pousada Montanha Verde",
    email: "contato@montanhaverde.br",
    phone: "+55 11 98765-4321",
    language: "pt",
    active: true,
    created_at: "2025-08-12T11:15:30.000Z",
    updated_at: "2025-08-20T08:30:45.000Z",
    active_services: [
      {
        service_id: 1,
        service_code: "BOENGINE",
        send_by_email: true,
        send_by_whatsapp: true
      },
      {
        service_id: 4,
        service_code: "PAYMENT",
        send_by_email: true,
        send_by_whatsapp: false
      }
    ]
  }
];

export const mockServices: NotificationService[] = [
  {
    id: 1,
    service_code: "BOENGINE",
    service_name: "Nuevas Reservas Motor Web",
    description: "Notificaciones de reservas nuevas desde el motor de reservas web",
    active: true,
    created_at: "2025-08-22T18:49:07.514Z"
  },
  {
    id: 2,
    service_code: "CHECKOUT",
    service_name: "Check-out Completado",
    description: "Notificaciones cuando un huésped completa el check-out",
    active: true,
    created_at: "2025-08-20T14:20:00.000Z"
  },
  {
    id: 3,
    service_code: "CANCELLATION",
    service_name: "Cancelaciones de Reserva",
    description: "Alertas cuando se cancela una reserva",
    active: true,
    created_at: "2025-08-18T10:00:00.000Z"
  },
  {
    id: 4,
    service_code: "PAYMENT",
    service_name: "Confirmación de Pago",
    description: "Notificaciones de pagos recibidos y procesados",
    active: true,
    created_at: "2025-08-15T16:30:00.000Z"
  },
  {
    id: 5,
    service_code: "MAINTENANCE",
    service_name: "Mantenimiento Programado",
    description: "Alertas de mantenimiento de habitaciones y servicios",
    active: false,
    created_at: "2025-08-10T12:00:00.000Z"
  }
];

export const mockDashboardMetrics: DashboardMetrics = {
  totalHotels: 5,
  activeHotels: 4,
  totalNotifications: 1247,
  successRate: 94.2,
  topServices: [
    { name: "Nuevas Reservas", count: 456 },
    { name: "Check-out", count: 342 },
    { name: "Cancelaciones", count: 289 },
    { name: "Pagos", count: 160 }
  ],
  notificationsByDay: [
    { date: "2025-01-01", count: 45 },
    { date: "2025-01-02", count: 62 },
    { date: "2025-01-03", count: 38 },
    { date: "2025-01-04", count: 71 },
    { date: "2025-01-05", count: 55 },
    { date: "2025-01-06", count: 49 },
    { date: "2025-01-07", count: 67 }
  ]
};