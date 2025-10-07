// Message Templates Management for Self Check-IN Service

// Language configuration - Will be populated from countries API
let SUPPORTED_LANGUAGES = {
  es: {
    name: 'Español',
    flag: '🇪🇸'
  },
  en: {
    name: 'English',
    flag: '🇺🇸'
  },
  pt: {
    name: 'Português',
    flag: '🇧🇷'
  }
};

// Language mappings for flags and names (legacy - will be replaced by countries API)
const LANGUAGE_CONFIG = {
  es: { name: 'Español', flag: '🇪🇸' },
  en: { name: 'English', flag: '🇺🇸' },
  pt: { name: 'Português', flag: '🇧🇷' },
  fr: { name: 'Français', flag: '🇫🇷' },
  de: { name: 'Deutsch', flag: '🇩🇪' },
  it: { name: 'Italiano', flag: '🇮🇹' },
  ru: { name: 'Русский', flag: '🇷🇺' },
  ar: { name: 'العربية', flag: '🇸🇦' },
  he: { name: 'עברית', flag: '🇮🇱' },
  zh: { name: '中文', flag: '🇨🇳' },
  ja: { name: '日本語', flag: '🇯🇵' },
  ko: { name: '한국어', flag: '🇰🇷' },
  nl: { name: 'Nederlands', flag: '🇳🇱' },
  sv: { name: 'Svenska', flag: '🇸🇪' },
  no: { name: 'Norsk', flag: '🇳🇴' },
  da: { name: 'Dansk', flag: '🇩🇰' },
  fi: { name: 'Suomi', flag: '🇫🇮' },
  pl: { name: 'Polski', flag: '🇵🇱' },
  cs: { name: 'Čeština', flag: '🇨🇿' },
  hu: { name: 'Magyar', flag: '🇭🇺' },
  ro: { name: 'Română', flag: '🇷🇴' },
  bg: { name: 'Български', flag: '🇧🇬' },
  hr: { name: 'Hrvatski', flag: '🇭🇷' },
  sr: { name: 'Српски', flag: '🇷🇸' },
  sl: { name: 'Slovenščina', flag: '🇸🇮' },
  sk: { name: 'Slovenčina', flag: '🇸🇰' },
  uk: { name: 'Українська', flag: '🇺🇦' },
  el: { name: 'Ελληνικά', flag: '🇬🇷' },
  tr: { name: 'Türkçe', flag: '🇹🇷' },
  vi: { name: 'Tiếng Việt', flag: '🇻🇳' },
  th: { name: 'ไทย', flag: '🇹🇭' },
  hi: { name: 'हिन्दी', flag: '🇮🇳' },
  bn: { name: 'বাংলা', flag: '🇧🇩' },
  ur: { name: 'اردو', flag: '🇵🇰' },
  fa: { name: 'فارسی', flag: '🇮🇷' },
  sw: { name: 'Kiswahili', flag: '🇰🇪' },
  am: { name: 'አማርኛ', flag: '🇪🇹' }
};

// Function to load supported languages from countries API
async function loadSupportedLanguagesFromAPI() {
  try {
    const countries = await getCountriesAsync();
    if (!countries || !Array.isArray(countries)) {
      console.warn('No se pudieron cargar países, usando idiomas por defecto');
      return;
    }

    // Extract unique languages from countries
    const uniqueLanguages = new Set();
    countries.forEach(country => {
      if (country.language) {
        uniqueLanguages.add(country.language);
      }
    });

    // Build SUPPORTED_LANGUAGES from API data
    const newSupportedLanguages = {};
    uniqueLanguages.forEach(langCode => {
      const config = LANGUAGE_CONFIG[langCode];
      if (config) {
        newSupportedLanguages[langCode] = {
          name: config.name,
          flag: config.flag,
          helpText: `Variables disponibles: {hotel_name}, {guest_name}, {reservation_number}, {checkin_url}`,
          placeholder: config.placeholder
        };
      } else {
        // Fallback for unknown languages
        newSupportedLanguages[langCode] = {
          name: langCode.toUpperCase(),
          flag: '🌐',
          helpText: `Variables disponibles: {hotel_name}, {guest_name}, {reservation_number}, {checkin_url}`,
          placeholder: `Ingrese el mensaje de Self Check-IN en ${langCode}...`
        };
      }
    });

    // Update global SUPPORTED_LANGUAGES
    SUPPORTED_LANGUAGES = newSupportedLanguages;
    console.log('Idiomas cargados desde API:', Object.keys(SUPPORTED_LANGUAGES));

    // Reinitialize template interface if it exists
    if (window.templateManager) {
      window.templateManager.initializeTemplateInterface();
    }

  } catch (error) {
    console.error('Error cargando idiomas desde API:', error);
  }
}

