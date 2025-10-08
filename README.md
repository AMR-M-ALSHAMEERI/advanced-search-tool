# Advanced Search Tool - Browser Extension

A lightweight and user-friendly browser extension to help you build advanced search queries quickly and efficiently.

## Features

*   **Advanced Query Building**: Easily add operators like `exact phrase`, `site search`, and `filetype`.
*   **Multi-Engine Support**: Choose between Google, Bing, and DuckDuckGo for your search.
*   **Bilingual Interface**: Switch between English and Arabic with a single click.
*   **Full RTL Support**: The interface adapts to Right-to-Left (RTL) for the Arabic language.
*   **Dark Mode**: Toggle between light and dark themes with a single click, with preferences saved between sessions.
*   **Date Range Filtering**: Limit search results to specific time periods (past 24 hours, week, month, year, or custom date range).
*   **Search Result Previews**: See a quick preview of search results without opening a new tab.
*   **Interactive Tooltips**: Helpful tooltips explain the purpose of each search field and control.
*   **Responsive Design**: A clean and modern UI that works great in the extension popup.
*   **No Dependencies**: Runs with pure HTML, CSS, and JavaScript.

## Recent Updates (v1.3.0)

*   **Search Result Previews**: Added ability to preview search results directly in the extension
*   **Date Range Search**: Filter results by time period with predefined options or custom date ranges
*   **Dark Mode**: Added a toggle for switching between light and dark themes with improved color schemes for better readability
*   **Tooltips**: Added helpful explanations that appear when hovering over form fields and controls
*   **Improved Error Messages**: Clear, language-appropriate feedback when search criteria are missing
*   **Visual Enhancements**: Better transitions, visual feedback for state changes, and improved contrast
*   **Language Persistence**: Your language preference is now saved and restored between sessions

## How to Use

1.  Fill in one or more of the input fields:
    *   **Main Query**: Your primary search terms
    *   **Exact Phrase**: Find pages with this exact phrase
    *   **Site Search**: Limit results to a specific website
    *   **File Type**: Search for specific file types (e.g., pdf, doc, ppt)
    *   **Date Range**: Filter by time period
2.  Select your desired search engine from the dropdown (Google, Bing, or DuckDuckGo).
3.  Click "Preview" to see search results within the extension, or "Search" to open results in a new tab.

## Additional Features

*   **Language Toggle**: Switch between English and Arabic using the flag buttons or toggle switch
*   **Theme Toggle**: Click the moon/sun icon to switch between light and dark modes
*   **Tooltips**: Hover over any field or control to see helpful information

## Installation (for Development)

1.  Clone or download this repository.
2.  Create a `config.js` file based on the `config.template.js` file and add your Google API credentials.
3.  Open your browser's extension management page (e.g., `chrome://extensions`).
4.  Enable "Developer mode".
5.  Click "Load unpacked" and select the project folder.

## API Configuration (for Search Previews)

The search preview functionality requires Google Custom Search API credentials:

1. Copy `config.template.js` to `config.js`
2. Add your Google API Key and Custom Search Engine ID to `config.js`
3. Keep `config.js` private (it's already in .gitignore)

Note: The Google Custom Search API offers 100 free queries per day. Beyond that limit, the extension will fall back to simulated results.

## Version

Current version: v1.3.0

A.M ^_^