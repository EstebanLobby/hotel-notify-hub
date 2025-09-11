/**
 * Sistema de gestión de caché y versiones
 * Detecta automáticamente nuevas versiones y limpia el caché cuando es necesario
 */

class CacheManager {
    constructor() {
        // Versión actual del proyecto (actualizar manualmente en cada release)
        this.currentVersion = '1.3.1';
        this.versionKey = 'hotel_notify_hub_version';
        this.lastUpdateKey = 'hotel_notify_hub_last_update';
        
        // Release notes para la versión actual
        this.releaseNotes = {
            '1.3.1': {
                title: '🎓 Sistema de Tutorial Interactivo Completo',
                date: '2025-09-11',
                highlights: [
                    '🎯 Sistema de tutorial paso a paso con Intro.js',
                    '🎨 Modales elegantes sin alerts (adiós prompt/confirm)',
                    '📚 Tutorial específico por sección (Hoteles, Dashboard, Servicios)',
                    '🆕 Onboarding automático para usuarios nuevos',
                    '🎛️ Menú de selección visual con opciones claras'
                ],
                breaking: [],
                technical: [
                    'Integración completa de Intro.js con estilos personalizados',
                    'Sistema de modales profesionales reemplazando alerts',
                    'LocalStorage para gestión de preferencias de tutorial',
                    'Event listeners con cleanup automático y gestión de memoria',
                    'Responsive design para experiencia móvil optimizada'
                ]
            },
            '1.3.0': {
                title: '🏨 Gestión Avanzada de Servicios SELF_IN',
                date: '2025-09-11',
                highlights: [
                    '✨ Campo statusIN exclusivo para servicio SELF_IN (ID: 6)',
                    '🎛️ Control TRUE/FALSE para estado de Check-in Automático',
                    '✏️ Edición completa de statusIN en servicios existentes',
                    '📊 Visualización con badges de estado (Activo/Inactivo)',
                    '🎨 Interfaz mejorada con radio buttons y etiquetas <p>'
                ],
                breaking: [],
                technical: [
                    'API actualizada para manejar campo status_in en SELF_IN',
                    'Funciones addHotelServiceAsync y updateHotelServiceAsync extendidas',
                    'Sistema de mostrar/ocultar dinámico basado en servicio seleccionado',
                    'Estilos CSS específicos para consistencia visual',
                    'Validación automática y valores por defecto implementados'
                ]
            },
            '1.2.0': {
                title: '🎉 Sistema de Caché Inteligente',
                date: '2025-09-10',
                highlights: [
                    '✨ Detección automática de nuevas versiones',
                    '🎨 Modal elegante para información del caché',
                    '🔄 Limpieza inteligente preservando configuraciones',
                    '📱 Mejoras de UX y diseño responsive'
                ],
                breaking: [],
                technical: [
                    'Sistema de testing completo implementado',
                    'GitHub Actions sin warnings de deprecación',
                    'Configuración mejorada de Jest y Babel'
                ]
            }
        };
        this.cacheKeys = [
            'countriesCache',
            'servicesCache',
            'hotelsCache',
            'userPreferences',
            'dashboardSettings'
        ];
    }

    /**
     * Inicializa el sistema de control de versiones
     */
    initialize() {
        try {
            const storedVersion = localStorage.getItem(this.versionKey);
            const currentTime = Date.now();
            
            // Si no hay versión almacenada o es diferente a la actual
            if (!storedVersion || storedVersion !== this.currentVersion) {
                console.log(`🔄 Nueva versión detectada: ${storedVersion || 'ninguna'} → ${this.currentVersion}`);
                this.handleVersionUpdate(storedVersion);
            } else {
                // Verificar si han pasado más de 24 horas desde la última verificación
                const lastUpdate = parseInt(localStorage.getItem(this.lastUpdateKey) || '0');
                const hoursSinceUpdate = (currentTime - lastUpdate) / (1000 * 60 * 60);
                
                if (hoursSinceUpdate > 24) {
                    console.log('🔍 Verificando actualizaciones automáticas...');
                    this.checkForUpdates();
                }
            }
            
            // Actualizar timestamp de última verificación
            localStorage.setItem(this.lastUpdateKey, currentTime.toString());
            
            // Actualizar indicador visual
            setTimeout(() => this.updateVersionIndicator(), 500);
            
        } catch (error) {
            console.error('Error al inicializar CacheManager:', error);
        }
    }