// Default templates for different languages
const DEFAULT_TEMPLATES = {
  es: `🏨 Check-in Online – ¡Simplificá tu llegada a {hotel_name}!

¡Gracias por elegirnos para su estadía en {hotel_name}! Para agilizar su ingreso y ofrecerle una experiencia más cómoda, le invitamos a realizar el check-in online antes de su llegada.

Por favor, complete el siguiente formulario con sus datos personales y documentación:

{checkin_url}

Una vez recibido, confirmaremos su registro y le enviaremos los detalles finales de su reserva.
Si tiene alguna solicitud especial o consulta, no dude en responder a este mensaje.

¡Esperamos darle la bienvenida muy pronto!

Atentamente,
Equipo de {hotel_name}`,

  en: `🏨 Online Check-in – Simplify your arrival at {hotel_name}!

Thank you for choosing us for your stay at {hotel_name}! To streamline your check-in and offer you a more comfortable experience, we invite you to complete your online check-in before your arrival.

Please complete the following form with your personal information and documentation:

{checkin_url}

Once received, we will confirm your registration and send you the final details of your reservation.
If you have any special requests or questions, please don't hesitate to reply to this message.

We look forward to welcoming you soon!

Best regards,
{hotel_name} Team`,

  pt: `🏨 Check-in Online – Simplifique sua chegada ao {hotel_name}!

Obrigado por nos escolher para sua estadia no {hotel_name}! Para agilizar seu check-in e oferecer uma experiência mais confortável, convidamos você a realizar o check-in online antes de sua chegada.

Por favor, complete o seguinte formulário com suas informações pessoais e documentação:

{checkin_url}

Uma vez recebido, confirmaremos seu registro e enviaremos os detalhes finais de sua reserva.
Se você tiver alguma solicitação especial ou dúvida, não hesite em responder a esta mensagem.

Esperamos recebê-lo em breve!

Atenciosamente,
Equipe do {hotel_name}`,

  he: `🏨 צ'ק-אין מקוון – פשט את הגעתך ל{hotel_name}!

תודה שבחרת בנו לשהותך ב{hotel_name}! כדי לייעל את הכניסה שלך ולהציע לך חוויה נוחה יותר, אנו מזמינים אותך לבצע צ'ק-אין מקוון לפני הגעתך.

אנא מלא את הטופס הבא עם הפרטים האישיים והתיעוד שלך:

{checkin_url}

לאחר קבלת הטופס, נאשר את הרישום שלך ונשלח לך את הפרטים הסופיים של ההזמנה.
אם יש לך בקשות מיוחדות או שאלות, אל תהסס לענות להודעה זו.

אנו מצפים לקבל את פניך בקרוב!

בברכה,
צוות {hotel_name}`,

  fr: `🏨 Check-in en ligne – Simplifiez votre arrivée au {hotel_name}!

Merci de nous avoir choisis pour votre séjour au {hotel_name}! Pour faciliter votre enregistrement et vous offrir une expérience plus confortable, nous vous invitons à effectuer votre check-in en ligne avant votre arrivée.

Veuillez compléter le formulaire suivant avec vos informations personnelles et votre documentation:

{checkin_url}

Une fois reçu, nous confirmerons votre enregistrement et vous enverrons les détails finaux de votre réservation.
Si vous avez des demandes spéciales ou des questions, n'hésitez pas à répondre à ce message.

Nous avons hâte de vous accueillir bientôt!

Cordialement,
L'équipe de {hotel_name}`,

  de: `🏨 Online Check-in – Vereinfachen Sie Ihre Ankunft im {hotel_name}!

Vielen Dank, dass Sie uns für Ihren Aufenthalt im {hotel_name} gewählt haben! Um Ihren Check-in zu beschleunigen und Ihnen ein komfortableres Erlebnis zu bieten, laden wir Sie ein, Ihren Online-Check-in vor Ihrer Ankunft durchzuführen.

Bitte füllen Sie das folgende Formular mit Ihren persönlichen Daten und Dokumenten aus:

{checkin_url}

Nach Erhalt bestätigen wir Ihre Registrierung und senden Ihnen die endgültigen Details Ihrer Reservierung.
Wenn Sie spezielle Wünsche oder Fragen haben, zögern Sie nicht, auf diese Nachricht zu antworten.

Wir freuen uns darauf, Sie bald willkommen zu heißen!

Mit freundlichen Grüßen,
Das Team von {hotel_name}`
};

// Template management functions
class MessageTemplateManager {
  constructor() {
    this.currentLanguage = Object.keys(SUPPORTED_LANGUAGES)[0]; // First language as default
    this.templates = { ...DEFAULT_TEMPLATES };
    this.initializeTemplateInterface();
    this.initializeEventListeners();
  }

  initializeTemplateInterface() {
    // Generate tabs and panels dynamically
    this.generateTemplateTabs();
    this.generateTemplatePanels();
  }

  generateTemplateTabs() {
    const tabsContainer = document.querySelector('.template-tabs');
    if (!tabsContainer) return;

    tabsContainer.innerHTML = '';
    
    Object.keys(SUPPORTED_LANGUAGES).forEach((langCode, index) => {
      const lang = SUPPORTED_LANGUAGES[langCode];
      const tab = document.createElement('button');
      tab.type = 'button';
      tab.className = `template-tab ${index === 0 ? 'active' : ''}`;
      tab.setAttribute('data-language', langCode);
      tab.innerHTML = `${lang.flag} ${lang.name}`;
      tabsContainer.appendChild(tab);
    });
  }

  generateTemplatePanels() {
    const contentContainer = document.querySelector('.template-content');
    if (!contentContainer) return;

    contentContainer.innerHTML = '';
    
    Object.keys(SUPPORTED_LANGUAGES).forEach((langCode, index) => {
      const lang = SUPPORTED_LANGUAGES[langCode];
      const panel = document.createElement('div');
      panel.className = `template-panel ${index === 0 ? 'active' : ''}`;
      panel.setAttribute('data-language', langCode);
      
      panel.innerHTML = `
        <label for="template-${langCode}">Mensaje en ${lang.name}:</label>
        <textarea 
          id="template-${langCode}" 
          name="template_${langCode}" 
          class="form-control template-textarea"
          rows="8"
          placeholder="${lang.placeholder}"
        ></textarea>
      `;
      
      contentContainer.appendChild(panel);
    });
  }

