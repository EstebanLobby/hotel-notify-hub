/**
 * Sistema de Tutorial Interactivo
 * Guía paso a paso para usuarios nuevos usando Intro.js
 */

class TutorialManager {
    constructor() {
        this.isInitialized = false;
        this.currentSection = 'dashboard';
        this.tutorialKey = 'hotel_notify_hub_tutorial_completed';
        this.skipTutorialKey = 'hotel_notify_hub_tutorial_skip';
        
        // Configuración del tutorial principal
        this.mainTutorialSteps = [
            {
                element: '[data-step="1"]',
                intro: "¡Bienvenido al Hotel Notify Hub! 🏨<br><br>Este es tu panel principal donde puedes gestionar hoteles y sus servicios de notificación.<br><br><strong>¿Qué puedes hacer aquí?</strong><br>• Gestionar hoteles y su información<br>• Configurar servicios de notificación<br>• Ver estadísticas y reportes",
                position: 'bottom'
            },
            {
                element: '[data-step="2"]',
                intro: "📊 <strong>Información del Sistema</strong><br><br>Aquí puedes ver:<br>• La versión actual de la aplicación<br>• Estado del caché del sistema<br>• Información técnica y notas de versión",
                position: 'bottom'
            },
            {
                element: '[data-step="3"]',
                intro: "🔄 <strong>Actualización Forzada</strong><br><br>Usa este botón para:<br>• Recargar los datos más recientes<br>• Limpiar caché si hay problemas<br>• Forzar sincronización con el servidor",
                position: 'bottom'
            },
            {
                element: '[data-step="4"]',
                intro: "🧭 <strong>Menú de Navegación</strong><br><br>Este menú lateral te permite navegar entre las diferentes secciones:<br><br>📊 <strong>Dashboard</strong> - Resumen y estadísticas<br>🏨 <strong>Hoteles</strong> - Gestión principal de hoteles<br>⚙️ <strong>Servicios</strong> - Configuración de notificaciones",
                position: 'right'
            },
            {
                element: '[data-step="5"]',
                intro: "📊 <strong>Dashboard</strong><br><br>En esta sección puedes ver:<br>• Gráficos de notificaciones enviadas<br>• Estadísticas de uso por servicio<br>• Resumen general del sistema",
                position: 'right'
            },
            {
                element: '[data-step="6"]',
                intro: "🏨 <strong>Sección de Hoteles</strong><br><br>Esta es la sección más importante donde puedes:<br>• Ver todos tus hoteles registrados<br>• Agregar nuevos hoteles<br>• Editar información existente<br>• Configurar servicios de notificación<br><br>💡 <strong>Tip:</strong> Cada hotel puede tener múltiples servicios configurados",
                position: 'right'
            },
            {
                element: '[data-step="7"]',
                intro: "⚙️ <strong>Servicios</strong><br><br>Aquí puedes ver todos los tipos de servicios disponibles como:<br>• Motor de Reservas (BOENGINE)<br>• Auto Check-in (SELF_IN)<br>• Check-out Automático<br>• Y muchos más...",
                position: 'right'
            }
        ];

        // Tutorial específico para la sección de hoteles
        this.hotelsTutorialSteps = [
            {
                element: '[data-step="8"]',
                intro: "➕ <strong>Agregar Nuevo Hotel</strong><br><br>Haz clic aquí para agregar un hotel nuevo.<br><br>El formulario te pedirá:<br>• Nombre del hotel<br>• Código único<br>• Email de contacto<br>• Teléfono<br>• País e idioma",
                position: 'bottom'
            },
            {
                element: '[data-step="9"]',
                intro: "🔍 <strong>Buscador de Hoteles</strong><br><br>Usa este campo para encontrar hoteles rápidamente:<br>• Busca por nombre del hotel<br>• Por código de hotel<br>• Por email de contacto<br><br>💡 <strong>Tip:</strong> La búsqueda es en tiempo real",
                position: 'bottom'
            },
            {
                element: '[data-step="10"]',
                intro: "📋 <strong>Lista de Hoteles</strong><br><br>Esta tabla muestra toda la información de tus hoteles:<br>• Información básica y contacto<br>• Estado (Activo/Inactivo)<br>• Cantidad de servicios configurados<br>• Fecha de creación",
                position: 'top'
            },
            {
                element: '[data-step="11"]',
                intro: "⚙️ <strong>Gestión de Servicios</strong><br><br>Esta columna muestra cuántos servicios tiene cada hotel.<br><br>Haz clic en el ícono ⚙️ para:<br>• Ver servicios actuales<br>• Agregar nuevos servicios<br>• Configurar canales (Email/WhatsApp)<br>• Establecer frecuencias de envío<br><br>🎯 <strong>Especial:</strong> El servicio SELF_IN tiene configuración statusIN única",
                position: 'left'
            }
        ];
    }

