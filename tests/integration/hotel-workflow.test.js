// Integration tests for complete hotel workflows

// Mock the entire hotel workflow
describe('Hotel Management Workflow Integration Tests', () => {
  let mockServer;
  
  beforeAll(async () => {
    // Setup mock server responses
    global.fetchWebhook = jest.fn();
    
    // Mock successful responses
    const mockResponses = {
      hotels: {
        func: 'hotels',
        method: 'list',
        data: [
          {
            id: 1,
            hotel_code: 'test001',
            hotel_name: 'Test Hotel',
            email: 'test@hotel.com',
            phone: '+1234567890',
            language: 'es',
            country_id: 1,
            active: true,
            active_services: []
          }
        ],
        count: 1
      },
      countries: {
        func: 'country',
        data: [
          { id: 1, name: 'Argentina', abbreviation: 'AR' },
          { id: 2, name: 'México', abbreviation: 'MX' }
        ],
        count: 2
      },
      services: {
        func: 'services',
        method: 'list',
        data: [
          { service_code: 'BOENGINE', service_name: 'Booking Engine' },
          { service_code: 'WL', service_name: 'Waitlist' }
        ]
      }
    };
    
    fetchWebhook.mockImplementation(async (params) => {
      if (params.func === 'hotels' && params.method === 'list') {
        return mockResponses.hotels;
      }
      if (params.func === 'country') {
        return mockResponses.countries;
      }
      if (params.func === 'services') {
        return mockResponses.services;
      }
      if (params.func === 'hotels' && params.method === 'create') {
        return {
          func: 'hotels',
          method: 'create',
          data: { id: 2, ...params.data }
        };
      }
      if (params.func === 'hotels' && params.method === 'services') {
        return {
          func: 'hotels',
          method: 'services',
          data: {
            id: params.id,
            hotel_name: 'Test Hotel',
            country_name: 'Argentina',
            active_services: []
          }
        };
      }
      return { error: 'Not found' };
    });
  });

  beforeEach(() => {
    // Reset DOM for each test
    document.body.innerHTML = `
      <div class="dashboard">
        <table id="hotels-table">
          <tbody id="hotels-tbody"></tbody>
        </table>
        
        <!-- Hotel Form Modal -->
        <div id="hotel-modal" class="modal">
          <form id="hotel-form">
            <input name="hotel_code" id="hotel-code" />
            <input name="hotel_name" id="hotel-name" />
            <input name="email" id="hotel-email" />
            <input name="phone" id="hotel-phone" />
            <select name="country_id" id="hotel-country"></select>
            <select name="language" id="hotel-language"></select>
            <button type="submit">Guardar</button>
          </form>
        </div>
        
        <!-- Services Modal -->
        <div id="hotel-services-modal" class="modal">
          <div id="hotel-services-content"></div>
          <button id="add-service-btn">Agregar Servicio</button>
        </div>
        
        <!-- Add Service Modal -->
        <div id="add-service-modal" class="modal">
          <form id="add-service-form">
            <select id="service-select" name="service_code"></select>
            <input type="checkbox" id="send-email" name="send_by_email" />
            <input type="checkbox" id="send-whatsapp" name="send_by_whatsapp" />
            <input type="number" id="send-frequency" name="send_frequency_days" />
            <button type="submit">Agregar Servicio</button>
          </form>
        </div>
        
        <!-- Search and filters -->
        <input id="hotel-search" placeholder="Buscar hoteles..." />
        <button id="hotel-search-btn">Buscar</button>
        <button id="add-hotel-btn">Nuevo Hotel</button>
        <button id="export-csv">Exportar CSV</button>
      </div>
    `;
    
    jest.clearAllMocks();
  });

  describe('Complete Hotel Creation Workflow', () => {
    test('should create a new hotel end-to-end', async () => {
      // Load the hotel management module
      const { 
        initializeHotels, 
        openAddHotelModal, 
        handleHotelSubmit,
        loadCountriesSelect 
      } = require('../../js/hotels.js');
      
      // 1. Initialize the hotels module
      await initializeHotels();
      
      // 2. Open add hotel modal
      await openAddHotelModal();
      
      // 3. Verify countries are loaded
      expect(fetchWebhook).toHaveBeenCalledWith(
        expect.objectContaining({ func: 'country' })
      );
      
      // 4. Fill form data
      const form = document.getElementById('hotel-form');
      form.querySelector('#hotel-code').value = 'newhotel001';
      form.querySelector('#hotel-name').value = 'New Test Hotel';
      form.querySelector('#hotel-email').value = 'new@testhotel.com';
      form.querySelector('#hotel-phone').value = '+1234567890';
      form.querySelector('#hotel-country').value = '1';
      form.querySelector('#hotel-language').value = 'es';
      
      // 5. Submit form
      const mockEvent = { preventDefault: jest.fn() };
      await handleHotelSubmit(mockEvent);
      
      // 6. Verify hotel was created
      expect(fetchWebhook).toHaveBeenCalledWith(
        expect.objectContaining({
          func: 'hotels',
          method: 'create',
          data: expect.objectContaining({
            hotel_code: 'newhotel001',
            hotel_name: 'New Test Hotel',
            email: 'new@testhotel.com'
          })
        })
      );
    });
  });

  describe('Hotel Services Management Workflow', () => {
    test('should add a service to a hotel end-to-end', async () => {
      const { 
        viewHotelServices,
        openAddServiceModal,
        handleAddServiceSubmit
      } = require('../../js/hotels.js');
      
      // 1. View hotel services
      await viewHotelServices(1);
      
      // 2. Verify hotel services were loaded
      expect(fetchWebhook).toHaveBeenCalledWith(
        expect.objectContaining({
          func: 'hotels',
          method: 'services',
          id: 1
        })
      );
      
      // 3. Open add service modal
      await openAddServiceModal(1);
      
      // 4. Verify services are loaded
      expect(fetchWebhook).toHaveBeenCalledWith(
        expect.objectContaining({ func: 'services' })
      );
      
      // 5. Fill service form
      const serviceForm = document.getElementById('add-service-form');
      serviceForm.querySelector('#service-select').value = 'BOENGINE';
      serviceForm.querySelector('#send-email').checked = true;
      serviceForm.querySelector('#send-whatsapp').checked = true;
      serviceForm.querySelector('#send-frequency').value = '0';
      
      // 6. Submit service form
      const mockEvent = { preventDefault: jest.fn() };
      await handleAddServiceSubmit(mockEvent);
      
      // 7. Verify service was added
      expect(fetchWebhook).toHaveBeenCalledWith(
        expect.objectContaining({
          func: 'hotels',
          method: 'add_service',
          id: 1,
          data: expect.objectContaining({
            service_code: 'BOENGINE',
            send_by_email: true,
            send_by_whatsapp: true,
            send_frequency_days: 0
          })
        })
      );
    });

    test('should edit an existing service', async () => {
      const { editHotelService } = require('../../js/hotels.js');
      
      // Mock hotel with existing service
      fetchWebhook.mockResolvedValueOnce({
        func: 'hotels',
        method: 'services',
        data: {
          id: 1,
          hotel_name: 'Test Hotel',
          active_services: [
            {
              service_id: 1,
              service_code: 'BOENGINE',
              service_name: 'Booking Engine',
              send_by_email: true,
              send_by_whatsapp: false,
              send_frequency_days: 1
            }
          ]
        }
      });
      
      // 1. Edit service
      await editHotelService(1, 1, 'BOENGINE');
      
      // 2. Verify form is populated correctly
      const serviceSelect = document.getElementById('service-select');
      const emailCheck = document.getElementById('send-email');
      const whatsappCheck = document.getElementById('send-whatsapp');
      const frequencyInput = document.getElementById('send-frequency');
      
      expect(serviceSelect.value).toBe('BOENGINE');
      expect(emailCheck.checked).toBe(true);
      expect(whatsappCheck.checked).toBe(false);
      expect(frequencyInput.value).toBe('1');
    });
  });

  describe('Search and Filter Workflow', () => {
    test('should search hotels correctly', async () => {
      const { handleHotelSearch } = require('../../js/hotels.js');
      
      const searchInput = document.getElementById('hotel-search');
      searchInput.value = 'Test Hotel';
      
      await handleHotelSearch({ target: searchInput });
      
      expect(fetchWebhook).toHaveBeenCalledWith(
        expect.objectContaining({
          func: 'hotels',
          method: 'list',
          search: 'Test Hotel'
        })
      );
    });

    test('should export hotels to CSV', async () => {
      const { exportHotelsToCSV } = require('../../js/hotels.js');
      
      // Mock URL.createObjectURL
      global.URL.createObjectURL = jest.fn(() => 'blob:mock-url');
      global.URL.revokeObjectURL = jest.fn();
      
      // Mock link click
      const mockLink = {
        href: '',
        download: '',
        click: jest.fn(),
        remove: jest.fn()
      };
      document.createElement = jest.fn(() => mockLink);
      document.body.appendChild = jest.fn();
      
      await exportHotelsToCSV();
      
      expect(mockLink.click).toHaveBeenCalled();
      expect(mockLink.download).toContain('.csv');
    });
  });

  describe('Error Handling Workflows', () => {
    test('should handle network errors gracefully', async () => {
      const { renderHotelsTable } = require('../../js/hotels.js');
      
      // Mock network error
      fetchWebhook.mockRejectedValueOnce(new Error('Network error'));
      
      global.showToast = jest.fn();
      
      await renderHotelsTable();
      
      expect(showToast).toHaveBeenCalledWith(
        expect.stringContaining('Error'),
        'error'
      );
    });

    test('should validate form data before submission', async () => {
      const { handleHotelSubmit } = require('../../js/hotels.js');
      
      // Fill form with invalid data
      const form = document.getElementById('hotel-form');
      form.querySelector('#hotel-code').value = 'ab'; // too short
      form.querySelector('#hotel-email').value = 'invalid-email';
      
      global.showToast = jest.fn();
      
      const mockEvent = { preventDefault: jest.fn() };
      await handleHotelSubmit(mockEvent);
      
      expect(showToast).toHaveBeenCalledWith(
        expect.stringContaining('inválido'),
        'error'
      );
      
      // Should not call API with invalid data
      expect(fetchWebhook).not.toHaveBeenCalledWith(
        expect.objectContaining({ method: 'create' })
      );
    });
  });

  describe('Performance and Caching', () => {
    test('should cache countries and services', async () => {
      const { 
        loadCountriesCache, 
        loadServicesCache 
      } = require('../../js/hotels.js');
      
      // First load
      await loadCountriesCache();
      await loadServicesCache();
      
      const firstCallCount = fetchWebhook.mock.calls.length;
      
      // Second load should use cache
      await loadCountriesCache();
      await loadServicesCache();
      
      // Should not make additional API calls
      expect(fetchWebhook.mock.calls.length).toBe(firstCallCount);
    });
  });
});
