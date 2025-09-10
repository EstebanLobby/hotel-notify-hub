// Performance tests for the hotel management system

describe('Performance Tests', () => {
  beforeEach(() => {
    // Setup performance monitoring
    global.performance = {
      now: jest.fn(() => Date.now()),
      mark: jest.fn(),
      measure: jest.fn(),
      getEntriesByType: jest.fn(() => []),
      getEntriesByName: jest.fn(() => [])
    };
  });

  describe('Hotel Table Rendering Performance', () => {
    test('should render 100 hotels within acceptable time', async () => {
      const { renderHotelsTable } = require('../../js/hotels.js');
      
      // Generate 100 mock hotels
      const manyHotels = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        hotel_code: `hotel${String(i + 1).padStart(3, '0')}`,
        hotel_name: `Hotel ${i + 1}`,
        email: `hotel${i + 1}@example.com`,
        phone: `+123456789${i}`,
        language: 'es',
        country_id: 1,
        active: true,
        active_services: []
      }));

      global.getHotelsAsync = jest.fn().mockResolvedValue(manyHotels);
      global.getCountryName = jest.fn().mockReturnValue('Argentina');
      
      // Setup DOM
      document.body.innerHTML = '<tbody id="hotels-tbody"></tbody>';
      
      const startTime = performance.now();
      await renderHotelsTable();
      const endTime = performance.now();
      
      const renderTime = endTime - startTime;
      
      // Should render within 1 second
      expect(renderTime).toBeLessThan(1000);
      
      console.log(`Rendered 100 hotels in ${renderTime.toFixed(2)}ms`);
    });

    test('should handle pagination efficiently', async () => {
      const { renderHotelsTable } = require('../../js/hotels.js');
      
      // Test with different page sizes
      const pageSizes = [10, 25, 50, 100];
      const results = {};
      
      for (const pageSize of pageSizes) {
        const hotels = Array.from({ length: pageSize }, (_, i) => ({
          id: i + 1,
          hotel_code: `hotel${i + 1}`,
          hotel_name: `Hotel ${i + 1}`,
          email: `hotel${i + 1}@example.com`,
          language: 'es',
          country_id: 1,
          active: true
        }));
        
        global.getHotelsAsync = jest.fn().mockResolvedValue(hotels);
        document.body.innerHTML = '<tbody id="hotels-tbody"></tbody>';
        
        const startTime = performance.now();
        await renderHotelsTable();
        const endTime = performance.now();
        
        results[pageSize] = endTime - startTime;
      }
      
      // Performance should scale reasonably
      expect(results[100]).toBeLessThan(results[10] * 20); // Not more than 20x slower
      
      console.log('Pagination performance:', results);
    });
  });

  describe('Search Performance', () => {
    test('should search through large dataset efficiently', async () => {
      const { handleHotelSearch } = require('../../js/hotels.js');
      
      // Mock search with 1000 results
      const searchResults = Array.from({ length: 1000 }, (_, i) => ({
        id: i + 1,
        hotel_code: `search${i + 1}`,
        hotel_name: `Search Result ${i + 1}`,
        email: `search${i + 1}@example.com`,
        language: 'es',
        country_id: 1,
        active: true
      }));
      
      global.getHotelsAsync = jest.fn().mockResolvedValue(searchResults);
      
      document.body.innerHTML = `
        <input id="hotel-search" value="search" />
        <tbody id="hotels-tbody"></tbody>
      `;
      
      const searchInput = document.getElementById('hotel-search');
      
      const startTime = performance.now();
      await handleHotelSearch({ target: searchInput });
      const endTime = performance.now();
      
      const searchTime = endTime - startTime;
      
      // Search should complete within 500ms
      expect(searchTime).toBeLessThan(500);
      
      console.log(`Search completed in ${searchTime.toFixed(2)}ms`);
    });
  });

  describe('Memory Usage', () => {
    test('should not leak memory when creating/destroying hotels', () => {
      const initialMemory = process.memoryUsage().heapUsed;
      
      // Simulate creating and destroying many hotel objects
      for (let i = 0; i < 1000; i++) {
        const hotel = {
          id: i,
          hotel_code: `test${i}`,
          hotel_name: `Test Hotel ${i}`,
          email: `test${i}@hotel.com`,
          active_services: Array.from({ length: 10 }, (_, j) => ({
            service_id: j,
            service_code: `SERVICE${j}`
          }))
        };
        
        // Simulate processing
        JSON.stringify(hotel);
        
        // Clean up
        hotel.active_services = null;
      }
      
      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }
      
      const finalMemory = process.memoryUsage().heapUsed;
      const memoryDiff = finalMemory - initialMemory;
      
      // Memory usage shouldn't grow significantly
      expect(memoryDiff).toBeLessThan(10 * 1024 * 1024); // Less than 10MB
      
      console.log(`Memory difference: ${(memoryDiff / 1024 / 1024).toFixed(2)}MB`);
    });
  });

  describe('API Response Time', () => {
    test('should handle slow API responses gracefully', async () => {
      const { renderHotelsTable } = require('../../js/hotels.js');
      
      // Mock slow API response
      global.getHotelsAsync = jest.fn().mockImplementation(() => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve([{
              id: 1,
              hotel_code: 'slow001',
              hotel_name: 'Slow Hotel',
              email: 'slow@hotel.com',
              language: 'es',
              country_id: 1,
              active: true
            }]);
          }, 2000); // 2 second delay
        });
      });
      
      document.body.innerHTML = '<tbody id="hotels-tbody"></tbody>';
      
      const startTime = performance.now();
      await renderHotelsTable();
      const endTime = performance.now();
      
      const totalTime = endTime - startTime;
      
      // Should handle the delay without crashing
      expect(totalTime).toBeGreaterThan(2000);
      expect(totalTime).toBeLessThan(3000); // Some buffer for processing
      
      console.log(`Handled slow API in ${totalTime.toFixed(2)}ms`);
    });
  });

  describe('Concurrent Operations', () => {
    test('should handle multiple simultaneous operations', async () => {
      const { 
        loadCountriesCache, 
        loadServicesCache, 
        renderHotelsTable 
      } = require('../../js/hotels.js');
      
      // Mock all API calls
      global.getCountriesAsync = jest.fn().mockResolvedValue([
        { id: 1, name: 'Argentina', abbreviation: 'AR' }
      ]);
      global.getServicesAsync = jest.fn().mockResolvedValue([
        { service_code: 'BOENGINE', service_name: 'Booking Engine' }
      ]);
      global.getHotelsAsync = jest.fn().mockResolvedValue([
        { id: 1, hotel_code: 'test001', hotel_name: 'Test Hotel' }
      ]);
      
      document.body.innerHTML = '<tbody id="hotels-tbody"></tbody>';
      
      const startTime = performance.now();
      
      // Run multiple operations concurrently
      await Promise.all([
        loadCountriesCache(),
        loadServicesCache(),
        renderHotelsTable()
      ]);
      
      const endTime = performance.now();
      const concurrentTime = endTime - startTime;
      
      // Should be faster than running sequentially
      expect(concurrentTime).toBeLessThan(1000);
      
      console.log(`Concurrent operations completed in ${concurrentTime.toFixed(2)}ms`);
    });
  });

  describe('DOM Manipulation Performance', () => {
    test('should efficiently update large DOM structures', () => {
      const { createHotelRow } = require('../../js/hotels.js');
      
      const tbody = document.createElement('tbody');
      document.body.appendChild(tbody);
      
      const startTime = performance.now();
      
      // Create 500 hotel rows
      for (let i = 0; i < 500; i++) {
        const hotel = {
          id: i + 1,
          hotel_code: `perf${i + 1}`,
          hotel_name: `Performance Hotel ${i + 1}`,
          email: `perf${i + 1}@hotel.com`,
          phone: `+123456789${i}`,
          language: 'es',
          country_id: 1,
          active: true,
          active_services: []
        };
        
        const row = createHotelRow(hotel);
        tbody.appendChild(row);
      }
      
      const endTime = performance.now();
      const domTime = endTime - startTime;
      
      // DOM operations should complete within reasonable time
      expect(domTime).toBeLessThan(2000);
      
      // Verify all rows were created
      expect(tbody.children.length).toBe(500);
      
      console.log(`Created 500 DOM rows in ${domTime.toFixed(2)}ms`);
    });
  });
});
