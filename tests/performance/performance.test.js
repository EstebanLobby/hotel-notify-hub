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

  describe('Data Processing Performance', () => {
    test('should process large hotel datasets efficiently', () => {
      // Generate 1000 mock hotels
      const startTime = Date.now();
      
      const manyHotels = Array.from({ length: 1000 }, (_, i) => ({
        id: i + 1,
        hotel_code: `hotel${String(i + 1).padStart(3, '0')}`,
        hotel_name: `Hotel ${i + 1}`,
        email: `hotel${i + 1}@example.com`,
        phone: `+123456789${i % 10}`,
        language: ['es', 'en', 'pt'][i % 3],
        country_id: (i % 10) + 1,
        active: i % 4 !== 0, // 75% active
        active_services: Array.from({ length: i % 5 }, (_, j) => ({
          service_id: j + 1,
          service_code: ['BOENGINE', 'WL', 'LATE_IN', 'LATE_OUT', 'BL'][j % 5]
        }))
      }));

      const endTime = Date.now();
      const generationTime = endTime - startTime;
      
      // Should generate 1000 hotels quickly
      expect(generationTime).toBeLessThan(100); // Less than 100ms
      expect(manyHotels).toHaveLength(1000);
      
      console.log(`Generated 1000 hotels in ${generationTime}ms`);
    });

    test('should filter large datasets efficiently', () => {
      // Generate test data
      const hotels = Array.from({ length: 5000 }, (_, i) => ({
        id: i + 1,
        hotel_name: `Hotel ${i + 1}`,
        language: ['es', 'en', 'pt'][i % 3],
        active: i % 4 !== 0,
        country_id: (i % 20) + 1
      }));

      const startTime = Date.now();

      // Perform multiple filtering operations
      const activeHotels = hotels.filter(h => h.active);
      const spanishHotels = hotels.filter(h => h.language === 'es');
      const searchResults = hotels.filter(h => 
        h.hotel_name.toLowerCase().includes('hotel 1')
      );

      const endTime = Date.now();
      const filterTime = endTime - startTime;

      // Should filter 5000 hotels quickly
      expect(filterTime).toBeLessThan(50); // Less than 50ms
      expect(activeHotels.length).toBeGreaterThan(0);
      expect(spanishHotels.length).toBeGreaterThan(0);
      expect(searchResults.length).toBeGreaterThan(0);

      console.log(`Filtered 5000 hotels in ${filterTime}ms`);
      console.log(`Active hotels: ${activeHotels.length}`);
      console.log(`Spanish hotels: ${spanishHotels.length}`);
      console.log(`Search results: ${searchResults.length}`);
    });

    test('should sort large datasets efficiently', () => {
      // Generate unsorted data
      const hotels = Array.from({ length: 2000 }, (_, i) => ({
        id: Math.random() * 10000,
        hotel_name: `Hotel ${Math.floor(Math.random() * 1000)}`,
        created_at: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000)
      }));

      const startTime = Date.now();

      // Sort by different criteria
      const sortedByName = [...hotels].sort((a, b) => 
        a.hotel_name.localeCompare(b.hotel_name)
      );
      const sortedByDate = [...hotels].sort((a, b) => 
        b.created_at.getTime() - a.created_at.getTime()
      );
      const sortedById = [...hotels].sort((a, b) => a.id - b.id);

      const endTime = Date.now();
      const sortTime = endTime - startTime;

      // Should sort 2000 hotels quickly
      expect(sortTime).toBeLessThan(100); // Less than 100ms
      expect(sortedByName).toHaveLength(2000);
      expect(sortedByDate).toHaveLength(2000);
      expect(sortedById).toHaveLength(2000);

      console.log(`Sorted 2000 hotels (3 ways) in ${sortTime}ms`);
    });
  });

  describe('Search Performance', () => {
    test('should search through large dataset efficiently', () => {
      // Generate search data
      const hotels = Array.from({ length: 10000 }, (_, i) => ({
        id: i + 1,
        hotel_code: `HTL${String(i + 1).padStart(4, '0')}`,
        hotel_name: `Hotel ${['Paradise', 'Ocean', 'Mountain', 'City', 'Garden'][i % 5]} ${i + 1}`,
        email: `hotel${i + 1}@example.com`,
        location: ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Bilbao'][i % 5]
      }));

      const searchQueries = [
        'Paradise',
        'Ocean',
        'hotel',
        'HTL0001',
        'Madrid',
        '@example.com'
      ];

      const startTime = Date.now();

      const searchResults = searchQueries.map(query => {
        return hotels.filter(hotel =>
          hotel.hotel_name.toLowerCase().includes(query.toLowerCase()) ||
          hotel.hotel_code.toLowerCase().includes(query.toLowerCase()) ||
          hotel.email.toLowerCase().includes(query.toLowerCase()) ||
          hotel.location.toLowerCase().includes(query.toLowerCase())
        );
      });

      const endTime = Date.now();
      const searchTime = endTime - startTime;

      // Should search 10k hotels with 6 queries quickly
      expect(searchTime).toBeLessThan(200); // Less than 200ms
      expect(searchResults).toHaveLength(6);
      
      searchResults.forEach((results, index) => {
        expect(results.length).toBeGreaterThan(0);
        console.log(`Query "${searchQueries[index]}": ${results.length} results`);
      });

      console.log(`Searched 10k hotels with 6 queries in ${searchTime}ms`);
    });

    test('should handle complex search with multiple filters', () => {
      const hotels = Array.from({ length: 3000 }, (_, i) => ({
        id: i + 1,
        hotel_name: `Hotel ${i + 1}`,
        language: ['es', 'en', 'pt'][i % 3],
        active: i % 4 !== 0,
        country_id: (i % 15) + 1,
        services_count: i % 8,
        rating: (i % 5) + 1
      }));

      const startTime = Date.now();

      // Complex multi-filter search
      const complexSearch = hotels.filter(hotel => 
        hotel.active &&
        hotel.language === 'es' &&
        hotel.services_count >= 3 &&
        hotel.rating >= 4 &&
        hotel.country_id <= 5
      );

      const endTime = Date.now();
      const complexSearchTime = endTime - startTime;

      expect(complexSearchTime).toBeLessThan(50); // Less than 50ms
      expect(complexSearch.length).toBeGreaterThan(0);

      console.log(`Complex search on 3k hotels in ${complexSearchTime}ms`);
      console.log(`Found ${complexSearch.length} hotels matching all criteria`);
    });
  });

  describe('Memory Usage Tests', () => {
    test('should handle large data structures efficiently', () => {
      const initialMemory = process.memoryUsage().heapUsed;

      // Create large data structures
      const largeDatasets = [];
      
      for (let i = 0; i < 10; i++) {
        const dataset = Array.from({ length: 1000 }, (_, j) => ({
          id: j + 1,
          data: `Data for item ${j + 1} in dataset ${i + 1}`,
          nested: {
            level1: {
              level2: {
                values: Array.from({ length: 10 }, (_, k) => k * (i + 1) * (j + 1))
              }
            }
          }
        }));
        largeDatasets.push(dataset);
      }

      const afterCreation = process.memoryUsage().heapUsed;
      
      // Process the data
      const processedData = largeDatasets.map(dataset =>
        dataset.filter(item => item.id % 2 === 0)
               .map(item => ({ ...item, processed: true }))
      );

      const afterProcessing = process.memoryUsage().heapUsed;

      // Clean up
      largeDatasets.length = 0;
      processedData.length = 0;

      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }

      const finalMemory = process.memoryUsage().heapUsed;

      const creationMemory = afterCreation - initialMemory;
      const processingMemory = afterProcessing - afterCreation;
      const memoryCleanup = afterProcessing - finalMemory;

      console.log(`Memory usage:`);
      console.log(`  Creation: ${(creationMemory / 1024 / 1024).toFixed(2)}MB`);
      console.log(`  Processing: ${(processingMemory / 1024 / 1024).toFixed(2)}MB`);
      console.log(`  Cleanup: ${(memoryCleanup / 1024 / 1024).toFixed(2)}MB`);

      // Memory usage should be reasonable
      expect(creationMemory).toBeLessThan(50 * 1024 * 1024); // Less than 50MB
    });
  });

  describe('Concurrent Operations Performance', () => {
    test('should handle multiple async operations efficiently', async () => {
      const startTime = Date.now();

      // Simulate multiple async operations
      const operations = Array.from({ length: 20 }, (_, i) => {
        return new Promise(resolve => {
          setTimeout(() => {
            // Simulate some work
            const data = Array.from({ length: 100 }, (_, j) => ({
              operation: i + 1,
              item: j + 1,
              result: Math.random()
            }));
            resolve(data);
          }, Math.random() * 10); // Random delay up to 10ms
        });
      });

      const results = await Promise.all(operations);
      
      const endTime = Date.now();
      const concurrentTime = endTime - startTime;

      expect(concurrentTime).toBeLessThan(100); // Should complete quickly due to concurrency
      expect(results).toHaveLength(20);
      
      results.forEach((result, index) => {
        expect(result).toHaveLength(100);
        expect(result[0].operation).toBe(index + 1);
      });

      console.log(`20 concurrent operations completed in ${concurrentTime}ms`);
    });
  });

  describe('Data Transformation Performance', () => {
    test('should transform large datasets efficiently', () => {
      // Generate raw data
      const rawHotels = Array.from({ length: 5000 }, (_, i) => ({
        id: i + 1,
        name: `Hotel ${i + 1}`,
        country: (i % 20) + 1,
        services: Array.from({ length: i % 6 }, (_, j) => `service_${j + 1}`),
        metadata: {
          created: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
          updated: new Date(),
          version: Math.floor(Math.random() * 10) + 1
        }
      }));

      const startTime = Date.now();

      // Transform data
      const transformedHotels = rawHotels.map(hotel => ({
        ...hotel,
        displayName: `🏨 ${hotel.name}`,
        servicesCount: hotel.services.length,
        hasServices: hotel.services.length > 0,
        ageInDays: Math.floor((Date.now() - hotel.metadata.created.getTime()) / (1000 * 60 * 60 * 24)),
        searchableText: `${hotel.name} ${hotel.services.join(' ')}`.toLowerCase()
      }));

      // Group by country
      const groupedByCountry = transformedHotels.reduce((acc, hotel) => {
        const country = hotel.country;
        if (!acc[country]) acc[country] = [];
        acc[country].push(hotel);
        return acc;
      }, {});

      // Calculate statistics
      const stats = {
        totalHotels: transformedHotels.length,
        hotelsWithServices: transformedHotels.filter(h => h.hasServices).length,
        averageServices: transformedHotels.reduce((sum, h) => sum + h.servicesCount, 0) / transformedHotels.length,
        countriesCount: Object.keys(groupedByCountry).length,
        oldestHotel: Math.max(...transformedHotels.map(h => h.ageInDays)),
        newestHotel: Math.min(...transformedHotels.map(h => h.ageInDays))
      };

      const endTime = Date.now();
      const transformTime = endTime - startTime;

      expect(transformTime).toBeLessThan(200); // Less than 200ms
      expect(transformedHotels).toHaveLength(5000);
      expect(stats.totalHotels).toBe(5000);
      expect(stats.countriesCount).toBe(20);

      console.log(`Transformed 5000 hotels in ${transformTime}ms`);
      console.log(`Stats:`, stats);
    });
  });
});
