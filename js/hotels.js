// Hotels management functionality

let currentHotelsPage = 1;
let hotelsPerPage = 10;
let filteredHotels = [];
let hotelsCache = [];
let editingHotel = null;
let hotelsListenersInitialized = false;
let countriesCache = [];
let servicesCache = [];

async function initializeHotels() {
  // Cargar países en el cache para poder mostrar nombres en la tabla
  await loadCountriesCache();
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

  // Service selection change event for SELF_IN specific fields
  const serviceSelect = document.getElementById('service-select');
  if (serviceSelect) {
    serviceSelect.addEventListener('change', handleServiceSelectionChange);
  }


  // Phone input validation - solo permitir números
  const phoneInput = document.getElementById('hotel-phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      // Permitir solo números
      const value = e.target.value;
      const cleanValue = value.replace(/[^\d]/g, '');
      if (value !== cleanValue) {
        e.target.value = cleanValue;
      }
    });
    
    // Prevenir pegar contenido inválido
    phoneInput.addEventListener('paste', (e) => {
      e.preventDefault();
      const paste = (e.clipboardData || window.clipboardData).getData('text');
      const cleanPaste = paste.replace(/[^\d]/g, '');
      e.target.value = cleanPaste;
    });
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
    'Estado', 'País', 'Servicios Activos', 'Fecha Creación'
  ];
  
  const csvContent = [
    headers.join(','),
    ...hotels.map(hotel => [
      hotel.id,
      `"${hotel.hotel_code}"`,
      `"${hotel.hotel_name}"`,
      `"${hotel.email}"`,
      `"${(hotel.phone && hotel.phone !== 'undefined') ? hotel.phone : ''}"`,
      hotel.language,
      hotel.active ? 'Activo' : 'Inactivo',
      getCountryName(hotel.country_id),
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
        ${(hotel.phone && hotel.phone !== 'undefined') ? `<div style="font-size: 0.875rem; color: var(--text-muted);">${hotel.phone}</div>` : ''}
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
      <span class="badge badge-info">
        ${getCountryName(hotel.country_id)}
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
    
    // Check if dropdown should open upward
    setTimeout(() => {
      const dropdownContent = dropdown.querySelector('.dropdown-content');
      if (dropdownContent) {
        const rect = dropdownContent.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Check if this is the last row or only row in the table
        const tableRow = button.closest('tr');
        const tableBody = tableRow?.closest('tbody');
        const allRows = tableBody?.querySelectorAll('tr');
        const isLastRow = tableRow && allRows && tableRow === allRows[allRows.length - 1];
        const isOnlyRow = allRows && allRows.length === 1;
        
        // If dropdown would go below viewport OR it's the last/only row, position it upward
        if (rect.bottom > viewportHeight - 10 || isLastRow || isOnlyRow) {
          dropdownContent.style.top = 'auto';
          dropdownContent.style.bottom = '10%';
          dropdownContent.style.marginBottom = '4px';
        } else {
          // Reset to default position
          dropdownContent.style.top = '';
          dropdownContent.style.bottom = '';
          dropdownContent.style.marginBottom = '';
        }
      }
    }, 0);
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

async function openAddHotelModal() {
  editingHotel = null;
  document.getElementById('modal-title').textContent = 'Nuevo Hotel';
  resetForm('hotel-form');
  await loadCountriesSelect();
  openModal('hotel-modal');
}

// Función para cargar países solo en el cache (sin modificar ningún select)
async function loadCountriesCache() {
  try {
    const countries = await getCountriesAsync();
    console.log('Países cargados en cache:', countries.length);
    
    if (countries && Array.isArray(countries) && countries.length > 0) {
      countriesCache = countries;
      
      // Actualizar indicador visual del cache manager
      if (window.cacheManager) {
        setTimeout(() => window.cacheManager.updateVersionIndicator(), 100);
      }
    } else {
      console.warn('No se recibieron países válidos, usando fallback');
      // Fallback básico
      countriesCache = [
        { id: 1, name: 'Argentina', abbreviation: 'AR' },
        { id: 2, name: 'Bolivia', abbreviation: 'BO' },
        { id: 3, name: 'Brasil', abbreviation: 'BR' },
        { id: 4, name: 'Chile', abbreviation: 'CL' },
        { id: 5, name: 'Colombia', abbreviation: 'CO' },
        { id: 13, name: 'México', abbreviation: 'MX' }
      ];
    }
  } catch (error) {
    console.error('Error cargando países en cache:', error);
    // Fallback básico en caso de error
    countriesCache = [
      { id: 1, name: 'Argentina', abbreviation: 'AR' },
      { id: 2, name: 'Bolivia', abbreviation: 'BO' },
      { id: 3, name: 'Brasil', abbreviation: 'BR' },
      { id: 4, name: 'Chile', abbreviation: 'CL' },
      { id: 5, name: 'Colombia', abbreviation: 'CO' },
      { id: 13, name: 'México', abbreviation: 'MX' }
    ];
  }
}

async function loadServicesCache() {
  if (servicesCache.length > 0) {
    console.log('Usando cache de servicios existente');
    return;
  }

  try {
    console.log('Cargando servicios desde el backend...');
    const services = await getServicesAsync();
    
    if (Array.isArray(services) && services.length > 0) {
      servicesCache = services;
      console.log('Cache de servicios cargado:', servicesCache.length, 'servicios');
      
      // Actualizar localStorage para el cache manager
      if (window.cacheManager) {
        localStorage.setItem('servicesCache', JSON.stringify(services));
        setTimeout(() => window.cacheManager.updateVersionIndicator(), 100);
      }
    } else {
      console.warn('No se obtuvieron servicios del backend, usando fallback');
      // Fallback básico con servicios comunes
      servicesCache = [
        { service_code: 'BOENGINE', service_name: 'Booking Engine', description: 'Motor de reservas' },
        { service_code: 'WL', service_name: 'Waitlist', description: 'Lista de espera' },
        { service_code: 'LATE_IN', service_name: 'Late Check-in', description: 'Check-in tardío' },
        { service_code: 'LATE_OUT', service_name: 'Late Check-out', description: 'Check-out tardío' },
        { service_code: 'BL', service_name: 'Blacklist', description: 'Lista negra' },
        { service_code: 'SELF_IN', service_name: 'Self Check-in', description: 'Auto check-in' }
      ];
    }
  } catch (error) {
    console.error('Error cargando servicios:', error);
    // Fallback básico en caso de error
    servicesCache = [
      { service_code: 'BOENGINE', service_name: 'Booking Engine', description: 'Motor de reservas' },
      { service_code: 'WL', service_name: 'Waitlist', description: 'Lista de espera' },
      { service_code: 'LATE_IN', service_name: 'Late Check-in', description: 'Check-in tardío' },
      { service_code: 'LATE_OUT', service_name: 'Late Check-out', description: 'Check-out tardío' },
      { service_code: 'BL', service_name: 'Blacklist', description: 'Lista negra' },
      { service_code: 'SELF_IN', service_name: 'Self Check-in', description: 'Auto check-in' }
    ];
  }
}

async function loadCountriesSelect() {
  const countrySelect = document.getElementById('hotel-country');
  if (!countrySelect) {
    console.error('No se encontró el elemento hotel-country');
    return;
  }
  
  // Si el cache está vacío, cargarlo
  if (countriesCache.length === 0) {
    await loadCountriesCache();
  }
  
  try {
    console.log('Poblando select con países del cache:', countriesCache.length);
    
    // Limpiar opciones existentes excepto la primera
    countrySelect.innerHTML = '<option value="">Seleccionar país...</option>';
    
    // Agregar países al select
    countriesCache.forEach(country => {
      const option = document.createElement('option');
      option.value = country.id;
      option.textContent = `${country.name} (${country.abbreviation})`;
      countrySelect.appendChild(option);
    });
    
    console.log('Países agregados al select:', countrySelect.options.length - 1);
    
  } catch (error) {
    console.error('Error poblando select de países:', error);
    showToast('Error al cargar la lista de países', 'error');
  }
}

function getCountryName(countryId) {
  if (!countryId || !countriesCache.length) return 'País no especificado';
  const country = countriesCache.find(c => c.id == countryId);
  return country ? country.name : 'País no encontrado';
}

async function editHotel(id) {
  const hotel = hotelsCache.find(h => h.id === id);
  if (!hotel) return;
  
  editingHotel = hotel;
  document.getElementById('modal-title').textContent = 'Editar Hotel';
  
  // Cargar países antes de llenar el formulario
  await loadCountriesSelect();
  
  setFormData('hotel-form', {
    hotel_code: hotel.hotel_code,
    hotel_name: hotel.hotel_name,
    email: hotel.email,
    phone: (hotel.phone && hotel.phone !== 'undefined') ? hotel.phone : '',
    language: hotel.language,
    active: hotel.active,
    country_id: hotel.country_id || ''
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
  
  if (formData.phone && !validatePhone(formData.phone)) {
    showToast('Teléfono inválido. Solo se permiten números', 'error');
    return;
  }
  
  if (!formData.country_id) {
    showToast('Debe seleccionar un país', 'error');
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
  
  // Establecer el hotel actual para el botón de agregar servicio
  currentHotelIdForServices = id;
  
  // Actualizar título del modal
  document.getElementById('hotel-services-title').textContent = `Servicios de ${hotel.hotel_name}`;
  
  // Mostrar modal con spinner de carga mejorado
  const contentDiv = document.getElementById('hotel-services-content');
  contentDiv.innerHTML = '<div class="services-loading">Cargando servicios...</div>';
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
      // Crear header con información del hotel mejorado
      const hotelInfo = document.createElement('div');
      hotelInfo.className = 'hotel-info';
      hotelInfo.innerHTML = `
        <div class="hotel-info-header">
          <h4>${hotelData.data.hotel_name}</h4>
          <span class="badge badge-success">${services.length} servicios activos</span>
        </div>
        <div class="hotel-info-details">
          <div class="hotel-info-detail">
            <strong>Código:</strong> ${hotelData.data.hotel_code}
          </div>
          <div class="hotel-info-detail">
            <strong>Email:</strong> ${hotelData.data.email}
          </div>
          ${(hotelData.data.phone && hotelData.data.phone !== 'undefined') ? `
            <div class="hotel-info-detail">
              <strong>Teléfono:</strong> ${hotelData.data.phone}
            </div>
          ` : ''}
          <div class="hotel-info-detail">
            <strong>Idioma:</strong> ${getLanguageLabel(hotelData.data.language)}
          </div>
          <div class="hotel-info-detail">
            <strong>País:</strong> ${hotelData.data.country_name || 'País no especificado'}
          </div>
        </div>
      `;
      
      // Renderizar lista de servicios mejorada
      const servicesList = document.createElement('div');
      servicesList.className = 'hotel-services-list';
      
      services.forEach(service => {
        const serviceItem = document.createElement('div');
        serviceItem.className = 'service-item';
        
        const channels = [];
        if (service.send_by_email) channels.push('Email');
        if (service.send_by_whatsapp) channels.push('WhatsApp');
        
        serviceItem.innerHTML = `
          <div class="service-item-content">
            <div class="service-info">
              <div class="service-name">${service.service_name || service.service_code}</div>
              <div class="service-code">ID: ${service.service_id} | ${service.service_code}</div>
              <div class="service-channels">
                ${channels.map(channel => {
                  const channelClass = channel === 'Email' ? 'channel-email' : 'channel-whatsapp';
                  const channelIcon = channel === 'Email' ? '📧' : '📱';
                  return `<span class="channel-badge ${channelClass}">${channelIcon} ${channel}</span>`;
                }).join('')}
              </div>
              ${service.service_code === 'SELF_IN' ? `
                <div class="service-status-in">
                  <span class="status-in-badge ${service.status_in ? 'status-in-active' : 'status-in-inactive'}">
                    ${service.status_in ? '✅ StatusIN: ACTIVO' : '❌ StatusIN: INACTIVO'}
                  </span>
                  ${service.self_in_url ? `
                    <div class="service-url">
                      <span class="url-badge">
                        🔗 <a href="${service.self_in_url}" target="_blank" rel="noopener noreferrer">${service.self_in_url}</a>
                      </span>
                    </div>
                  ` : ''}
                </div>
              ` : ''}
            </div>
            <div class="service-status">
              <span class="status-badge active">✓ Activo</span>
              <div class="service-actions">
                <button class="service-action-btn edit" 
                        onclick="editHotelService(${id}, ${service.service_id}, '${service.service_code}')" 
                        title="Editar canales de comunicación">
                  ✏️
                </button>
                <button class="service-action-btn remove" 
                        onclick="removeHotelService(${id}, ${service.service_id})" 
                        title="Quitar servicio del hotel">
                  🗑️
                </button>
              </div>
            </div>
          </div>
        `;
        
        servicesList.appendChild(serviceItem);
      });
      
      contentDiv.innerHTML = '';
      contentDiv.appendChild(hotelInfo);
      contentDiv.appendChild(servicesList);
    } else {
      // Mostrar mensaje mejorado si no hay servicios
      contentDiv.innerHTML = `
        <div class="hotel-info">
          <div class="hotel-info-header">
            <h4>${hotelData.data.hotel_name}</h4>
            <span class="badge badge-secondary">Sin servicios</span>
          </div>
          <div class="hotel-info-details">
            <div class="hotel-info-detail">
              <strong>Código:</strong> ${hotelData.data.hotel_code}
            </div>
            <div class="hotel-info-detail">
              <strong>Email:</strong> ${hotelData.data.email}
            </div>
            <div class="hotel-info-detail">
              <strong>País:</strong> ${hotelData.data.country_name || 'País no especificado'}
            </div>
          </div>
        </div>
        <div class="services-empty-state">
          <p>Este hotel no tiene servicios configurados</p>
          <p style="font-size: 0.875rem; margin-top: 0.5rem; opacity: 0.7;">
            Agregue servicios para comenzar a recibir notificaciones automatizadas
          </p>
        </div>
      `;
    }
  } catch (error) {
    console.error('Error obteniendo servicios del hotel:', error);
    contentDiv.innerHTML = `
      <div class="services-empty-state" style="border-color: var(--error); color: var(--error);">
        <p>❌ Error al cargar los servicios</p>
        <p style="font-size: 0.875rem; margin-top: 0.5rem;">${error.message}</p>
        <button class="btn btn-secondary btn-sm" onclick="viewHotelServices(${id})" style="margin-top: 1rem;">
          🔄 Intentar nuevamente
        </button>
      </div>
    `;
  }
}

// Función auxiliar para obtener el ícono del canal
function getChannelIcon(channel) {
  const icons = {
    'Email': '📧',
    'WhatsApp': '📱',
    'SMS': '💬',
    'Push': '🔔'
  };
  return icons[channel] || '📌';
}

// Función auxiliar para obtener la clase del canal
function getChannelClass(channel) {
  const classes = {
    'Email': 'channel-email',
    'WhatsApp': 'channel-whatsapp',
    'SMS': 'channel-sms',
    'Push': 'channel-push'
  };
  return classes[channel] || 'channel-default';
}



// Función para actualizar el select de servicios
function updateServiceSelect(availableServices) {
  const serviceSelect = document.getElementById('service-select');
  if (!serviceSelect) return;
  
  // Limpiar opciones existentes
  serviceSelect.innerHTML = '<option value="">Seleccionar servicio...</option>';
  
  if (availableServices && availableServices.length > 0) {
    // Agregar servicios disponibles
    availableServices.forEach(service => {
      const option = document.createElement('option');
      option.value = service.service_code;
      option.textContent = `${service.service_code} - ${service.service_name}`;
      serviceSelect.appendChild(option);
    });
  } else {
    // No hay servicios disponibles para agregar
    const option = document.createElement('option');
    option.value = "";
    option.textContent = "No hay servicios disponibles para agregar";
    option.disabled = true;
    serviceSelect.appendChild(option);
  }
}

async function loadServicesSelect(excludeServiceCodes = [], selectedServiceCode = null) {
  const serviceSelect = document.getElementById('service-select');
  if (!serviceSelect) {
    console.error('No se encontró el elemento service-select');
    return;
  }

  // Cargar servicios en cache si no están cargados
  await loadServicesCache();

  // Limpiar opciones existentes
  serviceSelect.innerHTML = '<option value="">Seleccionar servicio...</option>';
  
  if (servicesCache.length === 0) {
    const noServicesOption = document.createElement('option');
    noServicesOption.value = '';
    noServicesOption.textContent = 'No hay servicios disponibles';
    noServicesOption.disabled = true;
    serviceSelect.appendChild(noServicesOption);
    return;
  }

  // Filtrar servicios que no están excluidos (ya asignados)
  const availableServices = servicesCache.filter(service => 
    !excludeServiceCodes.includes(service.service_code)
  );

  // Si estamos editando, incluir el servicio actual aunque esté "excluido"
  if (selectedServiceCode) {
    const currentService = servicesCache.find(s => s.service_code === selectedServiceCode);
    if (currentService && !availableServices.find(s => s.service_code === selectedServiceCode)) {
      availableServices.push(currentService);
    }
  }

  // Agregar servicios disponibles
  availableServices.forEach(service => {
    const option = document.createElement('option');
    option.value = service.service_code;
    option.textContent = service.service_name || service.service_code;
    serviceSelect.appendChild(option);
  });

  // Preseleccionar el servicio si se especifica
  if (selectedServiceCode) {
    serviceSelect.value = selectedServiceCode;
  }

  console.log(`Select de servicios poblado con ${availableServices.length} servicios`);
}

// Función para abrir modal de agregar servicio
async function openAddServiceModal(hotelId) {
  currentHotelIdForServices = hotelId;
  
  const hotel = hotelsCache.find(h => h.id === hotelId);
  if (!hotel) return;
  
  document.getElementById('add-service-title').textContent = `Agregar Servicio - ${hotel.hotel_name}`;
  
  // Resetear formulario
  resetAddServiceForm();
  
  // Cargar servicios disponibles dinámicamente
  try {
    // Obtener servicios ya asignados al hotel
    let assignedServiceCodes = [];
    try {
      const hotelServices = await fetchWebhook({ 
        func: 'hotels', 
        method: 'services', 
        id: hotelId 
      });
      assignedServiceCodes = hotelServices?.data?.active_services?.map(s => s.service_code) || [];
    } catch (hotelServicesError) {
      console.warn('No se pudieron obtener los servicios del hotel, mostrando todos los servicios:', hotelServicesError);
      assignedServiceCodes = [];
    }
    
    // Cargar servicios usando la nueva función
    await loadServicesSelect(assignedServiceCodes);
    
  } catch (error) {
    console.error('Error cargando servicios:', error);
    showToast('Error al cargar servicios disponibles', 'error');
    // Cargar servicios sin filtros como fallback
    await loadServicesSelect([]);
  }
  
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
  const editingServiceId = e.target.dataset.serviceId ? parseInt(e.target.dataset.serviceId) : null;
  
  // Debug logs
  console.log('=== DEBUG handleAddServiceSubmit ===');
  console.log('editingServiceId:', editingServiceId);
  console.log('formData:', formData);
  console.log('currentHotelIdForServices:', currentHotelIdForServices);

  if (!formData.service_code) {
    showToast('Debe seleccionar un servicio', 'error');
    return;
  }

  if (!formData.send_by_email && !formData.send_by_whatsapp) {
    showToast('Debe seleccionar al menos un canal de notificación', 'error');
    return;
  }

  const serviceData = {
    email: formData.send_by_email,
    whatsapp: formData.send_by_whatsapp
  };

  // Agregar statusIN, URL y configuración de campos solo para el servicio SELF_IN
  if (formData.service_code === 'SELF_IN') {
    serviceData.status_in = formData.status_in === 'true';
    serviceData.self_in_url = formData.self_in_url || '';
    
    // Agregar configuración de campos del formulario
    serviceData.fields_config = {
      country_required: formData.field_country_required === true,
      state_required: formData.field_state_required === true,
      city_required: formData.field_city_required === true,
      comments_required: formData.field_comments_required === true,
      guest_documents_required: formData.field_guest_documents_required === true,
      companion_documents_required: formData.field_companion_documents_required === true,
      license_plate_required: formData.field_license_plate_required === true
    };
    
    console.log('SELF_IN detectado - statusIN:', serviceData.status_in);
    console.log('SELF_IN detectado - URL:', serviceData.self_in_url);
    console.log('SELF_IN detectado - Configuración de campos:', serviceData.fields_config);
  }

  try {
    let result;
    if (editingServiceId) {
      // Actualizar servicio existente
      console.log('Actualizando servicio (service_id):', editingServiceId);
      result = await updateHotelServiceAsync(currentHotelIdForServices, editingServiceId, serviceData);
    } else {
      // Agregar nuevo servicio
      console.log('Agregando nuevo servicio:', formData.service_code);
      result = await addHotelServiceAsync(currentHotelIdForServices, formData.service_code, serviceData);
    }

    if (result) {
      showToast(editingServiceId ? 'Servicio actualizado correctamente' : 'Servicio agregado correctamente', 'success');
      closeModal('add-service-modal');
      resetAddServiceForm();
      // Recargar servicios del hotel
      await viewHotelServices(currentHotelIdForServices);
    } else {
      showToast(editingServiceId ? 'Error al actualizar el servicio' : 'Error al agregar el servicio', 'error');
    }
  } catch (error) {
    console.error('Error en handleAddServiceSubmit:', error);
    showToast(`Error: ${error.message}`, 'error');
  }
}

// Función para cargar la configuración de campos desde los datos del servicio
function loadFieldsConfiguration(service) {
  // Mapear los campos del backend (pueden venir con diferentes nombres)
  // El backend devuelve: field_country_required, field_state_required, etc.
  
  if (service) {
    // Intentar obtener los valores desde diferentes posibles nombres de propiedades
    const countryRequired = service.field_country_required ?? service.fields_config?.country_required ?? true;
    const stateRequired = service.field_state_required ?? service.fields_config?.state_required ?? true;
    const cityRequired = service.field_city_required ?? service.fields_config?.city_required ?? true;
    const commentsRequired = service.field_comments_required ?? service.fields_config?.comments_required ?? false;
    const guestDocsRequired = service.field_guest_documents_required ?? service.fields_config?.guest_documents_required ?? false;
    const companionDocsRequired = service.field_companion_documents_required ?? service.fields_config?.companion_documents_required ?? false;
    const licensePlateRequired = service.field_license_plate_required ?? service.fields_config?.license_plate_required ?? false;
    
    // Establecer los valores en los checkboxes
    document.getElementById('field-country-required').checked = countryRequired !== false;
    document.getElementById('field-state-required').checked = stateRequired !== false;
    document.getElementById('field-city-required').checked = cityRequired !== false;
    document.getElementById('field-comments-required').checked = commentsRequired === true;
    document.getElementById('field-guest-documents-required').checked = guestDocsRequired === true;
    document.getElementById('field-companion-documents-required').checked = companionDocsRequired === true;
    document.getElementById('field-license-plate-required').checked = licensePlateRequired === true;
    
    console.log('Configuración de campos cargada:', {
      country: countryRequired,
      state: stateRequired,
      city: cityRequired,
      comments: commentsRequired,
      guestDocs: guestDocsRequired,
      companionDocs: companionDocsRequired,
      licensePlate: licensePlateRequired
    });
  } else {
    // Si no hay datos del servicio, usar valores por defecto
    resetFieldsConfiguration();
  }
}

// Función para resetear la configuración de campos del formulario
function resetFieldsConfiguration() {
  // Resetear a valores por defecto
  const defaultCheckedFields = ['field-country-required', 'field-state-required', 'field-city-required'];
  const allFieldCheckboxes = document.querySelectorAll('.field-checkbox');
  
  allFieldCheckboxes.forEach(checkbox => {
    if (defaultCheckedFields.includes(checkbox.id)) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }
  });
}

// Función para manejar cambios en la selección de servicio
function handleServiceSelectionChange(e) {
  const selectedServiceCode = e.target.value;
  const selfInSection = document.getElementById('self-in-status-section');
  const selfInFieldsPanel = document.getElementById('self-in-fields-panel');
  
  if (selectedServiceCode === 'SELF_IN') {
    // Mostrar la sección de statusIN y el panel de campos para el servicio SELF_IN
    selfInSection.style.display = 'block';
    if (selfInFieldsPanel) {
      selfInFieldsPanel.style.display = 'block';
    }
    
  } else {
    // Ocultar la sección de statusIN y el panel de campos para otros servicios
    selfInSection.style.display = 'none';
    if (selfInFieldsPanel) {
      selfInFieldsPanel.style.display = 'none';
    }
    
    // Resetear valores de statusIN y URL
    const statusInFalse = document.getElementById('status-in-false');
    const selfInUrl = document.getElementById('self-in-url');
    if (statusInFalse) {
      statusInFalse.checked = true;
    }
    if (selfInUrl) {
      selfInUrl.value = '';
    }
    
    // Resetear checkboxes de campos configurables
    resetFieldsConfiguration();
  }
}

// Función para resetear el formulario de servicios
function resetAddServiceForm() {
  console.log('=== DEBUG resetAddServiceForm ejecutándose ===');
  const form = document.getElementById('add-service-form');
  if (form) {
    // Resetear formulario
    resetForm('add-service-form');
    
    // Restaurar estado inicial del select
    const serviceSelect = document.getElementById('service-select');
    if (serviceSelect) {
      serviceSelect.disabled = false;
      // Restaurar opciones básicas (se cargarán dinámicamente cuando se abra el modal)
      serviceSelect.innerHTML = '<option value="">Seleccionar servicio...</option>';
    }
    
    const submitBtn = document.querySelector('#add-service-form button[type="submit"]');
    if (submitBtn) {
      submitBtn.textContent = 'Agregar Servicio';
    }
    
    
  // Ocultar sección de statusIN, panel de campos y resetear a FALSE, limpiar URL
  const selfInSection = document.getElementById('self-in-status-section');
  const selfInFieldsPanel = document.getElementById('self-in-fields-panel');
  if (selfInSection) {
    selfInSection.style.display = 'none';
  }
  if (selfInFieldsPanel) {
    selfInFieldsPanel.style.display = 'none';
  }
  const statusInFalse = document.getElementById('status-in-false');
  const selfInUrl = document.getElementById('self-in-url');
  if (statusInFalse) {
    statusInFalse.checked = true;
  }
  if (selfInUrl) {
    selfInUrl.value = '';
  }
  
  // Resetear configuración de campos
  resetFieldsConfiguration();
  
    
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
    document.getElementById('add-service-title').textContent = `Editar ${service.service_name || serviceCode} - ${hotel.hotel_name}`;
    
    // Cargar servicios dinámicamente y preseleccionar el actual
    await loadServicesSelect([], serviceCode);
    
    // Deshabilitar el select para no permitir cambiar el servicio
    document.getElementById('service-select').disabled = true;
    
    // Llenar formulario con datos actuales
    document.getElementById('send-email').checked = service.send_by_email;
    document.getElementById('send-whatsapp').checked = service.send_by_whatsapp;
    
    // Manejar campo statusIN, URL y panel de campos para servicio SELF_IN
    const selfInSection = document.getElementById('self-in-status-section');
    const selfInFieldsPanel = document.getElementById('self-in-fields-panel');
    
    if (serviceCode === 'SELF_IN') {
      selfInSection.style.display = 'block';
      if (selfInFieldsPanel) {
        selfInFieldsPanel.style.display = 'block';
      }
      
      // Configurar valor de statusIN basado en los datos del servicio
      const statusInValue = service.status_in !== undefined ? service.status_in : false;
      document.getElementById('status-in-true').checked = statusInValue === true;
      document.getElementById('status-in-false').checked = statusInValue === false;
      
      // Configurar URL de redirección
      const selfInUrl = document.getElementById('self-in-url');
      if (selfInUrl) {
        selfInUrl.value = service.self_in_url || '';
      }
      
      // Cargar configuración de campos si existe
      loadFieldsConfiguration(service);
      
      console.log('Cargando statusIN para edición:', statusInValue);
      console.log('Cargando URL para edición:', service.self_in_url || '');
    } else {
      selfInSection.style.display = 'none';
      if (selfInFieldsPanel) {
        selfInFieldsPanel.style.display = 'none';
      }
    }
    
    
    // Cambiar texto del botón
    const submitBtn = document.querySelector('#add-service-form button[type="submit"]');
    submitBtn.textContent = 'Actualizar Servicio';
    
    // Guardar service_id para la actualización
    document.getElementById('add-service-form').dataset.serviceId = String(serviceId);
    
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
