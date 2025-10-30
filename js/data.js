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
      // Mantener valores booleanos como booleanos, convertir otros a string
      if (typeof value === 'boolean') {
        url.searchParams.set(key, value);
      } else {
        url.searchParams.set(key, String(value));
      }
    }
  });
  console.log('URL construida:', url.toString());
  return url.toString();
}

async function fetchWebhook(params) {
  const url = buildWebhookUrl(params);
  console.log('fetchWebhook - Parámetros:', params);
  console.log('fetchWebhook - URL generada:', url);
  
  const response = await fetch(url, { method: 'GET' });
  console.log('fetchWebhook - Response status:', response.status, response.statusText);
  
  if (!response.ok) {
    throw new Error(`Webhook HTTP ${response.status}`);
  }
  let payload = await response.json();
  console.log('fetchWebhook - Payload recibido:', payload);
  
  // Para países, extraer el array de datos
  if (params.func === 'country') {
    if (payload && payload.data && Array.isArray(payload.data)) {
      console.log('Extrayendo países de la estructura data:', payload.data.length);
      return payload.data;
    }
    if (Array.isArray(payload) && payload.length > 0 && payload[0].data) {
      console.log('Extrayendo países de array con data:', payload[0].data.length);
      return payload[0].data;
    }
    return payload;
  }
  
  // Para otros endpoints, normalizar caso donde el backend responde un array con un único objeto
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

  console.log('getHotelsAsync llamada con:', options);
  console.log('testinggggggg');
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
    active: hotelData.active,
    country_id: hotelData.country_id
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
    active: hotelData.active,
    country_id: hotelData.country_id
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

async function addHotelServiceAsync(hotelId, serviceCode, serviceData = {}) {
  console.log('Agregando servicio al hotel:', hotelId, 'servicio:', serviceCode, 'datos:', serviceData);
  
  // Obtener el hotel_code desde el cache de hoteles
  const hotel = hotelsCache.find(h => h.id === hotelId);
  if (!hotel) {
    throw new Error(`Hotel con ID ${hotelId} no encontrado`);
  }
  
  const webhookData = { 
    func: 'hotels', 
    method: 'add_service',
    hotel_code: hotel.hotel_code,
    service_code: serviceCode,
    send_by_email: serviceData.email || false,
    send_by_whatsapp: serviceData.whatsapp || false,
  };

  // Agregar statusIN, URL, configuración de campos y plantillas para el servicio SELF_IN
  if (serviceCode === 'SELF_IN') {
    if (serviceData.hasOwnProperty('status_in')) {
      webhookData.status_in = serviceData.status_in;
      console.log('Agregando statusIN para SELF_IN:', serviceData.status_in);
    }
    if (serviceData.hasOwnProperty('self_in_url')) {
      webhookData.self_in_url = serviceData.self_in_url;
      console.log('Agregando URL para SELF_IN:', serviceData.self_in_url);
    }
    
    // Agregar configuración de campos del formulario
    if (serviceData.hasOwnProperty('fields_config')) {
      webhookData.field_country_required = serviceData.fields_config.country_required;
      webhookData.field_state_required = serviceData.fields_config.state_required;
      webhookData.field_city_required = serviceData.fields_config.city_required;
      webhookData.field_comments_required = serviceData.fields_config.comments_required;
      webhookData.field_guest_documents_required = serviceData.fields_config.guest_documents_required;
      webhookData.field_companion_documents_required = serviceData.fields_config.companion_documents_required;
      webhookData.field_license_plate_required = serviceData.fields_config.license_plate_required;
      console.log('Agregando configuración de campos para SELF_IN:', serviceData.fields_config);
    }
    
    if (serviceData.hasOwnProperty('message_templates')) {
      // Enviar cada plantilla como parámetro separado para facilitar el manejo en el backend
      Object.keys(serviceData.message_templates).forEach(langCode => {
        if (serviceData.message_templates[langCode]) {
          webhookData[`template_${langCode}`] = serviceData.message_templates[langCode];
        }
      });
      console.log('Agregando plantillas para SELF_IN:', serviceData.message_templates);
    }
  }

  const res = await fetchWebhook(webhookData);
  console.log('Respuesta de addHotelServiceAsync:', res);
  
  // Verificar si la operación fue exitosa
  if (res && (res.ok === true || res.success === true)) {
    return res;
  }
  
  return null;
}

async function removeHotelServiceAsync(hotelId, serviceId) {
  console.log('Quitando servicio del hotel:', hotelId, 'service_id:', serviceId);
  
  // Obtener el hotel_code desde el cache de hoteles
  const hotel = hotelsCache.find(h => h.id === hotelId);
  if (!hotel) {
    throw new Error(`Hotel con ID ${hotelId} no encontrado`);
  }
  
  const res = await fetchWebhook({ 
    func: 'hotels', 
    method: 'remove_service',
    hotel_code: hotel.hotel_code,
    service_id: serviceId
  });
  console.log('Respuesta de removeHotelServiceAsync:', res);
  
  // Verificar si la operación fue exitosa
  if (res && (res.ok === true || res.success === true)) {
    return res;
  }
  
  return null;
}

async function updateHotelServiceAsync(hotelId, serviceId, serviceData = {}) {
  console.log('Actualizando servicio del hotel:', hotelId, 'service_id:', serviceId, 'datos:', serviceData);
  
  // Obtener el hotel_code desde el cache de hoteles
  const hotel = hotelsCache.find(h => h.id === hotelId);
  if (!hotel) {
    throw new Error(`Hotel con ID ${hotelId} no encontrado`);
  }
  
  const webhookData = { 
    func: 'hotels', 
    method: 'update_service',
    hotel_code: hotel.hotel_code,
    service_id: serviceId,
    send_by_email: serviceData.email || false,
    send_by_whatsapp: serviceData.whatsapp || false,
  };

  // Agregar statusIN, URL, configuración de campos y plantillas para el servicio SELF_IN si están presentes
  if (serviceData.hasOwnProperty('status_in')) {
    webhookData.status_in = serviceData.status_in;
    console.log('Actualizando statusIN para SELF_IN:', serviceData.status_in);
  }
  if (serviceData.hasOwnProperty('self_in_url')) {
    webhookData.self_in_url = serviceData.self_in_url;
    console.log('Actualizando URL para SELF_IN:', serviceData.self_in_url);
  }
  
  // Agregar configuración de campos del formulario si están presentes
  if (serviceData.hasOwnProperty('fields_config')) {
    webhookData.field_country_required = serviceData.fields_config.country_required;
    webhookData.field_state_required = serviceData.fields_config.state_required;
    webhookData.field_city_required = serviceData.fields_config.city_required;
    webhookData.field_comments_required = serviceData.fields_config.comments_required;
    webhookData.field_guest_documents_required = serviceData.fields_config.guest_documents_required;
    webhookData.field_companion_documents_required = serviceData.fields_config.companion_documents_required;
    webhookData.field_license_plate_required = serviceData.fields_config.license_plate_required;
    console.log('Actualizando configuración de campos para SELF_IN:', serviceData.fields_config);
  }
  
  if (serviceData.hasOwnProperty('message_templates')) {
    // Enviar cada plantilla como parámetro separado para facilitar el manejo en el backend
    Object.keys(serviceData.message_templates).forEach(langCode => {
      if (serviceData.message_templates[langCode]) {
        webhookData[`template_${langCode}`] = serviceData.message_templates[langCode];
      }
    });
    console.log('Actualizando plantillas para SELF_IN:', serviceData.message_templates);
  }

  const res = await fetchWebhook(webhookData);
  console.log('Respuesta de updateHotelServiceAsync:', res);
  
  // Verificar si la operación fue exitosa
  if (res && (res.ok === true || res.success === true)) {
    return res;
  }
  
  return null;
}

// Make hotel service management functions globally available
window.addHotelServiceAsync = addHotelServiceAsync;
window.removeHotelServiceAsync = removeHotelServiceAsync;
window.updateHotelServiceAsync = updateHotelServiceAsync;

// =============================================
// Countries operations with webhook and cache
// =============================================

// Cache en memoria para countries
let countriesMemoryCache = null;
const COUNTRIES_CACHE_KEY = 'countriesCache';
const COUNTRIES_CACHE_TIMESTAMP_KEY = 'countriesCacheTimestamp';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 horas en millisegundos

/**
 * Obtiene países desde caché (memoria o localStorage) o desde API
 * @returns {Promise<Array>} Array de países
 */
async function getCountriesAsync() {
  try {
    // 1. Verificar caché en memoria primero
    if (countriesMemoryCache) {
      console.log('Países obtenidos desde caché en memoria:', countriesMemoryCache.length);
      return countriesMemoryCache;
    }
    
    // 2. Verificar caché en localStorage
    const cachedData = localStorage.getItem(COUNTRIES_CACHE_KEY);
    const cacheTimestamp = localStorage.getItem(COUNTRIES_CACHE_TIMESTAMP_KEY);
    
    if (cachedData && cacheTimestamp) {
      const now = Date.now();
      const cacheAge = now - parseInt(cacheTimestamp);
      
      if (cacheAge < CACHE_DURATION) {
        const countries = JSON.parse(cachedData);
        countriesMemoryCache = countries; // Guardar en memoria también
        console.log('Países obtenidos desde localStorage:', countries.length);
        return countries;
      } else {
        console.log('Caché de países expirado, obteniendo datos frescos...');
      }
    }
    
    // 3. Obtener desde API si no hay caché válido
    console.log('Obteniendo países desde API...');
    const countries = await fetchWebhook({ 
      func: 'country', 
      method: 'list'
    });
    
    if (countries && Array.isArray(countries)) {
      console.log('Países obtenidos desde API:', countries.length);
      
      // Guardar en ambos cachés
      countriesMemoryCache = countries;
      localStorage.setItem(COUNTRIES_CACHE_KEY, JSON.stringify(countries));
      localStorage.setItem(COUNTRIES_CACHE_TIMESTAMP_KEY, Date.now().toString());
      
      // Actualizar cache manager si existe
      if (window.cacheManager) {
        setTimeout(() => window.cacheManager.updateVersionIndicator(), 100);
      }
      
      return countries;
    } else {
      console.error('Respuesta inválida de países:', countries);
      return [];
    }
  } catch (error) {
    console.error('Error en getCountriesAsync:', error);
    
    // En caso de error, intentar usar caché expirado como fallback
    const cachedData = localStorage.getItem(COUNTRIES_CACHE_KEY);
    if (cachedData) {
      console.log('Usando caché expirado como fallback');
      const countries = JSON.parse(cachedData);
      countriesMemoryCache = countries;
      return countries;
    }
    
    throw error;
  }
}

/**
 * Limpia el caché de países (útil para debugging o actualizaciones forzadas)
 */
function clearCountriesCache() {
  countriesMemoryCache = null;
  localStorage.removeItem(COUNTRIES_CACHE_KEY);
  localStorage.removeItem(COUNTRIES_CACHE_TIMESTAMP_KEY);
  console.log('Caché de países limpiado');
}

/**
 * Fuerza la actualización del caché de países
 */
async function refreshCountriesCache() {
  clearCountriesCache();
  return await getCountriesAsync();
}

// Make countries functions globally available
window.getCountriesAsync = getCountriesAsync;
window.clearCountriesCache = clearCountriesCache;
window.refreshCountriesCache = refreshCountriesCache;

// =============================================
// Message Templates operations with webhook
// =============================================

async function getMessageTemplatesAsync(serviceId = 6) {
  try {
    const templates = await fetchWebhook({ 
      func: 'message_templates', 
      method: 'list',
      service_id: serviceId
    });
    
    if (templates && Array.isArray(templates)) {
      console.log('Plantillas obtenidas:', templates.length);
      
      // Convertir array de plantillas a objeto por idioma
      const templatesObj = {};
      templates.forEach(template => {
        if (template.language_code && template.template_content) {
          templatesObj[template.language_code] = template.template_content;
        }
      });
      
      return templatesObj;
    } else {
      console.error('Respuesta inválida de plantillas:', templates);
      return {};
    }
  } catch (error) {
    console.error('Error en getMessageTemplatesAsync:', error);
    return {};
  }
}

async function saveMessageTemplateAsync(serviceId, languageCode, templateContent) {
  try {
    const requestData = {
      func: 'services',
      method: 'save_template',
      service_id: serviceId,
      language_code: languageCode,
      template_text: templateContent
    };
    
    console.log('saveMessageTemplateAsync - Enviando request:', requestData);
    
    const result = await fetchWebhook(requestData);
    
    console.log('saveMessageTemplateAsync - Respuesta recibida:', result);
    return result;
  } catch (error) {
    console.error('saveMessageTemplateAsync - Error:', error);
    throw error;
  }
}

async function deleteMessageTemplateAsync(serviceId, languageCode) {
  try {
    const requestData = {
      func: 'services',
      method: 'delete_template',
      service_id: serviceId,
      language_code: languageCode
    };
    
    console.log('deleteMessageTemplateAsync - Enviando request:', requestData);
    
    const result = await fetchWebhook(requestData);
    
    console.log('deleteMessageTemplateAsync - Respuesta recibida:', result);
    return result;
  } catch (error) {
    console.error('deleteMessageTemplateAsync - Error:', error);
    throw error;
  }
}

// Función para obtener plantilla basada en el país del hotel
async function getTemplateByHotelCountryAsync(hotelId, serviceId = 6) {
  try {
    const result = await fetchWebhook({
      func: 'message_templates',
      method: 'get_by_hotel',
      hotel_id: hotelId,
      service_id: serviceId
    });
    
    if (result && result.template_content) {
      return result.template_content;
    }
    
    // Fallback: obtener plantilla en español por defecto
    const templates = await getMessageTemplatesAsync(serviceId);
    return templates.es || templates.en || Object.values(templates)[0] || '';
  } catch (error) {
    console.error('Error obteniendo plantilla por país:', error);
    return '';
  }
}

/**
 * Obtiene las plantillas por defecto desde la API
 * @param {number} serviceId - ID del servicio (por defecto 6 para SELF_IN)
 * @returns {Promise<Object>} Objeto con plantillas por defecto organizadas por idioma
 */
async function getTemplateDefaultsAsync(serviceId = 6) {
  try {
    const response = await fetchWebhook({ 
      func: 'services', 
      method: 'list_template',
      service_id: serviceId
    });
    
    console.log('Respuesta completa de plantillas:', response);
    
    // Manejar la estructura de respuesta real de la API
    if (response && response.success && response.data) {
      const template = response.data;
      
      // Si es un solo template (no array)
      if (template.language_code && template.template_text) {
        console.log('Plantilla por defecto obtenida:', template.language_code);
        
        const defaultsObj = {};
        const languageInfo = await getLanguageInfo(template.language_code);
        const languageName = template.language_name || languageInfo.name;
        const languageFlag = languageInfo.flag;
        
        defaultsObj[template.language_code] = {
          content: template.template_text,
          name: languageName,
          flag: languageFlag,
          updated_at: template.updated_at || null,
          id: template.id || null
        };
        
        console.log('Template procesado:', {
          language_code: template.language_code,
          language_name: template.language_name,
          final_name: languageName,
          flag: languageFlag
        });
        
        return defaultsObj;
      }
      
      // Si es un array de templates
      if (Array.isArray(template)) {
        console.log('Plantillas por defecto obtenidas:', template.length);
        
        const defaultsObj = {};
        for (const tmpl of template) {
          if (tmpl.language_code && tmpl.template_text) {
            const languageInfo = await getLanguageInfo(tmpl.language_code);
            const languageName = tmpl.language_name || languageInfo.name;
            const languageFlag = languageInfo.flag;
            
            defaultsObj[tmpl.language_code] = {
              content: tmpl.template_text,
              name: languageName,
              flag: languageFlag,
              updated_at: tmpl.updated_at || null,
              id: tmpl.id || null
            };
          }
        }
        
        return defaultsObj;
      }
    }
    
    console.warn('No se encontraron plantillas por defecto o estructura inesperada:', response);
    return {};
    
  } catch (error) {
    console.error('Error en getTemplateDefaultsAsync:', error);
    return {};
  }
}

/**
 * Convierte código de país a emoji de bandera
 * @param {string} countryCode - Código del país (AR, BR, US, etc.)
 * @returns {string} Emoji de la bandera
 */
function countryCodeToFlag(countryCode) {
  if (!countryCode || countryCode.length !== 2) return '🌐';
  
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt());
  
  return String.fromCodePoint(...codePoints);
}

