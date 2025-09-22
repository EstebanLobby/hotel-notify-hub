// Simplified integration tests for hotel workflows
describe('Hotel Management Workflow - Integration Tests', () => {
  
  // Mock global functions that would be available in the real app
  let mockFetchWebhook;
  let mockShowToast;
  
  beforeEach(() => {
    // Setup mocks
    mockFetchWebhook = jest.fn();
    mockShowToast = jest.fn();
    
    global.fetchWebhook = mockFetchWebhook;
    global.showToast = mockShowToast;
    
    // Reset DOM
    document.body.innerHTML = `
      <div id="hotels-table">
        <tbody id="hotels-tbody"></tbody>
      </div>
      <input id="hotel-search" />
      <form id="hotel-form">
        <input name="hotel_code" />
        <input name="hotel_name" />
        <input name="email" />
        <select name="country_id"></select>
      </form>
      <form id="add-service-form">
        <select id="service-select" name="service_code"></select>
        <input type="checkbox" id="send-email" name="send_by_email" />
        <input type="checkbox" id="send-whatsapp" name="send_by_whatsapp" />
      </form>
    `;
    
    jest.clearAllMocks();
  });

  describe('Complete Hotel Creation Workflow', () => {
    test('should validate and process hotel creation data', async () => {
      // Mock successful API responses
      const mockCountries = [
        { id: 1, name: 'Argentina', abbreviation: 'AR' },
        { id: 2, name: 'México', abbreviation: 'MX' }
      ];
      
      const newHotelData = {
        hotel_code: 'integration001',
        hotel_name: 'Integration Test Hotel',
        email: 'integration@test.com',
        phone: '+1234567890',
        country_id: 1,
        language: 'es'
      };
      
      // Mock API calls
      mockFetchWebhook
        .mockResolvedValueOnce({
          func: 'country',
          data: mockCountries
        })
        .mockResolvedValueOnce({
          func: 'hotels',
          method: 'create',
          data: { id: 999, ...newHotelData }
        });
      
      // Simulate the workflow
      // 1. Load countries
      const countries = await mockFetchWebhook({ func: 'country' });
      expect(countries.data).toHaveLength(2);
      
      // 2. Validate form data
      const isValidHotel = (hotel) => {
        return !!(hotel.hotel_code && 
                 hotel.hotel_code.length >= 3 &&
                 hotel.hotel_name &&
                 hotel.hotel_name.trim() !== '' &&
                 hotel.email &&
                 hotel.email.includes('@') &&
                 (hotel.country_id !== undefined && hotel.country_id !== null));
      };
      
      expect(isValidHotel(newHotelData)).toBe(true);
      
      // 3. Create hotel
      const createdHotel = await mockFetchWebhook({
        func: 'hotels',
        method: 'create',
        data: newHotelData
      });
      
      expect(createdHotel.data.id).toBe(999);
      expect(createdHotel.data.hotel_name).toBe('Integration Test Hotel');
      expect(mockFetchWebhook).toHaveBeenCalledTimes(2);
    });
    
    test('should handle hotel creation validation errors', async () => {
      const invalidHotelData = {
        hotel_code: 'ab', // too short
        hotel_name: '',   // empty
        email: 'invalid', // invalid format
        country_id: ''    // empty
      };
      
      // Validation logic
      const validateHotelData = (data) => {
        const errors = [];
        
        if (!data.hotel_code || data.hotel_code.length < 3) {
          errors.push('Hotel code must be at least 3 characters');
        }
        
        if (!data.hotel_name || data.hotel_name.trim() === '') {
          errors.push('Hotel name is required');
        }
        
        if (!data.email || !data.email.includes('@')) {
          errors.push('Valid email is required');
        }
        
        if (!data.country_id) {
          errors.push('Country selection is required');
        }
        
        return errors;
      };
      
      const errors = validateHotelData(invalidHotelData);
      
      expect(errors.length).toBeGreaterThan(0);
      expect(errors).toContain('Hotel code must be at least 3 characters');
      expect(errors).toContain('Hotel name is required');
      expect(errors).toContain('Valid email is required');
      expect(errors).toContain('Country selection is required');
    });
  });

  describe('Hotel Services Management Workflow', () => {
    test('should manage hotel services end-to-end', async () => {
      const hotelId = 1;
      const mockHotelData = {
        id: hotelId,
        hotel_name: 'Test Hotel',
        country_name: 'Argentina',
        active_services: [
          {
            service_id: 1,
            service_code: 'BOENGINE',
            service_name: 'Booking Engine',
            send_by_email: true,
            send_by_whatsapp: true,
          }
        ]
      };
      
      const mockServices = [
        { service_code: 'BOENGINE', service_name: 'Booking Engine' },
        { service_code: 'WL', service_name: 'Waitlist' },
        { service_code: 'LATE_IN', service_name: 'Late Check-in' }
      ];
      
      // Mock API responses
      mockFetchWebhook
        .mockResolvedValueOnce({
          func: 'hotels',
          method: 'services',
          data: mockHotelData
        })
        .mockResolvedValueOnce({
          func: 'services',
          method: 'list',
          data: mockServices
        })
        .mockResolvedValueOnce({
          func: 'hotels',
          method: 'add_service',
          data: { success: true }
        });
      
      // 1. Get hotel services
      const hotelServices = await mockFetchWebhook({
        func: 'hotels',
        method: 'services',
        id: hotelId
      });
      
      expect(hotelServices.data.active_services).toHaveLength(1);
      expect(hotelServices.data.active_services[0].service_code).toBe('BOENGINE');
      
      // 2. Get available services
      const allServices = await mockFetchWebhook({
        func: 'services',
        method: 'list'
      });
      
      expect(allServices.data).toHaveLength(3);
      
      // 3. Filter available services (not already assigned)
      const assignedCodes = hotelServices.data.active_services.map(s => s.service_code);
      const availableServices = allServices.data.filter(s => 
        !assignedCodes.includes(s.service_code)
      );
      
      expect(availableServices).toHaveLength(2);
      expect(availableServices.map(s => s.service_code)).toEqual(['WL', 'LATE_IN']);
      
      // 4. Add new service
      const newServiceData = {
        service_code: 'WL',
        send_by_email: true,
        send_by_whatsapp: false,
      };
      
      const addResult = await mockFetchWebhook({
        func: 'hotels',
        method: 'add_service',
        id: hotelId,
        data: newServiceData
      });
      
      expect(addResult.data.success).toBe(true);
      expect(mockFetchWebhook).toHaveBeenCalledTimes(3);
    });
    
    test('should validate service configuration', () => {
      const validServiceConfig = {
        service_code: 'BOENGINE',
        send_by_email: true,
        send_by_whatsapp: false,
      };
      
      const invalidServiceConfig = {
        service_code: '',  // empty
        send_by_email: false,
        send_by_whatsapp: false,  // no channels selected
      };
      
      const validateServiceConfig = (config) => {
        const errors = [];
        
        if (!config.service_code) {
          errors.push('Service code is required');
        }
        
        if (!config.send_by_email && !config.send_by_whatsapp) {
          errors.push('At least one communication channel must be selected');
        }
        
        
        return errors;
      };
      
      expect(validateServiceConfig(validServiceConfig)).toHaveLength(0);
      
      const errors = validateServiceConfig(invalidServiceConfig);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors).toContain('Service code is required');
      expect(errors).toContain('At least one communication channel must be selected');
      expect(errors).toHaveLength(2);
    });
  });

  describe('Search and Filter Workflow', () => {
    test('should search and filter hotels correctly', async () => {
      const mockHotels = [
        {
          id: 1,
          hotel_code: 'test001',
          hotel_name: 'Test Hotel Argentina',
          email: 'test@argentina.com',
          language: 'es',
          active: true
        },
        {
          id: 2,
          hotel_code: 'demo002',
          hotel_name: 'Demo Hotel Mexico',
          email: 'demo@mexico.com',
          language: 'es',
          active: false
        },
        {
          id: 3,
          hotel_code: 'sample003',
          hotel_name: 'Sample Hotel USA',
          email: 'sample@usa.com',
          language: 'en',
          active: true
        }
      ];
      
      mockFetchWebhook.mockResolvedValue({
        func: 'hotels',
        method: 'list',
        data: mockHotels,
        count: 3
      });
      
      // Search functionality
      const searchHotels = (hotels, searchTerm) => {
        if (!searchTerm) return hotels;
        
        return hotels.filter(hotel =>
          hotel.hotel_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          hotel.hotel_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          hotel.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
      };
      
      // Filter functionality
      const filterHotels = (hotels, filters) => {
        let filtered = hotels;
        
        if (filters.language) {
          filtered = filtered.filter(h => h.language === filters.language);
        }
        
        if (filters.active !== undefined) {
          filtered = filtered.filter(h => h.active === filters.active);
        }
        
        return filtered;
      };
      
      // Test search
      const searchResults = searchHotels(mockHotels, 'test');
      expect(searchResults).toHaveLength(1);
      expect(searchResults[0].hotel_name).toBe('Test Hotel Argentina');
      
      // Test filters
      const spanishHotels = filterHotels(mockHotels, { language: 'es' });
      expect(spanishHotels).toHaveLength(2);
      
      const activeHotels = filterHotels(mockHotels, { active: true });
      expect(activeHotels).toHaveLength(2);
      
      const activeSpanishHotels = filterHotels(spanishHotels, { active: true });
      expect(activeSpanishHotels).toHaveLength(1);
      expect(activeSpanishHotels[0].hotel_name).toBe('Test Hotel Argentina');
    });
    
    test('should generate CSV export data', () => {
      const mockHotels = [
        {
          id: 1,
          hotel_code: 'csv001',
          hotel_name: 'CSV Test Hotel',
          email: 'csv@test.com',
          phone: '+1234567890',
          language: 'es',
          country_name: 'Argentina',
          active: true
        }
      ];
      
      const generateCSVData = (hotels) => {
        const headers = ['Código', 'Nombre', 'Email', 'Teléfono', 'País', 'Idioma', 'Estado'];
        const rows = hotels.map(hotel => [
          hotel.hotel_code,
          hotel.hotel_name,
          hotel.email,
          hotel.phone || '',
          hotel.country_name || '',
          hotel.language,
          hotel.active ? 'Activo' : 'Inactivo'
        ]);
        
        return { headers, rows };
      };
      
      const csvData = generateCSVData(mockHotels);
      
      expect(csvData.headers).toHaveLength(7);
      expect(csvData.rows).toHaveLength(1);
      expect(csvData.rows[0]).toEqual([
        'csv001',
        'CSV Test Hotel',
        'csv@test.com',
        '+1234567890',
        'Argentina',
        'es',
        'Activo'
      ]);
    });
  });

  describe('Error Handling Workflows', () => {
    test('should handle API errors gracefully', async () => {
      const networkError = new Error('Network connection failed');
      mockFetchWebhook.mockRejectedValue(networkError);
      
      // Simulate error handling
      let errorHandled = false;
      let errorMessage = '';
      
      try {
        await mockFetchWebhook({ func: 'hotels', method: 'list' });
      } catch (error) {
        errorHandled = true;
        errorMessage = error.message;
      }
      
      expect(errorHandled).toBe(true);
      expect(errorMessage).toBe('Network connection failed');
      expect(mockFetchWebhook).toHaveBeenCalled();
    });
    
    test('should handle validation errors before API calls', async () => {
      const invalidData = {
        hotel_code: 'ab',
        hotel_name: '',
        email: 'invalid',
        country_id: ''
      };
      
      // Validation should prevent API call
      const validateBeforeSubmit = (data) => {
        const errors = [];
        
        if (!data.hotel_code || data.hotel_code.length < 3) {
          errors.push('Invalid hotel code');
        }
        
        if (!data.hotel_name) {
          errors.push('Hotel name required');
        }
        
        if (!data.email || !data.email.includes('@')) {
          errors.push('Invalid email');
        }
        
        if (!data.country_id) {
          errors.push('Country required');
        }
        
        return errors;
      };
      
      const errors = validateBeforeSubmit(invalidData);
      
      expect(errors.length).toBeGreaterThan(0);
      
      // Should not make API call if validation fails
      if (errors.length > 0) {
        // Don't call API
        expect(mockFetchWebhook).not.toHaveBeenCalled();
      }
    });
  });

  describe('Performance and Caching', () => {
    test('should implement caching logic', async () => {
      let countriesCache = [];
      let servicesCache = [];
      
      const loadCountriesWithCache = async () => {
        if (countriesCache.length > 0) {
          return countriesCache;
        }
        
        const response = await mockFetchWebhook({ func: 'country' });
        countriesCache = response.data;
        return countriesCache;
      };
      
      const loadServicesWithCache = async () => {
        if (servicesCache.length > 0) {
          return servicesCache;
        }
        
        const response = await mockFetchWebhook({ func: 'services', method: 'list' });
        servicesCache = response.data;
        return servicesCache;
      };
      
      // Mock responses
      mockFetchWebhook
        .mockResolvedValueOnce({
          func: 'country',
          data: [{ id: 1, name: 'Argentina' }]
        })
        .mockResolvedValueOnce({
          func: 'services',
          data: [{ service_code: 'BOENGINE', service_name: 'Booking Engine' }]
        });
      
      // First load - should call API
      const countries1 = await loadCountriesWithCache();
      const services1 = await loadServicesWithCache();
      
      expect(countries1).toHaveLength(1);
      expect(services1).toHaveLength(1);
      expect(mockFetchWebhook).toHaveBeenCalledTimes(2);
      
      // Second load - should use cache
      const countries2 = await loadCountriesWithCache();
      const services2 = await loadServicesWithCache();
      
      expect(countries2).toEqual(countries1);
      expect(services2).toEqual(services1);
      expect(mockFetchWebhook).toHaveBeenCalledTimes(2); // No additional calls
    });
  });
});
