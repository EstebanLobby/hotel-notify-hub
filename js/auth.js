// Authentication functionality

// Variables globales de autenticación
let sessionKey = null;
let isAuthenticated = false;

// Función para inicializar la autenticación
function initializeAuth() {
  // Verificar si hay una sesión guardada
  const savedKey = localStorage.getItem('hotel_notify_session_key');
  if (savedKey) {
    sessionKey = savedKey;
    isAuthenticated = true;
    showApp();
    return;
  }
  
  // Si no hay sesión, mostrar login
  showLogin();
}

// Función para mostrar el login
function showLogin() {
  document.getElementById('login-modal').style.display = 'flex';
  document.getElementById('app').style.display = 'none';
  
  // Configurar event listeners
  setupLoginListeners();
}

// Función para mostrar la aplicación
function showApp() {
  document.getElementById('login-modal').style.display = 'none';
  document.getElementById('app').style.display = 'flex';
  
  // Inicializar la aplicación
  if (typeof initializeApp === 'function') {
    initializeApp();
  }
}

// Función para configurar los event listeners del login
function setupLoginListeners() {
  const loginForm = document.getElementById('login-form');
  const togglePasswordBtn = document.getElementById('toggle-password');
  const passwordInput = document.getElementById('password');
  
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
  
  if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener('click', () => {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      
      const icon = togglePasswordBtn.querySelector('span');
      icon.setAttribute('data-lucide', type === 'password' ? 'eye' : 'eye-off');
      lucide.createIcons();
    });
  }
}

// Función para manejar el login
async function handleLogin(e) {
  e.preventDefault();
  
  const password = document.getElementById('password').value;
  const submitBtn = e.target.querySelector('button[type="submit"]');
  const errorDiv = document.getElementById('login-error');
  
  // Mostrar loading
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<span data-lucide="loader-2" style="width: 1rem; height: 1rem; margin-right: 0.5rem; animation: spin 1s linear infinite;"></span>Iniciando sesión...';
  submitBtn.disabled = true;
  
  // Ocultar error anterior
  if (errorDiv) {
    errorDiv.style.display = 'none';
    errorDiv.classList.remove('show');
  }
  
  try {
    // Llamar al webhook para autenticación
    const response = await fetchWebhook({
      func: 'auth',
      method: 'login',
      password: password
    });
    
    if (response && response.success && response.session_key) {
      // Login exitoso
      sessionKey = response.session_key;
      isAuthenticated = true;
      
      // Guardar la key y información adicional en localStorage
      localStorage.setItem('hotel_notify_session_key', sessionKey);
      if (response.expires_at) {
        localStorage.setItem('hotel_notify_session_expires', response.expires_at);
      }
      
      // Mostrar mensaje de éxito con información del cliente
      const clientInfo = response.client_info;
      const country = clientInfo?.country ? ` (${clientInfo.country})` : '';
      showToast(`Sesión iniciada correctamente${country}`, 'success');
      
      // Mostrar la aplicación
      showApp();
      
    } else {
      // Login fallido
      const errorMessage = response?.message || 'Credenciales incorrectas';
      const attemptsRemaining = response?.attempts_remaining;
      
      if (attemptsRemaining && attemptsRemaining > 0) {
        throw new Error(`${errorMessage}. Intentos restantes: ${attemptsRemaining}`);
      } else {
        throw new Error(errorMessage);
      }
    }
    
  } catch (error) {
    console.error('Error en login:', error);
    
    // Mostrar error
    if (errorDiv) {
      const errorText = errorDiv.querySelector('.error-text');
      if (errorText) {
        errorText.textContent = error.message || 'Error al iniciar sesión';
      } else {
        errorDiv.textContent = error.message || 'Error al iniciar sesión';
      }
      errorDiv.style.display = 'flex';
      errorDiv.classList.add('show');
    }
    
    showToast('Error al iniciar sesión', 'error');
  } finally {
    // Restaurar botón
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
    lucide.createIcons();
  }
}

// Función para cerrar sesión
function logout() {
  // Limpiar variables
  sessionKey = null;
  isAuthenticated = false;
  
  // Limpiar localStorage
  localStorage.removeItem('hotel_notify_session_key');
  localStorage.removeItem('hotel_notify_session_expires');
  
  // Mostrar mensaje
  showToast('Sesión cerrada correctamente', 'info');
  
  // Mostrar login
  showLogin();
}

// Función para obtener la key de sesión
function getSessionKey() {
  return sessionKey;
}

// Función para verificar si está autenticado
function isUserAuthenticated() {
  return isAuthenticated && sessionKey !== null;
}

// Función para agregar la key de sesión a las llamadas del webhook
function addSessionKeyToWebhook(params) {
  if (sessionKey) {
    params.session_key = sessionKey;
  }
  return params;
}

// Función para verificar la sesión con el servidor
async function verifySession() {
  if (!sessionKey) return false;
  
  // Verificar expiración local primero
  const expiresAt = localStorage.getItem('hotel_notify_session_expires');
  if (expiresAt) {
    const expirationDate = new Date(expiresAt);
    if (new Date() > expirationDate) {
      console.log('Sesión expirada localmente');
      logout();
      return false;
    }
  }
  
  try {
    const response = await fetchWebhook({
      func: 'auth',
      method: 'verify',
      session_key: sessionKey
    });
    
    if (response && response.success) {
      return true;
    } else {
      // Sesión inválida, cerrar sesión
      console.log('Sesión inválida en servidor:', response?.message);
      logout();
      return false;
    }
  } catch (error) {
    console.error('Error verificando sesión:', error);
    logout();
    return false;
  }
}