  initializeEventListeners() {
    // Template tab switching
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('template-tab')) {
        this.switchTab(e.target.dataset.language);
      }
    });


    // Close preview modal
    const closePreviewBtn = document.getElementById('close-preview-modal');
    if (closePreviewBtn) {
      closePreviewBtn.addEventListener('click', () => this.closePreview());
    }

    // Close preview modal when clicking outside
    const previewModal = document.getElementById('preview-modal');
    if (previewModal) {
      previewModal.addEventListener('click', (e) => {
        if (e.target === previewModal) {
          this.closePreview();
        }
      });
    }

    // Variable buttons
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('variable-btn') || e.target.closest('.variable-btn')) {
        const btn = e.target.classList.contains('variable-btn') ? e.target : e.target.closest('.variable-btn');
        
        // Skip if button has onclick attribute (modal buttons)
        if (btn.hasAttribute('onclick')) {
          return;
        }
        
        const variable = btn.dataset.variable;
        if (variable) {
          this.insertVariable(variable, btn);
        }
      }
    });


    // Close examples modal
    const closeExamplesBtn = document.getElementById('close-variables-examples');
    if (closeExamplesBtn) {
      closeExamplesBtn.addEventListener('click', () => this.closeVariableExamples());
    }

    // Close examples modal when clicking outside
    const examplesModal = document.getElementById('variables-examples-modal');
    if (examplesModal) {
      examplesModal.addEventListener('click', (e) => {
        if (e.target === examplesModal) {
          this.closeVariableExamples();
        }
      });
    }
  }

  switchTab(language) {
    // Update current language
    this.currentLanguage = language;

    // Update tab states
    document.querySelectorAll('.template-tab').forEach(tab => {
      tab.classList.remove('active');
    });
    document.querySelector(`[data-language="${language}"]`).classList.add('active');

    // Update panel states
    document.querySelectorAll('.template-panel').forEach(panel => {
      panel.classList.remove('active');
    });
    document.querySelector(`.template-panel[data-language="${language}"]`).classList.add('active');
  }

  loadDefaultTemplates(silent = false) {
    if (!silent && !confirm('¿Estás seguro de que quieres cargar las plantillas por defecto? Esto sobrescribirá cualquier cambio no guardado.')) {
      return;
    }
    
    // Load default templates into textareas
    Object.keys(DEFAULT_TEMPLATES).forEach(lang => {
      const textarea = document.getElementById(`template-${lang}`);
      if (textarea) {
        textarea.value = DEFAULT_TEMPLATES[lang];
      }
    });
    
    if (!silent) {
      showToast('Plantillas por defecto cargadas correctamente', 'success');
    }
  }

  showPreview() {
    const currentTextarea = document.getElementById(`template-${this.currentLanguage}`);
    if (!currentTextarea || !currentTextarea.value.trim()) {
      showToast('No hay contenido para mostrar en la vista previa', 'warning');
      return;
    }

    // Get template content
    let templateContent = currentTextarea.value;

    // Replace variables with example values
    const exampleData = {
      hotel_name: 'Demo Bitrix (Test Fabi)',
      guest_name: 'Sr. Juan Pérez',
      reservation_number: 'jdgChd070000307dfbed-jhHERuhg454hg-gdfg070000307GRK',
      checkin_url: 'https://selfcheckin.minihotel.info/?hotelID=demobi05&reservationNumber=jdgChd070000307dfbed-jhHERuhg454hg-gdfg070000307GRK&guest=1&status=IN'
    };

    Object.keys(exampleData).forEach(key => {
      const regex = new RegExp(`{${key}}`, 'g');
      templateContent = templateContent.replace(regex, exampleData[key]);
    });

    // Show preview modal
    const previewContent = document.getElementById('preview-content');
    const previewModal = document.getElementById('preview-modal');
    
    if (previewContent && previewModal) {
      previewContent.textContent = templateContent;
      previewModal.style.display = 'flex';
    }
  }

  closePreview() {
    const previewModal = document.getElementById('preview-modal');
    if (previewModal) {
      previewModal.style.display = 'none';
    }
  }

  // Variable insertion functions
  insertVariable(variable, buttonElement) {
    // Validate variable parameter
    if (!variable || typeof variable !== 'string') {
      console.error('Variable inválida:', variable);
      showToast('Error: Variable inválida', 'error');
      return;
    }

    const currentTextarea = document.getElementById(`template-${this.currentLanguage}`);
    if (!currentTextarea) {
      showToast('No hay textarea activo para insertar la variable', 'error');
      return;
    }

    // Get cursor position
    const cursorPos = currentTextarea.selectionStart;
    const textBefore = currentTextarea.value.substring(0, cursorPos);
    const textAfter = currentTextarea.value.substring(currentTextarea.selectionEnd);

    // Insert variable at cursor position
    currentTextarea.value = textBefore + variable + textAfter;

    // Set cursor position after the inserted variable
    const newCursorPos = cursorPos + variable.length;
    currentTextarea.setSelectionRange(newCursorPos, newCursorPos);

    // Focus the textarea
    currentTextarea.focus();

    // Visual feedback
    this.showVariableInsertedFeedback(buttonElement);

    // Show success message
    showToast(`Variable ${variable} insertada`, 'success');
  }

  showVariableInsertedFeedback(buttonElement) {
    // Add animation class
    buttonElement.classList.add('variable-inserted');
    
    // Remove class after animation
    setTimeout(() => {
      buttonElement.classList.remove('variable-inserted');
    }, 600);
  }

  showVariableExamples() {
    const modal = document.getElementById('variables-examples-modal');
    if (modal) {
      // Force display and positioning with maximum z-index
      modal.style.display = 'flex';
      modal.style.position = 'fixed';
      modal.style.top = '0';
      modal.style.left = '0';
      modal.style.width = '100%';
      modal.style.height = '100%';
      modal.style.zIndex = '99999';
      modal.style.alignItems = 'center';
      modal.style.justifyContent = 'center';
      modal.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
      
      // Force the modal content to have even higher z-index
      const modalContent = modal.querySelector('.modal-content');
      if (modalContent) {
        modalContent.style.zIndex = '100000';
        modalContent.style.position = 'relative';
      }
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      
      // Re-initialize Lucide icons
      if (window.lucide) {
        window.lucide.createIcons();
      }
      
      console.log('Modal de ejemplos mostrado con z-index:', modal.style.zIndex);
    }
  }

  closeVariableExamples() {
    const modal = document.getElementById('variables-examples-modal');
    if (modal) {
      modal.style.display = 'none';
      
      // Restore body scroll
      document.body.style.overflow = '';
    }
  }

  copyAllVariables() {
    const variables = ['{hotel_name}', '{guest_name}', '{reservation_number}', '{checkin_url}'];
    const variablesText = variables.join(' ');
    
    // Try to copy to clipboard
    if (navigator.clipboard) {
      navigator.clipboard.writeText(variablesText).then(() => {
        showToast('Todas las variables copiadas al portapapeles', 'success');
      }).catch(() => {
        this.fallbackCopyToClipboard(variablesText);
      });
    } else {
      this.fallbackCopyToClipboard(variablesText);
    }
  }

  fallbackCopyToClipboard(text) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      showToast('Variables copiadas al portapapeles', 'success');
    } catch (err) {
      showToast('No se pudo copiar. Selecciona manualmente: ' + text, 'error');
    }
    
    document.body.removeChild(textArea);
  }

  // Get all templates as an object
  getAllTemplates() {
    const templates = {};
    Object.keys(SUPPORTED_LANGUAGES).forEach(lang => {
      const textarea = document.getElementById(`template-${lang}`);
      if (textarea) {
        templates[lang] = textarea.value.trim();
      }
    });
    return templates;
  }

  // Set templates from data
  setTemplates(templatesData) {
    if (!templatesData || typeof templatesData !== 'object') {
      return;
    }

    Object.keys(templatesData).forEach(lang => {
      const textarea = document.getElementById(`template-${lang}`);
      if (textarea && templatesData[lang]) {
        textarea.value = templatesData[lang];
      }
    });
  }

  // Clear all templates
  clearTemplates() {
    Object.keys(SUPPORTED_LANGUAGES).forEach(lang => {
      const textarea = document.getElementById(`template-${lang}`);
      if (textarea) {
        textarea.value = '';
      }
    });
  }

  // Validate templates
  validateTemplates() {
    const templates = this.getAllTemplates();
    const errors = [];

    // Check if at least one template has content
    const hasContent = Object.values(templates).some(template => template.length > 0);
    if (!hasContent) {
      errors.push('Debe proporcionar al menos una plantilla de mensaje');
    }

    // Check for required variables in non-empty templates
    const requiredVars = ['hotel_name', 'checkin_url'];
    Object.keys(templates).forEach(lang => {
      if (templates[lang]) {
        const missingVars = requiredVars.filter(varName => 
          !templates[lang].includes(`{${varName}}`)
        );
        if (missingVars.length > 0) {
          errors.push(`Plantilla ${lang.toUpperCase()}: faltan variables requeridas: ${missingVars.join(', ')}`);
        }
      }
    });

    return errors;
  }
}

