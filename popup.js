document.addEventListener('DOMContentLoaded', () => {
    // --- Global State ---
    let currentLang = 'en';
    let isDarkMode = localStorage.getItem('darkMode') === 'true';

    // --- Element References ---
    const loadingScreen = document.getElementById('loadingScreen');
    const mainContent = document.getElementById('mainContent');
    const langToggleContainer = document.getElementById('lang-toggle-container');
    const langToggle = document.getElementById('langToggle');
    const toggleKnob = document.getElementById('toggleKnob');
    const toggleBg = document.getElementById('toggle-bg');
    const langEnBtn = document.getElementById('lang-en');
    const langArBtn = document.getElementById('lang-ar');
    const langLabel = document.getElementById('lang-label');
    const searchForm = document.getElementById('searchForm');
    const messageBox = document.getElementById('messageBox');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    // --- Translations ---
    const translations = {
        en: {
            heading: "Advanced Search Builder", 
            mainQuery: "Main Query", 
            mainQueryPlaceholder: "Enter your main query",
            exactPhrase: "Exact Phrase", 
            exactPhrasePlaceholder: "Enter exact phrase", 
            siteSearch: "Site Search",
            siteSearchPlaceholder: "Enter site to search", 
            filetype: "File Type", 
            filetypePlaceholder: "Enter file type",
            searchBtn: "Search", 
            searchEngine: "Search Engine", 
            google: "Google", 
            bing: "Bing", 
            duckduckgo: "DuckDuckGo",
            darkMode: "Dark Mode",
            lightMode: "Light Mode"
        },
        ar: {
            heading: "أداة البحث المتقدم", 
            mainQuery: "عبارة البحث الرئيسية", 
            mainQueryPlaceholder: "أدخل عبارة البحث الرئيسية",
            exactPhrase: "عبارة البحث الدقيقة", 
            exactPhrasePlaceholder: "أدخل العبارة الدقيقة", 
            siteSearch: "بحث في موقع",
            siteSearchPlaceholder: "أدخل الموقع المراد البحث فيه", 
            filetype: "نوع الملف", 
            filetypePlaceholder: "أدخل نوع الملف",
            searchBtn: "بحث", 
            searchEngine: "محرك البحث", 
            google: "جوجل", 
            bing: "بينج", 
            duckduckgo: "دك دك جو",
            darkMode: "الوضع الداكن",
            lightMode: "الوضع الفاتح"
        }
    };

    // --- Functions ---
    function setTheme(darkMode) {
        isDarkMode = darkMode;
        localStorage.setItem('darkMode', darkMode);
        
        if (darkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.textContent = '☀️'; // Sun icon for light mode switch
            loadingScreen.style.backgroundColor = '#1f2937';
        } else {
            document.documentElement.removeAttribute('data-theme');
            themeIcon.textContent = '🌙'; // Moon icon for dark mode switch
            loadingScreen.style.backgroundColor = '#f3f4f6';
        }
    }

    function setLanguage(lang) {
        currentLang = lang;
        if (lang === 'ar') {
            document.documentElement.lang = 'ar';
            document.body.dir = 'rtl';
            langToggle.checked = true;
            toggleKnob.style.left = '18px';
            toggleBg.style.backgroundColor = '#22c55e'; // Green for Arabic
            
            // Highlight Arabic flag and dim English flag
            langArBtn.style.opacity = '1';
            langArBtn.style.transform = 'scale(1.1)';
            langEnBtn.style.opacity = '0.5';
            langEnBtn.style.transform = 'scale(1)';
        } else {
            document.documentElement.lang = 'en';
            document.body.dir = 'ltr';
            langToggle.checked = false;
            toggleKnob.style.left = '2px';
            toggleBg.style.backgroundColor = '#3b82f6'; // Blue for English
            
            // Highlight English flag and dim Arabic flag
            langEnBtn.style.opacity = '1';
            langEnBtn.style.transform = 'scale(1.1)';
            langArBtn.style.opacity = '0.5';
            langArBtn.style.transform = 'scale(1)';
        }
        // Update all text
        document.getElementById('main-heading').textContent = translations[lang].heading;
        document.getElementById('label-mainQuery').textContent = translations[lang].mainQuery;
        document.getElementById('mainQuery').placeholder = translations[lang].mainQueryPlaceholder;
        document.getElementById('label-exactPhrase').textContent = translations[lang].exactPhrase;
        document.getElementById('exactPhrase').placeholder = translations[lang].exactPhrasePlaceholder;
        document.getElementById('label-siteSearch').textContent = translations[lang].siteSearch;
        document.getElementById('siteSearch').placeholder = translations[lang].siteSearchPlaceholder;
        document.getElementById('label-filetype').textContent = translations[lang].filetype;
        document.getElementById('filetype').placeholder = translations[lang].filetypePlaceholder;
        document.getElementById('searchBtn').textContent = translations[lang].searchBtn;
        document.getElementById('label-searchEngine').textContent = translations[lang].searchEngine;
        const searchEngineSelect = document.getElementById('searchEngine');
        searchEngineSelect.options[0].text = translations[lang].google;
        searchEngineSelect.options[1].text = translations[lang].bing;
        searchEngineSelect.options[2].text = translations[lang].duckduckgo;
    }

    function showMessage(message, type = 'info', duration = 3000) {
        messageBox.textContent = message;
        messageBox.className = 'rounded-full'; // Reset classes
        if (type === 'error') {
            messageBox.classList.add('error');
        }
        messageBox.classList.add('show');
        messageBox.style.direction = currentLang === 'ar' ? 'rtl' : 'ltr';
        setTimeout(() => {
            messageBox.classList.remove('show');
        }, duration);
    }

    function setupTooltips() {
        const tooltipData = {
            // Existing tooltips for form fields
            'mainQuery': {
                en: 'Your primary search term(s). This is what you\'re looking for.',
                ar: 'مصطلح البحث الأساسي. هذا ما تبحث عنه.'
            },
            'exactPhrase': {
                en: 'Find pages containing this exact sequence of words in this specific order.',
                ar: 'البحث عن صفحات تحتوي على هذه العبارة بالضبط بنفس الترتيب.'
            },
            'siteSearch': {
                en: 'Limit results to a specific website (e.g. wikipedia.org or nytimes.com).',
                ar: 'حصر النتائج في موقع محدد (مثل wikipedia.org أو nytimes.com).'
            },
            'filetype': {
                en: 'Search for specific file types (e.g. pdf, doc, xls, ppt).',
                ar: 'البحث عن أنواع ملفات محددة (مثل pdf أو doc أو xls أو ppt).'
            },
            'searchEngine': {
                en: 'Choose which search engine to use for your query.',
                ar: 'اختر محرك البحث الذي تريد استخدامه للاستعلام.'
            },
            
            // Add tooltips for language toggle
            'lang-label': {
                en: 'Toggle between English and Arabic',
                ar: 'التبديل بين الإنجليزية والعربية'
            },
            'lang-en': {
                en: 'Switch to English language',
                ar: 'تغيير اللغة إلى الإنجليزية'
            },
            'lang-ar': {
                en: 'Switch to Arabic language',
                ar: 'تغيير اللغة إلى العربية'
            }
            
            // Remove static theme toggle tooltip - we'll generate it dynamically
        };

        // Create tooltip element
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.style.position = 'absolute';
        tooltip.style.padding = '8px 12px';
        tooltip.style.backgroundColor = 'var(--card-background)';
        tooltip.style.color = 'var(--text-color)';
        tooltip.style.borderRadius = '6px';
        tooltip.style.fontSize = '0.85rem';
        tooltip.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        tooltip.style.zIndex = '100';
        tooltip.style.maxWidth = '250px';
        tooltip.style.display = 'none';
        tooltip.style.pointerEvents = 'none'; // Ensure tooltip doesn't block clicks
        document.body.appendChild(tooltip);

        // Add event listeners to form elements
        Object.keys(tooltipData).forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('mouseenter', () => {
                    const text = tooltipData[id][currentLang];
                    const rect = element.getBoundingClientRect();
                    
                    // Adjust position for toggles at the top
                    let topPosition = rect.bottom + 8;
                    let leftPosition = rect.left;
                    
                    // If it's one of the top toggles, show tooltip below
                    if (id === 'theme-toggle' || id === 'lang-label' || id === 'lang-en' || id === 'lang-ar') {
                        topPosition = rect.bottom + 5;
                        leftPosition = rect.left + (rect.width / 2) - 60; // Center better
                    }
                    
                    tooltip.textContent = text;
                    tooltip.style.display = 'block';
                    tooltip.style.top = `${topPosition}px`;
                    tooltip.style.left = `${leftPosition}px`;
                    tooltip.style.direction = currentLang === 'ar' ? 'rtl' : 'ltr';
                });
                
                element.addEventListener('mouseleave', () => {
                    tooltip.style.display = 'none';
                });
            }
        });
        
        // Special handling for theme toggle - always get current state dynamically
        const themeToggleElement = document.getElementById('theme-toggle');
        if (themeToggleElement) {
            themeToggleElement.addEventListener('mouseenter', () => {
                // Get current theme state and set appropriate tooltip
                const tooltipText = isDarkMode ? 
                    (currentLang === 'ar' ? 'التبديل إلى الوضع الفاتح' : 'Switch to light mode') :
                    (currentLang === 'ar' ? 'التبديل إلى الوضع الداكن' : 'Switch to dark mode');
                
                const rect = themeToggleElement.getBoundingClientRect();
                tooltip.textContent = tooltipText;
                tooltip.style.display = 'block';
                tooltip.style.top = `${rect.bottom + 5}px`;
                tooltip.style.left = `${rect.left + (rect.width / 2) - 60}px`;
                tooltip.style.direction = currentLang === 'ar' ? 'rtl' : 'ltr';
            });
            
            themeToggleElement.addEventListener('mouseleave', () => {
                tooltip.style.display = 'none';
            });
        }
    }

    // --- Event Listeners ---
    langLabel.addEventListener('click', (e) => {
        e.preventDefault();
        setLanguage(currentLang === 'en' ? 'ar' : 'en');
    });
    langEnBtn.addEventListener('click', () => setLanguage('en'));
    langArBtn.addEventListener('click', () => setLanguage('ar'));

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const mainQuery = document.getElementById('mainQuery').value.trim();
        const exactPhrase = document.getElementById('exactPhrase').value.trim();
        const siteSearch = document.getElementById('siteSearch').value.trim();
        const filetype = document.getElementById('filetype').value.trim();
        const hasQuery = mainQuery || exactPhrase || siteSearch || filetype;

        if (hasQuery) {
            // Build and open search URL (logic is correct)
            const searchEngine = document.getElementById('searchEngine').value;
            let queryParts = [];
            if (mainQuery) queryParts.push(mainQuery);
            if (exactPhrase) queryParts.push(`"${exactPhrase}"`);
            if (siteSearch) queryParts.push(`site:${siteSearch}`);
            if (filetype) queryParts.push(`filetype:${filetype}`);
            const finalQuery = encodeURIComponent(queryParts.join(' '));
            let searchUrl = '';
            if (searchEngine === 'google') searchUrl = `https://www.google.com/search?q=${finalQuery}`;
            else if (searchEngine === 'bing') searchUrl = `https://www.bing.com/search?q=${finalQuery}`;
            else if (searchEngine === 'duckduckgo') searchUrl = `https://duckduckgo.com/?q=${finalQuery}`;
            window.open(searchUrl, '_blank');
        } else {
            // This will now use the correct language with improved styling
            showMessage(
                currentLang === 'ar'
                    ? 'تم الرفض: يجب إدخال قيمة واحدة على الأقل للبحث.'
                    : 'Denied: You must enter at least one value to search.',
                'error'
            );
        }
    });

    // Add theme toggle listener
    themeToggle.addEventListener('click', () => {
        setTheme(!isDarkMode);
    });

    // --- Initial Setup ---
    langToggleContainer.style.display = 'none';
    mainContent.style.transition = 'opacity 0.7s ease';
    mainContent.style.opacity = '0';
    
    // Apply initial theme based on saved preference
    setTheme(isDarkMode);

    // Fix for loading screen and clickable elements (moved from inline script)
    function ensureElementsClickable() {
        // Ensure loading screen is properly hidden after transition
        if (loadingScreen && loadingScreen.classList.contains('hidden')) {
            loadingScreen.style.display = 'none';
            loadingScreen.style.pointerEvents = 'none';
            loadingScreen.style.zIndex = '-1';
        }
        
        // Make sure all form elements are clickable
        const formElements = document.querySelectorAll('#searchForm input, #searchForm select, #searchForm button, #theme-toggle, #lang-label, #lang-en, #lang-ar');
        formElements.forEach(element => {
            element.style.pointerEvents = 'auto';
            element.style.position = 'relative';
            element.style.zIndex = '1';
        });
    }

    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            mainContent.classList.remove('hidden');
            mainContent.style.opacity = '1';
            langToggleContainer.style.display = 'flex';
            ensureElementsClickable(); // Call the function to fix clickability
        }, 700);
    }, 2000);

    document.getElementById('currentYear').textContent = new Date().getFullYear();
    setLanguage(currentLang); // Set initial language
    setupTooltips();
});
