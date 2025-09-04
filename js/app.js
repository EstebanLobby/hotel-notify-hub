// Main application logic

let currentView = 'dashboard';

document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
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
  
  // Initialize dashboard metrics
  updateDashboardMetrics();
  
  // Initialize components based on current view
  initializeCurrentView();
  
  // Setup periodic updates (every 30 seconds)
  setInterval(updateDashboardMetrics, 30000);
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