    /**
     * Inicializa el sistema de tutorial
     */
    initialize() {
        if (this.isInitialized) return;
        
        try {
            // Configurar Intro.js
            this.setupIntroJs();
            
            // Agregar event listeners
            this.setupEventListeners();
            
            // Auto-tutorial disabled - tutorials only activate via button
            // this.checkAutoTutorial();
            
            this.isInitialized = true;
            console.log('Tutorial system initialized successfully');
            
        } catch (error) {
            console.error('Error initializing tutorial system:', error);
        }
    }

    /**
     * Configurar Intro.js con opciones personalizadas
     */
    setupIntroJs() {
        if (typeof introJs === 'undefined') {
            console.warn('Intro.js library not loaded');
            return;
        }

        // Configuración global de Intro.js
        introJs().setOptions({
            nextLabel: 'Siguiente →',
            prevLabel: '← Anterior',
            skipLabel: 'Saltar Tutorial',
            doneLabel: '¡Completado! ✅',
            showProgress: true,
            showBullets: false,
            showStepNumbers: true,
            exitOnOverlayClick: false,
            exitOnEsc: true,
            scrollToElement: true,
            scrollPadding: 30,
            disableInteraction: false,
            tooltipClass: 'tutorial-tooltip',
            highlightClass: 'tutorial-highlight',
            hintButtonLabel: 'Entendido'
        });
    }

    /**
     * Configurar event listeners
     */
    setupEventListeners() {
        // Botón de tutorial en el header
        const tutorialBtn = document.getElementById('tutorial-btn');
        if (tutorialBtn) {
            tutorialBtn.addEventListener('click', () => {
                // Mostrar el modal de menú en lugar del prompt
                this.showTutorialMenuModal();
            });
        }

        // Tutorial específico cuando se entra a la sección de hoteles
        // Auto-tutorials disabled - tutorials only activate via button
        // document.addEventListener('click', (e) => {
        //     if (e.target.matches('[data-route="hotels"]')) {
        //         setTimeout(() => {
        //             this.checkHotelsSectionTutorial();
        //         }, 500);
        //     }
        // });

        // Eventos de Intro.js
        introJs().oncomplete(() => {
            this.onTutorialComplete();
        });

        introJs().onexit(() => {
            this.onTutorialExit();
        });
    }

    /**
     * Verificar si mostrar tutorial automáticamente para usuarios nuevos
     */
    checkAutoTutorial() {
        const hasCompletedTutorial = localStorage.getItem(this.tutorialKey);
        const hasSkippedTutorial = localStorage.getItem(this.skipTutorialKey);
        
        // Si es un usuario nuevo (no ha completado ni saltado el tutorial)
        if (!hasCompletedTutorial && !hasSkippedTutorial) {
            // Mostrar tutorial después de un pequeño delay
            setTimeout(() => {
                this.showWelcomeDialog();
            }, 1500);
        }
    }

