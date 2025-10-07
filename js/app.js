// Main application logic

let currentView = 'dashboard';

document.addEventListener('DOMContentLoaded', function() {
  // Inicializar sistema de cache primero
  if (window.cacheManager) {
    window.cacheManager.initialize();
  }
  
  // Inicializar autenticación
  initializeAuth();
});

function initializeApp() {
  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
  
  // Setup navigation
  setupNavigation();
  
  // Setup sidebar toggle for mobile
  setupSidebarToggle();
  
  // Setup cache management buttons
  setupCacheManagement();
  
  // Add logout button to sidebar
  addLogoutButton();
  
  // Initialize dashboard metrics
  updateDashboardMetrics();
  
  // Setup periodic updates (every 30 seconds)
  setInterval(updateDashboardMetrics, 30000);
  
  // Verificar sesión periódicamente (cada 5 minutos)
  setInterval(verifySession, 300000);
}

function setupNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const route = link.dataset.route;
      if (route) {
        navigateToView(route);
      }
    });
  });
  
  // Handle browser back/forward buttons
  window.addEventListener('popstate', (e) => {
    const route = e.state?.route || 'dashboard';
    navigateToView(route, false);
  });
  
  // Set initial route
  const hash = window.location.hash.substring(1);
  const initialRoute = hash || 'dashboard';
  navigateToView(initialRoute, false);
}

function navigateToView(viewName, pushState = true) {
  // Hide all views
  document.querySelectorAll('.view').forEach(view => {
    view.classList.remove('active');
  });
  
  // Show target view
  const targetView = document.getElementById(`${viewName}-view`);
  if (targetView) {
    targetView.classList.add('active');
    currentView = viewName;
    
    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`[data-route="${viewName}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
    
    // Update page title
    const pageTitle = document.getElementById('page-title');
    const titles = {
      'dashboard': 'Dashboard',
      'hotels': 'Hoteles',
      'services': 'Servicios',
      'reports': 'Reportes'
    };
    
    if (pageTitle && titles[viewName]) {
      pageTitle.textContent = titles[viewName];
    }
    
    // Update browser history
    if (pushState) {
      window.history.pushState({ route: viewName }, '', `#${viewName}`);
    }
    
    // Initialize view-specific functionality
    initializeCurrentView();
    
    // Close sidebar on mobile after navigation
    closeSidebar();
  }
}

function initializeCurrentView() {
  switch (currentView) {
    case 'dashboard':
      initializeCharts();
      break;
    case 'hotels':
      initializeHotels();
      break;
    case 'services':
      initializeServices();
      break;
    case 'reports':
      initializeReports();
      break;
  }
  
  // Re-initialize Lucide icons for dynamically added content
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

function setupSidebarToggle() {
  const toggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  
  if (toggle && sidebar) {
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 768 && 
          !sidebar.contains(e.target) && 
          !toggle.contains(e.target) &&
          sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
      }
    });
  }
}

function closeSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar && window.innerWidth <= 768) {
    sidebar.classList.remove('open');
  }
}

function updateDashboardMetrics() {
  const metrics = getDashboardMetrics();
  
  // Update metric values
  const totalHotelsElement = document.getElementById('total-hotels');
  const totalNotificationsElement = document.getElementById('total-notifications');
  const successRateElement = document.getElementById('success-rate');
  const activeServicesElement = document.getElementById('active-services');
  
  if (totalHotelsElement) {
    animateNumber(totalHotelsElement, metrics.activeHotels);
  }
  
  if (totalNotificationsElement) {
    animateNumber(totalNotificationsElement, metrics.totalNotifications);
  }
  
  if (successRateElement) {
    animateNumber(successRateElement, metrics.successRate, '%');
  }
  
  if (activeServicesElement) {
    animateNumber(activeServicesElement, metrics.activeServices);
  }
  
  // Update charts if we're on the dashboard
  if (currentView === 'dashboard') {
    updateDashboardCharts();
  }
}

