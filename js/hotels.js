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

function viewHotelServices(id) {
  const hotel = hotelsCache.find(h => h.id === id);
  if (!hotel) return;
  
  showToast(`Ver servicios de ${hotel.hotel_name} - Funcionalidad pendiente de implementar`, 'info');
}

// Make functions globally available for onclick handlers
window.toggleDropdown = toggleDropdown;
window.editHotel = editHotel;
window.viewHotelServices = viewHotelServices;
window.deleteHotel = deleteHotel;
