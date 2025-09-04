// Chart functions using Chart.js

let notificationsChart = null;
let servicesChart = null;
let hotelsMetricsChart = null;
let serviceUsageChart = null;

function initializeCharts() {
  createNotificationsChart();
  // Ejecutar de forma asíncrona sin bloquear UI
  createServicesChart();
}

function createNotificationsChart() {
  const ctx = document.getElementById('notifications-chart');
  if (!ctx) return;
  
  const data = getNotifications();
  
  if (notificationsChart) {
    notificationsChart.destroy();
  }
  
  notificationsChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map(d => new Date(d.date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })),
      datasets: [{
        label: 'Notificaciones',
        data: data.map(d => d.count),
        borderColor: 'hsl(217, 91%, 60%)',
        backgroundColor: 'hsl(217, 91%, 60%, 0.1)',
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'hsl(220, 13%, 91%)'
          }
        },
        x: {
          grid: {
            color: 'hsl(220, 13%, 91%)'
          }
        }
      }
    }
  });
}

async function createServicesChart() {
  const ctx = document.getElementById('services-chart');
  if (!ctx) return;
  
  let data = [];
  try {
    // Intentar usar datos reales del webhook (últimos 7 días por defecto)
    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);
    data = await getServiceUsageAsync({
      from: lastWeek.toISOString().split('T')[0],
      to: today.toISOString().split('T')[0]
    });
    if (!Array.isArray(data) || data.length === 0) {
      data = getServiceUsage();
    }
  } catch (_) {
    data = getServiceUsage();
  }
  
  if (servicesChart) {
    servicesChart.destroy();
  }
  
  servicesChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: data.map(d => d.service),
      datasets: [{
        data: data.map(d => d.count),
        backgroundColor: [
          'hsl(217, 91%, 60%)',
          'hsl(142, 76%, 36%)',
          'hsl(43, 96%, 56%)',
          'hsl(0, 84%, 60%)'
        ],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 20,
            usePointStyle: true
          }
        }
      }
    }
  });
}

function createHotelsMetricsChart() {
  const ctx = document.getElementById('hotels-metrics-chart');
  if (!ctx) return;
  
  const hotels = getHotels().filter(h => h.active).slice(0, 5);
  
  if (hotelsMetricsChart) {
    hotelsMetricsChart.destroy();
  }
  
  hotelsMetricsChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: hotels.map(h => h.hotel_name),
      datasets: [{
        label: 'Notificaciones Enviadas',
        data: hotels.map(() => Math.floor(Math.random() * 100) + 20), // Mock data
        backgroundColor: 'hsl(217, 91%, 60%)',
        borderRadius: 4
      }, {
        label: 'Notificaciones Exitosas',
        data: hotels.map(() => Math.floor(Math.random() * 80) + 15), // Mock data
        backgroundColor: 'hsl(142, 76%, 36%)',
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'hsl(220, 13%, 91%)'
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      },
      plugins: {
        legend: {
          position: 'top'
        }
      }
    }
  });
}

async function createServiceUsageChart() {
  const ctx = document.getElementById('service-usage-chart');
  if (!ctx) return;
  
  // Intentar leer fechas del filtro si existen en la vista de reportes
  const dateFrom = document.getElementById('date-from')?.value;
  const dateTo = document.getElementById('date-to')?.value;
  
  let data = [];
  try {
    if (dateFrom && dateTo) {
      data = await getServiceUsageAsync({ from: dateFrom, to: dateTo });
    } else {
      const today = new Date();
      const lastWeek = new Date(today);
      lastWeek.setDate(today.getDate() - 7);
      data = await getServiceUsageAsync({
        from: lastWeek.toISOString().split('T')[0],
        to: today.toISOString().split('T')[0]
      });
    }
    if (!Array.isArray(data) || data.length === 0) {
      data = getServiceUsage();
    }
  } catch (_) {
    data = getServiceUsage();
  }
  
  if (serviceUsageChart) {
    serviceUsageChart.destroy();
  }
  
  serviceUsageChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(d => d.service),
      datasets: [{
        label: 'Uso por Servicio',
        data: data.map(d => d.count),
        backgroundColor: [
          'hsl(217, 91%, 60%)',
          'hsl(142, 76%, 36%)',
          'hsl(43, 96%, 56%)',
          'hsl(0, 84%, 60%)'
        ],
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      scales: {
        x: {
          beginAtZero: true,
          grid: {
            color: 'hsl(220, 13%, 91%)'
          }
        },
        y: {
          grid: {
            display: false
          }
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
}

function updateDashboardCharts() {
  createNotificationsChart();
  createServicesChart();
}

async function updateReportsCharts() {
  createHotelsMetricsChart();
  await createServiceUsageChart();
}