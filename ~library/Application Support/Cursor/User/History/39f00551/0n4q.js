// Your provided JavaScript code goes here
// Example:
document.addEventListener("DOMContentLoaded", function() {
    // Function to set the active screen
    function setScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }

    // Initialize the UI
    function initializeUI() {
        setScreen("Celeste.Boot");

        // Add event listeners for dock buttons
        document.getElementById("Celeste.Main.Dock.0").addEventListener("click", function() {
            console.log("Dock 0 clicked");
        });
        document.getElementById("Celeste.Main.Dock.1").addEventListener("click", function() {
            console.log("Dock 1 clicked");
        });
        document.getElementById("Celeste.Main.Dock.2").addEventListener("click", function() {
            console.log("Dock 2 clicked");
        });
        document.getElementById("Celeste.Main.Dock.3").addEventListener("click", function() {
            console.log("Dock 3 clicked");
        });
        document.getElementById("Celeste.Main.Dock.4").addEventListener("click", function() {
            console.log("Dock 4 clicked");
        });
        document.getElementById("Celeste.Main.Dock.5").addEventListener("click", function() {
            console.log("Dock 5 clicked");
        });
    }

    // Boot function to simulate the boot process
    function boot() {
        setScreen("Celeste.Boot");
        setTimeout(function() {
            setScreen("Celeste.Main");
        }, 2000);
    }

    // Start the UI initialization
    initializeUI();
    boot();
});