function animateNumber(element, targetValue, suffix = '') {
  const startValue = parseInt(element.textContent) || 0;
  const duration = 1000; // 1 second
  const startTime = performance.now();
  
  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function (ease-out)
    const easeOut = 1 - Math.pow(1 - progress, 3);
    
    const currentValue = Math.round(startValue + (targetValue - startValue) * easeOut);
    element.textContent = currentValue + suffix;
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }
  
  requestAnimationFrame(animate);
}

// Setup cache management buttons
function setupCacheManagement() {
  // Botón de información de caché
  const cacheInfoBtn = document.getElementById('cache-info-btn');
  if (cacheInfoBtn) {
    cacheInfoBtn.addEventListener('click', function() {
      if (window.cacheManager) {
        showCacheInfoModal();
      } else {
        showToast('Sistema de caché no disponible', 'warning');
      }
    });
  }
  
  // Botón de actualización forzada
  const forceRefreshBtn = document.getElementById('force-refresh-btn');
  if (forceRefreshBtn) {
    forceRefreshBtn.addEventListener('click', function() {
      if (confirm('¿Estás seguro de que quieres forzar la actualización? Esto limpiará el caché y recargará la página.')) {
        if (window.cacheManager) {
          window.cacheManager.forceUpdate();
        } else {
          // Fallback manual
          localStorage.clear();
          sessionStorage.clear();
          window.location.reload(true);
        }
      }
    });
  }
}