    /**
     * Mostrar diálogo de bienvenida para usuarios nuevos
     */
    showWelcomeDialog() {
        const modal = document.getElementById('welcome-tutorial-modal');
        const startBtn = document.getElementById('welcome-start-btn');
        const skipBtn = document.getElementById('welcome-skip-btn');
        
        if (!modal || !startBtn || !skipBtn) {
            console.error('Welcome modal elements not found');
            // Fallback al confirm básico
            this.showWelcomeDialogFallback();
            return;
        }

        // Mostrar modal
        modal.classList.add('active');
        
        // Event listeners para los botones
        const handleStart = () => {
            modal.classList.remove('active');
            this.startMainTutorial();
            cleanup();
        };
        
        const handleSkip = () => {
            modal.classList.remove('active');
            localStorage.setItem(this.skipTutorialKey, 'true');
            if (window.showToast) {
                showToast('Tutorial omitido. Puedes iniciarlo desde el botón "Tutorial" cuando gustes.', 'info');
            }
            cleanup();
        };
        
        const handleOutsideClick = (e) => {
            if (e.target === modal) {
                handleSkip();
            }
        };
        
        const cleanup = () => {
            startBtn.removeEventListener('click', handleStart);
            skipBtn.removeEventListener('click', handleSkip);
            modal.removeEventListener('click', handleOutsideClick);
        };
        
        // Agregar event listeners
        startBtn.addEventListener('click', handleStart);
        skipBtn.addEventListener('click', handleSkip);
        modal.addEventListener('click', handleOutsideClick);
    }

    /**
     * Fallback para el diálogo de bienvenida (si el modal no está disponible)
     */
    showWelcomeDialogFallback() {
        const shouldStart = confirm(
            "¡Bienvenido a Hotel Notify Hub! 🏨\n\n" +
            "¿Te gustaría hacer un tour rápido para conocer todas las funcionalidades?\n\n" +
            "El tutorial te tomará aproximadamente 2-3 minutos y te ayudará a entender cómo usar la plataforma."
        );

        if (shouldStart) {
            this.startMainTutorial();
        } else {
            localStorage.setItem(this.skipTutorialKey, 'true');
        }
    }

    /**
     * Iniciar el tutorial principal
     */
    startMainTutorial() {
        // Asegurarse de estar en el dashboard
        if (this.currentSection !== 'dashboard') {
            const dashboardLink = document.querySelector('[data-route="dashboard"]');
            if (dashboardLink) {
                dashboardLink.click();
            }
        }

        setTimeout(() => {
            introJs().setOptions({
                steps: this.mainTutorialSteps
            }).start();
        }, 300);
    }

    /**
     * Tutorial específico para la sección de hoteles
     */
    startHotelsTutorial() {
        introJs().setOptions({
            steps: this.hotelsTutorialSteps
        }).start();
    }

    /**
     * Verificar si mostrar tutorial de la sección hoteles
     */
    checkHotelsSectionTutorial() {
        const hasSeenHotelsTutorial = localStorage.getItem('hotels_tutorial_seen');
        
        if (!hasSeenHotelsTutorial) {
            const showHotelsTutorial = confirm(
                "🏨 ¡Has entrado a la sección de Hoteles!\n\n" +
                "¿Te gustaría ver un tutorial específico sobre cómo gestionar hoteles y configurar servicios?"
            );

            if (showHotelsTutorial) {
                this.startHotelsTutorial();
                localStorage.setItem('hotels_tutorial_seen', 'true');
            }
        }
    }

    /**
     * Cuando se completa el tutorial
     */
    onTutorialComplete() {
        localStorage.setItem(this.tutorialKey, 'true');
        
        // Mostrar mensaje de éxito
        if (window.showToast) {
            showToast('¡Tutorial completado! 🎉 Ya conoces las funcionalidades principales.', 'success');
        }
        
        // Auto-tutorial offers disabled - tutorials only activate via button
        // setTimeout(() => {
        //     const showSectionTutorial = confirm(
        //         "¡Excelente! 🎉\n\n" +
        //         "¿Te gustaría ver tutoriales específicos de cada sección cuando las visites?\n\n" +
        //         "Esto te ayudará a entender funcionalidades más detalladas."
        //     );
        //     
        //     if (!showSectionTutorial) {
        //         localStorage.setItem('hotels_tutorial_seen', 'true');
        //     }
        // }, 1000);
    }

