// Test utilities and helpers
class TestHelpers {
  
  /**
   * Creates a mock hotel object with default values
   */
  static createMockHotel(overrides = {}) {
    return {
      id: 1,
      hotel_code: 'test001',
      hotel_name: 'Test Hotel',
      email: 'test@hotel.com',
      phone: '+1234567890',
      language: 'es',
      country_id: 1,
      active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      active_services: [],
      ...overrides
    };
  }

  /**
   * Creates a mock service object
   */
  static createMockService(overrides = {}) {
    return {
      service_id: 1,
      service_code: 'BOENGINE',
      service_name: 'Booking Engine',
      description: 'Motor de reservas',
      send_by_email: true,
      send_by_whatsapp: true,
      ...overrides
    };
  }

  /**
   * Creates a mock country object
   */
  static createMockCountry(overrides = {}) {
    return {
      id: 1,
      name: 'Argentina',
      abbreviation: 'AR',
      zone: 'America/Argentina/Buenos_Aires',
      language: 'es',
      ...overrides
    };
  }

  /**
   * Sets up DOM elements for testing
   */
  static setupDOM() {
    document.body.innerHTML = `
      <div class="dashboard">
        <!-- Hotels Table -->
        <div class="hotels-section">
          <div class="hotels-header">
            <input id="hotel-search" placeholder="Buscar hoteles..." />
            <button id="hotel-search-btn">Buscar</button>
            <button id="add-hotel-btn">Nuevo Hotel</button>
            <button id="export-csv">Exportar CSV</button>
          </div>
          
          <div class="hotels-filters">
            <select id="language-filter">
              <option value="">Todos los idiomas</option>
              <option value="es">Español</option>
              <option value="en">Inglés</option>
            </select>
            <select id="status-filter">
              <option value="">Todos los estados</option>
              <option value="true">Activos</option>
              <option value="false">Inactivos</option>
            </select>
          </div>
          
          <table id="hotels-table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>País</th>
                <th>Idioma</th>
                <th>Estado</th>
                <th>Servicios</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody id="hotels-tbody"></tbody>
          </table>
          
          <div class="pagination">
            <button id="prev-page">Anterior</button>
            <span id="page-info">Página 1 de 1</span>
            <button id="next-page">Siguiente</button>
          </div>
        </div>

        <!-- Hotel Form Modal -->
        <div id="hotel-modal" class="modal">
          <div class="modal-content">
            <div class="modal-header">
              <h3 id="modal-title">Agregar Hotel</h3>
              <button id="close-modal" class="modal-close">×</button>
            </div>
            <form id="hotel-form">
              <div class="form-group">
                <label for="hotel-code">Código del Hotel *</label>
                <input type="text" id="hotel-code" name="hotel_code" required />
              </div>
              <div class="form-group">
                <label for="hotel-name">Nombre del Hotel *</label>
                <input type="text" id="hotel-name" name="hotel_name" required />
              </div>
              <div class="form-group">
                <label for="hotel-email">Email *</label>
                <input type="email" id="hotel-email" name="email" required />
              </div>
              <div class="form-group">
                <label for="hotel-phone">Teléfono</label>
                <input type="tel" id="hotel-phone" name="phone" />
              </div>
              <div class="form-group">
                <label for="hotel-country">País *</label>
                <select id="hotel-country" name="country_id" required>
                  <option value="">Seleccionar país...</option>
                </select>
              </div>
              <div class="form-group">
                <label for="hotel-language">Idioma *</label>
                <select id="hotel-language" name="language" required>
                  <option value="es">Español</option>
                  <option value="en">English</option>
                  <option value="pt">Português</option>
                </select>
              </div>
              <div class="modal-footer">
                <button type="button" id="cancel-btn">Cancelar</button>
                <button type="submit">Guardar Hotel</button>
              </div>
            </form>
          </div>
        </div>

        <!-- Hotel Services Modal -->
        <div id="hotel-services-modal" class="modal">
          <div class="modal-content">
            <div class="modal-header">
              <h3 id="hotel-services-title">Servicios del Hotel</h3>
              <button id="close-services-modal" class="modal-close">×</button>
            </div>
            <div id="hotel-services-content"></div>
            <div class="modal-footer">
              <button id="add-service-btn">Agregar Servicio</button>
              <button id="close-services-btn">Cerrar</button>
            </div>
          </div>
        </div>

        <!-- Add Service Modal -->
        <div id="add-service-modal" class="modal">
          <div class="modal-content">
            <div class="modal-header">
              <h3 id="add-service-title">Agregar Servicio</h3>
              <button id="close-add-service-modal" class="modal-close">×</button>
            </div>
            <form id="add-service-form">
              <div class="form-group">
                <label for="service-select">Servicio *</label>
                <select id="service-select" name="service_code" required>
                  <option value="">Seleccionar servicio...</option>
                </select>
              </div>
              <div class="form-group">
                <label>Canales de Notificación *</label>
                <div class="checkbox-group">
                  <label class="checkbox-label">
                    <input type="checkbox" id="send-email" name="send_by_email" checked>
                    📧 Email
                  </label>
                  <label class="checkbox-label">
                    <input type="checkbox" id="send-whatsapp" name="send_by_whatsapp" checked>
                    📱 WhatsApp
                  </label>
                </div>
              </div>
              <div class="form-group">
              </div>
              <div class="modal-footer">
                <button type="button" id="cancel-add-service-btn">Cancelar</button>
                <button type="submit">Agregar Servicio</button>
              </div>
            </form>
          </div>
        </div>

        <!-- Toast Container -->
        <div id="toast-container"></div>
      </div>
    `;
  }