    /**
     * Maneja la actualización de versión
     */
    handleVersionUpdate(oldVersion) {
        try {
            // Mostrar notificación al usuario
            this.showUpdateNotification(oldVersion, this.currentVersion);
            
            // Limpiar caché selectivamente
            this.clearApplicationCache();
            
            // Actualizar versión almacenada
            localStorage.setItem(this.versionKey, this.currentVersion);
            
            // Actualizar indicador visual
            this.updateVersionIndicator();
            
            console.log('✅ Cache actualizado para nueva versión');
            
        } catch (error) {
            console.error('Error durante actualización de versión:', error);
            // Fallback: limpiar todo
            this.forceClearAll();
        }
    }

    /**
     * Limpia el caché de la aplicación de forma selectiva
     */
    clearApplicationCache() {
        try {
            // Limpiar caché específico de la aplicación
            this.cacheKeys.forEach(key => {
                if (localStorage.getItem(key)) {
                    localStorage.removeItem(key);
                    console.log(`🗑️ Cache limpiado: ${key}`);
                }
            });

            // Limpiar sessionStorage (datos temporales)
            sessionStorage.clear();
            console.log('🗑️ SessionStorage limpiado');

            // Preservar configuraciones importantes del usuario
            const preservedKeys = ['userLanguage', 'userTheme', 'loginCredentials'];
            console.log('💾 Configuraciones de usuario preservadas');

        } catch (error) {
            console.error('Error al limpiar cache selectivo:', error);
            this.forceClearAll();
        }
    }

    /**
     * Fuerza la limpieza completa (último recurso)
     */
    forceClearAll() {
        try {
            console.warn('⚠️ Ejecutando limpieza completa de cache');
            localStorage.clear();
            sessionStorage.clear();
            
            // Recargar página forzadamente
            if (window.location.reload) {
                window.location.reload(true);
            } else {
                // Fallback para navegadores más antiguos
                window.location.href = window.location.href + '?v=' + Date.now();
            }
        } catch (error) {
            console.error('Error en limpieza completa:', error);
        }
    }

    /**
     * Verifica actualizaciones automáticamente
     */
    async checkForUpdates() {
        try {
            // Verificar si hay cambios en los archivos principales
            const timestamp = Date.now();
            const testUrl = `js/app.js?v=${timestamp}`;
            
            const response = await fetch(testUrl, {
                method: 'HEAD',
                cache: 'no-cache'
            });
            
            if (response.ok) {
                const lastModified = response.headers.get('Last-Modified');
                const storedLastModified = localStorage.getItem('app_last_modified');
                
                if (lastModified && lastModified !== storedLastModified) {
                    console.log('📱 Cambios detectados en archivos');
                    localStorage.setItem('app_last_modified', lastModified);
                    this.showRefreshSuggestion();
                }
            }
        } catch (error) {
            console.log('No se pudo verificar actualizaciones automáticas:', error.message);
        }
    }

    /**
     * Muestra notificación de actualización
     */
    showUpdateNotification(oldVersion, newVersion) {
        try {
            const releaseInfo = this.releaseNotes[newVersion];
            
            if (releaseInfo && oldVersion) {
                // Mostrar release notes completas para actualizaciones
                const message = `
                    🎉 <strong>¡Aplicación actualizada!</strong><br>
                    <strong>${releaseInfo.title}</strong><br><br>
                    <strong>Novedades:</strong><br>
                    ${releaseInfo.highlights.map(item => `• ${item}`).join('<br>')}
                    <br><br>
                    <small>Haz clic en el botón de información para ver más detalles</small>
                `;
                
                if (window.showToast) {
                    window.showToast(message, 'success', 8000);
                }
            } else {
                // Mensaje simple para primera instalación
                const message = oldVersion 
                    ? `🎉 ¡Aplicación actualizada! ${oldVersion} → ${newVersion}`
                    : `🎉 ¡Bienvenido a Hotel Notify Hub v${newVersion}!`;
                
                if (window.showToast) {
                    window.showToast(message, 'success', 5000);
                } else {
                    this.createTemporaryNotification(message);
                }
            }
        } catch (error) {
            console.log('No se pudo mostrar notificación de actualización');
        }
    }

    /**
     * Muestra sugerencia de recarga
     */
    showRefreshSuggestion() {
        try {
            const message = '🔄 Nueva versión disponible. ¿Recargar página?';
            
            if (window.showToast) {
                // Crear toast con botón de acción
                const toastHtml = `
                    ${message}
                    <button onclick="window.location.reload(true)" 
                            style="margin-left: 10px; padding: 4px 8px; background: #fff; border: 1px solid #ddd; border-radius: 4px; cursor: pointer;">
                        Recargar
                    </button>
                `;
                window.showToast(toastHtml, 'info', 10000);
            } else {
                // Fallback: confirmación nativa
                if (confirm(message)) {
                    window.location.reload(true);
                }
            }
        } catch (error) {
            console.log('No se pudo mostrar sugerencia de recarga');
        }
    }

