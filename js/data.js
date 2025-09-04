// Mock Data for Hotel Dashboard

const mockHotels = [
  {
    id: 1,
    hotel_code: "lago",
    hotel_name: "Portal del Lago",
    email: "hotel@portaldelago.com",
    phone: "+34 987 654 321",
    language: "es",
    active: true,
    created_at: "2025-08-22T18:42:21.186Z",
    updated_at: "2025-08-22T18:42:21.186Z",
    active_services: [
      { service_id: 1, service_code: "BOENGINE", send_by_email: true, send_by_whatsapp: true },
      { service_id: 2, service_code: "CHECKOUT", send_by_email: true, send_by_whatsapp: false }
    ]
  },
  {
    id: 2,
    hotel_code: "hagrid54",
    hotel_name: "Hagrids Alquileres Turísticos",
    email: "hagridsvla@gmail.com",
    phone: null,
    language: "es",
    active: true,
    created_at: "2025-08-20T15:30:00.000Z",
    updated_at: "2025-08-20T15:30:00.000Z",
    active_services: [
      { service_id: 1, service_code: "BOENGINE", send_by_email: true, send_by_whatsapp: true }
    ]
  },
  {
    id: 3,
    hotel_code: "oceanview",
    hotel_name: "Ocean View Resort",
    email: "info@oceanview.com",
    phone: "+34 912 345 678",
    language: "en",
    active: true,
    created_at: "2025-08-18T10:15:00.000Z",
    updated_at: "2025-08-18T10:15:00.000Z",
    active_services: [
      { service_id: 2, service_code: "CHECKOUT", send_by_email: true, send_by_whatsapp: true },
      { service_id: 3, service_code: "MAINTENANCE", send_by_email: true, send_by_whatsapp: false }
    ]
  },
  {
    id: 4,
    hotel_code: "coastal",
    hotel_name: "Coastal Paradise Hotel",
    email: "reservas@coastal.com",
    phone: "+34 956 789 012",
    language: "en",
    active: false,
    created_at: "2025-08-15T09:20:00.000Z",
    updated_at: "2025-08-15T09:20:00.000Z",
    active_services: []
  },
  {
    id: 5,
    hotel_code: "mountain",
    hotel_name: "Mountain Lodge",
    email: "contact@mountain.com",
    phone: "+34 987 456 123",
    language: "pt",
    active: true,
    created_at: "2025-08-10T14:45:00.000Z",
    updated_at: "2025-08-10T14:45:00.000Z",
    active_services: [
      { service_id: 1, service_code: "BOENGINE", send_by_email: true, send_by_whatsapp: false }
    ]
  }
];

const mockServices = [
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
    service_name: "Check-out Automático",
    description: "Notificaciones de check-out automático y facturación",
    active: true,
    created_at: "2025-08-22T18:50:00.000Z"
  },
  {
    id: 3,
    service_code: "MAINTENANCE",
    service_name: "Mantenimiento Habitaciones",
    description: "Alertas de mantenimiento y limpieza de habitaciones",
    active: true,
    created_at: "2025-08-22T18:51:00.000Z"
  },
  {
    id: 4,
    service_code: "PAYMENT",
    service_name: "Pagos Pendientes",
    description: "Notificaciones de pagos pendientes y recordatorios",
    active: false,
    created_at: "2025-08-22T18:52:00.000Z"
  }
];

const mockNotifications = [
  { date: "2025-01-01", count: 45 },
  { date: "2025-01-02", count: 52 },
  { date: "2025-01-03", count: 38 },
  { date: "2025-01-04", count: 61 },
  { date: "2025-01-05", count: 47 },
  { date: "2025-01-06", count: 55 },
  { date: "2025-01-07", count: 43 }
];

const mockServiceUsage = [
  { service: "BOENGINE", count: 156, percentage: 45 },
  { service: "CHECKOUT", count: 98, percentage: 28 },
  { service: "MAINTENANCE", count: 67, percentage: 19 },
  { service: "PAYMENT", count: 28, percentage: 8 }
];

// Data access functions
function getHotels() {
  return mockHotels;
}

function getServices() {
  return mockServices;
}

function getNotifications() {
  return mockNotifications;
}