// Función para agregar botón de logout al sidebar
function addLogoutButton() {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;
  
  // Buscar si ya existe el botón de logout
  let logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) return;
  
  // Crear contenedor para información de sesión
  const sessionInfo = document.createElement('div');
  sessionInfo.id = 'session-info';
  sessionInfo.style.cssText = `
    margin-top: auto; 
    padding: 1.5rem 1rem; 
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));
    backdrop-filter: blur(10px);
  `;
  
  // Información de sesión
  const expiresAt = localStorage.getItem('hotel_notify_session_expires');
  const sessionKey = localStorage.getItem('hotel_notify_session_key');
  
  if (expiresAt && sessionKey) {
    const expirationDate = new Date(expiresAt);
    const timeLeft = expirationDate - new Date();
    const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    
    // Determinar el color según el tiempo restante
    let timeColor = '#10b981'; // Verde por defecto
    if (timeLeft < 30 * 60 * 1000) { // Menos de 30 minutos
      timeColor = '#ef4444'; // Rojo
    } else if (timeLeft < 2 * 60 * 60 * 1000) { // Menos de 2 horas
      timeColor = '#f59e0b'; // Amarillo
    }
    
    sessionInfo.innerHTML = `
      <div style="
        background: rgba(255, 255, 255, 0.08);
        border-radius: 0.75rem;
        padding: 1rem;
        margin-bottom: 1rem;
        border: 1px solid rgba(255, 255, 255, 0.1);
      ">
        <div style="
          display: flex; 
          align-items: center; 
          gap: 0.5rem; 
          margin-bottom: 0.75rem;
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.875rem;
          font-weight: 500;
        ">
          <div style="
            width: 0.5rem; 
            height: 0.5rem; 
            background: ${timeColor}; 
            border-radius: 50%;
            box-shadow: 0 0 8px ${timeColor};
          "></div>
          <span data-lucide="shield-check" style="width: 1rem; height: 1rem; color: rgba(255, 255, 255, 0.7);"></span>
          <span>Sesión Activa</span>
        </div>
        <div style="
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.75rem;
        ">
          <span data-lucide="clock" style="width: 0.875rem; height: 0.875rem;"></span>
          <span style="color: ${timeColor}; font-weight: 600;">
            Expira en: ${hoursLeft}h ${minutesLeft}m
          </span>
        </div>
      </div>
    `;
  }
  
  // Crear botón de logout
  logoutBtn = document.createElement('button');
  logoutBtn.id = 'logout-btn';
  logoutBtn.style.cssText = `
    width: 100%; 
    padding: 0.875rem 1rem; 
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.2);
    border-radius: 0.75rem;
    color: rgba(239, 68, 68, 0.9);
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  `;
  logoutBtn.innerHTML = '<span data-lucide="log-out" style="width: 1rem; height: 1rem;"></span>Cerrar Sesión';
  
  // Agregar efectos hover
  logoutBtn.addEventListener('mouseenter', function() {
    this.style.background = 'rgba(239, 68, 68, 0.2)';
    this.style.borderColor = 'rgba(239, 68, 68, 0.4)';
    this.style.transform = 'translateY(-1px)';
  });
  
  logoutBtn.addEventListener('mouseleave', function() {
    this.style.background = 'rgba(239, 68, 68, 0.1)';
    this.style.borderColor = 'rgba(239, 68, 68, 0.2)';
    this.style.transform = 'translateY(0)';
  });
  
  logoutBtn.addEventListener('click', logout);
  
  // Agregar al sidebar
  sessionInfo.appendChild(logoutBtn);
  sidebar.appendChild(sessionInfo);
  
  // Crear iconos
  lucide.createIcons();
  
  // Actualizar información de sesión cada minuto
  setInterval(updateSessionInfo, 60000);
}

// Función para actualizar la información de sesión
function updateSessionInfo() {
  const sessionInfo = document.getElementById('session-info');
  if (!sessionInfo) return;
  
  const expiresAt = localStorage.getItem('hotel_notify_session_expires');
  if (!expiresAt) return;
  
  const expirationDate = new Date(expiresAt);
  const timeLeft = expirationDate - new Date();
  
  if (timeLeft <= 0) {
    logout();
    return;
  }
  
  const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  
  const timeElement = sessionInfo.querySelector('div:last-child');
  if (timeElement) {
    timeElement.textContent = `Expira en: ${hoursLeft}h ${minutesLeft}m`;
  }
}

// Modificar la función fetchWebhook para incluir la key de sesión
const originalFetchWebhook = window.fetchWebhook;
if (originalFetchWebhook) {
  window.fetchWebhook = function(params) {
    // Agregar la key de sesión si está disponible
    if (isUserAuthenticated()) {
      params = addSessionKeyToWebhook(params);
    }
    return originalFetchWebhook(params);
  };
}

// Hacer funciones globalmente disponibles
window.initializeAuth = initializeAuth;
window.logout = logout;
window.getSessionKey = getSessionKey;
window.isUserAuthenticated = isUserAuthenticated;
window.verifySession = verifySession;
