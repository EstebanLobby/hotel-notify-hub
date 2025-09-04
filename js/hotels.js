// Hotels management functionality

let currentHotelsPage = 1;
let hotelsPerPage = 10;
let filteredHotels = [];
let hotelsCache = [];
let editingHotel = null;
let hotelsListenersInitialized = false;

function initializeHotels() {
  renderHotelsTable();
  setupHotelsEventListeners();
}

function setupHotelsEventListeners() {
  if (hotelsListenersInitialized) return;
  // Search functionality
  const searchInput = document.getElementById('hotel-search');
  const searchBtn = document.getElementById('hotel-search-btn');
  if (searchInput) {
    // Buscar solo al presionar Enter
    searchInput.addEventListener('keydown', async (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        await handleHotelSearch({ target: searchInput });
      }
    });
  }
  if (searchBtn) {
    searchBtn.addEventListener('click', async () => {
      await handleHotelSearch({ target: document.getElementById('hotel-search') });
    });
  }

  // Filtros adicionales
  const languageFilter = document.getElementById('language-filter');
  const statusFilter = document.getElementById('status-filter');
  const servicesFilter = document.getElementById('services-filter');
  
  if (languageFilter) {
    languageFilter.addEventListener('change', () => applyFilters());
  }
  if (statusFilter) {
    statusFilter.addEventListener('change', () => applyFilters());
  }
  if (servicesFilter) {
    servicesFilter.addEventListener('change', () => applyFilters());
  }

  // Export CSV
  const exportBtn = document.getElementById('export-csv');
  if (exportBtn) {
    exportBtn.addEventListener('click', exportHotelsToCSV);
  }

  // Add hotel button
  const addBtn = document.getElementById('add-hotel-btn');
  if (addBtn) {
    addBtn.addEventListener('click', openAddHotelModal);
  }

  // Modal close events
  const closeBtn = document.getElementById('close-modal');
  const cancelBtn = document.getElementById('cancel-btn');

  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeModal('hotel-modal'));
  }

  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => closeModal('hotel-modal'));
  }

  // Form submission
  const form = document.getElementById('hotel-form');
  if (form) {
    form.addEventListener('submit', handleHotelSubmit);
  }

  // Close modal when clicking outside
  const modal = document.getElementById('hotel-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal('hotel-modal');
      }
    });
  }
  
  // Hotel Services Modal events
  const closeServicesBtn = document.getElementById('close-services-modal');
  const closeServicesFooterBtn = document.getElementById('close-services-btn');
  const servicesModal = document.getElementById('hotel-services-modal');
  
  if (closeServicesBtn) {
    closeServicesBtn.addEventListener('click', () => closeModal('hotel-services-modal'));
  }
  
  if (closeServicesFooterBtn) {
    closeServicesFooterBtn.addEventListener('click', () => closeModal('hotel-services-modal'));
  }
  
    if (servicesModal) {
    servicesModal.addEventListener('click', (e) => {
      if (e.target === servicesModal) {
        closeModal('hotel-services-modal');
      }
    });
  }

  // Add Service Modal events
  const addServiceBtn = document.getElementById('add-service-btn');
  const closeAddServiceBtn = document.getElementById('close-add-service-modal');
  const cancelAddServiceBtn = document.getElementById('cancel-add-service-btn');
  const addServiceModal = document.getElementById('add-service-modal');
  const addServiceForm = document.getElementById('add-service-form');

  if (addServiceBtn) {
    addServiceBtn.addEventListener('click', () => {
      if (currentHotelIdForServices) {
        openAddServiceModal(currentHotelIdForServices);
      }
    });
  }

  if (closeAddServiceBtn) {
    closeAddServiceBtn.addEventListener('click', () => {
      closeModal('add-service-modal');
      resetAddServiceForm();
    });
  }

  if (cancelAddServiceBtn) {
    cancelAddServiceBtn.addEventListener('click', () => {
      closeModal('add-service-modal');
      resetAddServiceForm();
    });
  }

  if (addServiceModal) {
    addServiceModal.addEventListener('click', (e) => {
      if (e.target === addServiceModal) {
        closeModal('add-service-modal');
        resetAddServiceForm();
      }
    });
  }

  if (addServiceForm) {
    addServiceForm.addEventListener('submit', handleAddServiceSubmit);
  }
   
  hotelsListenersInitialized = true;
}

