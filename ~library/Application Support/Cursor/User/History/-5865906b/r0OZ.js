const path = require('path');

module.exports = {
    mode: 'development', // or 'production'
    target: 'electron-renderer', // Ensures built-in modules are handled correctly
    entry: {
        preload: './preload.js',
        renderer: './renderer.js',
        combined: './combined.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath: './dist/' // Add this line
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