// Show cache info modal
function showCacheInfoModal() {
  const cacheInfo = window.cacheManager.getCacheInfo();
  if (!cacheInfo) return;
  
  // Actualizar información básica
  document.getElementById('cache-current-version').textContent = cacheInfo.version;
  document.getElementById('cache-stored-version').textContent = `Almacenada: ${cacheInfo.storedVersion || 'ninguna'}`;
  document.getElementById('cache-last-update').textContent = cacheInfo.lastUpdate.toLocaleString();
  document.getElementById('cache-total-size').textContent = cacheInfo.cacheSize;
  document.getElementById('cache-items-count').textContent = `${cacheInfo.cachedItems.length} elementos`;
  
  // Generar lista de elementos
  const container = document.getElementById('cache-items-container');
  container.innerHTML = '';
  
  if (cacheInfo.cachedItems.length > 0) {
    cacheInfo.cachedItems.forEach(item => {
      const displayInfo = {
        'countriesCache': { icon: '🌍', name: 'Países', desc: 'Lista de países disponibles' },
        'servicesCache': { icon: '🔧', name: 'Servicios', desc: 'Servicios de hotel configurables' },
        'hotelsCache': { icon: '🏨', name: 'Hoteles', desc: 'Datos de hoteles registrados' },
        'userPreferences': { icon: '⚙️', name: 'Preferencias', desc: 'Configuraciones del usuario' },
        'dashboardSettings': { icon: '📊', name: 'Dashboard', desc: 'Configuraciones del panel' }
      }[item.key] || { icon: '📄', name: item.key, desc: 'Elemento de caché' };
      
      const itemElement = document.createElement('div');
      itemElement.className = 'cache-item';
      itemElement.innerHTML = `
        <div class="cache-item-info">
          <div class="cache-item-icon">${displayInfo.icon}</div>
          <div class="cache-item-details">
            <h5>${displayInfo.name}</h5>
            <p>${displayInfo.desc}</p>
          </div>
        </div>
        <div class="cache-item-stats">
          <div class="cache-item-count">${item.count} items</div>
          <div class="cache-item-size">${item.size}</div>
        </div>
      `;
      container.appendChild(itemElement);
    });
  } else {
    container.innerHTML = `
      <div class="cache-empty-state">
        <div class="empty-icon">📭</div>
        <p>Sin datos en caché</p>
        <small>Los datos se cargarán automáticamente al usar la aplicación</small>
      </div>
    `;
  }
  
  // Mostrar release notes de las versiones recientes
  const releaseNotesContainer = document.getElementById('cache-release-notes');
  const { current, previous } = cacheInfo.recentVersions;
  const currentReleaseInfo = window.cacheManager.releaseNotes[current];
  const previousReleaseInfo = previous ? window.cacheManager.releaseNotes[previous] : null;
  
  if (currentReleaseInfo || previousReleaseInfo) {
    let releaseNotesHTML = '<h4>📋 Historial de Versiones</h4>';
    
    // Mostrar versión actual
    if (currentReleaseInfo) {
      releaseNotesHTML += `
        <div class="version-section current-version">
          <h5>
            🆕 Versión Actual - ${current}
            <span class="cache-release-date">${currentReleaseInfo.date}</span>
          </h5>
          <div class="cache-release-highlights">
            <strong>${currentReleaseInfo.title}</strong>
            <ul>
              ${(currentReleaseInfo.highlights || currentReleaseInfo.changes || []).map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>
          ${(currentReleaseInfo.technical && currentReleaseInfo.technical.length > 0) ? `
            <details class="cache-release-technical">
              <summary>🔧 Detalles técnicos</summary>
              <ul>
                ${currentReleaseInfo.technical.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </details>
          ` : ''}
        </div>
      `;
    }
    
    // Mostrar versión anterior si existe
    if (previousReleaseInfo) {
      releaseNotesHTML += `
        <div class="version-section previous-version">
          <h5>
            📜 Versión Anterior - ${previous}
            <span class="cache-release-date">${previousReleaseInfo.date}</span>
          </h5>
          <div class="cache-release-highlights">
            <strong>${previousReleaseInfo.title}</strong>
            <ul>
              ${(previousReleaseInfo.highlights || previousReleaseInfo.changes || []).slice(0, 3).map(item => `<li>${item}</li>`).join('')}
              ${(previousReleaseInfo.highlights || previousReleaseInfo.changes || []).length > 3 ? '<li><em>... y más mejoras</em></li>' : ''}
            </ul>
          </div>
          ${(previousReleaseInfo.technical && previousReleaseInfo.technical.length > 0) ? `
            <details class="cache-release-technical">
              <summary>🔧 Detalles técnicos (${previousReleaseInfo.technical.length} elementos)</summary>
              <ul>
                ${previousReleaseInfo.technical.slice(0, 3).map(item => `<li>${item}</li>`).join('')}
                ${previousReleaseInfo.technical.length > 3 ? '<li><em>... y más mejoras técnicas</em></li>' : ''}
              </ul>
            </details>
          ` : ''}
        </div>
      `;
    }
    
    releaseNotesContainer.innerHTML = releaseNotesHTML;
    releaseNotesContainer.classList.add('show');
  } else {
    releaseNotesContainer.classList.remove('show');
  }
  
  // Mostrar modal
  const modal = document.getElementById('cache-info-modal');
  const modalContent = modal.querySelector('.cache-info-modal-content');
  
  modal.style.display = 'flex';
  
  // Setup close handlers
  const closeBtn = document.getElementById('close-cache-info');
  
  const closeModal = () => {
    modalContent.classList.add('closing');
    setTimeout(() => {
      modal.style.display = 'none';
      modalContent.classList.remove('closing');
    }, 200);
  };
  
  closeBtn.onclick = closeModal;
  
  // Close on background click
  modal.onclick = (event) => {
    if (event.target === modal) {
      closeModal();
    }
  };
  
  // Prevent closing when clicking on modal content
  modalContent.onclick = (event) => {
    event.stopPropagation();
  };
  
  // Close with Escape key
  const handleEscape = (event) => {
    if (event.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', handleEscape);
    }
  };
  
  document.addEventListener('keydown', handleEscape);
}

// Global error handler
window.addEventListener('error', (e) => {
  console.error('Application error:', e.error);
  showToast('Ha ocurrido un error inesperado', 'error');
});

// Handle offline/online status
window.addEventListener('online', () => {
  showToast('Conexión restablecida', 'success');
});

window.addEventListener('offline', () => {
  showToast('Sin conexión a internet', 'error');
});