    /**
     * Cuando se sale del tutorial
     */
    onTutorialExit() {
        if (window.showToast) {
            showToast('Tutorial cancelado. Puedes reiniciarlo desde el botón "Tutorial" en cualquier momento.', 'info');
        }
    }

    /**
     * Mostrar modal de menú de tutoriales
     */
    showTutorialMenuModal() {
        const modal = document.getElementById('tutorial-menu-modal');
        const closeBtn = document.getElementById('close-tutorial-menu');
        const optionBtns = document.querySelectorAll('.tutorial-option-btn');
        
        if (!modal || !closeBtn || optionBtns.length === 0) {
            console.error('Tutorial menu modal elements not found');
            // Fallback al prompt básico
            this.showTutorialMenu();
            return;
        }

        // Mostrar modal
        modal.classList.add('active');
        
        // Event listeners para los botones de opciones
        const handleOptionClick = (e) => {
            const tutorialType = e.currentTarget.getAttribute('data-tutorial');
            modal.classList.remove('active');
            
            switch(tutorialType) {
                case 'main':
                    this.startMainTutorial();
                    break;
                case 'hotels':
                    this.forceHotelsTutorial();
                    break;
                case 'dashboard':
                    this.startDashboardTutorial();
                    break;
                case 'services':
                    this.startServicesTutorial();
                    break;
                default:
                    console.error('Unknown tutorial type:', tutorialType);
            }
            cleanup();
        };
        
        const handleClose = () => {
            modal.classList.remove('active');
            if (window.showToast) {
                showToast('Tutorial cancelado', 'info');
            }
            cleanup();
        };
        
        const handleOutsideClick = (e) => {
            if (e.target === modal) {
                handleClose();
            }
        };
        
        const cleanup = () => {
            optionBtns.forEach(btn => {
                btn.removeEventListener('click', handleOptionClick);
            });
            closeBtn.removeEventListener('click', handleClose);
            modal.removeEventListener('click', handleOutsideClick);
        };
        
        // Agregar event listeners
        optionBtns.forEach(btn => {
            btn.addEventListener('click', handleOptionClick);
        });
        closeBtn.addEventListener('click', handleClose);
        modal.addEventListener('click', handleOutsideClick);
    }

    /**
     * Mostrar menú de tutoriales disponibles (fallback prompt)
     */
    showTutorialMenu() {
        const options = [
            "🎯 Tutorial Completo (Recomendado)",
            "🏨 Tutorial de Hoteles",
            "📊 Tutorial de Dashboard", 
            "⚙️ Tutorial de Servicios",
            "❌ Cancelar"
        ];

        const choice = prompt(
            "🎓 ¿Qué tutorial te gustaría ver?\n\n" +
            "1. " + options[0] + "\n" +
            "2. " + options[1] + "\n" +
            "3. " + options[2] + "\n" +
            "4. " + options[3] + "\n" +
            "5. " + options[4] + "\n\n" +
            "Ingresa el número de tu elección:"
        );

        switch(choice) {
            case '1':
                this.startMainTutorial();
                break;
            case '2':
                this.forceHotelsTutorial();
                break;
            case '3':
                this.startDashboardTutorial();
                break;
            case '4':
                this.startServicesTutorial();
                break;
            case '5':
            case null:
                if (window.showToast) {
                    showToast('Tutorial cancelado', 'info');
                }
                break;
            default:
                if (window.showToast) {
                    showToast('Opción no válida. Intenta de nuevo.', 'error');
                }
        }
    }

