// Utility functions

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function getLanguageLabel(language) {
  const labels = {
    'es': 'Español',
    'en': 'English',
    'pt': 'Português'
  };
  return labels[language] || language;
}

function createElement(tag, className = '', textContent = '') {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (textContent) element.textContent = textContent;
  return element;
}

function showToast(message, type = 'info') {
  // Simple toast implementation
  const toast = createElement('div', `toast toast-${type}`, message);
  document.body.appendChild(toast);
  
  // Position toast
  toast.style.position = 'fixed';
  toast.style.top = '20px';
  toast.style.right = '20px';
  toast.style.padding = '12px 24px';
  toast.style.backgroundColor = type === 'success' ? 'var(--success)' : 
                                type === 'error' ? 'var(--error)' : 'var(--primary)';
  toast.style.color = 'white';
  toast.style.borderRadius = '0.375rem';
  toast.style.boxShadow = 'var(--shadow-hover)';
  toast.style.zIndex = '9999';
  toast.style.transform = 'translateX(100%)';
  toast.style.transition = 'transform 0.3s ease';
  
  // Animate in
  setTimeout(() => {
    toast.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 3 seconds
  setTimeout(() => {
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 3000);
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validateHotelCode(code) {
  // Alphanumeric only, 3-20 characters, lowercase only
  const re = /^[a-z0-9]{3,20}$/;
  return re.test(code);
}

function validatePhone(phone) {
  // Solo números
  const re = /^\d+$/;
  return re.test(phone);
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function paginate(array, pageSize, currentPage) {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return {
    items: array.slice(startIndex, endIndex),
    totalPages: Math.ceil(array.length / pageSize),
    currentPage,
    totalItems: array.length
  };
}

function renderPagination(containerId, totalPages, currentPage, onPageChange) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  container.innerHTML = '';
  
  if (totalPages <= 1) return;
  
  const paginationInfo = createElement('div', 'pagination-info');
  paginationInfo.textContent = `Página ${currentPage} de ${totalPages}`;
  
  const controls = createElement('div', 'pagination-controls');
  
  // Previous button
  const prevBtn = createElement('button', 'btn btn-secondary btn-sm');
  prevBtn.textContent = 'Anterior';
  prevBtn.disabled = currentPage === 1;
  prevBtn.onclick = () => onPageChange(currentPage - 1);
  
  // Next button
  const nextBtn = createElement('button', 'btn btn-secondary btn-sm');
  nextBtn.textContent = 'Siguiente';
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.onclick = () => onPageChange(currentPage + 1);
  
  controls.appendChild(prevBtn);
  controls.appendChild(nextBtn);
  
  container.appendChild(paginationInfo);
  container.appendChild(controls);
}

// Modal utilities
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

// Form utilities
function getFormData(formId) {
  const form = document.getElementById(formId);
  const formData = new FormData(form);
  const data = {};
  
  // Primero procesar los campos habilitados (que están en FormData)
  for (const [key, value] of formData.entries()) {
    if (form.querySelector(`[name="${key}"]`).type === 'checkbox') {
      data[key] = form.querySelector(`[name="${key}"]`).checked;
    } else {
      data[key] = value;
    }
  }
  
  // Luego agregar los campos deshabilitados que no están en FormData
  const allFields = form.querySelectorAll('[name]');
  allFields.forEach(field => {
    if (field.disabled && !(field.name in data)) {
      if (field.type === 'checkbox') {
        data[field.name] = field.checked;
      } else {
        data[field.name] = field.value;
      }
    }
  });
  
  return data;
}

function resetForm(formId) {
  const form = document.getElementById(formId);
  if (form) {
    form.reset();
  }
}

function setFormData(formId, data) {
  const form = document.getElementById(formId);
  if (!form) return;
  
  Object.keys(data).forEach(key => {
    const field = form.querySelector(`[name="${key}"]`);
    if (field) {
      if (field.type === 'checkbox') {
        field.checked = data[key];
      } else {
        field.value = data[key];
      }
    }
  });
}