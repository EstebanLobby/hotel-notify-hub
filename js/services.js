// Services management functionality

function initializeServices() {
  renderServicesTable();
  setupServiceHotelsEventListeners();
}

function setupServiceHotelsEventListeners() {
  // Service Hotels Modal events
  const closeServiceHotelsBtn = document.getElementById('close-service-hotels-modal');
  const closeServiceHotelsFooterBtn = document.getElementById('close-service-hotels-btn');
  const serviceHotelsModal = document.getElementById('service-hotels-modal');
  
  if (closeServiceHotelsBtn) {
    closeServiceHotelsBtn.addEventListener('click', () => closeModal('service-hotels-modal'));
  }
  
  if (closeServiceHotelsFooterBtn) {
    closeServiceHotelsFooterBtn.addEventListener('click', () => closeModal('service-hotels-modal'));
  }
  
  if (serviceHotelsModal) {
    serviceHotelsModal.addEventListener('click', (e) => {
      if (e.target === serviceHotelsModal) {
        closeModal('service-hotels-modal');
      }
    });
  }
}

async function renderServicesTable() {
  const tbody = document.getElementById('services-tbody');
  if (!tbody) return;
  
  let services = [];
  let hotels = [];
  try {
    services = await getServicesAsync();
  } catch (_) {
    services = getServices();
  }
  // Si el backend ya devuelve hotels_subscribed, evitamos pedir hoteles
  const hasBackendSubscribed = services.some(s => s && s.hasOwnProperty('hotels_subscribed'));
  if (!hasBackendSubscribed) {
    try {
      hotels = await getHotelsAsync({ limit: 1000, offset: 0 });
    } catch (_) {
      hotels = getHotels();
    }
  }
  
  // Clear table
  tbody.innerHTML = '';
  
  // Render services
  services.forEach(service => {
    const subscribedHotels = hasBackendSubscribed
      ? Number(service.hotels_subscribed) || 0
      : hotels.filter(hotel => hotel.active_services?.some(as => as.service_code === service.service_code)).length;
    
    const row = createServiceRow(service, subscribedHotels);
    tbody.appendChild(row);
  });
  
  // Initialize Lucide icons after rendering
  setTimeout(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, 100);
}

