// Services management functionality

function initializeServices() {
  renderServicesTable();
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
        ${service.active ? 'Activo' : 'Inactivo'}
      </span>
    </td>
    <td>
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <span style="font-weight: 500;">${subscribedCount}</span>
        <button class="btn btn-ghost btn-sm" onclick="viewServiceHotels('${service.service_code}')" style="padding: 0.25rem;">
          <span data-lucide="eye"></span>
        </button>
      </div>
    </td>
    <td>
      <div class="dropdown">
        <button class="btn btn-ghost btn-sm" onclick="toggleDropdown(this)">
          <span data-lucide="more-horizontal"></span>
        </button>
        <div class="dropdown-content">
          <button class="dropdown-item" onclick="toggleService('${service.service_code}')">
            <span data-lucide="${service.active ? 'pause' : 'play'}" style="width: 16px; height: 16px; margin-right: 0.5rem;"></span>
            ${service.active ? 'Desactivar' : 'Activar'}
          </button>
          <button class="dropdown-item" onclick="viewServiceHotels('${service.service_code}')">
            <span data-lucide="building" style="width: 16px; height: 16px; margin-right: 0.5rem;"></span>
            Ver Hoteles
          </button>
        </div>
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

function viewServiceHotels(serviceCode) {
  const service = getServices().find(s => s.service_code === serviceCode);
  const hotels = getHotels().filter(hotel => 
    hotel.active_services?.some(as => as.service_code === serviceCode)
  );
  
  if (!service) return;
  
  let message = `Servicio: ${service.service_name}\n\nHoteles suscritos:\n`;
  if (hotels.length === 0) {
    message += 'Ningún hotel está suscrito a este servicio';
  } else {
    hotels.forEach(hotel => {
      const serviceConfig = hotel.active_services.find(as => as.service_code === serviceCode);
      message += `• ${hotel.hotel_name} (${hotel.hotel_code})\n`;
      message += `  Email: ${serviceConfig.send_by_email ? 'Sí' : 'No'}, WhatsApp: ${serviceConfig.send_by_whatsapp ? 'Sí' : 'No'}\n`;
    });
  }
  
  alert(message);
}