    /**
     * Crea notificación temporal (fallback)
     */
    createTemporaryNotification(message) {
        try {
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #4CAF50;
                color: white;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 10000;
                font-family: Arial, sans-serif;
                font-size: 14px;
                max-width: 350px;
                animation: slideIn 0.3s ease-out;
            `;
            
            notification.innerHTML = message;
            document.body.appendChild(notification);
            
            // Auto-remover después de 5 segundos
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.style.animation = 'slideOut 0.3s ease-in forwards';
                    setTimeout(() => {
                        if (notification.parentNode) {
                            notification.parentNode.removeChild(notification);
                        }
                    }, 300);
                }
            }, 5000);
            
        } catch (error) {
            console.log('No se pudo crear notificación temporal');
        }
    }

    /**
     * Método manual para forzar actualización (para botones de admin)
     */
    forceUpdate() {
        console.log('🔄 Actualización forzada por usuario');
        this.clearApplicationCache();
        window.location.reload(true);
    }

    /**
     * Obtiene las dos versiones más recientes para mostrar en la UI
     */
    getRecentVersions() {
        const versions = Object.keys(this.releaseNotes).sort().reverse();
        return {
            current: versions[0] || this.currentVersion,
            previous: versions[1] || null
        };
    }

    /**
     * Obtiene información del cache actual
     */
    getCacheInfo() {
        try {
            const recentVersions = this.getRecentVersions();
            const info = {
                version: this.currentVersion,
                storedVersion: localStorage.getItem(this.versionKey),
                lastUpdate: new Date(parseInt(localStorage.getItem(this.lastUpdateKey) || '0')),
                cacheSize: this.calculateCacheSize(),
                cachedItems: this.getCachedItems(),
                recentVersions: recentVersions
            };
            
            return info;
        } catch (error) {
            console.error('Error al obtener información del cache:', error);
            return null;
        }
    }

    /**
     * Calcula el tamaño aproximado del cache
     */
    calculateCacheSize() {
        try {
            let totalSize = 0;
            for (let key in localStorage) {
                if (localStorage.hasOwnProperty(key)) {
                    totalSize += localStorage[key].length;
                }
            }
            return `${(totalSize / 1024).toFixed(2)} KB`;
        } catch (error) {
            return 'Desconocido';
        }
    }

    /**
     * Obtiene lista de elementos en cache
     */
    getCachedItems() {
        try {
            const cachedItems = this.cacheKeys.filter(key => localStorage.getItem(key) !== null);
            
            // Agregar información detallada de cada elemento
            const detailedInfo = cachedItems.map(key => {
                const data = localStorage.getItem(key);
                let itemCount = 0;
                
                try {
                    const parsed = JSON.parse(data);
                    if (Array.isArray(parsed)) {
                        itemCount = parsed.length;
                    } else if (typeof parsed === 'object' && parsed !== null) {
                        itemCount = Object.keys(parsed).length;
                    } else {
                        itemCount = 1;
                    }
                } catch (e) {
                    itemCount = 1;
                }
                
                return { key, count: itemCount, size: (data.length / 1024).toFixed(2) + ' KB' };
            });
            
            return detailedInfo;
        } catch (error) {
            return [];
        }
    }

    /**
     * Actualiza el indicador visual de versión
     */
    updateVersionIndicator() {
        try {
            const versionElement = document.getElementById('app-version');
            if (versionElement) {
                const cachedItems = this.getCachedItems();
                const hasData = cachedItems.length > 0;
                
                // Agregar indicador de estado
                if (hasData) {
                    versionElement.style.color = '#22c55e'; // Verde si hay datos
                    versionElement.title = `v${this.currentVersion} - ${cachedItems.length} elementos en caché`;
                } else {
                    versionElement.style.color = '#6b7280'; // Gris si no hay datos
                    versionElement.title = `v${this.currentVersion} - Sin datos en caché`;
                }
            }
        } catch (error) {
            console.log('No se pudo actualizar indicador de versión');
        }
    }
}

// Crear instancia global
window.cacheManager = new CacheManager();

// Agregar estilos para animaciones
if (!document.getElementById('cache-manager-styles')) {
    const styles = document.createElement('style');
    styles.id = 'cache-manager-styles';
    styles.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(styles);
}
