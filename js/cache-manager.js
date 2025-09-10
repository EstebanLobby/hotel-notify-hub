/**
 * Sistema de gestión de caché y versiones
 * Detecta automáticamente nuevas versiones y limpia el caché cuando es necesario
 */

class CacheManager {
    constructor() {
        // Versión actual del proyecto (actualizar manualmente en cada release)
        this.currentVersion = '1.2.0';
        this.versionKey = 'hotel_notify_hub_version';
        this.lastUpdateKey = 'hotel_notify_hub_last_update';
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
            const message = oldVersion 
                ? `🎉 ¡Aplicación actualizada! ${oldVersion} → ${newVersion}`
                : `🎉 ¡Bienvenido a Hotel Notify Hub v${newVersion}!`;
            
            // Usar el sistema de toast existente si está disponible
            if (window.showToast) {
                window.showToast(message, 'success', 5000);
            } else {
                // Fallback: crear notificación temporal
                this.createTemporaryNotification(message);
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
     * Obtiene información del cache actual
     */
    getCacheInfo() {
        try {
            const info = {
                version: this.currentVersion,
                storedVersion: localStorage.getItem(this.versionKey),
                lastUpdate: new Date(parseInt(localStorage.getItem(this.lastUpdateKey) || '0')),
                cacheSize: this.calculateCacheSize(),
                cachedItems: this.getCachedItems()
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
            return this.cacheKeys.filter(key => localStorage.getItem(key) !== null);
        } catch (error) {
            return [];
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
