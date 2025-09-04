export interface Hotel {
  id: number;
  hotel_code: string;
  hotel_name: string;
  email: string;
  phone?: string;
  language: 'es' | 'en' | 'pt';
  active: boolean;
  created_at: string;
  updated_at: string;
  active_services?: ActiveService[];
}

export interface ActiveService {
  service_id: number;
  service_code: string;
  send_by_email: boolean;
  send_by_whatsapp: boolean;
}

export interface NotificationService {
  id: number;
  service_code: string;
  service_name: string;
  description: string;
  active: boolean;
  created_at: string;
}

export interface DashboardMetrics {
  totalHotels: number;
  activeHotels: number;
  totalNotifications: number;
  successRate: number;
  topServices: Array<{
    name: string;
    count: number;
  }>;
  notificationsByDay: Array<{
    date: string;
    count: number;
  }>;
}