function createServiceRow(service, subscribedCount) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>
      <span style="font-family: monospace; font-size: 0.875rem; background-color: var(--surface-hover); padding: 0.25rem 0.5rem; border-radius: 0.25rem;">
        ${service.service_code}
      </span>
    </td>
    <td>
      <div style="font-weight: 500;">${service.service_name}</div>
    </td>
    <td>
      <span style="font-size: 0.875rem; color: var(--text-muted);">${service.description}</span>
    </td>
    <td>
      <span class="badge ${service.active ? 'badge-success' : 'badge-secondary'}">
        ${service.active ? window.i18n ? window.i18n.t('services.active') : 'Activo' : window.i18n ? window.i18n.t('services.inactive') : 'Inactivo'}
      </span>
    </td>
    <td>
      <div style="display: flex; align-items: center; justify-content: flex-start; gap: 0.75rem;">
        <span style="font-weight: 600; font-size: 0.9375rem; color: var(--foreground); min-width: 2rem;">${subscribedCount}</span>
        <button class="btn-view-hotels" onclick="viewServiceHotels('${service.service_code}')" title="${window.i18n ? window.i18n.t('serviceHotels.title') : 'Ver Hoteles'}">
          <span data-lucide="eye" style="width: 18px; height: 18px;"></span>
        </button>
      </div>
    </td>
  `;
  
  return row;
}

function toggleService(serviceCode) {
  const services = getServices();
  const service = services.find(s => s.service_code === serviceCode);
  
  if (!service) return;
  
  const action = service.active ? 'desactivar' : 'activar';
  
  if (confirm(`¿Estás seguro de que quieres ${action} el servicio "${service.service_name}"?`)) {
    // Update service status (in a real app, this would be an API call)
    service.active = !service.active;
    
    showToast(`Servicio ${service.active ? 'activado' : 'desactivado'} correctamente`, 'success');
    renderServicesTable();
  }
}

// Variable global para almacenar el código del servicio actual
let currentServiceCodeForHotels = null;

async function viewServiceHotels(serviceCode) {
  currentServiceCodeForHotels = serviceCode;
  
  // Obtener servicios desde el backend o cache
  let services = [];
  try {
    services = await getServicesAsync();
  } catch (_) {
    services = getServices();
  }
  
  const service = services.find(s => s.service_code === serviceCode);
  if (!service) {
    const errorMsg = window.i18n ? window.i18n.t('serviceHotels.serviceNotFound') : 'Servicio no encontrado';
    showToast(errorMsg, 'error');
    return;
  }
  
  // Actualizar título del modal
  const modalTitle = document.getElementById('service-hotels-title');
  if (modalTitle) {
    const serviceName = service.service_name || serviceCode;
    modalTitle.textContent = `${window.i18n ? window.i18n.t('serviceHotels.title') : 'Hoteles del Servicio'}: ${serviceName}`;
  }
  
  // Abrir modal
  openModal('service-hotels-modal');
  
  // Cargar hoteles
  await loadServiceHotels(serviceCode);
  
  // Inicializar búsqueda
  const searchInput = document.getElementById('service-hotels-search');
  if (searchInput) {
    searchInput.value = '';
    searchInput.addEventListener('input', (e) => {
      filterServiceHotels(e.target.value);
    });
  }
  
  // Inicializar iconos lucide
  setTimeout(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, 100);
}

async function loadServiceHotels(serviceCode) {
  const hotelsList = document.getElementById('service-hotels-list');
  if (!hotelsList) return;
  
  hotelsList.innerHTML = '<div class="loading-spinner">' + (window.i18n ? window.i18n.t('serviceHotels.loading') : 'Cargando hoteles...') + '</div>';
  
  try {
    // Obtener todos los hoteles
    let allHotels = [];
    try {
      allHotels = await getHotelsAsync({ limit: 1000, offset: 0 });
    } catch (_) {
      allHotels = getHotels();
    }
    
    // Filtrar hoteles que tienen este servicio
    const hotelsWithService = allHotels.filter(hotel => 
      hotel.active_services?.some(as => as.service_code === serviceCode)
    );
    
    if (hotelsWithService.length === 0) {
      hotelsList.innerHTML = `
        <div class="empty-state">
          <span data-lucide="building" style="width: 48px; height: 48px; color: var(--text-muted); margin-bottom: 1rem;"></span>
          <p>${window.i18n ? window.i18n.t('serviceHotels.noHotels') : 'No hay hoteles suscritos a este servicio'}</p>
        </div>
      `;
      setTimeout(() => {
        if (window.lucide) {
          window.lucide.createIcons();
        }
      }, 100);
      return;
    }
    
    // Renderizar lista de hoteles
    renderServiceHotelsList(hotelsWithService, serviceCode);
    
  } catch (error) {
    console.error('Error cargando hoteles del servicio:', error);
    hotelsList.innerHTML = `
      <div class="error-state">
        <p>${window.i18n ? window.i18n.t('serviceHotels.error') : 'Error al cargar los hoteles'}</p>
      </div>
    `;
  }
}

function renderServiceHotelsList(hotels, serviceCode) {
  const hotelsList = document.getElementById('service-hotels-list');
  if (!hotelsList) return;
  
  // Almacenar hoteles para el filtro
  window.serviceHotelsCache = hotels;
  
  const hotelsHTML = hotels.map(hotel => {
    const serviceConfig = hotel.active_services?.find(as => as.service_code === serviceCode);
    const emailEnabled = serviceConfig?.send_by_email ? 'Sí' : 'No';
    const whatsappEnabled = serviceConfig?.send_by_whatsapp ? 'Sí' : 'No';
    
    return `
      <div class="service-hotel-item" data-hotel-id="${hotel.id}" data-hotel-code="${hotel.hotel_code}" data-hotel-name="${hotel.hotel_name.toLowerCase()}">
        <div class="service-hotel-info">
          <div class="service-hotel-header">
            <h4>${hotel.hotel_name}</h4>
            <span class="hotel-code-badge">${hotel.hotel_code}</span>
          </div>
          <div class="service-hotel-details">
            <div class="service-hotel-detail">
              <span class="detail-label">${window.i18n ? window.i18n.t('serviceHotels.email') : 'Email'}:</span>
              <span class="detail-value ${serviceConfig?.send_by_email ? 'enabled' : 'disabled'}">${emailEnabled}</span>
            </div>
            <div class="service-hotel-detail">
              <span class="detail-label">${window.i18n ? window.i18n.t('serviceHotels.whatsapp') : 'WhatsApp'}:</span>
              <span class="detail-value ${serviceConfig?.send_by_whatsapp ? 'enabled' : 'disabled'}">${whatsappEnabled}</span>
            </div>
          </div>
        </div>
        <div class="service-hotel-actions">
          <button 
            class="btn-remove-service" 
            onclick="removeHotelFromService('${hotel.hotel_code}', ${hotel.id}, '${serviceCode}')"
            title="${window.i18n ? window.i18n.t('serviceHotels.remove') : 'Quitar hotel del servicio'}"
          >
            <span data-lucide="x" class="remove-icon"></span>
            <span class="remove-text">${window.i18n ? window.i18n.t('serviceHotels.remove') : 'Quitar'}</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
  
  hotelsList.innerHTML = hotelsHTML;
  
  // Inicializar iconos lucide
  setTimeout(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, 100);
}

