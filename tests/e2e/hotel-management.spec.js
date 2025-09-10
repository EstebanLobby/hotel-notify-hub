// End-to-end tests using Playwright
const { test, expect } = require('@playwright/test');

test.describe('Hotel Management System E2E Tests', () => {
  // Helper function to login
  async function loginToApp(page) {
    // Navigate to the application
    await page.goto('http://localhost:8080');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Check if we're on the login page
    const passwordInput = page.locator('input[type="password"], #password-input, input[placeholder*="ontraseña"]');
    const loginButton = page.locator('button:has-text("Iniciar Sesión"), .login-button, button.login-button');
    
    // If login elements are visible, perform login
    if (await passwordInput.isVisible({ timeout: 2000 }).catch(() => false)) {
      console.log('Login required, performing authentication...');
      
      // Fill password
      await passwordInput.fill('admin12345');
      
      // Click login button
      await loginButton.click();
      
      // Wait for navigation to dashboard
      await page.waitForLoadState('networkidle');
      
      // Wait for dashboard elements to be visible
      await page.waitForSelector('#hotels-table, .dashboard', { timeout: 10000 });
      
      console.log('Login successful, dashboard loaded');
    } else {
      console.log('Already authenticated or no login required');
    }
  }

  test('should perform login successfully', async ({ page }) => {
    // Navigate without login helper to test login flow
    await page.goto('http://localhost:8080');
    await page.waitForLoadState('networkidle');
    
    // If we see login form, test the login process
    const passwordInput = page.locator('input[type="password"], #password-input, input[placeholder*="ontraseña"]');
    
    if (await passwordInput.isVisible({ timeout: 2000 }).catch(() => false)) {
      // Fill password
      await passwordInput.fill('admin12345');
      
      // Click login button (be more specific)
      const loginButton = page.locator('button:has-text("Iniciar Sesión"), .login-button, button.login-button');
      await loginButton.first().click();
      
      // Wait for dashboard to load
      await page.waitForLoadState('networkidle');
      
      // Verify we're now in the dashboard
      await expect(page.locator('#hotels-table, .dashboard')).toBeVisible({ timeout: 10000 });
    }
    
    // Check if the page title is correct
    await expect(page).toHaveTitle(/Hotel Notify Hub/);
  });

  // For all other tests, login automatically
  test.describe('Dashboard Tests (with auto-login)', () => {
    test.beforeEach(async ({ page }) => {
      await loginToApp(page);
    });

    test('should load the dashboard successfully after login', async ({ page }) => {
      // Check if main elements are present (login should already be done in beforeEach)
      await expect(page.locator('#hotels-table')).toBeVisible();
      await expect(page.locator('#add-hotel-btn')).toBeVisible();
      await expect(page.locator('#hotel-search')).toBeVisible();
    });

  test('should create a new hotel', async ({ page }) => {
    // Mock API responses
    await page.route('**/webhook/**', async route => {
      const url = route.request().url();
      
      if (url.includes('func=country')) {
        await route.fulfill({
          json: {
            func: 'country',
            data: [
              { id: 1, name: 'Argentina', abbreviation: 'AR' },
              { id: 2, name: 'México', abbreviation: 'MX' }
            ]
          }
        });
      } else if (url.includes('func=hotels') && url.includes('method=create')) {
        await route.fulfill({
          json: {
            func: 'hotels',
            method: 'create',
            data: {
              id: 999,
              hotel_code: 'e2etest001',
              hotel_name: 'E2E Test Hotel',
              email: 'e2e@testhotel.com'
            }
          }
        });
      } else if (url.includes('func=hotels') && url.includes('method=list')) {
        await route.fulfill({
          json: {
            func: 'hotels',
            method: 'list',
            data: [],
            count: 0
          }
        });
      } else {
        await route.continue();
      }
    });

    // Click "Nuevo Hotel" button
    await page.click('#add-hotel-btn');
    
    // Wait for modal to appear
    await expect(page.locator('#hotel-modal')).toBeVisible();
    
    // Fill the form
    await page.fill('#hotel-code', 'e2etest001');
    await page.fill('#hotel-name', 'E2E Test Hotel');
    await page.fill('#hotel-email', 'e2e@testhotel.com');
    await page.fill('#hotel-phone', '+1234567890');
    
    // Wait for countries to load and select one
    await page.waitForSelector('#hotel-country option[value="1"]');
    await page.selectOption('#hotel-country', '1');
    await page.selectOption('#hotel-language', 'es');
    
    // Submit the form
    await page.click('#hotel-form button[type="submit"]');
    
    // Wait for success toast
    await expect(page.locator('.toast.success')).toBeVisible();
    
    // Verify modal closes
    await expect(page.locator('#hotel-modal')).not.toBeVisible();
  });

  test('should search for hotels', async ({ page }) => {
    // Mock search API response
    await page.route('**/webhook/**', async route => {
      const url = route.request().url();
      
      if (url.includes('search=test')) {
        await route.fulfill({
          json: {
            func: 'hotels',
            method: 'list',
            data: [
              {
                id: 1,
                hotel_code: 'test001',
                hotel_name: 'Test Hotel',
                email: 'test@hotel.com',
                country_name: 'Argentina',
                active: true
              }
            ],
            count: 1
          }
        });
      } else {
        await route.continue();
      }
    });

    // Enter search term
    await page.fill('#hotel-search', 'test');
    
    // Press Enter to search
    await page.press('#hotel-search', 'Enter');
    
    // Wait for results
    await page.waitForSelector('#hotels-tbody tr');
    
    // Verify search results
    await expect(page.locator('#hotels-tbody tr')).toHaveCount(1);
    await expect(page.locator('#hotels-tbody')).toContainText('Test Hotel');
  });

  test('should manage hotel services', async ({ page }) => {
    // Mock API responses for services
    await page.route('**/webhook/**', async route => {
      const url = route.request().url();
      
      if (url.includes('method=services') && url.includes('id=1')) {
        await route.fulfill({
          json: {
            func: 'hotels',
            method: 'services',
            data: {
              id: 1,
              hotel_name: 'Test Hotel',
              country_name: 'Argentina',
              active_services: [
                {
                  service_id: 1,
                  service_code: 'BOENGINE',
                  service_name: 'Booking Engine',
                  send_by_email: true,
                  send_by_whatsapp: true,
                  send_frequency_days: 0
                }
              ]
            }
          }
        });
      } else if (url.includes('func=services') && url.includes('method=list')) {
        await route.fulfill({
          json: {
            func: 'services',
            method: 'list',
            data: [
              { service_code: 'BOENGINE', service_name: 'Booking Engine' },
              { service_code: 'WL', service_name: 'Waitlist' }
            ]
          }
        });
      } else if (url.includes('func=hotels') && url.includes('method=list')) {
        await route.fulfill({
          json: {
            func: 'hotels',
            method: 'list',
            data: [
              {
                id: 1,
                hotel_code: 'test001',
                hotel_name: 'Test Hotel',
                email: 'test@hotel.com',
                country_name: 'Argentina',
                active: true
              }
            ],
            count: 1
          }
        });
      } else {
        await route.continue();
      }
    });

    // Wait for hotels to load
    await page.waitForSelector('#hotels-tbody tr');
    
    // Click on "Ver Servicios" button for the first hotel
    await page.click('#hotels-tbody tr:first-child .service-action-btn');
    
    // Wait for services modal to appear
    await expect(page.locator('#hotel-services-modal')).toBeVisible();
    
    // Verify service is displayed
    await expect(page.locator('#hotel-services-content')).toContainText('Booking Engine');
    
    // Click "Agregar Servicio" button
    await page.click('#add-service-btn');
    
    // Wait for add service modal
    await expect(page.locator('#add-service-modal')).toBeVisible();
    
    // Select a service
    await page.selectOption('#service-select', 'WL');
    
    // Configure service settings
    await page.check('#send-email');
    await page.check('#send-whatsapp');
    await page.fill('#send-frequency', '1');
    
    // Submit service form
    await page.click('#add-service-form button[type="submit"]');
    
    // Verify success message
    await expect(page.locator('.toast.success')).toBeVisible();
  });

  test('should handle form validation', async ({ page }) => {
    // Click "Nuevo Hotel" button
    await page.click('#add-hotel-btn');
    
    // Wait for modal to appear
    await expect(page.locator('#hotel-modal')).toBeVisible();
    
    // Try to submit empty form
    await page.click('#hotel-form button[type="submit"]');
    
    // Verify validation messages
    await expect(page.locator('.toast.error')).toBeVisible();
    
    // Fill invalid data
    await page.fill('#hotel-code', 'ab'); // too short
    await page.fill('#hotel-email', 'invalid-email');
    
    // Submit form
    await page.click('#hotel-form button[type="submit"]');
    
    // Verify validation error
    await expect(page.locator('.toast.error')).toBeVisible();
  });

  test('should export hotels to CSV', async ({ page }) => {
    // Mock hotels data
    await page.route('**/webhook/**', async route => {
      if (route.request().url().includes('func=hotels')) {
        await route.fulfill({
          json: {
            func: 'hotels',
            method: 'list',
            data: [
              {
                id: 1,
                hotel_code: 'test001',
                hotel_name: 'Test Hotel',
                email: 'test@hotel.com',
                country_name: 'Argentina'
              }
            ],
            count: 1
          }
        });
      } else {
        await route.continue();
      }
    });

    // Setup download listener
    const downloadPromise = page.waitForEvent('download');
    
    // Click export button
    await page.click('#export-csv');
    
    // Wait for download
    const download = await downloadPromise;
    
    // Verify download
    expect(download.suggestedFilename()).toContain('.csv');
  });

  test('should handle network errors gracefully', async ({ page }) => {
    // Mock network error
    await page.route('**/webhook/**', async route => {
      await route.abort('failed');
    });

    // Try to load hotels
    await page.reload();
    
    // Wait for error message
    await expect(page.locator('.toast.error')).toBeVisible();
    
    // Verify error message content
    await expect(page.locator('.toast.error')).toContainText('Error');
  });

  test('should be responsive on mobile devices', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check if elements are properly arranged
    await expect(page.locator('#hotels-table')).toBeVisible();
    
    // Check if mobile menu works (if applicable)
    // This depends on your responsive design implementation
    
    // Verify forms work on mobile
    await page.click('#add-hotel-btn');
    await expect(page.locator('#hotel-modal')).toBeVisible();
    
    // Check if form fields are accessible
    await page.fill('#hotel-code', 'mobile001');
    await expect(page.locator('#hotel-code')).toHaveValue('mobile001');
    });
  }); // End of Dashboard Tests describe
});