function getServiceUsage() {
  return mockServiceUsage;
}

function getDashboardMetrics() {
  const activeHotels = mockHotels.filter(h => h.active).length;
  const totalNotifications = mockNotifications.reduce((sum, n) => sum + n.count, 0);
  const successRate = 94.5; // Mock success rate
  const activeServices = mockServices.filter(s => s.active).length;
  
  return {
    activeHotels,
    totalNotifications,
    successRate,
    activeServices
  };
}

function searchHotels(query) {
  if (!query) return mockHotels;
  
  const searchTerm = query.toLowerCase();
  return mockHotels.filter(hotel =>
    hotel.hotel_name.toLowerCase().includes(searchTerm) ||
    hotel.hotel_code.toLowerCase().includes(searchTerm) ||
    hotel.email.toLowerCase().includes(searchTerm)
  );
}

function addHotel(hotelData) {
  const newHotel = {
    ...hotelData,
    id: Math.max(...mockHotels.map(h => h.id)) + 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    active_services: []
  };
  
  mockHotels.push(newHotel);
  return newHotel;
}

function updateHotel(id, hotelData) {
  const index = mockHotels.findIndex(h => h.id === id);
  if (index !== -1) {
    mockHotels[index] = {
      ...mockHotels[index],
      ...hotelData,
      updated_at: new Date().toISOString()
    };
    return mockHotels[index];
  }
  return null;
}

function deleteHotel(id) {
  const index = mockHotels.findIndex(h => h.id === id);
  if (index !== -1) {
    return mockHotels.splice(index, 1)[0];
  }
  return null;
}

// =============================================
// Webhook integration (GET with func/method)
// =============================================

const WEBHOOK_BASE_URL = 'https://automate.golobby.ai/webhook/8486e672-cf9e-4fd6-8eea-09f48babbf1a';

function buildWebhookUrl(params) {
  const url = new URL(WEBHOOK_BASE_URL);
  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value));
    }
  });
  console.log('URL construida:', url.toString());
  return url.toString();
}

async function fetchWebhook(params) {
  const url = buildWebhookUrl(params);
  console.log('Llamando webhook:', url);
  const response = await fetch(url, { method: 'GET' });
  if (!response.ok) {
    throw new Error(`Webhook HTTP ${response.status}`);
  }
  let payload = await response.json();
  console.log('Respuesta del webhook:', payload);
  // Normalizar caso donde el backend responde un array con un único objeto
  if (Array.isArray(payload)) {
    payload = payload[0] || {};
  }
  if (payload && payload.ok === false) {
    const message = payload.error || 'Error en webhook';
    throw new Error(message);
  }
  return payload;
}

// Asynchronous getters (no rompen las funciones síncronas existentes)

async function getHotelsAsync(options = {}) {
  const { limit = 100, offset = 0, q = '' } = options;
  console.log('getHotelsAsync llamada con:', options);
  const res = await fetchWebhook({ func: 'hotels', method: 'list', limit, offset, q });
  console.log('Respuesta de getHotelsAsync:', res);
  // La respuesta tiene estructura: { ok: true, data: { items: [...], total: number } }
  const data = res?.data?.items || [];
  console.log('Datos extraídos:', data);
  return Array.isArray(data) ? data : [];
}

async function getHotelDetailAsync(id) {
  const res = await fetchWebhook({ func: 'hotels', method: 'detail', id });
  return res?.data || null;
}

async function getServicesAsync() {
  const res = await fetchWebhook({ func: 'services', method: 'list' });
  const data = res?.data || [];
  return Array.isArray(data) ? data : [];
}

async function getServiceUsageAsync({ from, to }) {
  const res = await fetchWebhook({ func: 'reports', method: 'serviceUsage', from, to });
  const data = res?.data || [];
  return Array.isArray(data) ? data : [];
}

async function getDashboardMetricsAsync() {
  // Intenta obtener datos remotos mínimos para construir métricas
  try {
    const [hotels, services] = await Promise.all([
      getHotelsAsync({ limit: 100, offset: 0 }),
      getServicesAsync()
    ]);
    const activeHotels = hotels.filter(h => h.active).length;
    const activeServices = services.filter(s => s.active).length;
    // Si tu webhook ofrece notificaciones, cámbialo a remoto
    const totalNotifications = mockNotifications.reduce((sum, n) => sum + n.count, 0);
    const successRate = 94.5;
    return { activeHotels, totalNotifications, successRate, activeServices };
  } catch (e) {
    // Fallback a mocks si falla el remoto
    return getDashboardMetrics();
  }
}

