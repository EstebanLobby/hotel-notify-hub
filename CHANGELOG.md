# 📋 Changelog - Hotel Notify Hub

Todos los cambios importantes de este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

## [Sin liberar]

### Agregado
- Nuevas características que estarán en la próxima versión

### Cambiado
- Cambios en funcionalidades existentes

### Deprecado
- Funcionalidades que serán removidas en versiones futuras

### Removido
- Funcionalidades removidas en esta versión

### Corregido
- Correcciones de bugs

### Seguridad
- Mejoras de seguridad

---

## [1.3.3] - 2025-10-07

### 🎯 Optimización de Servicios - Enfoque en Funcionalidades Core

#### Removido
- 🗑️ **Sistema Completo de Plantillas de Mensajes en Vista de Hoteles**
  - Sección "📝 Plantillas de Mensajes por Idioma" eliminada del formulario de servicios
  - Contenedor de plantillas con sistema de pestañas dinámicas
  - Sección "🔧 Variables Disponibles" con botones interactivos
  - Botones de acción: "🔄 Cargar Plantillas por Defecto" y "👁️ Vista Previa"
  - Event listeners y validaciones de plantillas en formularios
- 🚫 **Botón "Sincronizar Plantillas"**
  - Botón de sincronización eliminado del header de servicios
  - Función `syncTemplatesWithAPI()` completamente removida
  - Event listeners relacionados con sincronización
- 🎓 **Tutoriales Automáticos Deshabilitados**
  - Tutorial automático de bienvenida para usuarios nuevos
  - Tutorial automático al navegar a sección "Hoteles"
  - Ofertas automáticas de tutoriales específicos después de completar tutorial principal
  - Confirmaciones automáticas de tutoriales al navegar

#### Cambiado
- ⚡ **Vista de Hoteles Simplificada**
  - Formulario de servicios enfocado únicamente en funcionalidades esenciales
  - Interfaz más limpia sin elementos de gestión de idiomas
  - Flujo de trabajo más directo para agregar/editar servicios
- 🎯 **Sistema de Tutoriales Solo Manual**
  - Tutoriales únicamente disponibles a través del botón "🎓 Tutorial"
  - Modal de selección con opciones: Tutorial Completo, Hoteles, Servicios
  - Sin interrupciones automáticas durante la navegación
  - Control total del usuario sobre cuándo ver tutoriales
- 🎨 **Modal de Editar Idioma Mejorado**
  - Tarjeta elegante de información del idioma con bandera grande
  - Editor de plantilla profesional con contador de caracteres en tiempo real
  - Colores adaptativos del contador (verde/amarillo/rojo según longitud)
  - Diseño completamente responsivo para todos los dispositivos

#### Técnico
- 🧹 **Limpieza Masiva de Código**
  - Eliminadas 64+ líneas HTML de sección de plantillas
  - Removidas 50+ líneas JavaScript de validaciones y event listeners
  - Deshabilitada inicialización automática del template manager
  - Comentado código de tutoriales automáticos para futura reactivación
- 📊 **Optimización de Performance**
  - Menos elementos DOM en formularios de servicios
  - Reducción significativa de JavaScript ejecutándose automáticamente
  - Eliminación de event listeners innecesarios
  - Mejor rendimiento general de la aplicación
- 🔧 **Preparación para Versión Futura**
  - Sistema de plantillas de mensajes preservado para reactivación
  - Funcionalidades de idiomas disponibles en vista de servicios
  - Código comentado (no eliminado) para fácil restauración
  - APIs y funciones backend completamente intactas

#### Breaking Changes
⚠️ **Importante**: Esta versión elimina temporalmente la gestión de plantillas de mensajes de la vista de hoteles. La funcionalidad será reintegrada en una versión futura con mejoras adicionales.

