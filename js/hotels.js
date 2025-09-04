// Hotels management functionality

let currentHotelsPage = 1;
let hotelsPerPage = 10;
let filteredHotels = [];
let editingHotel = null;

function initializeHotels() {
  renderHotelsTable();
  setupHotelsEventListeners();
}

function setupHotelsEventListeners() {
  // Search functionality
  const searchInput = document.getElementById('hotel-search');
  if (searchInput) {
    const debouncedSearch = debounce(handleHotelSearch, 300);
    searchInput.addEventListener('input', debouncedSearch);
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
}

function handleHotelSearch(e) {
  const query = e.target.value;
  filteredHotels = searchHotels(query);
  currentHotelsPage = 1;
  renderHotelsTable();
}

function renderHotelsTable() {
  const tbody = document.getElementById('hotels-tbody');
  const countElement = document.getElementById('hotels-count');
  
  if (!tbody) return;
  
  // Get filtered hotels if search is active, otherwise all hotels
  const searchQuery = document.getElementById('hotel-search')?.value || '';
  filteredHotels = searchQuery ? searchHotels(searchQuery) : getHotels();
  
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
        ${searchQuery ? 'No se encontraron hoteles con ese criterio' : 'No hay hoteles registrados'}
      </td>
    `;
    tbody.appendChild(emptyRow);
  }
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
        <button class="btn btn-ghost btn-sm" onclick="toggleDropdown(this)">
          <span data-lucide="more-horizontal"></span>
        </button>
        <div class="dropdown-content">
          <button class="dropdown-item" onclick="editHotel(${hotel.id})">
            <span data-lucide="edit" style="width: 16px; height: 16px; margin-right: 0.5rem;"></span>
            Editar
          </button>
          <button class="dropdown-item" onclick="viewHotelServices(${hotel.id})">
            <span data-lucide="eye" style="width: 16px; height: 16px; margin-right: 0.5rem;"></span>
            Ver Servicios
          </button>
          <button class="dropdown-item danger" onclick="deleteHotel(${hotel.id})">
            <span data-lucide="trash-2" style="width: 16px; height: 16px; margin-right: 0.5rem;"></span>
            Eliminar
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
  const hotel = getHotels().find(h => h.id === id);
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

function handleHotelSubmit(e) {
  e.preventDefault();
  
  const formData = getFormData('hotel-form');
  
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
  const existingHotel = getHotels().find(h => 
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
      updateHotel(editingHotel.id, formData);
      showToast('Hotel actualizado correctamente', 'success');
    } else {
      // Create new hotel
      addHotel(formData);
      showToast('Hotel creado correctamente', 'success');
    }
    
    closeModal('hotel-modal');
    renderHotelsTable();
    
  } catch (error) {
    showToast('Error al guardar el hotel', 'error');
  }
}

function deleteHotel(id) {
  const hotel = getHotels().find(h => h.id === id);
  if (!hotel) return;
  
  if (confirm(`¿Estás seguro de que quieres eliminar el hotel "${hotel.hotel_name}"?`)) {
    try {
      deleteHotel(id);
      showToast('Hotel eliminado correctamente', 'success');
      renderHotelsTable();
    } catch (error) {
      showToast('Error al eliminar el hotel', 'error');
    }
  }
}

function viewHotelServices(id) {
  const hotel = getHotels().find(h => h.id === id);
  if (!hotel) return;
  
  showToast(`Ver servicios de ${hotel.hotel_name} - Funcionalidad pendiente de implementar`, 'info');
}