// Function to add new languages dynamically
function addLanguageSupport(langCode, config, defaultTemplate = '') {
  // Add to supported languages
  SUPPORTED_LANGUAGES[langCode] = config;
  
  // Add default template if provided
  if (defaultTemplate) {
    DEFAULT_TEMPLATES[langCode] = defaultTemplate;
  }
  
  // Reinitialize interface if template manager exists
  if (window.templateManager) {
    window.templateManager.initializeTemplateInterface();
  }
  
  console.log(`Idioma ${config.name} (${langCode}) agregado exitosamente`);
}

// Function to remove language support
function removeLanguageSupport(langCode) {
  if (SUPPORTED_LANGUAGES[langCode]) {
    delete SUPPORTED_LANGUAGES[langCode];
    delete DEFAULT_TEMPLATES[langCode];
    
    // Reinitialize interface if template manager exists
    if (window.templateManager) {
      window.templateManager.initializeTemplateInterface();
    }
    
    console.log(`Idioma ${langCode} removido exitosamente`);
  }
}


// Language Management UI Functions
class LanguageManager {
  constructor() {
    this.initializeEventListeners();
  }

  initializeEventListeners() {
    // Toggle language management section
    const manageBtn = document.getElementById('manage-languages-btn');
    const closeBtn = document.getElementById('close-language-management');
    const section = document.getElementById('language-management');
    
    console.log('🔍 Elementos encontrados:', {
      manageBtn: !!manageBtn,
      closeBtn: !!closeBtn,
      section: !!section
    });

    if (manageBtn) {
      manageBtn.addEventListener('click', async () => {
        console.log('🎯 Botón Gestionar Idiomas clickeado');
        section.style.display = section.style.display === 'none' ? 'block' : 'none';
        if (section.style.display === 'block') {
          // Load default templates when opening language management
          showToast('Cargando plantillas por defecto...', 'info');
          try {
            const defaultTemplates = await getTemplateDefaultsAsync(6);
            this.updateActiveLanguagesList(defaultTemplates);
            
            if (Object.keys(defaultTemplates).length > 0) {
              const languagesList = Object.keys(defaultTemplates).join(', ');
              showToast(`${Object.keys(defaultTemplates).length} idioma(s) activo(s): ${languagesList}`, 'success');
            } else {
              showToast('No se encontraron plantillas por defecto en el servidor', 'warning');
            }
          } catch (error) {
            console.error('Error cargando plantillas por defecto:', error);
            showToast('Error al cargar plantillas por defecto', 'error');
            this.updateActiveLanguagesList();
          }
        }
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        section.style.display = 'none';
      });
    }

    // Add language form
    const addForm = document.getElementById('add-language-form');
    if (addForm) {
      addForm.addEventListener('submit', (e) => this.handleAddLanguage(e));
    }



    // Add new language button
    const addLanguageBtn = document.getElementById('add-new-language-btn');
    console.log('Buscando botón add-new-language-btn:', addLanguageBtn);
    
    if (addLanguageBtn) {
      console.log('Botón encontrado, agregando event listener');
      addLanguageBtn.addEventListener('click', () => {
        console.log('Click en botón agregar idioma detectado');
        this.openAddLanguageModal();
      });
    } else {
      console.error('Botón add-new-language-btn no encontrado');
    }
  }

