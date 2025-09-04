// Reports functionality

function initializeReports() {
  setupReportsEventListeners();
  setDefaultDateRange();
  updateReportsCharts();
}

function setupReportsEventListeners() {
  const applyBtn = document.getElementById('apply-filters');
  if (applyBtn) {
    applyBtn.addEventListener('click', handleApplyFilters);
  }
}

function setDefaultDateRange() {
  const today = new Date();
  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 7);
  
  const dateFrom = document.getElementById('date-from');
  const dateTo = document.getElementById('date-to');
  
  if (dateFrom) {
    dateFrom.value = lastWeek.toISOString().split('T')[0];
  }
  
  if (dateTo) {
    dateTo.value = today.toISOString().split('T')[0];
  }
}

function handleApplyFilters() {
  const dateFrom = document.getElementById('date-from')?.value;
  const dateTo = document.getElementById('date-to')?.value;
  
  if (!dateFrom || !dateTo) {
    showToast('Por favor selecciona ambas fechas', 'error');
    return;
  }
  
  if (new Date(dateFrom) > new Date(dateTo)) {
    showToast('La fecha de inicio no puede ser posterior a la fecha final', 'error');
    return;
  }
  
  showToast('Aplicando filtros...', 'info');
  
  // Simulate loading delay
  setTimeout(() => {
    updateReportsCharts();
    showToast('Reportes actualizados', 'success');
  }, 1000);
}