// =============================================
// Hotel CRUD operations with webhook
// =============================================

async function createHotelAsync(hotelData) {
  console.log('Creando hotel:', hotelData);
  const res = await fetchWebhook({ 
    func: 'hotels', 
    method: 'create',
    hotel_code: hotelData.hotel_code,
    hotel_name: hotelData.hotel_name,
    email: hotelData.email,
    phone: hotelData.phone || '',
    language: hotelData.language,
    active: hotelData.active
  });
  console.log('Respuesta de createHotelAsync:', res);
  return res?.data || null;
}

async function updateHotelAsync(id, hotelData) {
  console.log('Actualizando hotel:', id, hotelData);
  const res = await fetchWebhook({ 
    func: 'hotels', 
    method: 'update',
    id: id,
    hotel_code: hotelData.hotel_code,
    hotel_name: hotelData.hotel_name,
    email: hotelData.email,
    phone: hotelData.phone || '',
    language: hotelData.language,
    active: hotelData.active
  });
  console.log('Respuesta de updateHotelAsync:', res);
  return res?.data || null;
}

async function deleteHotelAsync(id) {
  console.log('Eliminando hotel:', id);
  const res = await fetchWebhook({ 
    func: 'hotels', 
    method: 'delete',
    id: id
  });
  console.log('Respuesta de deleteHotelAsync:', res);
  return res?.data || null;
}

// Make functions globally available
window.createHotelAsync = createHotelAsync;
window.updateHotelAsync = updateHotelAsync;
window.deleteHotelAsync = deleteHotelAsync;
window.getHotelsAsync = getHotelsAsync;

// =============================================
// Hotel Services operations with webhook
// =============================================

async function getHotelServicesAsync(hotelId) {
  console.log('Obteniendo servicios del hotel:', hotelId);
  const res = await fetchWebhook({ 
    func: 'hotels', 
    method: 'services',
    id: hotelId
  });
  console.log('Respuesta de getHotelServicesAsync:', res);
  return res?.data?.active_services || [];
}

// Make hotel services function globally available
window.getHotelServicesAsync = getHotelServicesAsync;

// =============================================
// Hotel Service Management operations with webhook
// =============================================

async function addHotelServiceAsync(hotelId, serviceCode, channels = {}) {
  console.log('Agregando servicio al hotel:', hotelId, 'servicio:', serviceCode, 'canales:', channels);
  const res = await fetchWebhook({ 
    func: 'hotels', 
    method: 'add_service',
    id: hotelId,
    service_code: serviceCode,
    send_by_email: channels.email || false,
    send_by_whatsapp: channels.whatsapp || false
  });
  console.log('Respuesta de addHotelServiceAsync:', res);
  return res?.data || null;
}

async function removeHotelServiceAsync(hotelId, serviceId) {
  console.log('Quitando servicio del hotel:', hotelId, 'service_id:', serviceId);
  const res = await fetchWebhook({ 
    func: 'hotels', 
    method: 'remove_service',
    id: hotelId,
    service_id: serviceId
  });
  console.log('Respuesta de removeHotelServiceAsync:', res);
  return res?.data || null;
}

async function updateHotelServiceAsync(hotelId, serviceId, channels = {}) {
  console.log('Actualizando servicio del hotel:', hotelId, 'service_id:', serviceId, 'canales:', channels);
  const res = await fetchWebhook({ 
    func: 'hotels', 
    method: 'update_service',
    id: hotelId,
    service_id: serviceId,
    send_by_email: channels.email || false,
    send_by_whatsapp: channels.whatsapp || false
  });
  console.log('Respuesta de updateHotelServiceAsync:', res);
  return res?.data || null;
}

// Make hotel service management functions globally available
window.addHotelServiceAsync = addHotelServiceAsync;
window.removeHotelServiceAsync = removeHotelServiceAsync;
window.updateHotelServiceAsync = updateHotelServiceAsync;