  updateActiveLanguagesList(defaultTemplates = {}) {
    const container = document.getElementById('active-languages-list');
    if (!container) return;

    container.innerHTML = '';

    // Solo mostrar idiomas que tienen plantillas en la API (defaultTemplates)
    const activeLanguageCodes = Object.keys(defaultTemplates);
    
    if (activeLanguageCodes.length === 0) {
      container.innerHTML = `
        <div class="no-languages-message">
          <p>📭 No hay plantillas por defecto disponibles</p>
          <p class="text-muted">Las plantillas aparecerán aquí cuando estén disponibles en la API</p>
        </div>
      `;
      return;
    }

    activeLanguageCodes.forEach(langCode => {
      const defaultTemplate = defaultTemplates[langCode];
      const supportedLang = SUPPORTED_LANGUAGES[langCode];
      
      // Usar información de la plantilla por defecto o fallback a idioma soportado
      const langInfo = {
        name: defaultTemplate.name || (supportedLang ? supportedLang.name : langCode.toUpperCase()),
        flag: defaultTemplate.flag || (supportedLang ? supportedLang.flag : '🌐')
      };
      
      const item = document.createElement('div');
      item.className = 'language-item';
      
      item.innerHTML = `
        <div class="language-info">
          <span class="language-flag">${langInfo.flag}</span>
          <span class="language-name">${langInfo.name}</span>
          <span class="language-code">${langCode}</span>
          <span class="default-indicator" title="Tiene plantilla por defecto">📝</span>
        </div>
        <div class="language-actions">
          <button class="btn btn-ghost btn-sm" onclick="languageManager.viewDefaultTemplate('${langCode}')" title="Ver plantilla por defecto">
            <span data-lucide="eye"></span>
          </button>
          <button class="btn btn-ghost btn-sm btn-primary" onclick="languageManager.editLanguageTemplate('${langCode}')" title="Editar plantilla">
            <span data-lucide="edit"></span>
          </button>
          <button class="btn btn-ghost btn-sm btn-danger" onclick="languageManager.deleteLanguageTemplate('${langCode}')" title="Eliminar plantilla">
            <span data-lucide="trash-2"></span>
          </button>
        </div>
      `;
      
      container.appendChild(item);
    });

    // Store default templates for later use
    this.defaultTemplates = defaultTemplates;

    // Re-initialize Lucide icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  async handleAddLanguage(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const langCode = formData.get('lang-code')?.toLowerCase().trim();
    const langName = formData.get('lang-name')?.trim();
    const langTemplate = formData.get('lang-template')?.trim();
    
    // Debug: Log all form values
    console.log('Valores del formulario capturados:', {
      langCode,
      langName,
      langTemplate,
      langTemplateRaw: formData.get('lang-template')
    });
    
    // Also try to get directly from DOM
    const templateTextarea = document.getElementById('lang-template');
    const templateFromDOM = templateTextarea ? templateTextarea.value : null;
    console.log('Valor directo del DOM:', {
      templateFromDOM,
      textareaExists: !!templateTextarea
    });

    // Validation
    if (!langCode || !langName) {
      showToast('Código y nombre del idioma son requeridos', 'error');
      return;
    }

    // Check against active languages from API instead of hardcoded ones
    if (this.defaultTemplates && this.defaultTemplates[langCode]) {
      showToast(`El idioma ${langCode} ya tiene una plantilla activa en el servicio`, 'error');
      return;
    }

    try {
      // Show loading state
      const submitBtn = document.querySelector('#add-language-modal .modal-footer button[type="submit"]');
      console.log('Submit button found:', submitBtn);
      let originalHTML = '';
      
      if (submitBtn) {
        originalHTML = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span data-lucide="loader-2"></span> Guardando...';
        
        // Re-initialize Lucide icons for the loader
        if (window.lucide) {
          window.lucide.createIcons();
        }
      } else {
        console.warn('Submit button not found, continuing without loading state');
      }
      
      // Save template to API if provided
      console.log('Verificando si hay plantilla para guardar:', {
        langTemplate: langTemplate,
        langTemplateLength: langTemplate ? langTemplate.length : 0,
        langTemplateTrimmed: langTemplate ? langTemplate.trim() : '',
        shouldSave: !!(langTemplate && langTemplate.trim())
      });
      
      // Use template from form or DOM, prioritizing user input
      let templateToSave = langTemplate && langTemplate.trim() ? langTemplate.trim() : '';
      
      // If FormData didn't capture it, try DOM directly
      if (!templateToSave && templateFromDOM && templateFromDOM.trim()) {
        templateToSave = templateFromDOM.trim();
        console.log('Usando plantilla del DOM:', templateToSave.substring(0, 100) + '...');
      }
      
      if (!templateToSave) {
        // Create a language-specific default template
        templateToSave = this.getDefaultTemplateForLanguage(langCode, langName);
        console.log('No había plantilla del usuario, usando plantilla por defecto para', langName);
      } else {
        console.log('Usando plantilla del usuario para', langName);
      }
      
      console.log('Enviando a API:', {
        serviceId: 6,
        langCode: langCode,
        templateContent: templateToSave,
        templateLength: templateToSave.length,
        isDefault: !langTemplate || !langTemplate.trim()
      });
      
      const result = await saveMessageTemplateAsync(6, langCode, templateToSave);
      console.log('Respuesta de API:', result);
      
      // Add language to local configuration for UI
      const languageInfo = await getLanguageInfo(langCode);
      const config = {
        name: langName,
        flag: languageInfo.flag,
        helpText: langHelp || `Variables disponibles: {hotel_name}, {guest_name}, {reservation_number}, {checkin_url}`,
        placeholder: langPlaceholder || `Ingrese el mensaje de Self Check-IN en ${langName}...`
      };
      
      addLanguageSupport(langCode, config, langTemplate);
      
      // Reload templates from API to get the updated list
      const updatedTemplates = await getTemplateDefaultsAsync(6);
      this.updateActiveLanguagesList(updatedTemplates);
      
      // Reset form and close modal
      e.target.reset();
      this.closeAddLanguageModal();
      
      showToast(`Idioma ${langName} agregado y guardado exitosamente`, 'success');
      
    } catch (error) {
      console.error('Error guardando idioma:', error);
      showToast(`Error al guardar el idioma: ${error.message || 'Error desconocido'}`, 'error');
      
      // Always reset submit button on error
      this.resetSubmitButton();
    } finally {
      // Ensure button is always reset, even if there's an unexpected error
      setTimeout(() => {
        this.resetSubmitButton();
      }, 100);
    }
  }


  editLanguage(langCode) {
    const lang = SUPPORTED_LANGUAGES[langCode];
    if (!lang) return;

    // Fill form with current language data
    document.getElementById('lang-code').value = langCode;
    document.getElementById('lang-name').value = lang.name;
    
    // Get current template if exists
    const currentTemplate = DEFAULT_TEMPLATES[langCode] || '';
    document.getElementById('lang-template').value = currentTemplate;

    showToast(`Editando ${lang.name} (bandera automática: ${lang.flag}). Modifica los campos y guarda.`, 'info');
  }

  async deleteLanguageTemplate(langCode) {
    console.log('deleteLanguageTemplate llamada para:', langCode);
    
    const template = this.defaultTemplates?.[langCode];
    console.log('Template encontrado:', template);
    
    if (!template) {
      showToast('No se encontró la plantilla para eliminar', 'error');
      return;
    }

    const langName = template.name || langCode.toUpperCase();
    
    console.log('Mostrando confirmación para eliminar:', langName);
    
    if (confirm(`¿Estás seguro de que quieres eliminar la plantilla de ${langName} (${langCode})?\n\nEsta acción no se puede deshacer.`)) {
      try {
        console.log('Usuario confirmó eliminación, enviando a API...');
        
        // Delete from API
        const result = await deleteMessageTemplateAsync(6, langCode);
        console.log('Resultado de eliminación:', result);
        
        // Reload templates from API to get updated list
        console.log('Recargando plantillas desde API...');
        const updatedTemplates = await getTemplateDefaultsAsync(6);
        this.updateActiveLanguagesList(updatedTemplates);
        
        showToast(`Plantilla de ${langName} eliminada exitosamente`, 'success');
        
      } catch (error) {
        console.error('Error eliminando plantilla:', error);
        showToast(`Error al eliminar la plantilla: ${error.message || 'Error desconocido'}`, 'error');
      }
    } else {
      console.log('Usuario canceló la eliminación');
    }
  }

  removeLanguage(langCode) {
    const lang = SUPPORTED_LANGUAGES[langCode];
    if (!lang) return;

    if (confirm(`¿Estás seguro de que quieres eliminar el idioma ${lang.name} (${langCode})?`)) {
      removeLanguageSupport(langCode);
      this.updateActiveLanguagesList();
      showToast(`Idioma ${lang.name} eliminado`, 'success');
    }
  }

