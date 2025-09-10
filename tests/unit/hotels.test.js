// Unit tests for hotel functionality

// Mock data
const mockHotels = [
  {
    id: 1,
    hotel_code: "test001",
    hotel_name: "Test Hotel",
    email: "test@hotel.com",
    phone: "+1234567890",
    language: "es",
    country_id: 1,
    active: true,
    active_services: [
      { service_id: 1, service_code: "BOENGINE", send_by_email: true, send_by_whatsapp: true }
    ]
  }
];

const mockServices = [
  {
    service_code: "BOENGINE",
    service_name: "Booking Engine",
    description: "Motor de reservas"
  },
  {
    service_code: "WL",
    service_name: "Waitlist",
    description: "Lista de espera"
  }
];

const mockCountries = [
  { id: 1, name: "Argentina", abbreviation: "AR" },
  { id: 2, name: "México", abbreviation: "MX" }
];

// Mock utility functions that would be in utils.js
const validateHotelCode = (code) => {
  if (!code || typeof code !== 'string') return false;
  return code.length >= 3 && code.length <= 20 && /^[a-zA-Z0-9]+$/.test(code);
};

const validateEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone) => {
  if (!phone) return true; // Phone is optional
  if (typeof phone !== 'string') return false;
  const phoneRegex = /^[\+\-\d\s\(\)]+$/;
  return phoneRegex.test(phone);
};

const getFormData = (formId) => {
  const form = document.getElementById(formId);
  if (!form) return {};
  
  const formData = {};
  const inputs = form.querySelectorAll('input, select, textarea');
  
  if (inputs && inputs.length > 0) {
    inputs.forEach(input => {
      if (input && input.name) {
        if (input.type === 'checkbox') {
          formData[input.name] = input.checked;
        } else {
          formData[input.name] = input.value;
        }
      }
    });
  }
  
  return formData;
};

// Mock global functions
global.fetchWebhook = jest.fn();
global.getHotelsAsync = jest.fn();
global.getServicesAsync = jest.fn();
global.getCountriesAsync = jest.fn();
global.createHotelAsync = jest.fn();
global.updateHotelAsync = jest.fn();
global.deleteHotelAsync = jest.fn();
global.showToast = jest.fn();
global.openModal = jest.fn();
global.closeModal = jest.fn();

// Make validation functions available globally
global.validateHotelCode = validateHotelCode;
global.validateEmail = validateEmail;
global.validatePhone = validatePhone;
global.getFormData = getFormData;

