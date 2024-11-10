const path = require('path');

module.exports = {
    mode: 'development', // or 'production'
    target: 'electron-preload', // Ensures built-in modules are handled correctly
    entry: './preload.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'preload.bundle.js'
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
                        presets: ['@babel/preset-env']
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