    /**
     * Tutorial específico para Dashboard
     */
    startDashboardTutorial() {
        // Ir al dashboard primero
        const dashboardLink = document.querySelector('[data-route="dashboard"]');
        if (dashboardLink && !dashboardLink.classList.contains('active')) {
            dashboardLink.click();
        }

        const dashboardSteps = [
            {
                intro: "📊 <strong>Tutorial del Dashboard</strong><br><br>Te voy a mostrar cómo interpretar y usar las estadísticas y gráficos de tu sistema de notificaciones.",
                position: 'center'
            },
            {
                element: '[data-step="5"]',
                intro: "📊 <strong>Sección Dashboard</strong><br><br>Aquí puedes ver:<br>• Gráficos de notificaciones enviadas por día<br>• Estadísticas de uso por servicio<br>• Resumen general del rendimiento<br>• Tendencias de uso",
                position: 'right'
            }
        ];

        setTimeout(() => {
            introJs().setOptions({
                steps: dashboardSteps
            }).start();
        }, 300);
    }

    /**
     * Tutorial específico para Servicios
     */
    startServicesTutorial() {
        // Ir a servicios primero
        const servicesLink = document.querySelector('[data-route="services"]');
        if (servicesLink && !servicesLink.classList.contains('active')) {
            servicesLink.click();
        }

        const servicesSteps = [
            {
                intro: "⚙️ <strong>Tutorial de Servicios</strong><br><br>Te voy a mostrar todos los tipos de servicios disponibles y cómo configurarlos en tus hoteles.",
                position: 'center'
            },
            {
                element: '[data-step="7"]',
                intro: "⚙️ <strong>Tipos de Servicios</strong><br><br>Aquí puedes ver todos los servicios disponibles:<br>• <strong>BOENGINE</strong> - Motor de reservas<br>• <strong>SELF_IN</strong> - Auto check-in (con statusIN)<br>• <strong>CHECKOUT</strong> - Check-out automático<br>• <strong>MAINTENANCE</strong> - Mantenimiento<br>• Y muchos más...",
                position: 'right'
            }
        ];

        setTimeout(() => {
            introJs().setOptions({
                steps: servicesSteps
            }).start();
        }, 300);
    }

    /**
     * Forzar tutorial de hoteles (sin verificar localStorage)
     */
    forceHotelsTutorial() {
        // Ir a hoteles primero
        const hotelsLink = document.querySelector('[data-route="hotels"]');
        if (hotelsLink && !hotelsLink.classList.contains('active')) {
            hotelsLink.click();
        }

        setTimeout(() => {
            this.startHotelsTutorial();
        }, 500);
    }

    /**
     * Reiniciar tutorial (limpiar localStorage)
     */
    resetTutorial() {
        localStorage.removeItem(this.tutorialKey);
        localStorage.removeItem(this.skipTutorialKey);
        localStorage.removeItem('hotels_tutorial_seen');
        
        if (window.showToast) {
            showToast('Tutorial reiniciado. Se mostrará automáticamente en la próxima carga.', 'success');
        }
    }

    /**
     * Actualizar sección actual
     */
    updateCurrentSection(section) {
        this.currentSection = section;
    }
}

// Inicializar el sistema de tutorial cuando se carga la página
let tutorialManager = null;

document.addEventListener('DOMContentLoaded', () => {
    // Esperar un poco para que Intro.js se cargue completamente
    setTimeout(() => {
        tutorialManager = new TutorialManager();
        tutorialManager.initialize();
    }, 1000);
});

// Hacer disponible globalmente
window.tutorialManager = tutorialManager;

// Funciones de acceso rápido para tutoriales específicos
window.startHotelsTutorial = function() {
    if (tutorialManager) {
        tutorialManager.forceHotelsTutorial();
    } else {
        console.warn('Tutorial manager not initialized yet');
    }
};

window.startDashboardTutorial = function() {
    if (tutorialManager) {
        tutorialManager.startDashboardTutorial();
    } else {
        console.warn('Tutorial manager not initialized yet');
    }
};

window.startServicesTutorial = function() {
    if (tutorialManager) {
        tutorialManager.startServicesTutorial();
    } else {
        console.warn('Tutorial manager not initialized yet');
    }
};

window.showTutorialMenu = function() {
    if (tutorialManager) {
        tutorialManager.showTutorialMenuModal();
    } else {
        console.warn('Tutorial manager not initialized yet');
    }
};
