document.addEventListener('DOMContentLoaded', () => {
    const webview = document.getElementById('browser');
    const urlInput = document.getElementById('url');
    const backButton = document.getElementById('back');
    const forwardButton = document.getElementById('forward');
    const reloadButton = document.getElementById('reload');
    const goButton = document.getElementById('go');

    backButton.addEventListener('click', () => webview.goBack());
    forwardButton.addEventListener('click', () => webview.goForward());
    reloadButton.addEventListener('click', () => webview.reload());
    goButton.addEventListener('click', loadURL);

    webview.addEventListener('did-navigate', () => {
        urlInput.value = webview.getURL();
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
            return true;
        } catch (_) {
            return false;
        }
    }

    webview.addEventListener('dom-ready', () => {
        urlInput.value = webview.getURL();
    });
});