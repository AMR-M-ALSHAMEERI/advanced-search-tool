document.addEventListener('DOMContentLoaded', () => {
    // --- Global State ---
    let currentLang = 'en';

    // --- Element References ---
    const loadingScreen = document.getElementById('loadingScreen');
    const mainContent = document.getElementById('mainContent');
    const langToggleContainer = document.getElementById('lang-toggle-container');
    const langToggle = document.getElementById('langToggle');
    const toggleKnob = document.getElementById('toggleKnob');
    const toggleBg = document.getElementById('toggle-bg'); // Get the toggle background
    const langEnBtn = document.getElementById('lang-en');
    const langArBtn = document.getElementById('lang-ar');
    const langLabel = document.getElementById('lang-label');
    const searchForm = document.getElementById('searchForm');
    const messageBox = document.getElementById('messageBox');

    // --- Translations ---
    const translations = {
        en: {
            heading: "Advanced Search Builder", mainQuery: "Main Query", mainQueryPlaceholder: "Enter your main query",
            exactPhrase: "Exact Phrase", exactPhrasePlaceholder: "Enter exact phrase", siteSearch: "Site Search",
            siteSearchPlaceholder: "Enter site to search", filetype: "File Type", filetypePlaceholder: "Enter file type",
            searchBtn: "Search", searchEngine: "Search Engine", google: "Google", bing: "Bing", duckduckgo: "DuckDuckGo"
        },
        ar: {
            heading: "أداة البحث المتقدم", mainQuery: "عبارة البحث الرئيسية", mainQueryPlaceholder: "أدخل عبارة البحث الرئيسي",
            exactPhrase: "عبارة البحث الدقيقة", exactPhrasePlaceholder: "أدخل العبارة الدقيقة", siteSearch: "بحث في موقع",
            siteSearchPlaceholder: "أدخل الموقع المراد البحث فيه", filetype: "نوع الملف", filetypePlaceholder: "أدخل نوع الملف",
            searchBtn: "بحث", searchEngine: "محرك البحث", google: "جوجل", bing: "بينج", duckduckgo: "دك دك جو"
        }
    };

    // --- Functions ---
    function setLanguage(lang) {
        currentLang = lang; // Update the shared language state
        if (lang === 'ar') {
            document.documentElement.lang = 'ar';
            document.body.dir = 'rtl';
            langToggle.checked = true;
            toggleKnob.style.left = '18px';
            toggleBg.style.backgroundColor = '#22c55e'; // Green for Arabic
        } else {
            document.documentElement.lang = 'en';
            document.body.dir = 'ltr';
            langToggle.checked = false;
            toggleKnob.style.left = '2px';
            toggleBg.style.backgroundColor = '#3b82f6'; // Blue for English
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
        const searchQuery = [mainQuery, exactPhrase, siteSearch, filetype].some(val => val);

        if (searchQuery) {
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
            // This will now use the correct language
            showMessage(
                currentLang === 'ar'
                    ? 'تم الرفض: يجب إدخال قيمة واحدة على الأقل للبحث.'
                    : 'Denied: You must enter at least one value to search.',
                'error'
            );
        }
    });

    // --- Initial Setup ---
    langToggleContainer.style.display = 'none';
    mainContent.style.transition = 'opacity 0.7s ease';
    mainContent.style.opacity = '0';

    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            mainContent.classList.remove('hidden');
            mainContent.style.opacity = '1';
            langToggleContainer.style.display = 'flex';
        }, 700);
    }, 2000);

    document.getElementById('currentYear').textContent = new Date().getFullYear();
    setLanguage(currentLang); // Set initial language
});