/**
 * Obtiene información del idioma (bandera y nombre) usando datos del API
 * @param {string} langCode - Código del idioma (es, en, pt, etc.)
 * @returns {Promise<{flag: string, name: string}>} Objeto con bandera y nombre
 */
async function getLanguageInfo(langCode) {
  try {
    const countries = await getCountriesAsync();
    
    // Buscar países que tengan este idioma, excluyendo GB para inglés
    let country = countries.find(c => c.language === langCode);
    
    // Para inglés, evitar Reino Unido (GB) y preferir US
    if (langCode === 'en') {
      const usCountry = countries.find(c => c.language === 'en' && c.abbreviation === 'US');
      if (usCountry) {
        country = usCountry;
      } else {
        // Si no hay US, buscar cualquier país de inglés que no sea GB
        const nonGBCountry = countries.find(c => c.language === 'en' && c.abbreviation !== 'GB');
        if (nonGBCountry) {
          country = nonGBCountry;
        }
      }
    }
    
    let flag = '🌐';
    let name = langCode.toUpperCase();
    
    if (country) {
      // Obtener bandera desde abbreviation
      if (country.abbreviation) {
        flag = countryCodeToFlag(country.abbreviation);
      }
      
      // Obtener nombre desde language_name o fallback
      if (country.language_name) {
        name = country.language_name;
      }
    }
    
    // Fallbacks si no se encuentra en el API
    if (flag === '🌐') {
      const fallbackFlags = {
        'es': '🇪🇸',
        'en': '🇺🇸', 
        'pt': '🇧🇷',
        'fr': '🇫🇷',
        'it': '🇮🇹',
        'de': '🇩🇪',
        'he': '🇮🇱',
        'ar': '🇸🇦',
        'ja': '🇯🇵',
        'zh': '🇨🇳',
        'ru': '🇷🇺'
      };
      flag = fallbackFlags[langCode] || '🌐';
    }
    
    if (name === langCode.toUpperCase()) {
      const languageNames = {
        'es': 'Español',
        'en': 'English', 
        'pt': 'Português',
        'fr': 'Français',
        'it': 'Italiano',
        'de': 'Deutsch',
        'he': 'עברית',
        'ar': 'العربية',
        'ja': '日本語',
        'zh': '中文',
        'ru': 'Русский'
      };
      name = languageNames[langCode] || langCode.toUpperCase();
    }
    
    return { flag, name };
  } catch (error) {
    console.error('Error obteniendo información del idioma:', error);
    return { flag: '🌐', name: langCode.toUpperCase() };
  }
}