async function handleHotelSearch(e) {
  const query = e.target.value;
  currentHotelsPage = 1;
  await renderHotelsTable(query);
}

function applyFilters() {
  currentHotelsPage = 1;
  renderHotelsTable(document.getElementById('hotel-search')?.value || '');
}

async function renderHotelsTable(query = '') {
  const tbody = document.getElementById('hotels-tbody');
  const countElement = document.getElementById('hotels-count');
  
  if (!tbody) return;
  
  // Obtener hoteles desde el servicio (con filtro q si aplica)
  try {
    const searchQuery = typeof query === 'string' ? query : (document.getElementById('hotel-search')?.value || '');
    console.log('Buscando hoteles con query:', searchQuery);
    hotelsCache = await getHotelsAsync({ limit: 1000, offset: 0, q: searchQuery });
    console.log('Hoteles obtenidos del servicio:', hotelsCache);
  } catch (error) {
    console.error('Error obteniendo hoteles del servicio:', error);
    // Fallback a datos locales si el servicio falla
    hotelsCache = getHotels();
  }
  
  filteredHotels = hotelsCache;
  console.log('Hoteles después de filtros:', filteredHotels);
  
  // Paginate results
  const paginatedData = paginate(filteredHotels, hotelsPerPage, currentHotelsPage);
  
  // Update count
  if (countElement) {
    countElement.textContent = `${filteredHotels.length} hoteles`;
  }
  
  // Clear table
  tbody.innerHTML = '';
  
  // Render hotels
  paginatedData.items.forEach(hotel => {
    const row = createHotelRow(hotel);
    tbody.appendChild(row);
  });
  
  // Update pagination
  renderPagination('pagination', paginatedData.totalPages, currentHotelsPage, (page) => {
    currentHotelsPage = page;
    renderHotelsTable();
  });
  
  // Show empty state if needed
  if (paginatedData.items.length === 0) {
    const emptyRow = document.createElement('tr');
    emptyRow.innerHTML = `
      <td colspan="7" style="text-align: center; padding: 2rem; color: var(--text-muted);">
        ${(document.getElementById('hotel-search')?.value || '') ? 'No se encontraron hoteles con ese criterio' : 'No hay hoteles registrados'}
      </td>
    `;
    tbody.appendChild(emptyRow);
  }
  
  // Initialize Lucide icons for dynamically added content
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
    
    // Check if icons loaded and show fallback if not
    setTimeout(() => {
      const iconElements = document.querySelectorAll('[data-lucide]');
      iconElements.forEach(icon => {
        if (!icon.querySelector('svg')) {
          const fallback = icon.parentElement.querySelector('.fallback-icon, .fallback-text');
          if (fallback) {
            fallback.style.display = 'inline';
          }
        }
      });
    }, 100);
  }
}

function applyAdditionalFilters(hotels) {
  let filtered = hotels;
  
  // Filtro por idioma
  const languageFilter = document.getElementById('language-filter')?.value;
  if (languageFilter) {
    filtered = filtered.filter(hotel => hotel.language === languageFilter);
  }
  
  // Filtro por estado
  const statusFilter = document.getElementById('status-filter')?.value;
  if (statusFilter !== '') {
    const isActive = statusFilter === 'true';
    filtered = filtered.filter(hotel => hotel.active === isActive);
  }
  
  // Filtro por servicios
  const servicesFilter = document.getElementById('services-filter')?.value;
  if (servicesFilter) {
    filtered = filtered.filter(hotel => 
      hotel.active_services?.some(service => service.service_code === servicesFilter)
    );
  }
  
  return filtered;
}