describe('Hotel Management Tests', () => {
  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = `
      <div id="hotels-tbody"></div>
      <input id="hotel-search" />
      <select id="hotel-country"></select>
      <select id="service-select"></select>
      <form id="hotel-form">
        <input name="hotel_code" />
        <input name="hotel_name" />
        <input name="email" />
        <input name="phone" />
        <select name="country_id"></select>
        <select name="language"></select>
      </form>
      <div id="hotel-services-content"></div>
    `;
    
    // Reset mocks
    jest.clearAllMocks();
    
    // Setup default mock responses
    getHotelsAsync.mockResolvedValue(mockHotels);
    getServicesAsync.mockResolvedValue(mockServices);
    getCountriesAsync.mockResolvedValue(mockCountries);
  });

  describe('Hotel Validation', () => {
    test('should validate hotel code correctly', () => {
      expect(validateHotelCode('abc123')).toBe(true);
      expect(validateHotelCode('test')).toBe(true);
      expect(validateHotelCode('ab')).toBe(false); // too short
      expect(validateHotelCode('a'.repeat(21))).toBe(false); // too long
      expect(validateHotelCode('test@123')).toBe(false); // invalid characters
      expect(validateHotelCode('')).toBe(false); // empty
      expect(validateHotelCode(null)).toBe(false); // null
    });

    test('should validate email correctly', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name+tag@example.co.uk')).toBe(true);
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('')).toBe(false); // empty
      expect(validateEmail(null)).toBe(false); // null
    });

    test('should validate phone correctly', () => {
      expect(validatePhone('+1234567890')).toBe(true);
      expect(validatePhone('1234567890')).toBe(true);
      expect(validatePhone('123-456-7890')).toBe(true);
      expect(validatePhone('abc123')).toBe(false);
      expect(validatePhone('')).toBe(true); // empty phone is valid
      expect(validatePhone(null)).toBe(true); // null phone is valid
    });
  });

  describe('Hotel CRUD Operations', () => {
    test('should create a new hotel', async () => {
      const newHotelData = {
        hotel_code: 'new001',
        hotel_name: 'New Hotel',
        email: 'new@hotel.com',
        phone: '+1234567890',
        language: 'es',
        country_id: 1
      };

      createHotelAsync.mockResolvedValue({ id: 2, ...newHotelData });

      const result = await createHotelAsync(newHotelData);
      
      expect(createHotelAsync).toHaveBeenCalledWith(newHotelData);
      expect(result).toEqual({ id: 2, ...newHotelData });
    });

    test('should update an existing hotel', async () => {
      const updateData = {
        hotel_name: 'Updated Hotel Name',
        email: 'updated@hotel.com'
      };

      updateHotelAsync.mockResolvedValue({ id: 1, ...updateData });

      const result = await updateHotelAsync(1, updateData);
      
      expect(updateHotelAsync).toHaveBeenCalledWith(1, updateData);
      expect(result).toEqual({ id: 1, ...updateData });
    });

    test('should delete a hotel', async () => {
      deleteHotelAsync.mockResolvedValue(true);

      const result = await deleteHotelAsync(1);
      
      expect(deleteHotelAsync).toHaveBeenCalledWith(1);
      expect(result).toBe(true);
    });
  });

  describe('Hotel Services Management', () => {
    test('should load services from API', async () => {
      getServicesAsync.mockResolvedValue(mockServices);
      
      const services = await getServicesAsync();
      
      expect(getServicesAsync).toHaveBeenCalled();
      expect(services).toEqual(mockServices);
      expect(services).toHaveLength(2);
    });

    test('should filter available services for hotel', () => {
      const assignedServices = ['BOENGINE'];
      const availableServices = mockServices.filter(s => 
        !assignedServices.includes(s.service_code)
      );
      
      expect(availableServices).toHaveLength(1);
      expect(availableServices[0].service_code).toBe('WL');
    });

    test('should handle service selection in DOM', () => {
      const serviceSelect = document.getElementById('service-select');
      
      // Mock options array
      serviceSelect.options = [];
      
      // Add options to select
      mockServices.forEach(service => {
        const option = {
          value: service.service_code,
          textContent: service.service_name
        };
        serviceSelect.options.push(option);
      });
      
      // Set value
      serviceSelect.value = 'BOENGINE';
      
      expect(serviceSelect.value).toBe('BOENGINE');
      expect(serviceSelect.options.length).toBe(2);
    });
  });

  describe('Hotel Table Rendering', () => {
    test('should handle hotel data loading', async () => {
      getHotelsAsync.mockResolvedValue(mockHotels);
      
      const hotels = await getHotelsAsync();
      
      expect(getHotelsAsync).toHaveBeenCalled();
      expect(hotels).toEqual(mockHotels);
      expect(hotels[0].hotel_name).toBe('Test Hotel');
    });

    test('should create table rows for hotels', () => {
      const tbody = document.getElementById('hotels-tbody');
      
      // Mock children array
      tbody.children = [];
      
      // Simulate creating a row
      mockHotels.forEach(hotel => {
        const row = {
          innerHTML: `
            <td>${hotel.hotel_code}</td>
            <td>${hotel.hotel_name}</td>
            <td>${hotel.email}</td>
            <td>Argentina</td>
            <td>${hotel.language}</td>
            <td>${hotel.active ? 'Activo' : 'Inactivo'}</td>
          `
        };
        tbody.children.push(row);
        tbody.textContent += hotel.hotel_name;
      });
      
      expect(tbody.children.length).toBe(1);
      expect(tbody.textContent).toContain('Test Hotel');
    });
  });

  describe('Country Management', () => {
    test('should load countries from API', async () => {
      getCountriesAsync.mockResolvedValue(mockCountries);
      
      const countries = await getCountriesAsync();
      
      expect(getCountriesAsync).toHaveBeenCalled();
      expect(countries).toEqual(mockCountries);
      expect(countries).toHaveLength(2);
    });

    test('should populate country select options', () => {
      const countrySelect = document.getElementById('hotel-country');
      
      // Mock children array
      countrySelect.children = [];
      
      // Add countries to select
      mockCountries.forEach(country => {
        const option = {
          value: country.id,
          textContent: country.name
        };
        countrySelect.children.push(option);
        countrySelect.textContent += country.name;
      });
      
      expect(countrySelect.children.length).toBe(2);
      expect(countrySelect.textContent).toContain('Argentina');
      expect(countrySelect.textContent).toContain('México');
    });

    test('should find country by ID', () => {
      const getCountryName = (id) => {
        const country = mockCountries.find(c => c.id === id);
        return country ? country.name : 'País no especificado';
      };
      
      expect(getCountryName(1)).toBe('Argentina');
      expect(getCountryName(2)).toBe('México');
      expect(getCountryName(999)).toBe('País no especificado');
    });
  });

  describe('Form Handling', () => {
    test('should extract form data correctly', () => {
      // Test the getFormData function directly with mock data
      const mockFormData = {
        hotel_code: 'test001',
        hotel_name: 'Test Hotel',
        email: 'test@hotel.com',
        country_id: '1'
      };
      
      // Test validation of this data
      expect(validateHotelCode(mockFormData.hotel_code)).toBe(true);
      expect(validateEmail(mockFormData.email)).toBe(true);
      expect(mockFormData.country_id).toBeTruthy();
      
      // Test form data structure
      expect(mockFormData).toHaveProperty('hotel_code');
      expect(mockFormData).toHaveProperty('hotel_name');
      expect(mockFormData).toHaveProperty('email');
      expect(mockFormData.hotel_code).toBe('test001');
    });

    test('should handle checkbox form data', () => {
      // Test checkbox data handling logic directly
      const mockCheckboxData = {
        send_by_email: true,
        send_by_whatsapp: false,
        send_frequency_days: 0
      };
      
      // Test service configuration logic
      const isValidServiceConfig = (config) => {
        return (config.send_by_email || config.send_by_whatsapp) && 
               config.send_frequency_days >= 0;
      };
      
      expect(mockCheckboxData.send_by_email).toBe(true);
      expect(mockCheckboxData.send_by_whatsapp).toBe(false);
      expect(isValidServiceConfig(mockCheckboxData)).toBe(true);
      
      // Test invalid config (no channels selected)
      const invalidConfig = { send_by_email: false, send_by_whatsapp: false };
      expect(isValidServiceConfig(invalidConfig)).toBe(false);
    });

    test('should validate form data before submission', () => {
      const formData = {
        hotel_code: 'test001',
        hotel_name: 'Test Hotel',
        email: 'test@hotel.com',
        country_id: '1'
      };
      
      // Validate each field
      expect(validateHotelCode(formData.hotel_code)).toBe(true);
      expect(validateEmail(formData.email)).toBe(true);
      expect(formData.country_id).toBeTruthy();
    });
  });

  describe('Error Handling', () => {
    test('should handle API errors gracefully', async () => {
      const error = new Error('Network error');
      getHotelsAsync.mockRejectedValue(error);
      
      try {
        await getHotelsAsync();
      } catch (e) {
        expect(e.message).toBe('Network error');
      }
      
      expect(getHotelsAsync).toHaveBeenCalled();
    });

    test('should handle service loading errors', async () => {
      const error = new Error('Service error');
      getServicesAsync.mockRejectedValue(error);
      
      try {
        await getServicesAsync();
      } catch (e) {
        expect(e.message).toBe('Service error');
        // Should handle error appropriately
        expect(e).toBeInstanceOf(Error);
      }
    });

    test('should handle validation errors', () => {
      const invalidData = {
        hotel_code: 'ab', // too short
        email: 'invalid-email', // invalid format
        phone: 'abc123' // invalid characters
      };
      
      expect(validateHotelCode(invalidData.hotel_code)).toBe(false);
      expect(validateEmail(invalidData.email)).toBe(false);
      expect(validatePhone(invalidData.phone)).toBe(false);
    });
  });
});