function filterServiceHotels(searchTerm) {
  const hotelsList = document.getElementById('service-hotels-list');
  if (!hotelsList || !window.serviceHotelsCache) return;
  
  const term = searchTerm.toLowerCase().trim();
  const hotelItems = hotelsList.querySelectorAll('.service-hotel-item');
  
  if (!term) {
    // Mostrar todos si no hay búsqueda
    hotelItems.forEach(item => {
      item.style.display = '';
    });
    return;
  }
  
  // Filtrar por código o nombre
  hotelItems.forEach(item => {
    const hotelCode = item.dataset.hotelCode?.toLowerCase() || '';
    const hotelName = item.dataset.hotelName || '';
    
    if (hotelCode.includes(term) || hotelName.includes(term)) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
}

async function removeHotelFromService(hotelCode, hotelId, serviceCode) {
  let hotel;
  try {
    const hotels = await getHotelsAsync({ limit: 1000, offset: 0 });
    hotel = hotels.find(h => h.id === hotelId);
  } catch (_) {
    hotel = getHotels().find(h => h.id === hotelId);
  }
  
  if (!hotel) {
    showToast('Hotel no encontrado', 'error');
    return;
  }
  
  const service = hotel.active_services?.find(as => as.service_code === serviceCode);
  if (!service) {
    showToast('El hotel no tiene este servicio', 'error');
    return;
  }
  
  const confirmText = window.i18n 
    ? window.i18n.t('serviceHotels.confirmRemove', { hotel: hotel.hotel_name, service: serviceCode })
    : `¿Estás seguro de que quieres quitar el servicio "${serviceCode}" del hotel "${hotel.hotel_name}"?`;
  
  if (!confirm(confirmText)) {
    return;
  }
  
  try {
    // Obtener el service_id del servicio
    const serviceId = service.service_id;
    
    if (!serviceId) {
      showToast('No se pudo identificar el servicio', 'error');
      return;
    }
    
    // Llamar a la función para quitar el servicio, pasando el hotel_code
    const result = await removeHotelServiceAsync(hotelId, serviceId, hotel.hotel_code);
    
    if (result) {
      showToast(
        window.i18n ? window.i18n.t('serviceHotels.removeSuccess') : 'Servicio quitado correctamente',
        'success'
      );
      
      // Recargar la lista de hoteles
      await loadServiceHotels(serviceCode);
      
      // Actualizar la tabla de servicios
      await renderServicesTable();
    } else {
      showToast(
        window.i18n ? window.i18n.t('serviceHotels.removeError') : 'Error al quitar el servicio',
        'error'
      );
    }
  } catch (error) {
    console.error('Error quitando servicio del hotel:', error);
    showToast(
      `${window.i18n ? window.i18n.t('serviceHotels.removeError') : 'Error al quitar el servicio'}: ${error.message}`,
      'error'
    );
  }
}