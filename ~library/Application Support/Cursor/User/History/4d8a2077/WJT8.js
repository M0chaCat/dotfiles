document.addEventListener('DOMContentLoaded', () => {
    const webview = document.getElementById('browser');
    const urlInput = document.getElementById('url');
    const backButton = document.getElementById('back');
    const forwardButton = document.getElementById('forward');
    const reloadButton = document.getElementById('reload');
    const goButton = document.getElementById('go');
    const tabs = document.querySelectorAll('.tab');
    const newTabButton = document.getElementById('new-tab');

    let tabStates = [];
    let currentTabIndex = 0;

    backButton.addEventListener('click', () => webview.goBack());
    forwardButton.addEventListener('click', () => webview.goForward());
    reloadButton.addEventListener('click', () => webview.reload());
    goButton.addEventListener('click', loadURL);

    webview.addEventListener('did-navigate', () => {
        urlInput.value = webview.getURL();
        saveCurrentTabState();
    });

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            switchTab(index);
        });
    });

    newTabButton.addEventListener('click', () => {
        const newTab = document.createElement('button');
        newTab.className = 'tab';
        newTab.textContent = 'New Tab';
        newTab.setAttribute('data-url', 'https://www.example.com');
        newTab.addEventListener('click', () => {
            const index = tabStates.length;
            switchTab(index);
        });
        document.getElementById('tabs').insertBefore(newTab, newTabButton);
        tabStates.push({ url: 'https://www.example.com', state: {} });
        switchTab(tabStates.length - 1);
    });

    function loadURL() {
        let url = urlInput.value.trim();
        console.log(`Original input: ${url}`);
        if (!isValidURL(url)) {
            console.log(`Input is not a valid URL. Searching on Google.`);
            url = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
        } else if (!url.startsWith('http://') && !url.startsWith('https://')) {
            console.log(`Input is a valid URL but missing protocol. Adding https://`);
            url = 'https://' + url;
        }
        console.log(`Navigating to: ${url}`);
        webview.loadURL(url).catch(err => {
            console.error('Failed to load URL:', err);
        });
    }

    function isValidURL(string) {
        try {
            new URL(string);
            console.log(`Valid URL: ${string}`);
            return true;
        } catch (e) {
            console.log(`Invalid URL: ${string}`);
            return false;
        }
    }

    function saveCurrentTabState() {
        const url = webview.getURL();
        tabStates[currentTabIndex] = { url, state: {} }; // Add more state data as needed
    }

    function switchTab(index) {
        saveCurrentTabState();
        currentTabIndex = index;
        const tabState = tabStates[index];
        urlInput.value = tabState.url;
        webview.loadURL(tabState.url).catch(err => {
            console.error('Failed to load URL:', err);
        });
    }

    webview.addEventListener('dom-ready', () => {
        urlInput.value = webview.getURL();
    });

    // Initialize the first tab state
    tabStates.push({ url: 'https://www.example.com', state: {} });
});