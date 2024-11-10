var Mantle = "#181825";
var Base = "#1e1e2e";
var Text = "#cdd6f4";
var Blank = "rgba(0,0,0,0)";
var Surface0 = "#313244";
var Surface1 = "#45475a";
var Surface2 = "#585b70";

// Example AppInfo data
const AppInfo = [
    { id: 'app1', name: 'App One', icon: 'normal.PNG', featured: true },
    { id: 'app2', name: 'App Two', icon: 'normal.PNG', featured: false },
    { id: 'app3', name: 'App Three', icon: 'normal.PNG', featured: true },
    // Add more apps as needed
];

// Create a large image at the top
BEMA('Image', 'largeImage', 50, 20, 700, 200, false, 0, 0, Blank, null, null, null, null, null, false, 'large-image.png', null);

// Create a row of featured apps
let xOffset = 50;
AppInfo.filter(app => app.featured).forEach(app => {
    BEMA('Image', `${app.id}-featured`, xOffset, 240, 100, 100, false, 0, 0, Blank, null, null, null, null, null, false, app.icon, null);
    xOffset += 120; // Adjust spacing between featured apps
});

// Create a grid of app icons
let x = 50;
let y = 360;
AppInfo.forEach((app, index) => {
    BEMA('Image', `${app.id}-icon`, x, y, 100, 100, false, 0, 0, Blank, null, null, null, null, null, null, false, app.icon);
    x += 120; // Adjust spacing between icons
    if ((index + 1) % 5 === 0) { // Move to the next row after 5 icons
        x = 50;
        y += 120;
    }
});





//MEOW :33333333\