function exportHotelsToCSV() {
  const hotels = filteredHotels.length > 0 ? filteredHotels : hotelsCache;
  
  if (hotels.length === 0) {
    showToast('No hay datos para exportar', 'warning');
    return;
  }
  
  const headers = [
    'ID', 'Código', 'Nombre', 'Email', 'Teléfono', 'Idioma', 
    'Estado', 'Servicios Activos', 'Fecha Creación'
  ];
  
  const csvContent = [
    headers.join(','),
    ...hotels.map(hotel => [
      hotel.id,
      `"${hotel.hotel_code}"`,
      `"${hotel.hotel_name}"`,
      `"${hotel.email}"`,
      `"${hotel.phone || ''}"`,
      hotel.language,
      hotel.active ? 'Activo' : 'Inactivo',
      `"${hotel.active_services?.map(s => s.service_code).join(', ') || ''}"`,
      new Date(hotel.created_at).toLocaleDateString('es-ES')
    ].join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `hoteles_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  showToast('Archivo CSV exportado correctamente', 'success');
}

function createHotelRow(hotel) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>
      <div>
        <div style="font-weight: 500;">${hotel.hotel_name}</div>
        <div style="font-size: 0.875rem; color: var(--text-muted);">${hotel.hotel_code}</div>
      </div>
    </td>
    <td>
      <div>
        <div style="font-size: 0.875rem;">${hotel.email}</div>
        ${hotel.phone ? `<div style="font-size: 0.875rem; color: var(--text-muted);">${hotel.phone}</div>` : ''}
      </div>
    </td>
    <td>
      <span style="font-size: 0.875rem;">${getLanguageLabel(hotel.language)}</span>
    </td>
    <td>
      <span class="badge ${hotel.active ? 'badge-success' : 'badge-secondary'}">
        ${hotel.active ? 'Activo' : 'Inactivo'}
      </span>
    </td>
    <td>
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <span style="font-size: 0.875rem;">${hotel.active_services?.length || 0}</span>
        <button class="btn btn-ghost btn-sm" onclick="viewHotelServices(${hotel.id})" style="padding: 0.25rem;">
          <span data-lucide="settings"></span>
        </button>
      </div>
    </td>
    <td>
      <span style="font-size: 0.875rem; color: var(--text-muted);">${formatDate(hotel.created_at)}</span>
    </td>
    <td>
      <div class="dropdown">
        <button class="btn btn-ghost btn-sm" onclick="toggleDropdown(this)" title="Acciones" style="min-width: 32px; min-height: 32px; font-size: 18px; line-height: 1;">
          ⋮
        </button>
        <div class="dropdown-content">
          <button class="dropdown-item" onclick="editHotel(${hotel.id})">
            ✏️ Editar
          </button>
          <button class="dropdown-item" onclick="viewHotelServices(${hotel.id})">
            👁️ Ver Servicios
          </button>
          <button class="dropdown-item danger" onclick="deleteHotel(${hotel.id})">
            🗑️ Eliminar
          </button>
        </div>
      </div>
    </td>
  `;
  
  return row;
}

function toggleDropdown(button) {
  const dropdown = button.parentElement;
  const isActive = dropdown.classList.contains('active');
  
  // Close all dropdowns
  document.querySelectorAll('.dropdown.active').forEach(d => d.classList.remove('active'));
  
  // Toggle current dropdown
  if (!isActive) {
    dropdown.classList.add('active');
  }
  
  // Close dropdown when clicking outside
  setTimeout(() => {
    document.addEventListener('click', function closeDropdown(e) {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
        document.removeEventListener('click', closeDropdown);
      }
    });
  }, 0);
}

function openAddHotelModal() {
  editingHotel = null;
  document.getElementById('modal-title').textContent = 'Nuevo Hotel';
  resetForm('hotel-form');
  openModal('hotel-modal');
}

function editHotel(id) {
  const hotel = hotelsCache.find(h => h.id === id);
  if (!hotel) return;
  
  editingHotel = hotel;
  document.getElementById('modal-title').textContent = 'Editar Hotel';
  
  setFormData('hotel-form', {
    hotel_code: hotel.hotel_code,
    hotel_name: hotel.hotel_name,
    email: hotel.email,
    phone: hotel.phone || '',
    language: hotel.language,
    active: hotel.active
  });
  
  openModal('hotel-modal');
}

async function handleHotelSubmit(e) {
  e.preventDefault();
  
  const formData = getFormData('hotel-form');
  console.log('FormData obtenido:', formData);
  
  // Validation
  if (!validateHotelCode(formData.hotel_code)) {
    showToast('Código de hotel inválido. Debe contener solo letras y números (3-20 caracteres)', 'error');
    return;
  }
  
  if (!validateEmail(formData.email)) {
    showToast('Email inválido', 'error');
    return;
  }
  
  // Check for duplicate hotel code (only for new hotels or different hotel)
  const existingHotel = hotelsCache.find(h => 
    h.hotel_code.toLowerCase() === formData.hotel_code.toLowerCase() && 
    h.id !== (editingHotel?.id || null)
  );
  
  if (existingHotel) {
    showToast('Ya existe un hotel con ese código', 'error');
    return;
  }
  
  try {
    if (editingHotel) {
      // Update existing hotel
      console.log('Actualizando hotel existente:', editingHotel.id);
      console.log('Función updateHotelAsync disponible:', typeof updateHotelAsync);
      const updatedHotel = await updateHotelAsync(editingHotel.id, formData);
      if (updatedHotel) {
        showToast('Hotel actualizado correctamente', 'success');
        // Refresh the hotels list
        await renderHotelsTable();
      } else {
        showToast('Error al actualizar el hotel', 'error');
      }
    } else {
      // Create new hotel
      console.log('Creando nuevo hotel');
      console.log('Función createHotelAsync disponible:', typeof createHotelAsync);
      console.log('Datos a enviar:', formData);
      const newHotel = await createHotelAsync(formData);
      console.log('Respuesta de createHotelAsync:', newHotel);
      if (newHotel) {
        showToast('Hotel creado correctamente', 'success');
        // Refresh the hotels list
        await renderHotelsTable();
      } else {
        showToast('Error al crear el hotel', 'error');
      }
    }
    
    closeModal('hotel-modal');
    
  } catch (error) {
    console.error('Error en handleHotelSubmit:', error);
    showToast(`Error al guardar el hotel: ${error.message}`, 'error');
  }
}
async function deleteHotel(id) {
  const hotel = hotelsCache.find(h => h.id === id);
  if (!hotel) return;
  
  if (confirm(`¿Estás seguro de que quieres eliminar el hotel "${hotel.hotel_name}"?`)) {
    try {
      console.log('Eliminando hotel:', id);
      const result = await deleteHotelAsync(id);
      if (result) {
        showToast('Hotel eliminado correctamente', 'success');
        // Refresh the hotels list
        await renderHotelsTable();
      } else {
        showToast('Error al eliminar el hotel', 'error');
      }
    } catch (error) {
      console.error('Error eliminando hotel:', error);
      showToast(`Error al eliminar el hotel: ${error.message}`, 'error');
    }
  }
}

async function viewHotelServices(id) {
  const hotel = hotelsCache.find(h => h.id === id);
  if (!hotel) return;
  
  console.log('Viendo servicios del hotel:', hotel.hotel_name, 'ID:', id);
  
  // Actualizar título del modal
  document.getElementById('hotel-services-title').textContent = `Servicios de ${hotel.hotel_name}`;
  
  // Mostrar modal con spinner de carga
  const contentDiv = document.getElementById('hotel-services-content');
  contentDiv.innerHTML = '<div class="loading-spinner">Cargando servicios...</div>';
  openModal('hotel-services-modal');
  
  try {
    // Obtener servicios del hotel desde el servicio
    console.log('Consultando servicios del hotel ID:', id);
    const hotelData = await fetchWebhook({ 
      func: 'hotels', 
      method: 'services',
      id: id
    });
    console.log('Datos del hotel obtenidos:', hotelData);
    
    const services = hotelData?.data?.active_services || [];
    console.log('Servicios obtenidos:', services);
    
    if (services && services.length > 0) {
      // Crear header con información del hotel
      const hotelInfo = document.createElement('div');
      hotelInfo.className = 'hotel-info';
      hotelInfo.innerHTML = `
        <div style="background: var(--surface); padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <h4 style="margin: 0; color: var(--foreground);">${hotelData.data.hotel_name}</h4>
            <span class="badge badge-success">${services.length} servicios activos</span>
          </div>
          <div style="font-size: 0.875rem; color: var(--text-muted);">
            <div>Código: ${hotelData.data.hotel_code}</div>
            <div>Email: ${hotelData.data.email}</div>
            ${hotelData.data.phone ? `<div>Teléfono: ${hotelData.data.phone}</div>` : ''}
            <div>Idioma: ${getLanguageLabel(hotelData.data.language)}</div>
          </div>
        </div>
      `;
      
      // Renderizar lista de servicios
      const servicesList = document.createElement('div');
      servicesList.className = 'hotel-services-list';
      
      services.forEach(service => {
        const serviceItem = document.createElement('div');
        serviceItem.className = 'service-item';
        
        const channels = [];
        if (service.send_by_email) channels.push('Email');
        if (service.send_by_whatsapp) channels.push('WhatsApp');
        
        serviceItem.innerHTML = `
          <div class="service-info">
            <div class="service-name">${getServiceName(service.service_code)}</div>
            <div class="service-code">ID: ${service.service_id} | ${service.service_code}</div>
            <div class="service-channels">
              ${channels.map(channel => `<span class="channel-badge">${channel}</span>`).join('')}
            </div>
          </div>
          <div class="service-status">
            <span class="status-badge active">Activo</span>
            <div class="service-actions">
              <button class="service-action-btn edit" onclick="editHotelService(${id}, ${service.service_id}, '${service.service_code}')" title="Editar canales">
                ✏️
              </button>
              <button class="service-action-btn remove" onclick="removeHotelService(${id}, ${service.service_id})" title="Quitar servicio">
                🗑️
              </button>
            </div>
          </div>
        `;
        
        servicesList.appendChild(serviceItem);
      });
      
      contentDiv.innerHTML = '';
      contentDiv.appendChild(hotelInfo);
      contentDiv.appendChild(servicesList);
    } else {
      // Mostrar mensaje si no hay servicios
      contentDiv.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: var(--text-muted);">
          <p>Este hotel no tiene servicios configurados.</p>
          <p style="font-size: 0.875rem; margin-top: 0.5rem;">Hotel: ${hotelData.data.hotel_name} (${hotelData.data.hotel_code})</p>
        </div>
      `;
    }
  } catch (error) {
    console.error('Error obteniendo servicios del hotel:', error);
    contentDiv.innerHTML = `
      <div style="text-align: center; padding: 2rem; color: var(--error);">
        <p>Error al cargar los servicios: ${error.message}</p>
      </div>
    `;
  }
}

// Función auxiliar para obtener el nombre del servicio
function getServiceName(serviceCode) {
  const serviceNames = {
    'BOENGINE': 'Booking Engine',
    'WL': 'Waitlist',
    'LATE_IN': 'Late Check-in',
    'LATE_OUT': 'Late Check-out',
    'BL': 'Blacklist',
    'SELF_IN': 'Self Check-in'
  };
  return serviceNames[serviceCode] || serviceCode;
}

// Función para abrir modal de agregar servicio
async function openAddServiceModal(hotelId) {
  currentHotelIdForServices = hotelId;
  
  const hotel = hotelsCache.find(h => h.id === hotelId);
  if (!hotel) return;
  
  document.getElementById('add-service-title').textContent = `Agregar Servicio - ${hotel.hotel_name}`;
  
  // Resetear formulario
  resetAddServiceForm();
  
  openModal('add-service-modal');
}

// Función para quitar servicio de un hotel
async function removeHotelService(hotelId, serviceId) {
  const hotel = hotelsCache.find(h => h.id === hotelId);
  if (!hotel) return;

  if (confirm(`¿Estás seguro de que quieres quitar este servicio del hotel "${hotel.hotel_name}"?`)) {
    try {
      console.log('Quitando servicio:', serviceId, 'del hotel:', hotelId);
      const result = await removeHotelServiceAsync(hotelId, serviceId);
      if (result) {
        showToast('Servicio quitado correctamente', 'success');
        // Recargar servicios del hotel
        await viewHotelServices(hotelId);
      } else {
        showToast('Error al quitar el servicio', 'error');
      }
    } catch (error) {
      console.error('Error quitando servicio:', error);
      showToast(`Error al quitar el servicio: ${error.message}`, 'error');
    }
  }
}

// Variables globales para gestión de servicios
let currentHotelIdForServices = null;

// Función para manejar el envío del formulario de servicios
async function handleAddServiceSubmit(e) {
  e.preventDefault();

  if (!currentHotelIdForServices) {
    showToast('Error: No se ha seleccionado un hotel', 'error');
    return;
  }

  const formData = getFormData('add-service-form');
  const serviceId = e.target.dataset.serviceId;

  if (!formData.service_code) {
    showToast('Debe seleccionar un servicio', 'error');
    return;
  }

  if (!formData.send_by_email && !formData.send_by_whatsapp) {
    showToast('Debe seleccionar al menos un canal de notificación', 'error');
    return;
  }

  const channels = {
    email: formData.send_by_email,
    whatsapp: formData.send_by_whatsapp
  };

  try {
    let result;
    if (serviceId) {
      // Actualizar servicio existente
      console.log('Actualizando servicio:', serviceId);
      result = await updateHotelServiceAsync(currentHotelIdForServices, parseInt(serviceId), channels);
    } else {
      // Agregar nuevo servicio
      console.log('Agregando nuevo servicio:', formData.service_code);
      result = await addHotelServiceAsync(currentHotelIdForServices, formData.service_code, channels);
    }

    if (result) {
      showToast(serviceId ? 'Servicio actualizado correctamente' : 'Servicio agregado correctamente', 'success');
      closeModal('add-service-modal');
      resetAddServiceForm();
      // Recargar servicios del hotel
      await viewHotelServices(currentHotelIdForServices);
    } else {
      showToast(serviceId ? 'Error al actualizar el servicio' : 'Error al agregar el servicio', 'error');
    }
  } catch (error) {
    console.error('Error en handleAddServiceSubmit:', error);
    showToast(`Error: ${error.message}`, 'error');
  }
}

// Función para resetear el formulario de servicios
function resetAddServiceForm() {
  const form = document.getElementById('add-service-form');
  if (form) {
    // Resetear formulario
    resetForm('add-service-form');
    
    // Restaurar estado inicial
    document.getElementById('service-select').disabled = false;
    const submitBtn = document.querySelector('#add-service-form button[type="submit"]');
    if (submitBtn) {
      submitBtn.textContent = 'Agregar Servicio';
    }
    
    // Limpiar dataset
    delete form.dataset.serviceId;
    
    // Restaurar título
    document.getElementById('add-service-title').textContent = 'Agregar Servicio';
  }
}

// Función para editar canales de un servicio
async function editHotelService(hotelId, serviceId, serviceCode) {
  const hotel = hotelsCache.find(h => h.id === hotelId);
  if (!hotel) return;

  // Obtener datos actuales del servicio
  try {
    const hotelData = await fetchWebhook({ 
      func: 'hotels', 
      method: 'services',
      id: hotelId
    });
    
    const service = hotelData?.data?.active_services?.find(s => s.service_id === serviceId);
    if (!service) {
      showToast('No se pudo encontrar el servicio', 'error');
      return;
    }

    // Configurar modal para edición
    currentHotelIdForServices = hotelId;
    document.getElementById('add-service-title').textContent = `Editar ${getServiceName(serviceCode)} - ${hotel.hotel_name}`;
    
    // Llenar formulario con datos actuales
    document.getElementById('service-select').value = serviceCode;
    document.getElementById('service-select').disabled = true; // No permitir cambiar el servicio
    document.getElementById('send-email').checked = service.send_by_email;
    document.getElementById('send-whatsapp').checked = service.send_by_whatsapp;
    
    // Cambiar texto del botón
    const submitBtn = document.querySelector('#add-service-form button[type="submit"]');
    submitBtn.textContent = 'Actualizar Servicio';
    
    // Guardar ID del servicio para la actualización
    document.getElementById('add-service-form').dataset.serviceId = serviceId;
    
    openModal('add-service-modal');
  } catch (error) {
    console.error('Error obteniendo datos del servicio:', error);
    showToast(`Error al obtener datos del servicio: ${error.message}`, 'error');
  }
}

// Make functions globally available for onclick handlers
window.toggleDropdown = toggleDropdown;
window.editHotel = editHotel;
window.viewHotelServices = viewHotelServices;
window.deleteHotel = deleteHotel;
window.openAddServiceModal = openAddServiceModal;
window.removeHotelService = removeHotelService;
window.editHotelService = editHotelService;
window.handleAddServiceSubmit = handleAddServiceSubmit;