  /**
   * Mocks the fetchWebhook function with predefined responses
   */
  static mockFetchWebhook() {
    const mockResponses = {
      hotels_list: {
        func: 'hotels',
        method: 'list',
        data: [this.createMockHotel()],
        count: 1
      },
      countries: {
        func: 'country',
        data: [
          this.createMockCountry(),
          this.createMockCountry({ id: 2, name: 'México', abbreviation: 'MX' })
        ],
        count: 2
      },
      services: {
        func: 'services',
        method: 'list',
        data: [
          this.createMockService(),
          this.createMockService({ 
            service_id: 2, 
            service_code: 'WL', 
            service_name: 'Waitlist' 
          })
        ]
      },
      hotel_services: {
        func: 'hotels',
        method: 'services',
        data: {
          id: 1,
          hotel_name: 'Test Hotel',
          country_name: 'Argentina',
          active_services: [this.createMockService()]
        }
      }
    };

    return jest.fn().mockImplementation(async (params) => {
      if (params.func === 'hotels' && params.method === 'list') {
        return mockResponses.hotels_list;
      }
      if (params.func === 'country') {
        return mockResponses.countries;
      }
      if (params.func === 'services' && params.method === 'list') {
        return mockResponses.services;
      }
      if (params.func === 'hotels' && params.method === 'services') {
        return mockResponses.hotel_services;
      }
      if (params.func === 'hotels' && params.method === 'create') {
        return {
          func: 'hotels',
          method: 'create',
          data: this.createMockHotel({ id: 999, ...params.data })
        };
      }
      if (params.func === 'hotels' && params.method === 'update') {
        return {
          func: 'hotels',
          method: 'update',
          data: this.createMockHotel({ ...params.data })
        };
      }
      if (params.func === 'hotels' && params.method === 'delete') {
        return { func: 'hotels', method: 'delete', success: true };
      }
      
      return { error: 'Mock response not defined' };
    });
  }

  /**
   * Waits for an element to appear in the DOM
   */
  static async waitForElement(selector, timeout = 5000) {
    return new Promise((resolve, reject) => {
      const element = document.querySelector(selector);
      if (element) {
        resolve(element);
        return;
      }

      const observer = new MutationObserver(() => {
        const element = document.querySelector(selector);
        if (element) {
          observer.disconnect();
          resolve(element);
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });

      setTimeout(() => {
        observer.disconnect();
        reject(new Error(`Element ${selector} not found within ${timeout}ms`));
      }, timeout);
    });
  }

  /**
   * Simulates user input on a form field
   */
  static fillFormField(fieldId, value) {
    const field = document.getElementById(fieldId);
    if (field) {
      field.value = value;
      // Trigger input event
      field.dispatchEvent(new Event('input', { bubbles: true }));
      field.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }

  /**
   * Simulates clicking a button
   */
  static clickButton(buttonId) {
    const button = document.getElementById(buttonId);
    if (button) {
      button.click();
      // Trigger click event
      button.dispatchEvent(new Event('click', { bubbles: true }));
    }
  }

  /**
   * Checks if a toast message is displayed
   */
  static isToastVisible(message, type = null) {
    const toasts = document.querySelectorAll('.toast');
    return Array.from(toasts).some(toast => {
      const hasMessage = !message || toast.textContent.includes(message);
      const hasType = !type || toast.classList.contains(type);
      return hasMessage && hasType;
    });
  }

  /**
   * Gets form data as an object
   */
  static getFormData(formId) {
    const form = document.getElementById(formId);
    if (!form) return {};
    
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }
    
    return data;
  }

  /**
   * Clears all mocks and resets state
   */
  static cleanup() {
    jest.clearAllMocks();
    document.body.innerHTML = '';
    
    // Reset global variables if they exist
    if (typeof window !== 'undefined') {
      delete window.hotelsCache;
      delete window.countriesCache;
      delete window.servicesCache;
    }
  }
}

module.exports = { TestHelpers };
module.exports.default = TestHelpers;
