document.addEventListener('DOMContentLoaded', () => {
    // --- Global State ---
    let currentLang = localStorage.getItem('language') || 'en'; // Load saved language
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
            lightMode: "Light Mode",
            dateRange: "Date Range",
            anyTime: "Any time",
            past24Hours: "Past 24 hours",
            pastWeek: "Past week",
            pastMonth: "Past month",
            pastYear: "Past year",
            customRange: "Custom range...",
            startDate: "Start date",
            endDate: "End date",
            preview: "Preview",
            previewLoading: "Loading preview...",
            noResults: "No results found",
            errorFetching: "Error loading preview"
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
            lightMode: "الوضع الفاتح",
            dateRange: "النطاق الزمني",
            anyTime: "أي وقت",
            past24Hours: "آخر 24 ساعة",
            pastWeek: "الأسبوع الماضي",
            pastMonth: "الشهر الماضي",
            pastYear: "السنة الماضية",
            customRange: "نطاق مخصص...",
            startDate: "تاريخ البداية",
            endDate: "تاريخ النهاية",
            preview: "معاينة",
            previewLoading: "جار تحميل المعاينة...",
            noResults: "لم يتم العثور على نتائج",
            errorFetching: "خطأ في تحميل المعاينة"
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
        localStorage.setItem('language', lang); // Save language on change
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
        document.getElementById('label-dateRange').textContent = translations[lang].dateRange;
        
        const dateRangeSelect = document.getElementById('dateRange');
        dateRangeSelect.options[0].text = translations[lang].anyTime;
        dateRangeSelect.options[1].text = translations[lang].past24Hours;
        dateRangeSelect.options[2].text = translations[lang].pastWeek;
        dateRangeSelect.options[3].text = translations[lang].pastMonth;
        dateRangeSelect.options[4].text = translations[lang].pastYear;
        dateRangeSelect.options[5].text = translations[lang].customRange;
        
        if (document.getElementById('startDate').placeholder) {
            document.getElementById('startDate').placeholder = translations[lang].startDate;
        }
        if (document.getElementById('endDate').placeholder) {
            document.getElementById('endDate').placeholder = translations[lang].endDate;
        }
        document.getElementById('previewBtn').textContent = translations[lang].preview;
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
            },
            'dateRange': {
                en: 'Limit results to a specific time period.',
                ar: 'حصر النتائج في فترة زمنية محددة.'
            },
            'startDate': {
                en: 'The beginning of your custom date range.',
                ar: 'بداية النطاق الزمني المخصص.'
            },
            'endDate': {
                en: 'The end of your custom date range.',
                ar: 'نهاية النطاق الزمني المخصص.'
            },
            'previewBtn': {
                en: 'See search results without opening a new tab.',
                ar: 'اعرض نتائج البحث بدون فتح علامة تبويب جديدة.'
            }
        };

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
        tooltip.style.pointerEvents = 'none';
        tooltip.style.transition = 'opacity 0.15s ease';
        document.body.appendChild(tooltip);

        function positionTooltip(element, text, forceBelow = false) {
            tooltip.textContent = text;
            tooltip.style.display = 'block';
            tooltip.style.opacity = '0';
            tooltip.style.direction = currentLang === 'ar' ? 'rtl' : 'ltr';

            // allow DOM to paint the new text so we can measure
            requestAnimationFrame(() => {
                const rect = element.getBoundingClientRect();
                const tooltipRect = tooltip.getBoundingClientRect();
                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;
                const OFFSET = 5; // Reduced offset from 10px to 5px

                let top = rect.top - tooltipRect.height - OFFSET; // default above
                if (forceBelow || top < 8) {
                    top = rect.bottom + OFFSET; // fall back below if near top
                }

                let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
                left = Math.max(8, Math.min(left, viewportWidth - tooltipRect.width - 8));

                tooltip.style.top = `${top}px`;
                tooltip.style.left = `${left}px`;
                tooltip.style.opacity = '1';
            });
        }

        Object.keys(tooltipData).forEach(id => {
            const element = document.getElementById(id);
            if (!element) return;

            element.addEventListener('mouseenter', () => {
                positionTooltip(element, tooltipData[id][currentLang]);
            });

            element.addEventListener('mouseleave', () => {
                tooltip.style.display = 'none';
                tooltip.style.opacity = '0';
            });
        });

        const themeToggleElement = document.getElementById('theme-toggle');
        if (themeToggleElement) {
            themeToggleElement.addEventListener('mouseenter', () => {
                const text = isDarkMode
                    ? (currentLang === 'ar' ? 'التبديل إلى الوضع الفاتح' : 'Switch to light mode')
                    : (currentLang === 'ar' ? 'التبديل إلى الوضع الداكن' : 'Switch to dark mode');

                positionTooltip(themeToggleElement, text, true);
            });

            themeToggleElement.addEventListener('mouseleave', () => {
                tooltip.style.display = 'none';
                tooltip.style.opacity = '0';
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
        const dateRange = document.getElementById('dateRange').value;
        
        let dateFilter = '';
        if (dateRange) {
            if (dateRange === 'custom') {
                const startDate = document.getElementById('startDate').value;
                const endDate = document.getElementById('endDate').value;
                if (startDate && endDate) dateFilter = `after:${startDate} before:${endDate}`;
            } else {
                dateFilter = dateRange;
            }
        }
        
        const hasQuery = mainQuery || exactPhrase || siteSearch || filetype || dateFilter;

        if (!hasQuery) {
            showMessage(
                currentLang === 'ar'
                    ? 'تم الرفض: يجب إدخال قيمة واحدة على الأقل للبحث.'
                    : 'Denied: You must enter at least one value to search.',
                'error'
            );
            return;
        }

        const searchEngine = document.getElementById('searchEngine').value;
        let queryParts = [];
        if (mainQuery) queryParts.push(mainQuery);
        if (exactPhrase) queryParts.push(`"${exactPhrase}"`);
        if (siteSearch) queryParts.push(`site:${siteSearch}`);
        if (filetype) queryParts.push(`filetype:${filetype}`);

        const searchUrlBuilders = {
            google: (parts, date) => {
                let url = 'https://www.google.com/search?q=';
                let specialParams = '';
                if (date) {
                    if (['d1', 'w1', 'm1', 'y1'].includes(date)) {
                        specialParams = `&tbs=qdr:${date.charAt(0)}`;
                    } else {
                        parts.push(date);
                    }
                }
                return url + encodeURIComponent(parts.join(' ')) + specialParams;
            },
            bing: (parts, date) => {
                let url = 'https://www.bing.com/search?q=';
                let specialParams = '';
                if (date) {
                    const dateMap = { d1: 'ez1', w1: 'ez2', m1: 'ez3', y1: 'ez5' };
                    if (dateMap[date]) {
                        specialParams = `&filters=ex1%3a%22${dateMap[date]}%22`;
                    }
                }
                return url + encodeURIComponent(parts.join(' ')) + specialParams;
            },
            duckduckgo: (parts, date) => {
                // DuckDuckGo has limited date range support via URL params
                return `https://duckduckgo.com/?q=${encodeURIComponent(parts.join(' '))}`;
            }
        };

        const searchUrl = searchUrlBuilders[searchEngine](queryParts, dateFilter);
        window.open(searchUrl, '_blank');
    });

    // Add theme toggle listener
    themeToggle.addEventListener('click', () => {
        setTheme(!isDarkMode);
    });

    document.getElementById('dateRange').addEventListener('change', function() {
        const customDateContainer = document.getElementById('customDateContainer');
        if (this.value === 'custom') {
            customDateContainer.style.display = 'flex'; // Changed from 'flex' to 'block'
        } else {
            customDateContainer.style.display = 'none';
        }
    });

    document.getElementById('previewBtn').addEventListener('click', async function() {
        const mainQuery = document.getElementById('mainQuery').value.trim();
        const exactPhrase = document.getElementById('exactPhrase').value.trim();
        const siteSearch = document.getElementById('siteSearch').value.trim();
        const filetype = document.getElementById('filetype').value.trim();
        const dateRange = document.getElementById('dateRange').value;
        
        const hasQuery = mainQuery || exactPhrase || siteSearch || filetype || dateRange;
        
        if (!hasQuery) {
            showMessage(
                currentLang === 'ar'
                    ? 'يرجى إدخال معايير البحث أولاً'
                    : 'Please enter search criteria first',
                'error'
            );
            return;
        }
        
        const resultsPreview = document.getElementById('resultsPreview');
        resultsPreview.style.display = 'block';
        resultsPreview.innerHTML = `<div style="text-align:center; padding:1rem;">${translations[currentLang].previewLoading}</div>`;
        
        try {
            const results = await getSearchPreview(mainQuery, exactPhrase, siteSearch, filetype, dateRange);
            
            resultsPreview.innerHTML = '';
            if (results.length === 0) {
                resultsPreview.innerHTML = `<div style="text-align:center; padding:1rem;">${translations[currentLang].noResults}</div>`;
                return;
            }
            
            results.forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.style.padding = '0.75rem';
                resultItem.style.borderBottom = '1px solid var(--border-color)';
                resultItem.style.cursor = 'pointer';
                
                const title = document.createElement('div');
                title.textContent = result.title;
                title.style.fontWeight = 'bold';
                title.style.color = '#3b82f6';
                
                const url = document.createElement('div');
                url.textContent = result.url;
                url.style.fontSize = '0.8rem';
                url.style.color = '#10b981';
                url.style.marginBottom = '0.25rem';
                url.style.textOverflow = 'ellipsis';
                url.style.overflow = 'hidden';
                url.style.whiteSpace = 'nowrap';
                
                const snippet = document.createElement('div');
                snippet.textContent = result.snippet;
                snippet.style.fontSize = '0.9rem';
                
                resultItem.appendChild(title);
                resultItem.appendChild(url);
                resultItem.appendChild(snippet);
                
                resultItem.addEventListener('click', () => {
                    window.open(result.url, '_blank');
                });
                
                resultsPreview.appendChild(resultItem);
            });
        } catch (error) {
            resultsPreview.innerHTML = `<div style="text-align:center; padding:1rem; color:var(--error-color);">${translations[currentLang].errorFetching}</div>`;
        }
    });

    // This function simulates getting search results
    // In a real extension, you would make API calls to a search engine
    async function getSearchPreview(mainQuery, exactPhrase, siteSearch, filetype, dateRange) {
        // Build query similar to how you build it for the search
        let queryParts = [];
        if (mainQuery) queryParts.push(mainQuery);
        if (exactPhrase) queryParts.push(`"${exactPhrase}"`);
        if (siteSearch) queryParts.push(`site:${siteSearch}`);
        if (filetype) queryParts.push(`filetype:${filetype}`);
        
        const query = queryParts.join(' ');
        
        if (!query) {
            return []; // No query, no results
        }
        
        try {
            // Build the API URL
            const apiUrl = new URL('https://www.googleapis.com/customsearch/v1');
            apiUrl.searchParams.append('key', GOOGLE_API_KEY);
            apiUrl.searchParams.append('cx', GOOGLE_CX);
            apiUrl.searchParams.append('q', query);
            
            // Optional: Add date filter if available
            if (dateRange === 'd1') {
                apiUrl.searchParams.append('dateRestrict', 'd1');
            } else if (dateRange === 'w1') {
                apiUrl.searchParams.append('dateRestrict', 'w1');
            } else if (dateRange === 'm1') {
                apiUrl.searchParams.append('dateRestrict', 'm1');
            } else if (dateRange === 'y1') {
                apiUrl.searchParams.append('dateRestrict', 'y1');
            }
            
            // Fetch results from the API
            const response = await fetch(apiUrl);
            const data = await response.json();
            
            if (!response.ok) {
                console.error('API error:', data.error);
                throw new Error('Error fetching search results');
            }
            
            // Transform API results to our format
            if (data.items && data.items.length > 0) {
                return data.items.slice(0, 3).map(item => ({
                    title: item.title,
                    url: item.link,
                    snippet: item.snippet
                }));
            } else {
                return []; // No results found
            }
        } catch (error) {
            console.error('Search preview error:', error);
            // Return simulated results as fallback
            return generateFallbackResults(mainQuery, exactPhrase, siteSearch, filetype);
        }
    }

    // Add a fallback function in case the API fails or rate limit is reached
    function generateFallbackResults(mainQuery, exactPhrase, siteSearch, filetype) {
        const query = [mainQuery, exactPhrase].filter(Boolean).join(' ') || 'search';
        return [
            {
                title: `API limit reached - Simulated result for ${query}`,
                url: `https://example.com/search?q=${encodeURIComponent(query)}`,
                snippet: `This is a fallback result because the API daily limit was reached or an error occurred. Real results are available with the full search.`
            }
        ];
    }

    // --- Initial Setup ---
    langToggleContainer.style.display = 'none';
    mainContent.style.transition = 'opacity 0.7s ease';
    mainContent.style.opacity = '0';
    
    setTheme(isDarkMode);

    function ensureElementsClickable() {
        if (loadingScreen && loadingScreen.classList.contains('hidden')) {
            loadingScreen.style.display = 'none';
            loadingScreen.style.pointerEvents = 'none';
            loadingScreen.style.zIndex = '-1';
        }
        const formElements = document.querySelectorAll('#searchForm input, #searchForm select, #searchForm button, #theme-toggle, #lang-label, #lang-en, #lang-ar');
        formElements.forEach(element => {
            element.style.pointerEvents = 'auto';
            element.style.position = 'relative';
            element.style.zIndex = '1';
        });
    }

    // Replace the nested setTimeout with this more robust version
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        
        loadingScreen.addEventListener('transitionend', () => {
            loadingScreen.classList.add('hidden');
            mainContent.classList.remove('hidden');
            mainContent.style.opacity = '1';
            langToggleContainer.style.display = 'flex';
            
            ensureElementsClickable();
            setupTooltips();
            setLanguage(currentLang);
            document.getElementById('currentYear').textContent = new Date().getFullYear();
        }, { once: true }); // { once: true } ensures the listener only runs once

    }, 1500); // Reduced timeout for a faster startup

    // --- Google API Configuration ---
    let GOOGLE_API_KEY, GOOGLE_CX;

    try {
      // Try to load from config.js
      GOOGLE_API_KEY = CONFIG.GOOGLE_API_KEY;
      GOOGLE_CX = CONFIG.GOOGLE_CX;
      
      // Check if values are placeholders
      if (GOOGLE_API_KEY === 'YOUR_GOOGLE_API_KEY_HERE') {
        throw new Error('API key not configured');
      }
    } catch (error) {
      console.warn('API configuration not found or invalid. Preview will use simulated results.');
      GOOGLE_API_KEY = null;
      GOOGLE_CX = null;
    }
});