#### Beneficios
- 🎯 **UX Más Enfocada**: Interfaz simplificada sin elementos confusos
- ⚡ **Mejor Performance**: Menos código ejecutándose automáticamente
- 🧹 **Código Más Limpio**: Eliminación de funcionalidades redundantes
- 🎓 **Tutoriales No Intrusivos**: Control total del usuario sobre cuándo ver ayuda

---

## [1.3.2] - 2025-09-22

### 🧹 Simplificación del Sistema - Eliminación de Frecuencia

#### Removido
- 🗑️ **Funcionalidad de Frecuencia de Envío Completa**
  - Campo input de frecuencia con validación numérica
  - Botones de frecuencia rápida: ⚡ Inmediato, 📅 Diario, 📆 Semanal, 🗓️ Mensual
  - Sistema de badges de frecuencia en visualización de servicios
  - Iconos y etiquetas dinámicas según días configurados
- 📱 **Elementos de Interfaz Relacionados**
  - Sección completa "Frecuencia de Envío" en formularios
  - Estilos CSS específicos (.frequency-*, #send-frequency)
  - Contenedores y wrappers de frecuencia
  - Tooltips y textos de ayuda relacionados

#### Cambiado
- ⚡ **Formularios Simplificados**
  - Enfoque únicamente en canales de comunicación (Email/WhatsApp)
  - Interfaz más limpia sin campos innecesarios
  - Flujo de trabajo más directo y rápido
- 🎯 **API Optimizada**
  - Webhooks sin campo send_frequency_days
  - Payload más ligero en requests
  - Menos validaciones en backend

#### Técnico
- 🧹 **Limpieza de Código Masiva**
  - Eliminadas funciones getFrequencyLabel() y getFrequencyIcon()
  - Removidos event listeners de botones de frecuencia
  - Limpieza de estilos CSS (.frequency-badge, .frequency-input-container, etc.)
  - Actualización completa de tests unitarios e integración
- 📊 **Optimización de Performance**
  - Reducción de DOM elements en formularios
  - Menos JavaScript ejecutándose en runtime
  - Simplificación de lógica de validación
  - Menor uso de memoria y mejor rendimiento

#### Breaking Changes
⚠️ **Importante**: Esta versión elimina completamente la funcionalidad de frecuencia de envío. Los servicios existentes ya no tendrán información de frecuencia y funcionarán de manera inmediata.

---

## [1.3.1] - 2025-09-22

### Agregado
- 🎓 **Sistema de Tutorial Interactivo Completo**
  - Tutorial paso a paso usando Intro.js con 11 pasos guiados
  - Onboarding automático para usuarios nuevos con modal de bienvenida
  - Tutorial específico por sección: Hoteles, Dashboard y Servicios
  - Botón "Tutorial" siempre accesible en el header principal
  - Sistema inteligente que recuerda preferencias del usuario
- 🎨 **Modales Profesionales sin Alerts**
  - Modal de bienvenida elegante con información detallada
  - Modal de menú de tutoriales con opciones visuales claras
  - Reemplazo completo de prompt() y confirm() por modales
  - Diseño consistente con gradientes y animaciones suaves
- 📚 **Tutoriales Específicos por Funcionalidad**
  - Tutorial de Hoteles: Agregar, buscar, gestionar servicios y statusIN
  - Tutorial de Dashboard: Estadísticas y gráficos del sistema
  - Tutorial de Servicios: Tipos disponibles y configuraciones
  - Navegación automática a la sección correcta antes del tutorial
- 🔗 **Campo URL de Redirección para SELF_IN**
  - Input URL opcional al editar hoteles con servicio SELF_IN
  - Validación HTML5 automática con type="url"
  - Badge visual con enlace directo y truncamiento inteligente
  - Integración completa con API y persistencia de datos

### Cambiado
- 🎛️ **Experiencia de Usuario Mejorada**
  - Botón "Tutorial" ahora abre modal de selección en lugar de prompt
  - Información clara de duración estimada para cada tutorial
  - Descripciones detalladas de lo que incluye cada opción
  - Interfaz completamente responsive para móviles y tablets
- 🎨 **Interfaz Visual Modernizada**
  - Iconos grandes con gradientes para cada opción de tutorial
  - Efectos hover elegantes en todos los elementos interactivos
  - Animaciones de entrada suaves para modales
  - Badges informativos con duración de cada tutorial

### Técnico
- 📊 **Arquitectura de Tutorial Robusta**
  - Integración completa de Intro.js (10KB) con configuración personalizada
  - Sistema de gestión de estado con LocalStorage para preferencias
  - Event listeners con cleanup automático para evitar memory leaks
  - Fallback robusto a prompt básico si modales no están disponibles
- 🧪 **Optimizaciones de Performance**
  - Carga lazy de tutorial manager con delay de inicialización
  - Gestión eficiente de event listeners con cleanup automático
  - CSS optimizado con variables reutilizables y media queries
  - Funciones globales para acceso desde consola de desarrollo
- 🔗 **Funcionalidad URL para SELF_IN**
  - Campo `self_in_url` agregado a funciones addHotelServiceAsync y updateHotelServiceAsync
  - Validación robusta con HTML5 input type="url" y estilos CSS específicos
  - Sistema de badges con enlace directo y manejo de URLs largas
  - Persistencia completa en base de datos y sincronización con API

---

## [1.3.0] - 2025-09-11

### Agregado
- ✨ **Campo statusIN exclusivo para servicio SELF_IN**
  - Campo especial solo para el servicio de Auto Check-in (ID: 6)
  - Control TRUE/FALSE para activar/desactivar el estado
  - Aparece automáticamente solo cuando se selecciona SELF_IN
  - Valor por defecto configurado en FALSE para seguridad
- 🎛️ **Sistema de gestión completo para statusIN**
  - Formulario de agregar servicio con sección dedicada
  - Edición completa de statusIN en servicios existentes
  - Carga automática de valores actuales al editar
  - Validación y manejo de datos consistente
- 📊 **Visualización mejorada de servicios**
  - Badges de estado específicos para SELF_IN (Activo/Inactivo)
  - Colores distintivos: verde para activo, rojo para inactivo
  - Información clara del estado actual en la lista de servicios
  - Solo se muestra para servicios SELF_IN relevantes

### Cambiado
- 🎨 **Interfaz de usuario mejorada**
  - Radio buttons con diseño consistente y profesional
  - Etiquetas `<p>` para mejor centrado y alineación
  - Aplicado también a canales de comunicación para consistencia
  - Espaciado mejorado en formularios con gap de 1.5rem
- 🔧 **API y funciones backend actualizadas**
  - `addHotelServiceAsync` extendida para manejar status_in
  - `updateHotelServiceAsync` actualizada con soporte completo
  - Envío condicional solo para servicios SELF_IN
  - Logging mejorado para debugging y seguimiento

### Técnico
- 📊 **Mejoras de arquitectura**
  - Sistema dinámico de mostrar/ocultar basado en servicio seleccionado
  - Función `handleServiceSelectionChange` para gestión automática
  - Reset automático de valores al cambiar servicios
  - Estilos CSS específicos con selectores precisos
- 🧪 **Validación y robustez**
  - Validación automática de datos antes del envío
  - Manejo de casos edge y valores undefined
  - Preservación de compatibilidad con servicios existentes
  - Sistema de fallback para valores no definidos

---

## [1.2.0] - 2025-09-10

### Agregado
- ✨ **Sistema de gestión de caché automático**
  - Detección automática de nuevas versiones
  - Limpieza inteligente de caché preservando configuraciones importantes
  - Verificación automática cada 24 horas
  - Indicadores visuales de estado del caché
- 🎨 **Modal elegante para información del caché**
  - Grid de tarjetas informativas con datos clave
  - Lista detallada de elementos almacenados
  - Botones de acción para verificar actualizaciones y limpiar caché
  - Animaciones suaves de entrada y salida
  - Diseño responsive para todos los dispositivos
- 🔄 **Botones de administración en el header**
  - Botón de información del caché con indicador de versión
  - Botón de actualización forzada
  - Indicadores visuales de estado (verde/gris)
- 📱 **Mejoras de UX**
  - Notificaciones automáticas de nuevas versiones
  - Preservación de configuraciones importantes del usuario
  - Fallbacks seguros en caso de errores

### Cambiado
- 🔧 **Sistema de países dinámico**
  - Reemplazado checkbox "Colombia" por selector dinámico de países
  - Integración con endpoint de países del backend
  - Cache automático de países para mejor rendimiento
- 🎛️ **Gestión de servicios mejorada**
  - Campo numérico para frecuencia de envío (días)
  - Botones de selección rápida (Diario, Semanal, Mensual)
  - Dropdown de servicios poblado dinámicamente
  - Estilos mejorados para formularios
- 📊 **Integración de datos**
  - Cache unificado para países, servicios y hoteles
  - Actualización automática de indicadores visuales
  - Sincronización entre localStorage y cache manager

### Corregido
- 🐛 **Problemas de caché en navegadores**
  - Usuarios ya no necesitan limpiar caché manualmente
  - Detección automática de cambios en archivos
  - Resolución de problemas de versiones no actualizadas
- 🔄 **Flujo de datos**
  - Corrección en el formato de respuesta de países del backend
  - Manejo mejorado de errores en llamadas a la API
  - Validación robusta de datos antes de almacenar en caché

### Técnico
- 🧪 **Sistema de testing completo**
  - Tests unitarios (41 tests)
  - Tests de integración (9 tests)
  - Tests de performance (8 tests)
  - Tests E2E con Playwright (15 tests)
- 🔧 **Configuración mejorada**
  - GitHub Actions actualizado (sin warnings de deprecación)
  - Gitignore completo para archivos de desarrollo
  - Configuración de Jest optimizada
  - Babel para compatibilidad ES Modules

---

## [1.1.0] - 2025-08-15

### Agregado
- Sistema básico de hoteles
- Gestión de servicios
- Dashboard con métricas
- Autenticación básica

### Cambiado
- Interfaz de usuario mejorada
- Navegación optimizada

---

## [1.0.0] - 2025-07-01

### Agregado
- Versión inicial del sistema
- Funcionalidades básicas de gestión hotelera
- Interfaz de usuario inicial

---

## 📝 Guía para Desarrolladores

### Cómo agregar una nueva versión:

1. **Actualizar versión en `js/cache-manager.js`:**
   ```javascript
   this.currentVersion = '1.3.0'; // Nueva versión
   ```

2. **Agregar entrada en este CHANGELOG.md:**
   - Usar formato de fecha: `## [1.3.0] - 2025-MM-DD`
   - Categorizar cambios: Agregado, Cambiado, Corregido, etc.
   - Usar emojis para mejor legibilidad

3. **Actualizar `package.json`:**
   ```json
   {
     "version": "1.3.0"
   }
   ```

4. **Crear tag de Git:**
   ```bash
   git tag -a v1.3.0 -m "Release version 1.3.0"
   git push origin v1.3.0
   ```

### Tipos de cambios:

- **MAJOR** (X.0.0): Cambios incompatibles con versiones anteriores
- **MINOR** (1.X.0): Nueva funcionalidad compatible con versiones anteriores
- **PATCH** (1.1.X): Correcciones de bugs compatibles

### Formato de entradas:

```markdown
### Agregado
- ✨ **Título de la funcionalidad**
  - Descripción detallada
  - Beneficios para el usuario
  - Detalles técnicos relevantes
```

### Emojis recomendados:

- ✨ Nueva funcionalidad
- 🎨 Mejoras de UI/UX
- 🔧 Cambios de configuración
- 🐛 Corrección de bugs
- 📱 Mejoras responsive
- 🔄 Refactoring
- 📊 Mejoras de performance
- 🧪 Tests
- 📝 Documentación
- 🔒 Seguridad