  viewDefaultTemplate(langCode) {
    const defaultTemplate = this.defaultTemplates?.[langCode];
    if (!defaultTemplate) {
      showToast('No hay plantilla por defecto disponible para este idioma', 'error');
      return;
    }

    // Create modal to show default template
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.zIndex = '10000';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    
    modal.innerHTML = `
      <div class="modal-content default-template-modal">
        <div class="modal-header">
          <h3>📝 Plantilla por Defecto - ${defaultTemplate.name || this.getLanguageName(langCode)}</h3>
          <button class="modal-close" onclick="languageManager.closeDefaultTemplateModal(this)">
            <span data-lucide="x"></span>
          </button>
        </div>
        <div class="modal-body">
          <div class="template-info">
            <p><strong>Idioma:</strong> ${defaultTemplate.flag} ${defaultTemplate.name || this.getLanguageName(langCode)}</p>
            <p><strong>Código:</strong> ${langCode}</p>
            ${defaultTemplate.updated_at ? `<p><strong>Actualizada:</strong> ${new Date(defaultTemplate.updated_at).toLocaleString()}</p>` : ''}
          </div>
          <div class="template-content">
            <label>Contenido de la plantilla:</label>
            <textarea readonly rows="15" class="form-control">${defaultTemplate.content}</textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="languageManager.closeDefaultTemplateModal(this)">
            Cerrar
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
      }
    });
    
    // Re-initialize Lucide icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }


  closeDefaultTemplateModal(button) {
    const modal = button.closest('.modal-overlay');
    if (modal) {
      modal.remove();
      document.body.style.overflow = 'auto';
    }
  }

  async openAddLanguageModal() {
    console.log('Abriendo modal de agregar idioma...');
    const modal = document.getElementById('add-language-modal');
    console.log('Modal encontrado:', modal);
    
    if (modal) {
      modal.style.display = 'flex';
      modal.style.zIndex = '10001';
      document.body.style.overflow = 'hidden';
      
      console.log('Modal display set to flex');
      
      // Clear form
      const form = document.getElementById('add-language-form');
      if (form) {
        form.reset();
      }
      
      // Load countries in select
      await this.loadCountriesInSelect();
      
      // Re-initialize Lucide icons
      if (window.lucide) {
        window.lucide.createIcons();
      }
    } else {
      console.error('Modal add-language-modal no encontrado');
    }
  }

  closeAddLanguageModal() {
    const modal = document.getElementById('add-language-modal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
      
      // Reset submit button state when closing modal
      this.resetSubmitButton();
    }
  }

  resetSubmitButton() {
    const submitBtn = document.querySelector('#add-language-modal .modal-footer button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span data-lucide="plus"></span> Agregar Idioma';
      
      // Re-initialize Lucide icons
      if (window.lucide) {
        window.lucide.createIcons();
      }
    }
  }

  async loadCountriesInSelect() {
    try {
      const countries = await getCountriesAsync();
      const select = document.getElementById('country-select');
      
      if (!select || !countries) return;
      
      // Clear existing options
      select.innerHTML = '<option value="">Selecciona un país...</option>';
      
      // Group countries by language to avoid duplicates
      const languageGroups = {};
      countries.forEach(country => {
        if (country.language) {
          if (!languageGroups[country.language]) {
            languageGroups[country.language] = [];
          }
          languageGroups[country.language].push(country);
        }
      });
      
      // Create options grouped by language (sorted alphabetically)
      const sortedLanguages = Object.keys(languageGroups).sort((a, b) => {
        const nameA = this.getLanguageName(a);
        const nameB = this.getLanguageName(b);
        return nameA.localeCompare(nameB);
      });
      
      for (const langCode of sortedLanguages) {
        const countriesInLang = languageGroups[langCode];
        const languageInfo = await getLanguageInfo(langCode);
        const flag = languageInfo.flag;
        const langName = this.getLanguageName(langCode);
        
        // Limit countries shown (max 3) and add "..." if more
        const maxCountriesToShow = 3;
        const countriesToShow = countriesInLang.slice(0, maxCountriesToShow);
        const hasMoreCountries = countriesInLang.length > maxCountriesToShow;
        
        let displayText;
        if (countriesInLang.length === 1) {
          // Single country - show just language name
          displayText = `${flag} ${langName}`;
        } else {
          // Multiple countries - show limited list
          const countryNames = countriesToShow.map(c => c.name).join(', ');
          if (hasMoreCountries) {
            const remainingCount = countriesInLang.length - maxCountriesToShow;
            displayText = `${flag} ${langName} (${countryNames} +${remainingCount})`;
          } else {
            displayText = `${flag} ${langName} (${countryNames})`;
          }
        }
        
        // Create option with language info
        const option = document.createElement('option');
        option.value = JSON.stringify({
          langCode: langCode,
          langName: langName,
          countries: countriesInLang.map(c => c.name),
          totalCountries: countriesInLang.length
        });
        
        option.textContent = displayText;
        option.title = `${langName} - Países: ${countriesInLang.map(c => c.name).join(', ')}`;
        
        select.appendChild(option);
      }
      
      // Add event listener for selection change
      select.addEventListener('change', (e) => this.handleCountrySelection(e));
      
    } catch (error) {
      console.error('Error cargando países:', error);
      const select = document.getElementById('country-select');
      if (select) {
        select.innerHTML = '<option value="">Error cargando países</option>';
      }
    }
  }

  getLanguageName(langCode) {
    const names = {
      'es': 'Español',
      'en': 'English', 
      'pt': 'Português',
      'fr': 'Français',
      'it': 'Italiano',
      'de': 'Deutsch',
      'he': 'עברית',
      'ar': 'العربية',
      'ja': '日本語',
      'zh': '中文',
      'ru': 'Русский'
    };
    return names[langCode] || langCode.toUpperCase();
  }

  getDefaultTemplateForLanguage(langCode, langName) {
    const templates = {
      'es': `🏨 Check-in Online – ¡Simplificá tu llegada a {hotel_name}!

¡Gracias por elegirnos para su estadía en {hotel_name}! Para agilizar su ingreso y ofrecerle una experiencia más cómoda, le invitamos a realizar el check-in online antes de su llegada.

Por favor, complete el siguiente formulario con sus datos personales y documentación:
{checkin_url}

Una vez recibido, confirmaremos su registro y le enviaremos los detalles finales de su reserva.

Si tiene alguna solicitud especial o consulta, no dude en responder a este mensaje.

¡Esperamos darle la bienvenida muy pronto!

Atentamente,
Equipo de {hotel_name}`,

      'en': `🏨 Online Check-in – Simplify your arrival at {hotel_name}!

Thank you for choosing us for your stay at {hotel_name}! To streamline your check-in and offer you a more comfortable experience, we invite you to complete the online check-in before your arrival.

Please complete the following form with your personal information and documentation:
{checkin_url}

Once received, we will confirm your registration and send you the final details of your reservation.

If you have any special requests or questions, please don't hesitate to reply to this message.

We look forward to welcoming you soon!

Best regards,
{hotel_name} Team`,

      'it': `🏨 Check-in Online – Semplifica il tuo arrivo al {hotel_name}!

Grazie per averci scelto per il tuo soggiorno al {hotel_name}! Per velocizzare il tuo check-in e offrirti un'esperienza più confortevole, ti invitiamo a completare il check-in online prima del tuo arrivo.

Per favore, completa il seguente modulo con i tuoi dati personali e la documentazione:
{checkin_url}

Una volta ricevuto, confermeremo la tua registrazione e ti invieremo i dettagli finali della tua prenotazione.

Se hai richieste speciali o domande, non esitare a rispondere a questo messaggio.

Non vediamo l'ora di darti il benvenuto presto!

Cordiali saluti,
Il team di {hotel_name}`,

      'pt': `🏨 Check-in Online – Simplifique sua chegada ao {hotel_name}!

Obrigado por nos escolher para sua estadia no {hotel_name}! Para agilizar seu check-in e oferecer uma experiência mais confortável, convidamos você a completar o check-in online antes de sua chegada.

Por favor, complete o seguinte formulário com suas informações pessoais e documentação:
{checkin_url}

Uma vez recebido, confirmaremos seu registro e enviaremos os detalhes finais de sua reserva.

Se você tiver alguma solicitação especial ou dúvidas, não hesite em responder a esta mensagem.

Esperamos recebê-lo em breve!

Atenciosamente,
Equipe do {hotel_name}`
    };

    // Return specific template or generic one
    return templates[langCode] || templates['es'].replace(/¡|ñ/g, (match) => {
      return match === '¡' ? '' : 'n';
    });
  }

  handleCountrySelection(event) {
    const selectedValue = event.target.value;
    
    if (!selectedValue) {
      // Clear hidden fields if no selection
      document.getElementById('lang-code').value = '';
      document.getElementById('lang-name').value = '';
      return;
    }
    
    try {
      const data = JSON.parse(selectedValue);
      
      // Fill hidden fields
      document.getElementById('lang-code').value = data.langCode;
      document.getElementById('lang-name').value = data.langName;
      
      // Los campos de ayuda y placeholder fueron eliminados - ya no es necesario auto-completarlos
      
      console.log('País seleccionado:', data);
      
    } catch (error) {
      console.error('Error procesando selección de país:', error);
    }
  }


  async editLanguageTemplate(langCode) {
    try {
      console.log(`Editando plantilla para idioma: ${langCode}`);
      
      // Obtener información del idioma
      const languageInfo = await getLanguageInfo(langCode);
      const template = this.defaultTemplates[langCode];
      
      if (!template) {
        console.error('Plantilla no encontrada para el idioma:', langCode);
        if (window.showToast) {
          window.showToast('Plantilla no encontrada', 'error');
        }
        return;
      }
      
      // Llenar el modal con los datos actuales
      document.getElementById('edit-lang-flag').textContent = languageInfo.flag;
      document.getElementById('edit-lang-name').textContent = languageInfo.name;
      document.getElementById('edit-lang-code').textContent = langCode;
      document.getElementById('edit-lang-code-hidden').value = langCode;
      
      // Llenar el campo de plantilla
      const templateTextarea = document.getElementById('edit-lang-template');
      templateTextarea.value = template.content || '';
      
      // Inicializar contador de caracteres
      this.initializeCharacterCounter('edit-lang-template');
      
      // Mostrar el modal
      this.openEditLanguageModal();
      
    } catch (error) {
      console.error('Error cargando datos para editar:', error);
      if (window.showToast) {
        window.showToast('Error al cargar los datos del idioma', 'error');
      }
    }
  }

  openEditLanguageModal() {
    const modal = document.getElementById('edit-language-modal');
    if (modal) {
      modal.style.display = 'flex';
      modal.style.zIndex = '10001';
      document.body.style.overflow = 'hidden';
      console.log('Modal de edición abierto');
    } else {
      console.error('Modal de edición no encontrado');
    }
  }

  closeEditLanguageModal() {
    const modal = document.getElementById('edit-language-modal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
      
      // Limpiar el formulario
      document.getElementById('edit-language-form').reset();
      document.getElementById('edit-lang-flag').textContent = '';
      document.getElementById('edit-lang-name').textContent = '';
      document.getElementById('edit-lang-code').textContent = '';
      
      // Resetear botón
      this.resetEditSubmitButton();
      
      console.log('Modal de edición cerrado');
    }
  }

  initializeCharacterCounter(textareaId) {
    const textarea = document.getElementById(textareaId);
    const counterElement = textarea?.closest('.template-editor-wrapper')?.querySelector('.character-count');
    
    if (!textarea || !counterElement) return;
    
    const updateCounter = () => {
      const count = textarea.value.length;
      counterElement.textContent = `${count} caracteres`;
      
      // Cambiar color según la longitud
      if (count > 1000) {
        counterElement.style.color = '#dc2626'; // Rojo
      } else if (count > 500) {
        counterElement.style.color = '#f59e0b'; // Amarillo
      } else {
        counterElement.style.color = '#64748b'; // Gris normal
      }
    };
    
    // Actualizar inicialmente
    updateCounter();
    
    // Actualizar en tiempo real
    textarea.addEventListener('input', updateCounter);
    textarea.addEventListener('paste', () => setTimeout(updateCounter, 10));
  }

  async handleEditLanguage(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('edit-language-submit-btn');
    const originalText = submitBtn.textContent;
    
    try {
      // Cambiar estado del botón
      submitBtn.textContent = 'Guardando...';
      submitBtn.disabled = true;
      
      // Obtener datos del formulario
      const formData = new FormData(document.getElementById('edit-language-form'));
      const langCode = formData.get('lang-code');
      const langTemplate = formData.get('lang-template');
      
      console.log('Datos del formulario de edición:', {
        langCode,
        langTemplate: langTemplate ? langTemplate.substring(0, 100) + '...' : 'vacío'
      });
      
      if (!langCode) {
        throw new Error('Código de idioma no encontrado');
      }
      
      if (!langTemplate || langTemplate.trim() === '') {
        throw new Error('La plantilla no puede estar vacía');
      }
      
      // Guardar en el API
      console.log(`Actualizando plantilla para idioma: ${langCode}`);
      const result = await saveMessageTemplateAsync(6, langCode, langTemplate.trim());
      console.log('Respuesta de API (edición):', result);
      
      // Recargar plantillas desde API
      const updatedTemplates = await getTemplateDefaultsAsync(6);
      this.defaultTemplates = updatedTemplates;
      this.updateActiveLanguagesList(updatedTemplates);
      
      // Cerrar modal
      this.closeEditLanguageModal();
      
      // Mostrar mensaje de éxito
      if (window.showToast) {
        window.showToast('Plantilla actualizada exitosamente', 'success');
      }
      
    } catch (error) {
      console.error('Error actualizando plantilla:', error);
      if (window.showToast) {
        window.showToast(`Error: ${error.message}`, 'error');
      }
    } finally {
      // Restaurar botón
      this.resetEditSubmitButton();
    }
  }

  resetEditSubmitButton() {
    const submitBtn = document.getElementById('edit-language-submit-btn');
    if (submitBtn) {
      submitBtn.textContent = 'Guardar Cambios';
      submitBtn.disabled = false;
    }
  }
}

// Initialize language manager
let languageManager;

// Make functions globally available
window.addLanguageSupport = addLanguageSupport;
window.removeLanguageSupport = removeLanguageSupport;

// Global modal functions
window.closeAddLanguageModal = function() {
  if (window.languageManager) {
    window.languageManager.closeAddLanguageModal();
  }
};

window.openAddLanguageModal = async function() {
  console.log('Función global openAddLanguageModal llamada');
  if (window.languageManager) {
    await window.languageManager.openAddLanguageModal();
  } else {
    console.error('languageManager no disponible');
  }
};

// Global function to reset submit button if it gets stuck
window.resetAddLanguageButton = function() {
  console.log('Reseteando botón de agregar idioma...');
  if (window.languageManager) {
    window.languageManager.resetSubmitButton();
    console.log('Botón reseteado exitosamente');
  } else {
    // Fallback manual reset
    const submitBtn = document.querySelector('#add-language-modal .modal-footer button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span data-lucide="plus"></span> Agregar Idioma';
      if (window.lucide) {
        window.lucide.createIcons();
      }
      console.log('Botón reseteado manualmente');
    } else {
      console.error('No se pudo encontrar el botón para resetear');
    }
  }
};

// Global function to delete a language template
window.deleteLanguageTemplate = function(langCode) {
  console.log('Función global deleteLanguageTemplate llamada para:', langCode);
  if (window.languageManager) {
    window.languageManager.deleteLanguageTemplate(langCode);
  } else {
    console.error('languageManager no disponible');
  }
};

// Global function to insert variables in modals
window.insertVariableInModal = function(variable, textareaId) {
  // Validate parameters
  if (!variable || typeof variable !== 'string') {
    console.error('Variable inválida:', variable);
    if (window.showToast) {
      window.showToast('Error: Variable inválida', 'error');
    }
    return;
  }
  
  if (!textareaId || typeof textareaId !== 'string') {
    console.error('ID de textarea inválido:', textareaId);
    if (window.showToast) {
      window.showToast('Error: ID de textarea inválido', 'error');
    }
    return;
  }
  
  const textarea = document.getElementById(textareaId);
  if (!textarea) {
    console.error(`Textarea con ID '${textareaId}' no encontrado`);
    if (window.showToast) {
      window.showToast(`Error: Textarea '${textareaId}' no encontrado`, 'error');
    }
    return;
  }
  
  try {
    const start = textarea.selectionStart || 0;
    const end = textarea.selectionEnd || 0;
    const text = textarea.value || '';
    
    // Insert variable at cursor position
    const newText = text.substring(0, start) + variable + text.substring(end);
    textarea.value = newText;
    
    // Set cursor position after the inserted variable
    const newCursorPos = start + variable.length;
    textarea.setSelectionRange(newCursorPos, newCursorPos);
    
    // Focus back to textarea
    textarea.focus();
    
    console.log(`Variable ${variable} insertada en ${textareaId}`);
    
    // Show success feedback
    if (window.showToast) {
      window.showToast(`Variable ${variable} insertada`, 'success');
    }
  } catch (error) {
    console.error('Error insertando variable:', error);
    if (window.showToast) {
      window.showToast('Error al insertar variable', 'error');
    }
  }
};

window.closeEditLanguageModal = function() {
  if (window.languageManager) {
    window.languageManager.closeEditLanguageModal();
  }
};

window.resetEditLanguageButton = function() {
  console.log('Función global resetEditLanguageButton llamada');
  if (window.languageManager) {
    window.languageManager.resetEditSubmitButton();
    console.log('Botón de edición reseteado exitosamente');
  } else {
    // Fallback manual reset
    const submitBtn = document.getElementById('edit-language-submit-btn');
    if (submitBtn) {
      submitBtn.textContent = 'Guardar Cambios';
      submitBtn.disabled = false;
      console.log('Botón de edición reseteado manualmente');
    } else {
      console.error('No se pudo encontrar el botón de edición para resetear');
    }
  }
};

// Make variable functions globally available for modals
window.showVariableExamples = function() {
  if (window.templateManager) {
    window.templateManager.showVariableExamples();
  } else {
    console.error('templateManager no disponible');
  }
};

window.copyAllVariables = function() {
  if (window.templateManager) {
    window.templateManager.copyAllVariables();
  } else {
    console.error('templateManager no disponible');
  }
};

// Initialize template manager
let templateManager;

// Initialize when DOM is ready or immediately if already ready
async function initializeTemplateManager() {
  // Load supported languages from API first
  await loadSupportedLanguagesFromAPI();
  
  if (!templateManager) {
    templateManager = new MessageTemplateManager();
    window.templateManager = templateManager;
  }
  
  if (!languageManager) {
    languageManager = new LanguageManager();
    window.languageManager = languageManager;
  }
}

// Initialize only language manager for services view
// Template manager disabled for hotels view
async function initializeLanguageManager() {
  try {
    console.log('🔄 Inicializando Language Manager...');
    
    // Load supported languages from API first
    await loadSupportedLanguagesFromAPI();
    
    if (!languageManager) {
      languageManager = new LanguageManager();
      window.languageManager = languageManager;
      console.log('✅ Language Manager inicializado correctamente');
    }
  } catch (error) {
    console.error('❌ Error inicializando Language Manager:', error);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeLanguageManager);
} else {
  initializeLanguageManager();
}
