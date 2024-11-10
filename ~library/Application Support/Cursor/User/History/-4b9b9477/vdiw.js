<!DOCTYPE html>
<html>
<head>
    <title>MeowBrowz</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="controls">
        <button id="back">Back</button>
        <button id="forward">Forward</button>
        <button id="reload">Reload</button>
        <input id="url" type="text" placeholder="Enter URL" />
        <button id="go">Go</button>
    </div>
    <webview id="browser" src="https://www.example.com"></webview>

    <script src="script.js"></script>
</body>
</html>