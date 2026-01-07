# 🌍 Guía de Internacionalización (i18n)

## Descripción

Este proyecto ahora cuenta con un sistema completo de internacionalización que permite cambiar el idioma de la interfaz entre **Español**, **Inglés** y **Portugués**.

## 📁 Archivos Principales

### 1. `js/i18n.js`
Sistema principal de traducciones que maneja:
- Diccionario de traducciones en 3 idiomas
- Cambio dinámico de idioma
- Persistencia en localStorage
- Detección automática del idioma del navegador

### 2. `styles/language-selector.css`
Estilos para el selector de idiomas en el header con:
- Dropdown animado
- Estados hover y activo
- Soporte responsive
- Dark mode

### 3. Archivos actualizados
- `index.html` - Atributos `data-i18n` en todos los textos
- `js/app.js` - Integración del sistema i18n
- `js/hotels.js` - Traducciones dinámicas
- `js/auth.js` - Mensajes traducidos

## 🚀 Cómo Funciona

### Inicialización Automática
El sistema se inicializa automáticamente al cargar la página:

```javascript
// En app.js
document.addEventListener('DOMContentLoaded', function() {
  if (window.i18n) {
    window.i18n.init();
  }
  // ...
});
```

### Usar Traducciones en HTML

Agrega el atributo `data-i18n` a cualquier elemento:

```html
<h1 data-i18n="dashboard.title">Dashboard</h1>
<button data-i18n="hotels.newHotel">Nuevo Hotel</button>
```

Para placeholders:
```html
<input data-i18n-placeholder="hotels.searchPlaceholder" 
       placeholder="Buscar por nombre...">
```

Para títulos (tooltips):
```html
<button data-i18n-title="hotels.edit" title="Editar">
  <span data-lucide="edit"></span>
</button>
```

### Usar Traducciones en JavaScript

```javascript
// Obtener traducción simple
const text = window.i18n.t('hotels.title');

// Con reemplazos dinámicos
const message = window.i18n.t('login.success', { country: 'Argentina' });
// Resultado: "Sesión iniciada correctamente (Argentina)"

// Verificar idioma actual
const currentLang = window.i18n.getCurrentLanguage(); // 'es', 'en', 'pt'

// Cambiar idioma programáticamente
window.i18n.changeLanguage('en');
```

## 📝 Agregar Nuevas Traducciones

### 1. Agregar la clave en `js/i18n.js`

```javascript
translations: {
  es: {
    'miSeccion.miTexto': 'Texto en español',
    // ...
  },
  en: {
    'miSeccion.miTexto': 'Text in English',
    // ...
  },
  pt: {
    'miSeccion.miTexto': 'Texto em português',
    // ...
  }
}
```

### 2. Usar en HTML o JS

```html
<p data-i18n="miSeccion.miTexto">Texto en español</p>
```

o

```javascript
const texto = window.i18n.t('miSeccion.miTexto');
```

## 🎨 Selector de Idiomas

El selector se encuentra en el header y permite cambiar el idioma con un clic:

```html
<div class="language-selector">
  <button id="language-toggle">
    <span data-lucide="globe"></span>
    <span id="current-lang-display">ES</span>
  </button>
  <div id="language-dropdown">
    <button class="lang-option" data-lang="es">
      <span class="lang-flag">🇪🇸</span>
      <span class="lang-name">Español</span>
    </button>
    <!-- ... más idiomas -->
  </div>
</div>
```

## 🔄 Eventos Personalizados

El sistema dispara un evento cuando cambia el idioma:

```javascript
window.addEventListener('languageChanged', (e) => {
  const newLang = e.detail.language;
  console.log('Nuevo idioma:', newLang);
  // Actualizar contenido dinámico
});
```

## 📊 Estructura de las Traducciones

Las traducciones están organizadas por secciones:

```
login.*          - Pantalla de login
nav.*            - Navegación lateral
header.*         - Header superior
dashboard.*      - Métricas y gráficos
hotels.*         - Gestión de hoteles
hotelForm.*      - Formulario de hotel
services.*       - Gestión de servicios
lang.*           - Gestión de idiomas
tutorial.*       - Sistema de tutoriales
welcome.*        - Modal de bienvenida
cache.*          - Información de caché
common.*         - Textos comunes
toast.*          - Mensajes de notificación
```

## 🌐 Agregar un Nuevo Idioma

### Paso 1: Agregar el idioma en `i18n.js`

```javascript
translations: {
  // ...idiomas existentes
  fr: {
    'login.title': 'Hotel Notify Hub',
    'login.subtitle': 'Système de Gestion des Notifications',
    // ...copiar todas las claves y traducir
  }
}
```

### Paso 2: Actualizar `getAvailableLanguages()`

```javascript
getAvailableLanguages() {
  return [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' } // NUEVO
  ];
}
```

### Paso 3: Agregar opción en el HTML

```html
<button class="lang-option" data-lang="fr">
  <span class="lang-flag">🇫🇷</span>
  <span class="lang-name">Français</span>
</button>
```

## 🛠️ Funciones Principales del Sistema

### `i18n.init()`
Inicializa el sistema, detecta idioma guardado o del navegador.

### `i18n.t(key, replacements)`
Obtiene una traducción por su clave.

### `i18n.changeLanguage(lang)`
Cambia el idioma actual y actualiza toda la interfaz.

### `i18n.applyTranslations()`
Aplica las traducciones a todos los elementos con `data-i18n`.

### `i18n.getCurrentLanguage()`
Obtiene el código del idioma actual.

### `i18n.getAvailableLanguages()`
Obtiene la lista de idiomas disponibles.

## 💡 Mejores Prácticas

1. **Siempre incluye el texto por defecto en español** en el HTML para que se vea algo antes de que se cargue i18n.

2. **Usa claves descriptivas** que indiquen la sección y el propósito:
   ```javascript
   ✅ 'hotels.confirmDelete'
   ❌ 'message1'
   ```

3. **Mantén consistencia** en las traducciones de términos comunes.

4. **Usa reemplazos dinámicos** para valores variables:
   ```javascript
   'welcome.message': 'Hola {name}, bienvenido'
   ```

5. **Agrupa traducciones relacionadas** por sección.

6. **Prueba en todos los idiomas** después de agregar nuevas traducciones.

## 🐛 Troubleshooting

### El texto no se traduce
- Verifica que el atributo `data-i18n` esté correctamente escrito
- Asegúrate de que la clave existe en todos los idiomas
- Revisa la consola para errores

### El selector no funciona
- Verifica que `styles/language-selector.css` esté cargado
- Asegúrate de que `setupLanguageSelector()` se ejecuta en `initializeApp()`

### Los textos dinámicos no se actualizan
- Usa el evento `languageChanged` para actualizar contenido generado dinámicamente
- Llama a `lucide.createIcons()` después de actualizar el DOM

## 📱 Soporte Responsive

El selector de idiomas está optimizado para móviles:
- En desktop: dropdown se abre hacia abajo
- En mobile: tamaño reducido y optimizado para touch

## 🎯 Estado Actual

### ✅ Implementado
- [x] Sistema completo de i18n
- [x] 3 idiomas (ES, EN, PT)
- [x] Selector visual en header
- [x] Persistencia en localStorage
- [x] Detección automática de idioma
- [x] Traducciones en HTML
- [x] Traducciones en JS
- [x] Eventos personalizados
- [x] Soporte responsive

### 🚧 Futuras Mejoras
- [ ] Más idiomas (FR, IT, DE)
- [ ] Formato de fechas según idioma
- [ ] Formato de números según localización
- [ ] Traducciones para mensajes del backend
- [ ] Carga lazy de traducciones

## 📞 Soporte

Para dudas o problemas con el sistema i18n, revisa este documento o consulta el código en `js/i18n.js`.

---

**Última actualización:** Enero 2026
**Versión del sistema i18n:** 1.0.0

