// Sistema de Internacionalización (i18n)

const i18n = {
  // Idioma actual
  currentLanguage: 'es',
  
  // Traducciones organizadas por idioma
  translations: {
    es: {
      // Login
      'login.title': 'Hotel Notify Hub',
      'login.subtitle': 'Sistema de Gestión de Notificaciones',
      'login.password': 'Contraseña',
      'login.passwordPlaceholder': 'Ingresa tu contraseña',
      'login.submit': 'Iniciar Sesión',
      'login.secureAccess': 'Acceso seguro y encriptado',
      'login.errorInvalid': 'Contraseña incorrecta',
      'login.errorEmpty': 'Por favor ingresa tu contraseña',
      'login.success': 'Sesión iniciada correctamente{country}',
      'login.error': 'Error al iniciar sesión',
      'login.logoutSuccess': 'Sesión cerrada correctamente',
      
      // Header
      'header.dashboard': 'Dashboard',
      'header.tutorial': 'Tutorial',
      'header.version': 'Versión',
      'header.refresh': 'Forzar actualización',
      'header.cacheInfo': 'Información de caché',
      
      // Navigation
      'nav.dashboard': 'Dashboard',
      'nav.hotels': 'Hoteles',
      'nav.services': 'Servicios',
      'nav.reports': 'Reportes',
      
      // Dashboard
      'dashboard.title': 'Dashboard',
      'dashboard.activeHotels': 'Hoteles Activos',
      'dashboard.notifications': 'Notificaciones (Mes)',
      'dashboard.successRate': 'Tasa de Éxito',
      'dashboard.activeServices': 'Servicios Activos',
      'dashboard.totalHotels': 'Total Hoteles',
      'dashboard.hotelsWithServices': 'Hoteles con Servicios',
      'dashboard.totalAssignments': 'Asignaciones Totales',
      'dashboard.monthlyNotifications': 'Notificaciones Mensuales',
      'dashboard.serviceDistribution': 'Distribución de Servicios',
      
      // Hotels View
      'hotels.title': 'Gestión de Hoteles',
      'hotels.newHotel': 'Nuevo Hotel',
      'hotels.search': 'Buscar',
      'hotels.searchPlaceholder': 'Buscar por nombre, código o email...',
      'hotels.count': 'hoteles',
      'hotels.tableHotel': 'Hotel',
      'hotels.tableContact': 'Contacto',
      'hotels.tableLanguage': 'Idioma',
      'hotels.tableStatus': 'Estado',
      'hotels.tableCountry': 'País',
      'hotels.tableServices': 'Servicios',
      'hotels.tableCreated': 'Creado',
      'hotels.tableActions': 'Acciones',
      'hotels.active': 'Activo',
      'hotels.inactive': 'Inactivo',
      'hotels.edit': 'Editar',
      'hotels.viewServices': 'Ver Servicios',
      'hotels.delete': 'Eliminar',
      'hotels.manageServices': 'Gestionar servicios',
      'hotels.confirmDelete': '¿Estás seguro de que deseas eliminar este hotel?',
      'hotels.deleteSuccess': 'Hotel eliminado exitosamente',
      'hotels.deleteError': 'Error al eliminar hotel',
      'hotels.noResults': 'No se encontraron hoteles con ese criterio',
      'hotels.noHotels': 'No hay hoteles registrados',
      'hotels.noDataToExport': 'No hay datos para exportar',
      'hotels.invalidCode': 'Código de hotel inválido. Debe contener solo letras y números (3-20 caracteres)',
      'hotels.invalidEmail': 'Email inválido',
      'hotels.invalidPhone': 'Teléfono inválido. Solo se permiten números',
      'hotels.mustSelectCountry': 'Debe seleccionar un país',
      'hotels.duplicateCode': 'Ya existe un hotel con ese código',
      'hotels.updateSuccess': 'Hotel actualizado correctamente',
      'hotels.updateError': 'Error al actualizar el hotel',
      'hotels.createSuccess': 'Hotel creado correctamente',
      'hotels.createError': 'Error al crear el hotel',
      'hotels.errorSaving': 'Error al guardar el hotel',
      'hotels.errorDeleting': 'Error al eliminar el hotel',
      'hotels.csvId': 'ID',
      'hotels.csvCode': 'Código',
      'hotels.csvName': 'Nombre',
      'hotels.csvEmail': 'Email',
      'hotels.csvPhone': 'Teléfono',
      'hotels.csvLanguage': 'Idioma',
      'hotels.csvStatus': 'Estado',
      'hotels.csvCountry': 'País',
      'hotels.csvServices': 'Servicios Activos',
      'hotels.csvDate': 'Fecha Creación',
      'hotels.csvFilename': 'hoteles',
      'hotels.csvExportSuccess': 'Archivo CSV exportado correctamente',
      'hotels.countryNotFound': 'País no encontrado',
      'hotels.errorLoadingCountries': 'Error al cargar la lista de países',
      
      // Hotel Form Modal
      'hotelForm.titleNew': 'Nuevo Hotel',
      'hotelForm.titleEdit': 'Editar Hotel',
      'hotelForm.code': 'Código Hotel',
      'hotelForm.name': 'Nombre Hotel',
      'hotelForm.email': 'Email',
      'hotelForm.phone': 'Teléfono',
      'hotelForm.language': 'Idioma',
      'hotelForm.active': 'Hotel Activo',
      'hotelForm.country': 'País',
      'hotelForm.selectCountry': 'Seleccionar país...',
      'hotelForm.cancel': 'Cancelar',
      'hotelForm.save': 'Guardar',
      'hotelForm.required': '*',
      'hotelForm.saveSuccess': 'Hotel guardado exitosamente',
      'hotelForm.saveError': 'Error al guardar hotel',
      
      // Services View
      'services.title': 'Gestión de Servicios',
      'services.manageLanguages': 'Gestionar Idiomas',
      'services.tableCode': 'Código',
      'services.tableName': 'Nombre',
      'services.tableDescription': 'Descripción',
      'services.tableStatus': 'Estado',
      'services.tableSubscribed': 'Hoteles Suscritos',
      'services.tableActions': 'Acciones',
      'services.active': 'Activo',
      'services.inactive': 'Inactivo',
      
      // Service Hotels Modal
      'serviceHotels.title': 'Hoteles del Servicio',
      'serviceHotels.serviceNotFound': 'Servicio no encontrado',
      'serviceHotels.loading': 'Cargando hoteles...',
      'serviceHotels.noHotels': 'No hay hoteles suscritos a este servicio',
      'serviceHotels.error': 'Error al cargar los hoteles',
      'serviceHotels.searchPlaceholder': 'Buscar por código o nombre de hotel...',
      'serviceHotels.email': 'Email',
      'serviceHotels.whatsapp': 'WhatsApp',
      'serviceHotels.remove': 'Quitar',
      'serviceHotels.confirmRemove': '¿Estás seguro de que quieres quitar el servicio "{service}" del hotel "{hotel}"?',
      'serviceHotels.removeSuccess': 'Servicio quitado correctamente',
      'serviceHotels.removeError': 'Error al quitar el servicio',
      'serviceHotels.close': 'Cerrar',
      
      // Language Management
      'lang.title': 'Gestión de Idiomas para Plantillas',
      'lang.activeLanguages': 'Idiomas Activos',
      'lang.addLanguage': 'Agregar Idioma',
      'lang.edit': 'Editar',
      'lang.delete': 'Eliminar',
      'lang.confirmDelete': '¿Estás seguro de que deseas eliminar este idioma?',
      
      // Add Language Modal
      'langAdd.title': 'Agregar Nuevo Idioma',
      'langAdd.selectCountry': 'Seleccionar País/Idioma',
      'langAdd.selectCountryPlaceholder': 'Cargando países...',
      'langAdd.selectCountryHelp': 'Selecciona un país para obtener automáticamente el código e idioma',
      'langAdd.template': 'Plantilla por Defecto',
      'langAdd.templatePlaceholder': '🏨 Check-in Online – ¡Simplificá tu llegada a {hotel_name}!\n\n¡Gracias por elegirnos...',
      'langAdd.templateHelp': 'Plantilla de mensaje por defecto (opcional)',
      'langAdd.variables': 'Variables Disponibles',
      'langAdd.variablesDesc': 'Haz clic en cualquier variable para insertarla en el mensaje actual:',
      'langAdd.varHotelName': 'Nombre del hotel',
      'langAdd.varHotelNameTitle': 'Insertar nombre del hotel',
      'langAdd.varGuestName': 'Nombre del huésped',
      'langAdd.varGuestNameTitle': 'Insertar nombre del huésped',
      'langAdd.varReservation': 'Número de reserva',
      'langAdd.varReservationTitle': 'Insertar número de reserva',
      'langAdd.varCheckinUrl': 'URL de check-in',
      'langAdd.varCheckinUrlTitle': 'Insertar URL de check-in',
      'langAdd.viewExamples': 'Ver Ejemplos',
      'langAdd.copyAll': 'Copiar Todas',
      'langAdd.submit': 'Agregar Idioma',
      'langAdd.cancel': 'Cancelar',
      
      // Edit Language Modal
      'langEdit.title': 'Editar Idioma',
      'langEdit.templateLabel': 'Plantilla del Mensaje',
      'langEdit.templateDesc': 'Personaliza el mensaje que recibirán los huéspedes en este idioma',
      'langEdit.templatePlaceholder': 'Ingrese la plantilla para este idioma...',
      'langEdit.characters': 'caracteres',
      'langEdit.save': 'Guardar Cambios',
      'langEdit.cancel': 'Cancelar',
      
      // Hotel Services Modal
      'hotelServices.title': 'Servicios del Hotel',
      'hotelServices.loading': 'Cargando servicios...',
      'hotelServices.addService': 'Agregar Servicio',
      'hotelServices.close': 'Cerrar',
      'hotelServices.noServices': 'No hay servicios configurados',
      'hotelServices.remove': 'Eliminar',
      'hotelServices.confirmRemove': '¿Estás seguro de que deseas eliminar este servicio?',
      'hotelServices.editChannels': 'Editar canales de comunicación',
      'hotelServices.removeService': 'Quitar servicio del hotel',
      'hotelServices.channels': 'Canales:',
      'hotelServices.servicesActive': '{count} servicios activos',
      'hotelServices.code': 'Código:',
      'hotelServices.email': 'Email:',
      'hotelServices.phone': 'Teléfono:',
      'hotelServices.language': 'Idioma:',
      'hotelServices.country': 'País:',
      'hotelServices.countryNotSpecified': 'País no especificado',
      'hotelServices.statusActive': 'ACTIVO',
      'hotelServices.statusInactive': 'INACTIVO',
      'hotelServices.noServicesLabel': 'Sin servicios',
      'hotelServices.noServicesConfigured': 'Este hotel no tiene servicios configurados',
      'hotelServices.addServicesText': 'Agregue servicios para comenzar a recibir notificaciones automatizadas',
      'hotelServices.errorLoading': 'Error al cargar los servicios',
      'hotelServices.tryAgain': 'Intentar nuevamente',
      'hotelServices.servicesOf': 'Servicios de',
      
      // Add Service Modal
      'addService.title': 'Agregar Servicio',
      'addService.service': 'Servicio',
      'addService.selectService': 'Seleccionar servicio...',
      'addService.channels': 'Canales de Notificación',
      'addService.channelsHelp': 'Selecciona al menos un canal de comunicación',
      'addService.email': 'Email',
      'addService.whatsapp': 'WhatsApp',
      'addService.selfInStatus': 'Estado Check-in Automático',
      'addService.selfInActive': 'Activo (TRUE)',
      'addService.selfInInactive': 'Inactivo (FALSE)',
      'addService.selfInHelp': 'Configuración específica para el servicio de Auto Check-in',
      'addService.selfInUrl': 'URL de Redirección',
      'addService.selfInUrlPlaceholder': 'https://ejemplo.com/checkin',
      'addService.selfInUrlHelp': 'URL de destino para la redirección después del check-in automático',
      'addService.formFields': 'Configuración de Campos del Formulario',
      'addService.formFieldsDesc': 'Configure qué campos serán obligatorios u opcionales para este hotel:',
      'addService.alwaysRequired': 'SIEMPRE OBLIGATORIOS',
      'addService.alwaysRequiredNote': '(No se pueden cambiar)',
      'addService.configurable': 'CONFIGURABLES',
      'addService.configurableNote': '(Marque si son obligatorios)',
      'addService.guestData': 'Datos del Huésped Principal:',
      'addService.guestIdNumber': 'Número de DNI/Pasaporte/Doc. de Identidad',
      'addService.guestPhone': 'Teléfono',
      'addService.guestEmail': 'Correo Electrónico',
      'addService.guestBirthdate': 'Fecha de Nacimiento (Día, Mes, Año)',
      'addService.birthdate': 'Fecha de Nacimiento (Día, Mes, Año)',
      'addService.colombiaData': 'Datos Adicionales Colombia (con parámetro co=true):',
      'addService.colombiaAddress': 'Dirección de Residencia',
      'addService.colombiaNationality': 'Nacionalidad',
      'addService.colombiaOrigin': 'Procedencia (Ciudad y País)',
      'addService.colombiaDestination': 'Destino (Ciudad y País)',
      'addService.colombiaArrival': 'Fecha y Hora de Llegada',
      'addService.colombiaCity': 'Ciudad de Residencia',
      'addService.colombiaTravelReason': 'Motivo de Viaje',
      'addService.companionData': 'Acompañantes (por cada uno):',
      'addService.companionName': 'Nombre y Apellido',
      'addService.companionIdNumber': 'Número de DNI/Pasaporte',
      'addService.companionPhone': 'Teléfono',
      'addService.companionEmail': 'Correo Electrónico',
      'addService.companionBirthdate': 'Fecha de Nacimiento',
      'addService.country': 'País',
      'addService.state': 'Estado/Provincia',
      'addService.city': 'Ciudad',
      'addService.location': 'Ubicación (País, Estado/Provincia, Ciudad)',
      'addService.hide': 'Ocultar',
      'addService.show': 'Mostrar',
      'addService.comments': 'Comentarios del Huésped',
      'addService.guestDocuments': 'Carga de Documentos (Huésped Principal)',
      'addService.companionDocuments': 'Carga de Documentos (Acompañantes)',
      'addService.licensePlate': 'Patente del Vehículo (License Plate)',
      'addService.note': 'Nota:',
      'addService.noteText': 'Los campos marcados con 🔒 son siempre obligatorios por requisitos del sistema. Los campos adicionales de Colombia solo aparecen cuando se incluye el parámetro co=true en la URL del formulario.',
      'addService.cancel': 'Cancelar',
      'addService.submit': 'Agregar Servicio',
      'addService.titleNew': 'Agregar Servicio',
      'addService.titleEdit': 'Editar',
      'addService.update': 'Actualizar Servicio',
      'addService.errorLoading': 'Error al cargar servicios disponibles',
      'addService.removeSuccess': 'Servicio quitado correctamente',
      'addService.removeError': 'Error al quitar el servicio',
      'addService.errorRemoving': 'Error al quitar el servicio',
      'addService.mustSelectService': 'Debe seleccionar un servicio',
      'addService.mustSelectChannel': 'Debe seleccionar al menos un canal de notificación',
      'addService.updateSuccess': 'Servicio actualizado correctamente',
      'addService.addSuccess': 'Servicio agregado correctamente',
      'addService.updateError': 'Error al actualizar el servicio',
      'addService.addError': 'Error al agregar el servicio',
      'addService.serviceNotFound': 'No se pudo encontrar el servicio',
      'addService.errorGettingData': 'Error al obtener datos del servicio',
      'addService.noServices': 'No hay servicios disponibles',
      'addService.noAvailableServices': 'No hay servicios disponibles para agregar',
      
      // Tutorial
      'tutorial.title': 'Selecciona un Tutorial',
      'tutorial.subtitle': '¿Qué tutorial te gustaría ver?',
      'tutorial.complete': 'Tutorial Completo',
      'tutorial.completeDesc': 'Recorrido completo por todas las funcionalidades (Recomendado)',
      'tutorial.hotels': 'Tutorial de Hoteles',
      'tutorial.hotelsDesc': 'Gestión de hoteles, servicios y configuración statusIN',
      'tutorial.dashboard': 'Tutorial de Dashboard',
      'tutorial.dashboardDesc': 'Estadísticas, gráficos y reportes del sistema',
      'tutorial.services': 'Tutorial de Servicios',
      'tutorial.servicesDesc': 'Tipos de servicios y configuraciones disponibles',
      'tutorial.duration': 'minutos',
      
      // Welcome Tutorial
      'welcome.title': '¡Bienvenido a Hotel Notify Hub! 🏨',
      'welcome.subtitle': 'Sistema de Gestión de Notificaciones Hoteleras',
      'welcome.question': '¿Te gustaría hacer un tour rápido para conocer todas las funcionalidades?',
      'welcome.feature1': 'Gestión completa de hoteles',
      'welcome.feature2': 'Configuración de servicios',
      'welcome.feature3': 'Reportes y estadísticas',
      'welcome.feature4': 'Notificaciones Email/WhatsApp',
      'welcome.duration': 'Duración: 2-3 minutos',
      'welcome.interactive': 'Tutorial interactivo paso a paso',
      'welcome.skip': 'Puedes saltarlo en cualquier momento',
      'welcome.noThanks': 'No, gracias',
      'welcome.start': '¡Empezar Tour!',
      
      // Cache Info Modal
      'cache.title': 'Información del Sistema',
      'cache.version': 'Versión del Sistema',
      'cache.lastUpdate': 'Última Actualización',
      'cache.totalSize': 'Tamaño Total',
      'cache.itemsStored': 'Elementos Almacenados',
      'cache.itemsDetail': 'Detalle de Elementos',
      'cache.versionHistory': 'Historial de Versiones',
      'cache.currentVersion': 'Versión Actual',
      'cache.previousVersion': 'Versión Anterior',
      'cache.checkUpdates': 'Verificar Actualizaciones',
      'cache.clearCache': 'Limpiar Caché',
      'cache.confirmClear': '¿Limpiar todo el caché?',
      
      // Variables Examples Modal
      'varExamples.title': 'Ejemplos de Variables',
      'varExamples.description': 'Descripción:',
      'varExamples.example': 'Ejemplo:',
      'varExamples.text': 'Texto:',
      'varExamples.result': 'Resultado:',
      'varExamples.hotelNameDesc': 'Se reemplaza con el nombre completo del hotel',
      'varExamples.guestNameDesc': 'Se reemplaza con el nombre del huésped',
      'varExamples.reservationDesc': 'Se reemplaza con el número único de reserva',
      'varExamples.checkinUrlDesc': 'Se reemplaza con la URL completa del formulario de check-in',
      'varExamples.usageTips': 'Consejos de Uso',
      'varExamples.tip1': 'Obligatorias: {hotel_name} y {checkin_url} deben estar siempre presentes',
      'varExamples.tip2': 'Opcionales: {guest_name} y {reservation_number} son recomendadas para personalización',
      'varExamples.tip3': 'Formato: Siempre usa llaves {} alrededor del nombre de la variable',
      'varExamples.tip4': 'Mayúsculas: Respeta exactamente el nombre (hotel_name, no Hotel_Name)',
      
      // Preview Modal
      'preview.title': 'Vista Previa del Mensaje',
      'preview.variables': 'Variables utilizadas en este ejemplo:',
      
      // Templates
      'templates.confirmLoadDefault': '¿Estás seguro de que quieres cargar las plantillas por defecto? Esto sobrescribirá cualquier cambio no guardado.',
      'templates.defaultLoaded': 'Plantillas por defecto cargadas correctamente',
      'templates.noPreviewContent': 'No hay contenido para mostrar en la vista previa',
      'templates.invalidVariable': 'Error: Variable inválida',
      'templates.noActiveTextarea': 'No hay textarea activo para insertar la variable',
      'templates.variableInserted': 'Variable {variable} insertada',
      'templates.variablesCopied': 'Todas las variables copiadas al portapapeles',
      'templates.noDefaultAvailable': 'No hay plantilla por defecto disponible para este idioma',
      'templates.defaultTemplateTitle': 'Plantilla por Defecto',
      'templates.language': 'Idioma',
      'templates.code': 'Código',
      'templates.updated': 'Actualizada',
      'templates.templateContent': 'Contenido de la plantilla',
      'templates.hasDefaultTemplate': 'Tiene plantilla por defecto',
      'templates.viewDefaultTemplate': 'Ver plantilla por defecto',
      'templates.editTemplate': 'Editar plantilla',
      'templates.deleteTemplate': 'Eliminar plantilla',
      
      // Session
      'session.active': 'Sesión Activa',
      'session.logout': 'Cerrar Sesión',
      
      // Common
      'common.close': 'Cerrar',
      'common.save': 'Guardar',
      'common.cancel': 'Cancelar',
      'common.edit': 'Editar',
      'common.delete': 'Eliminar',
      'common.add': 'Agregar',
      'common.search': 'Buscar',
      'common.loading': 'Cargando...',
      'common.success': 'Éxito',
      'common.error': 'Error',
      'common.confirm': 'Confirmar',
      'common.yes': 'Sí',
      'common.no': 'No',
      'common.required': 'Obligatorio',
      'common.optional': 'Opcional',
      
      // Toasts and Messages
      'toast.offline': 'Sin conexión a internet',
      'toast.online': 'Conexión restablecida',
      'toast.error': 'Ha ocurrido un error inesperado',
      'toast.cacheNotAvailable': 'Sistema de caché no disponible',
      'toast.confirmForceRefresh': '¿Estás seguro de que quieres forzar la actualización? Esto limpiará el caché y recargará la página.',
    },
    
    en: {
      // Login
      'login.title': 'Hotel Notify Hub',
      'login.subtitle': 'Notification Management System',
      'login.password': 'Password',
      'login.passwordPlaceholder': 'Enter your password',
      'login.submit': 'Sign In',
      'login.secureAccess': 'Secure and encrypted access',
      'login.errorInvalid': 'Invalid password',
      'login.errorEmpty': 'Please enter your password',
      'login.success': 'Login successful{country}',
      'login.error': 'Error logging in',
      'login.logoutSuccess': 'Logged out successfully',
      
      // Header
      'header.dashboard': 'Dashboard',
      'header.tutorial': 'Tutorial',
      'header.version': 'Version',
      'header.refresh': 'Force refresh',
      'header.cacheInfo': 'Cache information',
      
      // Navigation
      'nav.dashboard': 'Dashboard',
      'nav.hotels': 'Hotels',
      'nav.services': 'Services',
      'nav.reports': 'Reports',
      
      // Dashboard
      'dashboard.title': 'Dashboard',
      'dashboard.activeHotels': 'Active Hotels',
      'dashboard.notifications': 'Notifications (Month)',
      'dashboard.successRate': 'Success Rate',
      'dashboard.activeServices': 'Active Services',
      'dashboard.totalHotels': 'Total Hotels',
      'dashboard.hotelsWithServices': 'Hotels with Services',
      'dashboard.totalAssignments': 'Total Assignments',
      'dashboard.monthlyNotifications': 'Monthly Notifications',
      'dashboard.serviceDistribution': 'Service Distribution',
      
      // Hotels View
      'hotels.title': 'Hotel Management',
      'hotels.newHotel': 'New Hotel',
      'hotels.search': 'Search',
      'hotels.searchPlaceholder': 'Search by name, code or email...',
      'hotels.count': 'hotels',
      'hotels.tableHotel': 'Hotel',
      'hotels.tableContact': 'Contact',
      'hotels.tableLanguage': 'Language',
      'hotels.tableStatus': 'Status',
      'hotels.tableCountry': 'Country',
      'hotels.tableServices': 'Services',
      'hotels.tableCreated': 'Created',
      'hotels.tableActions': 'Actions',
      'hotels.active': 'Active',
      'hotels.inactive': 'Inactive',
      'hotels.edit': 'Edit',
      'hotels.viewServices': 'View Services',
      'hotels.delete': 'Delete',
      'hotels.manageServices': 'Manage services',
      'hotels.confirmDelete': 'Are you sure you want to delete this hotel?',
      'hotels.deleteSuccess': 'Hotel deleted successfully',
      'hotels.deleteError': 'Error deleting hotel',
      'hotels.noResults': 'No hotels found with that criteria',
      'hotels.noHotels': 'No hotels registered',
      'hotels.noDataToExport': 'No data to export',
      'hotels.invalidCode': 'Invalid hotel code. Must contain only letters and numbers (3-20 characters)',
      'hotels.invalidEmail': 'Invalid email',
      'hotels.invalidPhone': 'Invalid phone. Only numbers allowed',
      'hotels.mustSelectCountry': 'You must select a country',
      'hotels.duplicateCode': 'A hotel with that code already exists',
      'hotels.updateSuccess': 'Hotel updated successfully',
      'hotels.updateError': 'Error updating hotel',
      'hotels.createSuccess': 'Hotel created successfully',
      'hotels.createError': 'Error creating hotel',
      'hotels.errorSaving': 'Error saving hotel',
      'hotels.errorDeleting': 'Error deleting hotel',
      'hotels.csvId': 'ID',
      'hotels.csvCode': 'Code',
      'hotels.csvName': 'Name',
      'hotels.csvEmail': 'Email',
      'hotels.csvPhone': 'Phone',
      'hotels.csvLanguage': 'Language',
      'hotels.csvStatus': 'Status',
      'hotels.csvCountry': 'Country',
      'hotels.csvServices': 'Active Services',
      'hotels.csvDate': 'Creation Date',
      'hotels.csvFilename': 'hotels',
      'hotels.csvExportSuccess': 'CSV file exported successfully',
      'hotels.countryNotFound': 'Country not found',
      'hotels.errorLoadingCountries': 'Error loading country list',
      
      // Hotel Form Modal
      'hotelForm.titleNew': 'New Hotel',
      'hotelForm.titleEdit': 'Edit Hotel',
      'hotelForm.code': 'Hotel Code',
      'hotelForm.name': 'Hotel Name',
      'hotelForm.email': 'Email',
      'hotelForm.phone': 'Phone',
      'hotelForm.language': 'Language',
      'hotelForm.active': 'Active Hotel',
      'hotelForm.country': 'Country',
      'hotelForm.selectCountry': 'Select country...',
      'hotelForm.cancel': 'Cancel',
      'hotelForm.save': 'Save',
      'hotelForm.required': '*',
      'hotelForm.saveSuccess': 'Hotel saved successfully',
      'hotelForm.saveError': 'Error saving hotel',
      
      // Services View
      'services.title': 'Service Management',
      'services.manageLanguages': 'Manage Languages',
      'services.tableCode': 'Code',
      'services.tableName': 'Name',
      'services.tableDescription': 'Description',
      'services.tableStatus': 'Status',
      'services.tableSubscribed': 'Subscribed Hotels',
      'services.tableActions': 'Actions',
      'services.active': 'Active',
      'services.inactive': 'Inactive',
      
      // Service Hotels Modal
      'serviceHotels.title': 'Service Hotels',
      'serviceHotels.serviceNotFound': 'Service not found',
      'serviceHotels.loading': 'Loading hotels...',
      'serviceHotels.noHotels': 'No hotels subscribed to this service',
      'serviceHotels.error': 'Error loading hotels',
      'serviceHotels.searchPlaceholder': 'Search by hotel code or name...',
      'serviceHotels.email': 'Email',
      'serviceHotels.whatsapp': 'WhatsApp',
      'serviceHotels.remove': 'Remove',
      'serviceHotels.confirmRemove': 'Are you sure you want to remove the service "{service}" from hotel "{hotel}"?',
      'serviceHotels.removeSuccess': 'Service removed successfully',
      'serviceHotels.removeError': 'Error removing service',
      'serviceHotels.close': 'Close',
      
      // Language Management
      'lang.title': 'Language Management for Templates',
      'lang.activeLanguages': 'Active Languages',
      'lang.addLanguage': 'Add Language',
      'lang.edit': 'Edit',
      'lang.delete': 'Delete',
      'lang.confirmDelete': 'Are you sure you want to delete this language?',
      
      // Add Language Modal
      'langAdd.title': 'Add New Language',
      'langAdd.selectCountry': 'Select Country/Language',
      'langAdd.selectCountryPlaceholder': 'Loading countries...',
      'langAdd.selectCountryHelp': 'Select a country to automatically get the code and language',
      'langAdd.template': 'Default Template',
      'langAdd.templatePlaceholder': '🏨 Online Check-in – Simplify your arrival at {hotel_name}!\n\nThank you for choosing us...',
      'langAdd.templateHelp': 'Default message template (optional)',
      'langAdd.variables': 'Available Variables',
      'langAdd.variablesDesc': 'Click on any variable to insert it into the current message:',
      'langAdd.varHotelName': 'Hotel name',
      'langAdd.varHotelNameTitle': 'Insert hotel name',
      'langAdd.varGuestName': 'Guest name',
      'langAdd.varGuestNameTitle': 'Insert guest name',
      'langAdd.varReservation': 'Reservation number',
      'langAdd.varReservationTitle': 'Insert reservation number',
      'langAdd.varCheckinUrl': 'Check-in URL',
      'langAdd.varCheckinUrlTitle': 'Insert check-in URL',
      'langAdd.viewExamples': 'View Examples',
      'langAdd.copyAll': 'Copy All',
      'langAdd.submit': 'Add Language',
      'langAdd.cancel': 'Cancel',
      
      // Edit Language Modal
      'langEdit.title': 'Edit Language',
      'langEdit.templateLabel': 'Message Template',
      'langEdit.templateDesc': 'Customize the message that guests will receive in this language',
      'langEdit.templatePlaceholder': 'Enter the template for this language...',
      'langEdit.characters': 'characters',
      'langEdit.save': 'Save Changes',
      'langEdit.cancel': 'Cancel',
      
      // Hotel Services Modal
      'hotelServices.title': 'Hotel Services',
      'hotelServices.loading': 'Loading services...',
      'hotelServices.addService': 'Add Service',
      'hotelServices.close': 'Close',
      'hotelServices.noServices': 'No services configured',
      'hotelServices.remove': 'Remove',
      'hotelServices.confirmRemove': 'Are you sure you want to remove this service?',
      'hotelServices.editChannels': 'Edit communication channels',
      'hotelServices.removeService': 'Remove service from hotel',
      'hotelServices.channels': 'Channels:',
      'hotelServices.servicesActive': '{count} active services',
      'hotelServices.code': 'Code:',
      'hotelServices.email': 'Email:',
      'hotelServices.phone': 'Phone:',
      'hotelServices.language': 'Language:',
      'hotelServices.country': 'Country:',
      'hotelServices.countryNotSpecified': 'Country not specified',
      'hotelServices.statusActive': 'ACTIVE',
      'hotelServices.statusInactive': 'INACTIVE',
      'hotelServices.noServicesLabel': 'No services',
      'hotelServices.noServicesConfigured': 'This hotel has no services configured',
      'hotelServices.addServicesText': 'Add services to start receiving automated notifications',
      'hotelServices.errorLoading': 'Error loading services',
      'hotelServices.tryAgain': 'Try again',
      'hotelServices.servicesOf': 'Services for',
      
      // Add Service Modal
      'addService.title': 'Add Service',
      'addService.service': 'Service',
      'addService.selectService': 'Select service...',
      'addService.channels': 'Notification Channels',
      'addService.channelsHelp': 'Select at least one communication channel',
      'addService.email': 'Email',
      'addService.whatsapp': 'WhatsApp',
      'addService.selfInStatus': 'Auto Check-in Status',
      'addService.selfInActive': 'Active (TRUE)',
      'addService.selfInInactive': 'Inactive (FALSE)',
      'addService.selfInHelp': 'Specific configuration for Auto Check-in service',
      'addService.selfInUrl': 'Redirect URL',
      'addService.selfInUrlPlaceholder': 'https://example.com/checkin',
      'addService.selfInUrlHelp': 'Destination URL for redirection after auto check-in',
      'addService.formFields': 'Form Fields Configuration',
      'addService.formFieldsDesc': 'Configure which fields will be required or optional for this hotel:',
      'addService.alwaysRequired': 'ALWAYS REQUIRED',
      'addService.alwaysRequiredNote': '(Cannot be changed)',
      'addService.configurable': 'CONFIGURABLE',
      'addService.configurableNote': '(Check if required)',
      'addService.guestData': 'Main Guest Data:',
      'addService.guestIdNumber': 'ID/Passport/Identity Document Number',
      'addService.guestPhone': 'Phone',
      'addService.guestEmail': 'Email',
      'addService.guestBirthdate': 'Date of Birth (Day, Month, Year)',
      'addService.birthdate': 'Date of Birth (Day, Month, Year)',
      'addService.colombiaData': 'Additional Colombia Data (with co=true parameter):',
      'addService.colombiaAddress': 'Residential Address',
      'addService.colombiaNationality': 'Nationality',
      'addService.colombiaOrigin': 'Origin (City and Country)',
      'addService.colombiaDestination': 'Destination (City and Country)',
      'addService.colombiaArrival': 'Arrival Date and Time',
      'addService.colombiaCity': 'City of Residence',
      'addService.colombiaTravelReason': 'Travel Reason',
      'addService.companionData': 'Companions (for each one):',
      'addService.companionName': 'First and Last Name',
      'addService.companionIdNumber': 'ID/Passport Number',
      'addService.companionPhone': 'Phone',
      'addService.companionEmail': 'Email',
      'addService.companionBirthdate': 'Date of Birth',
      'addService.country': 'Country',
      'addService.state': 'State/Province',
      'addService.city': 'City',
      'addService.location': 'Location (Country, State/Province, City)',
      'addService.hide': 'Hide',
      'addService.show': 'Show',
      'addService.comments': 'Guest Comments',
      'addService.guestDocuments': 'Document Upload (Main Guest)',
      'addService.companionDocuments': 'Document Upload (Companions)',
      'addService.licensePlate': 'Vehicle License Plate',
      'addService.note': 'Note:',
      'addService.noteText': 'Fields marked with 🔒 are always required by system requirements. Additional Colombia fields only appear when the co=true parameter is included in the form URL.',
      'addService.cancel': 'Cancel',
      'addService.submit': 'Add Service',
      'addService.titleNew': 'Add Service',
      'addService.titleEdit': 'Edit',
      'addService.update': 'Update Service',
      'addService.errorLoading': 'Error loading available services',
      'addService.removeSuccess': 'Service removed successfully',
      'addService.removeError': 'Error removing service',
      'addService.errorRemoving': 'Error removing service',
      'addService.mustSelectService': 'You must select a service',
      'addService.mustSelectChannel': 'You must select at least one notification channel',
      'addService.updateSuccess': 'Service updated successfully',
      'addService.addSuccess': 'Service added successfully',
      'addService.updateError': 'Error updating service',
      'addService.addError': 'Error adding service',
      'addService.serviceNotFound': 'Service not found',
      'addService.errorGettingData': 'Error getting service data',
      'addService.noServices': 'No services available',
      'addService.noAvailableServices': 'No services available to add',
      
      // Tutorial
      'tutorial.title': 'Select a Tutorial',
      'tutorial.subtitle': 'Which tutorial would you like to see?',
      'tutorial.complete': 'Complete Tutorial',
      'tutorial.completeDesc': 'Complete tour of all features (Recommended)',
      'tutorial.hotels': 'Hotels Tutorial',
      'tutorial.hotelsDesc': 'Hotel management, services and statusIN configuration',
      'tutorial.dashboard': 'Dashboard Tutorial',
      'tutorial.dashboardDesc': 'Statistics, charts and system reports',
      'tutorial.services': 'Services Tutorial',
      'tutorial.servicesDesc': 'Available service types and configurations',
      'tutorial.duration': 'minutes',
      
      // Welcome Tutorial
      'welcome.title': 'Welcome to Hotel Notify Hub! 🏨',
      'welcome.subtitle': 'Hotel Notification Management System',
      'welcome.question': 'Would you like to take a quick tour to learn about all the features?',
      'welcome.feature1': 'Complete hotel management',
      'welcome.feature2': 'Service configuration',
      'welcome.feature3': 'Reports and statistics',
      'welcome.feature4': 'Email/WhatsApp notifications',
      'welcome.duration': 'Duration: 2-3 minutes',
      'welcome.interactive': 'Interactive step-by-step tutorial',
      'welcome.skip': 'You can skip it at any time',
      'welcome.noThanks': 'No, thanks',
      'welcome.start': 'Start Tour!',
      
      // Cache Info Modal
      'cache.title': 'System Information',
      'cache.version': 'System Version',
      'cache.lastUpdate': 'Last Update',
      'cache.totalSize': 'Total Size',
      'cache.itemsStored': 'Stored Items',
      'cache.itemsDetail': 'Items Detail',
      'cache.versionHistory': 'Version History',
      'cache.currentVersion': 'Current Version',
      'cache.previousVersion': 'Previous Version',
      'cache.checkUpdates': 'Check Updates',
      'cache.clearCache': 'Clear Cache',
      'cache.confirmClear': 'Clear all cache?',
      
      // Variables Examples Modal
      'varExamples.title': 'Variable Examples',
      'varExamples.description': 'Description:',
      'varExamples.example': 'Example:',
      'varExamples.text': 'Text:',
      'varExamples.result': 'Result:',
      'varExamples.hotelNameDesc': 'Replaced with the full hotel name',
      'varExamples.guestNameDesc': 'Replaced with the guest name',
      'varExamples.reservationDesc': 'Replaced with the unique reservation number',
      'varExamples.checkinUrlDesc': 'Replaced with the full check-in form URL',
      'varExamples.usageTips': 'Usage Tips',
      'varExamples.tip1': 'Required: {hotel_name} and {checkin_url} must always be present',
      'varExamples.tip2': 'Optional: {guest_name} and {reservation_number} are recommended for personalization',
      'varExamples.tip3': 'Format: Always use braces {} around the variable name',
      'varExamples.tip4': 'Case: Respect exactly the name (hotel_name, not Hotel_Name)',
      
      // Preview Modal
      'preview.title': 'Message Preview',
      'preview.variables': 'Variables used in this example:',
      
      // Templates
      'templates.confirmLoadDefault': 'Are you sure you want to load the default templates? This will overwrite any unsaved changes.',
      'templates.defaultLoaded': 'Default templates loaded successfully',
      'templates.noPreviewContent': 'No content to show in preview',
      'templates.invalidVariable': 'Error: Invalid variable',
      'templates.noActiveTextarea': 'No active textarea to insert the variable',
      'templates.variableInserted': 'Variable {variable} inserted',
      'templates.variablesCopied': 'All variables copied to clipboard',
      'templates.noDefaultAvailable': 'No default template available for this language',
      'templates.defaultTemplateTitle': 'Default Template',
      'templates.language': 'Language',
      'templates.code': 'Code',
      'templates.updated': 'Updated',
      'templates.templateContent': 'Template content',
      'templates.hasDefaultTemplate': 'Has default template',
      'templates.viewDefaultTemplate': 'View default template',
      'templates.editTemplate': 'Edit template',
      'templates.deleteTemplate': 'Delete template',
      
      // Session
      'session.active': 'Active Session',
      'session.logout': 'Logout',
      
      // Common
      'common.close': 'Close',
      'common.save': 'Save',
      'common.cancel': 'Cancel',
      'common.edit': 'Edit',
      'common.delete': 'Delete',
      'common.add': 'Add',
      'common.search': 'Search',
      'common.loading': 'Loading...',
      'common.success': 'Success',
      'common.error': 'Error',
      'common.confirm': 'Confirm',
      'common.yes': 'Yes',
      'common.no': 'No',
      'common.required': 'Required',
      'common.optional': 'Optional',
      
      // Toasts and Messages
      'toast.offline': 'No internet connection',
      'toast.online': 'Connection restored',
      'toast.error': 'An unexpected error occurred',
      'toast.cacheNotAvailable': 'Cache system not available',
      'toast.confirmForceRefresh': 'Are you sure you want to force refresh? This will clear the cache and reload the page.',
    },
    
    pt: {
      // Login
      'login.title': 'Hotel Notify Hub',
      'login.subtitle': 'Sistema de Gestão de Notificações',
      'login.password': 'Senha',
      'login.passwordPlaceholder': 'Digite sua senha',
      'login.submit': 'Entrar',
      'login.secureAccess': 'Acesso seguro e criptografado',
      'login.errorInvalid': 'Senha incorreta',
      'login.errorEmpty': 'Por favor, digite sua senha',
      'login.success': 'Login realizado com sucesso{country}',
      'login.error': 'Erro ao fazer login',
      'login.logoutSuccess': 'Sessão encerrada com sucesso',
      
      // Header
      'header.dashboard': 'Painel',
      'header.tutorial': 'Tutorial',
      'header.version': 'Versão',
      'header.refresh': 'Forçar atualização',
      'header.cacheInfo': 'Informações de cache',
      
      // Navigation
      'nav.dashboard': 'Painel',
      'nav.hotels': 'Hotéis',
      'nav.services': 'Serviços',
      'nav.reports': 'Relatórios',
      
      // Dashboard
      'dashboard.title': 'Painel',
      'dashboard.activeHotels': 'Hotéis Ativos',
      'dashboard.notifications': 'Notificações (Mês)',
      'dashboard.successRate': 'Taxa de Sucesso',
      'dashboard.activeServices': 'Serviços Ativos',
      'dashboard.totalHotels': 'Total de Hotéis',
      'dashboard.hotelsWithServices': 'Hotéis com Serviços',
      'dashboard.totalAssignments': 'Atribuições Totais',
      'dashboard.monthlyNotifications': 'Notificações Mensais',
      'dashboard.serviceDistribution': 'Distribuição de Serviços',
      
      // Hotels View
      'hotels.title': 'Gestão de Hotéis',
      'hotels.newHotel': 'Novo Hotel',
      'hotels.search': 'Pesquisar',
      'hotels.searchPlaceholder': 'Pesquisar por nome, código ou email...',
      'hotels.count': 'hotéis',
      'hotels.tableHotel': 'Hotel',
      'hotels.tableContact': 'Contato',
      'hotels.tableLanguage': 'Idioma',
      'hotels.tableStatus': 'Status',
      'hotels.tableCountry': 'País',
      'hotels.tableServices': 'Serviços',
      'hotels.tableCreated': 'Criado',
      'hotels.tableActions': 'Ações',
      'hotels.active': 'Ativo',
      'hotels.inactive': 'Inativo',
      'hotels.edit': 'Editar',
      'hotels.viewServices': 'Ver Serviços',
      'hotels.delete': 'Excluir',
      'hotels.manageServices': 'Gerenciar serviços',
      'hotels.confirmDelete': 'Tem certeza de que deseja excluir este hotel?',
      'hotels.deleteSuccess': 'Hotel excluído com sucesso',
      'hotels.deleteError': 'Erro ao excluir hotel',
      'hotels.noResults': 'Nenhum hotel encontrado com esse critério',
      'hotels.noHotels': 'Nenhum hotel registrado',
      'hotels.noDataToExport': 'Não há dados para exportar',
      'hotels.invalidCode': 'Código de hotel inválido. Deve conter apenas letras e números (3-20 caracteres)',
      'hotels.invalidEmail': 'Email inválido',
      'hotels.invalidPhone': 'Telefone inválido. Somente números permitidos',
      'hotels.mustSelectCountry': 'Você deve selecionar um país',
      'hotels.duplicateCode': 'Já existe um hotel com esse código',
      'hotels.updateSuccess': 'Hotel atualizado com sucesso',
      'hotels.updateError': 'Erro ao atualizar hotel',
      'hotels.createSuccess': 'Hotel criado com sucesso',
      'hotels.createError': 'Erro ao criar hotel',
      'hotels.errorSaving': 'Erro ao salvar hotel',
      'hotels.errorDeleting': 'Erro ao excluir hotel',
      'hotels.csvId': 'ID',
      'hotels.csvCode': 'Código',
      'hotels.csvName': 'Nome',
      'hotels.csvEmail': 'Email',
      'hotels.csvPhone': 'Telefone',
      'hotels.csvLanguage': 'Idioma',
      'hotels.csvStatus': 'Status',
      'hotels.csvCountry': 'País',
      'hotels.csvServices': 'Serviços Ativos',
      'hotels.csvDate': 'Data de Criação',
      'hotels.csvFilename': 'hoteis',
      'hotels.csvExportSuccess': 'Arquivo CSV exportado com sucesso',
      'hotels.countryNotFound': 'País não encontrado',
      'hotels.errorLoadingCountries': 'Erro ao carregar lista de países',
      
      // Hotel Form Modal
      'hotelForm.titleNew': 'Novo Hotel',
      'hotelForm.titleEdit': 'Editar Hotel',
      'hotelForm.code': 'Código do Hotel',
      'hotelForm.name': 'Nome do Hotel',
      'hotelForm.email': 'Email',
      'hotelForm.phone': 'Telefone',
      'hotelForm.language': 'Idioma',
      'hotelForm.active': 'Hotel Ativo',
      'hotelForm.country': 'País',
      'hotelForm.selectCountry': 'Selecionar país...',
      'hotelForm.cancel': 'Cancelar',
      'hotelForm.save': 'Salvar',
      'hotelForm.required': '*',
      'hotelForm.saveSuccess': 'Hotel salvo com sucesso',
      'hotelForm.saveError': 'Erro ao salvar hotel',
      
      // Services View
      'services.title': 'Gestão de Serviços',
      'services.manageLanguages': 'Gerenciar Idiomas',
      'services.tableCode': 'Código',
      'services.tableName': 'Nome',
      'services.tableDescription': 'Descrição',
      'services.tableStatus': 'Status',
      'services.tableSubscribed': 'Hotéis Inscritos',
      'services.tableActions': 'Ações',
      'services.active': 'Ativo',
      'services.inactive': 'Inativo',
      
      // Service Hotels Modal
      'serviceHotels.title': 'Hotéis do Serviço',
      'serviceHotels.serviceNotFound': 'Serviço não encontrado',
      'serviceHotels.loading': 'Carregando hotéis...',
      'serviceHotels.noHotels': 'Nenhum hotel inscrito neste serviço',
      'serviceHotels.error': 'Erro ao carregar hotéis',
      'serviceHotels.searchPlaceholder': 'Buscar por código ou nome do hotel...',
      'serviceHotels.email': 'Email',
      'serviceHotels.whatsapp': 'WhatsApp',
      'serviceHotels.remove': 'Remover',
      'serviceHotels.confirmRemove': 'Tem certeza de que deseja remover o serviço "{service}" do hotel "{hotel}"?',
      'serviceHotels.removeSuccess': 'Serviço removido com sucesso',
      'serviceHotels.removeError': 'Erro ao remover serviço',
      'serviceHotels.close': 'Fechar',
      
      // Language Management
      'lang.title': 'Gestão de Idiomas para Modelos',
      'lang.activeLanguages': 'Idiomas Ativos',
      'lang.addLanguage': 'Adicionar Idioma',
      'lang.edit': 'Editar',
      'lang.delete': 'Excluir',
      'lang.confirmDelete': 'Tem certeza de que deseja excluir este idioma?',
      
      // Add Language Modal
      'langAdd.title': 'Adicionar Novo Idioma',
      'langAdd.selectCountry': 'Selecionar País/Idioma',
      'langAdd.selectCountryPlaceholder': 'Carregando países...',
      'langAdd.selectCountryHelp': 'Selecione um país para obter automaticamente o código e idioma',
      'langAdd.template': 'Modelo Padrão',
      'langAdd.templatePlaceholder': '🏨 Check-in Online – Simplifique sua chegada ao {hotel_name}!\n\nObrigado por nos escolher...',
      'langAdd.templateHelp': 'Modelo de mensagem padrão (opcional)',
      'langAdd.variables': 'Variáveis Disponíveis',
      'langAdd.variablesDesc': 'Clique em qualquer variável para inseri-la na mensagem atual:',
      'langAdd.varHotelName': 'Nome do hotel',
      'langAdd.varHotelNameTitle': 'Inserir nome do hotel',
      'langAdd.varGuestName': 'Nome do hóspede',
      'langAdd.varGuestNameTitle': 'Inserir nome do hóspede',
      'langAdd.varReservation': 'Número da reserva',
      'langAdd.varReservationTitle': 'Inserir número da reserva',
      'langAdd.varCheckinUrl': 'URL de check-in',
      'langAdd.varCheckinUrlTitle': 'Inserir URL de check-in',
      'langAdd.viewExamples': 'Ver Exemplos',
      'langAdd.copyAll': 'Copiar Todas',
      'langAdd.submit': 'Adicionar Idioma',
      'langAdd.cancel': 'Cancelar',
      
      // Edit Language Modal
      'langEdit.title': 'Editar Idioma',
      'langEdit.templateLabel': 'Modelo da Mensagem',
      'langEdit.templateDesc': 'Personalize a mensagem que os hóspedes receberão neste idioma',
      'langEdit.templatePlaceholder': 'Digite o modelo para este idioma...',
      'langEdit.characters': 'caracteres',
      'langEdit.save': 'Salvar Alterações',
      'langEdit.cancel': 'Cancelar',
      
      // Hotel Services Modal
      'hotelServices.title': 'Serviços do Hotel',
      'hotelServices.loading': 'Carregando serviços...',
      'hotelServices.addService': 'Adicionar Serviço',
      'hotelServices.close': 'Fechar',
      'hotelServices.noServices': 'Nenhum serviço configurado',
      'hotelServices.remove': 'Remover',
      'hotelServices.confirmRemove': 'Tem certeza de que deseja remover este serviço?',
      'hotelServices.editChannels': 'Editar canais de comunicação',
      'hotelServices.removeService': 'Remover serviço do hotel',
      'hotelServices.channels': 'Canais:',
      'hotelServices.servicesActive': '{count} serviços ativos',
      'hotelServices.code': 'Código:',
      'hotelServices.email': 'Email:',
      'hotelServices.phone': 'Telefone:',
      'hotelServices.language': 'Idioma:',
      'hotelServices.country': 'País:',
      'hotelServices.countryNotSpecified': 'País não especificado',
      'hotelServices.statusActive': 'ATIVO',
      'hotelServices.statusInactive': 'INATIVO',
      'hotelServices.noServicesLabel': 'Sem serviços',
      'hotelServices.noServicesConfigured': 'Este hotel não possui serviços configurados',
      'hotelServices.addServicesText': 'Adicione serviços para começar a receber notificações automatizadas',
      'hotelServices.errorLoading': 'Erro ao carregar os serviços',
      'hotelServices.tryAgain': 'Tentar novamente',
      'hotelServices.servicesOf': 'Serviços de',
      
      // Add Service Modal
      'addService.title': 'Adicionar Serviço',
      'addService.service': 'Serviço',
      'addService.selectService': 'Selecionar serviço...',
      'addService.channels': 'Canais de Notificação',
      'addService.channelsHelp': 'Selecione pelo menos um canal de comunicação',
      'addService.email': 'Email',
      'addService.whatsapp': 'WhatsApp',
      'addService.selfInStatus': 'Status Check-in Automático',
      'addService.selfInActive': 'Ativo (TRUE)',
      'addService.selfInInactive': 'Inativo (FALSE)',
      'addService.selfInHelp': 'Configuração específica para o serviço de Check-in Automático',
      'addService.selfInUrl': 'URL de Redirecionamento',
      'addService.selfInUrlPlaceholder': 'https://exemplo.com/checkin',
      'addService.selfInUrlHelp': 'URL de destino para redirecionamento após check-in automático',
      'addService.formFields': 'Configuração de Campos do Formulário',
      'addService.formFieldsDesc': 'Configure quais campos serão obrigatórios ou opcionais para este hotel:',
      'addService.alwaysRequired': 'SEMPRE OBRIGATÓRIOS',
      'addService.alwaysRequiredNote': '(Não podem ser alterados)',
      'addService.configurable': 'CONFIGURÁVEIS',
      'addService.configurableNote': '(Marque se obrigatórios)',
      'addService.guestData': 'Dados do Hóspede Principal:',
      'addService.guestIdNumber': 'Número de DNI/Passaporte/Doc. de Identidade',
      'addService.guestPhone': 'Telefone',
      'addService.guestEmail': 'Email',
      'addService.guestBirthdate': 'Data de Nascimento (Dia, Mês, Ano)',
      'addService.birthdate': 'Data de Nascimento (Dia, Mês, Ano)',
      'addService.colombiaData': 'Dados Adicionais Colômbia (com parâmetro co=true):',
      'addService.colombiaAddress': 'Endereço de Residência',
      'addService.colombiaNationality': 'Nacionalidade',
      'addService.colombiaOrigin': 'Procedência (Cidade e País)',
      'addService.colombiaDestination': 'Destino (Cidade e País)',
      'addService.colombiaArrival': 'Data e Hora de Chegada',
      'addService.colombiaCity': 'Cidade de Residência',
      'addService.colombiaTravelReason': 'Motivo da Viagem',
      'addService.companionData': 'Acompanhantes (para cada um):',
      'addService.companionName': 'Nome e Sobrenome',
      'addService.companionIdNumber': 'Número de DNI/Passaporte',
      'addService.companionPhone': 'Telefone',
      'addService.companionEmail': 'Email',
      'addService.companionBirthdate': 'Data de Nascimento',
      'addService.country': 'País',
      'addService.state': 'Estado/Província',
      'addService.city': 'Cidade',
      'addService.location': 'Localização (País, Estado/Província, Cidade)',
      'addService.hide': 'Ocultar',
      'addService.show': 'Mostrar',
      'addService.comments': 'Comentários do Hóspede',
      'addService.guestDocuments': 'Upload de Documentos (Hóspede Principal)',
      'addService.companionDocuments': 'Upload de Documentos (Acompanhantes)',
      'addService.licensePlate': 'Placa do Veículo',
      'addService.note': 'Nota:',
      'addService.noteText': 'Os campos marcados com 🔒 são sempre obrigatórios por requisitos do sistema. Os campos adicionais da Colômbia só aparecem quando o parâmetro co=true é incluído na URL do formulário.',
      'addService.cancel': 'Cancelar',
      'addService.submit': 'Adicionar Serviço',
      'addService.titleNew': 'Adicionar Serviço',
      'addService.titleEdit': 'Editar',
      'addService.update': 'Atualizar Serviço',
      'addService.errorLoading': 'Erro ao carregar serviços disponíveis',
      'addService.removeSuccess': 'Serviço removido com sucesso',
      'addService.removeError': 'Erro ao remover serviço',
      'addService.errorRemoving': 'Erro ao remover serviço',
      'addService.mustSelectService': 'Você deve selecionar um serviço',
      'addService.mustSelectChannel': 'Você deve selecionar pelo menos um canal de notificação',
      'addService.updateSuccess': 'Serviço atualizado com sucesso',
      'addService.addSuccess': 'Serviço adicionado com sucesso',
      'addService.updateError': 'Erro ao atualizar serviço',
      'addService.addError': 'Erro ao adicionar serviço',
      'addService.serviceNotFound': 'Serviço não encontrado',
      'addService.errorGettingData': 'Erro ao obter dados do serviço',
      'addService.noServices': 'Nenhum serviço disponível',
      'addService.noAvailableServices': 'Nenhum serviço disponível para adicionar',
      
      // Tutorial
      'tutorial.title': 'Selecione um Tutorial',
      'tutorial.subtitle': 'Qual tutorial você gostaria de ver?',
      'tutorial.complete': 'Tutorial Completo',
      'tutorial.completeDesc': 'Tour completo por todas as funcionalidades (Recomendado)',
      'tutorial.hotels': 'Tutorial de Hotéis',
      'tutorial.hotelsDesc': 'Gestão de hotéis, serviços e configuração statusIN',
      'tutorial.dashboard': 'Tutorial do Painel',
      'tutorial.dashboardDesc': 'Estatísticas, gráficos e relatórios do sistema',
      'tutorial.services': 'Tutorial de Serviços',
      'tutorial.servicesDesc': 'Tipos de serviços e configurações disponíveis',
      'tutorial.duration': 'minutos',
      
      // Welcome Tutorial
      'welcome.title': 'Bem-vindo ao Hotel Notify Hub! 🏨',
      'welcome.subtitle': 'Sistema de Gestão de Notificações Hoteleiras',
      'welcome.question': 'Gostaria de fazer um tour rápido para conhecer todas as funcionalidades?',
      'welcome.feature1': 'Gestão completa de hotéis',
      'welcome.feature2': 'Configuração de serviços',
      'welcome.feature3': 'Relatórios e estatísticas',
      'welcome.feature4': 'Notificações Email/WhatsApp',
      'welcome.duration': 'Duração: 2-3 minutos',
      'welcome.interactive': 'Tutorial interativo passo a passo',
      'welcome.skip': 'Você pode pular a qualquer momento',
      'welcome.noThanks': 'Não, obrigado',
      'welcome.start': 'Começar Tour!',
      
      // Cache Info Modal
      'cache.title': 'Informações do Sistema',
      'cache.version': 'Versão do Sistema',
      'cache.lastUpdate': 'Última Atualização',
      'cache.totalSize': 'Tamanho Total',
      'cache.itemsStored': 'Itens Armazenados',
      'cache.itemsDetail': 'Detalhe dos Itens',
      'cache.versionHistory': 'Histórico de Versões',
      'cache.currentVersion': 'Versão Atual',
      'cache.previousVersion': 'Versão Anterior',
      'cache.checkUpdates': 'Verificar Atualizações',
      'cache.clearCache': 'Limpar Cache',
      'cache.confirmClear': 'Limpar todo o cache?',
      
      // Variables Examples Modal
      'varExamples.title': 'Exemplos de Variáveis',
      'varExamples.description': 'Descrição:',
      'varExamples.example': 'Exemplo:',
      'varExamples.text': 'Texto:',
      'varExamples.result': 'Resultado:',
      'varExamples.hotelNameDesc': 'Substituído pelo nome completo do hotel',
      'varExamples.guestNameDesc': 'Substituído pelo nome do hóspede',
      'varExamples.reservationDesc': 'Substituído pelo número único da reserva',
      'varExamples.checkinUrlDesc': 'Substituído pela URL completa do formulário de check-in',
      'varExamples.usageTips': 'Dicas de Uso',
      'varExamples.tip1': 'Obrigatórias: {hotel_name} e {checkin_url} devem estar sempre presentes',
      'varExamples.tip2': 'Opcionais: {guest_name} e {reservation_number} são recomendadas para personalização',
      'varExamples.tip3': 'Formato: Sempre use chaves {} ao redor do nome da variável',
      'varExamples.tip4': 'Maiúsculas: Respeite exatamente o nome (hotel_name, não Hotel_Name)',
      
      // Preview Modal
      'preview.title': 'Visualização da Mensagem',
      'preview.variables': 'Variáveis usadas neste exemplo:',
      
      // Templates
      'templates.confirmLoadDefault': 'Tem certeza de que deseja carregar os modelos padrão? Isso substituirá quaisquer alterações não salvas.',
      'templates.defaultLoaded': 'Modelos padrão carregados com sucesso',
      'templates.noPreviewContent': 'Nenhum conteúdo para mostrar na visualização',
      'templates.invalidVariable': 'Erro: Variável inválida',
      'templates.noActiveTextarea': 'Nenhuma área de texto ativa para inserir a variável',
      'templates.variableInserted': 'Variável {variable} inserida',
      'templates.variablesCopied': 'Todas as variáveis copiadas para a área de transferência',
      'templates.noDefaultAvailable': 'Nenhum modelo padrão disponível para este idioma',
      'templates.defaultTemplateTitle': 'Modelo Padrão',
      'templates.language': 'Idioma',
      'templates.code': 'Código',
      'templates.updated': 'Atualizada',
      'templates.templateContent': 'Conteúdo do modelo',
      'templates.hasDefaultTemplate': 'Possui modelo padrão',
      'templates.viewDefaultTemplate': 'Ver modelo padrão',
      'templates.editTemplate': 'Editar modelo',
      'templates.deleteTemplate': 'Excluir modelo',
      
      // Session
      'session.active': 'Sessão Ativa',
      'session.logout': 'Sair',
      
      // Common
      'common.close': 'Fechar',
      'common.save': 'Salvar',
      'common.cancel': 'Cancelar',
      'common.edit': 'Editar',
      'common.delete': 'Excluir',
      'common.add': 'Adicionar',
      'common.search': 'Pesquisar',
      'common.loading': 'Carregando...',
      'common.success': 'Sucesso',
      'common.error': 'Erro',
      'common.confirm': 'Confirmar',
      'common.yes': 'Sim',
      'common.no': 'Não',
      'common.required': 'Obrigatório',
      'common.optional': 'Opcional',
      
      // Toasts and Messages
      'toast.offline': 'Sem conexão com a internet',
      'toast.online': 'Conexão restaurada',
      'toast.error': 'Ocorreu um erro inesperado',
      'toast.cacheNotAvailable': 'Sistema de cache não disponível',
      'toast.confirmForceRefresh': 'Tem certeza de que deseja forçar a atualização? Isso limpará o cache e recarregará a página.',
    }
  },
  
  /**
   * Inicializa el sistema de i18n
   */
  init() {
    // Cargar idioma guardado o detectar del navegador
    const savedLang = localStorage.getItem('appLanguage');
    const browserLang = navigator.language.split('-')[0]; // 'es', 'en', 'pt'
    
    // Establecer idioma (guardado > navegador > español por defecto)
    this.currentLanguage = savedLang || 
                          (this.translations[browserLang] ? browserLang : 'es');
    
    // Aplicar traducciones
    this.applyTranslations();
    
    // Actualizar selector de idioma si existe
    this.updateLanguageSelector();
    
    console.log(`🌍 i18n initialized with language: ${this.currentLanguage}`);
  },
  
  /**
   * Obtiene una traducción por su clave
   * @param {string} key - Clave de traducción (ej: 'login.title')
   * @param {object} replacements - Objeto con reemplazos dinámicos
   * @returns {string} - Texto traducido
   */
  t(key, replacements = {}) {
    let text = this.translations[this.currentLanguage][key] || key;
    
    // Reemplazar variables dinámicas {variable}
    Object.keys(replacements).forEach(replaceKey => {
      text = text.replace(new RegExp(`{${replaceKey}}`, 'g'), replacements[replaceKey]);
    });
    
    return text;
  },
  
  /**
   * Cambia el idioma de la aplicación
   * @param {string} lang - Código de idioma ('es', 'en', 'pt')
   */
  changeLanguage(lang) {
    if (!this.translations[lang]) {
      console.error(`Language ${lang} not found`);
      return;
    }
    
    this.currentLanguage = lang;
    localStorage.setItem('appLanguage', lang);
    
    // Aplicar traducciones
    this.applyTranslations();
    
    // Actualizar selector
    this.updateLanguageSelector();
    
    // Actualizar atributo lang del HTML
    document.documentElement.lang = lang;
    
    // Disparar evento personalizado
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language: lang } 
    }));
    
    // Mostrar notificación
    const langNames = { es: 'Español', en: 'English', pt: 'Português' };
    if (window.showToast) {
      showToast(`${this.t('common.success')}: ${langNames[lang]}`, 'success');
    }
    
    console.log(`🌍 Language changed to: ${lang}`);
  },
  
  /**
   * Aplica las traducciones a todos los elementos con data-i18n
   */
  applyTranslations() {
    // Traducir elementos con data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.t(key);
      
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        // Para inputs, actualizar placeholder si existe
        if (element.placeholder) {
          element.placeholder = translation;
        }
      } else {
        // Para otros elementos, actualizar textContent
        element.textContent = translation;
      }
    });
    
    // Traducir placeholders con data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      element.placeholder = this.t(key);
    });
    
    // Traducir títulos con data-i18n-title
    document.querySelectorAll('[data-i18n-title]').forEach(element => {
      const key = element.getAttribute('data-i18n-title');
      element.title = this.t(key);
    });
    
    // Actualizar atributos data-required-text y data-optional-text para los checkboxes
    const requiredText = this.t('common.required');
    const optionalText = this.t('common.optional');
    document.querySelectorAll('.field-info').forEach(fieldInfo => {
      fieldInfo.setAttribute('data-required-text', requiredText);
      fieldInfo.setAttribute('data-optional-text', optionalText);
    });
    
    // Actualizar título de la página
    if (document.getElementById('page-title')) {
      const currentView = window.currentView || 'dashboard';
      document.getElementById('page-title').textContent = this.t(`nav.${currentView}`);
    }
  },
  
  /**
   * Actualiza el selector de idioma visual
   */
  updateLanguageSelector() {
    const selector = document.getElementById('language-selector');
    if (selector) {
      selector.value = this.currentLanguage;
    }
    
    // Actualizar banderas o iconos si existen
    document.querySelectorAll('.lang-option').forEach(option => {
      option.classList.remove('active');
      if (option.dataset.lang === this.currentLanguage) {
        option.classList.add('active');
      }
    });
  },
  
  /**
   * Obtiene todos los idiomas disponibles
   * @returns {Array} - Array de objetos con código y nombre
   */
  getAvailableLanguages() {
    return [
      { code: 'es', name: 'Español', flag: '🇪🇸' },
      { code: 'en', name: 'English', flag: '🇬🇧' },
      { code: 'pt', name: 'Português', flag: '🇵🇹' }
    ];
  },
  
  /**
   * Obtiene el idioma actual
   * @returns {string} - Código del idioma actual
   */
  getCurrentLanguage() {
    return this.currentLanguage;
  }
};

// Exportar para uso global
window.i18n = i18n;

// Auto-inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => i18n.init());
} else {
  i18n.init();
}

