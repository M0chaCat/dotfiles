const path = require('path');

module.exports = {
    mode: 'development', // or 'production'
    target: 'electron-main', // Ensures built-in modules are handled correctly
    entry: {
        main: './main.js',
        preload: './preload.js', // Ensure this entry exists
        renderer: './renderer.js', // Added renderer entry
        combined: './combined.js' // Add this line to include combined.js
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js' // This will generate main.bundle.js, preload.bundle.js, and combined.bundle.js
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-modules-commonjs']
                    }
                }
            }
        ]
    },
    node: {
        __dirname: false,
        __filename: false,
    },
    devtool: 'source-map', // Optional: Helps with debugging
};