/**
 * Obtiene la bandera del idioma basado en el código usando datos del API
 * @param {string} langCode - Código del idioma (es, en, pt, etc.)
 * @returns {Promise<string>} Emoji de la bandera
 */
async function getLanguageFlag(langCode) {
  const info = await getLanguageInfo(langCode);
  return info.flag;
}

/**
 * Obtiene el nombre completo del idioma basado en el código usando datos del API
 * @param {string} langCode - Código del idioma (es, en, pt, etc.)
 * @returns {Promise<string>} Nombre completo del idioma
 */
async function getLanguageNameFromCode(langCode) {
  const info = await getLanguageInfo(langCode);
  return info.name;
}

// Make template functions globally available
window.getMessageTemplatesAsync = getMessageTemplatesAsync;
window.saveMessageTemplateAsync = saveMessageTemplateAsync;
window.deleteMessageTemplateAsync = deleteMessageTemplateAsync;
window.getLanguageFlag = getLanguageFlag;
window.getLanguageNameFromCode = getLanguageNameFromCode;
window.getLanguageInfo = getLanguageInfo;
window.countryCodeToFlag = countryCodeToFlag;
window.getTemplateByHotelCountryAsync = getTemplateByHotelCountryAsync;
window.getTemplateDefaultsAsync = getTemplateDefaultsAsync;