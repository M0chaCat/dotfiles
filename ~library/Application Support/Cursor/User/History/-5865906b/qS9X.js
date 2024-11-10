const path = require('path');

module.exports = {
    mode: 'development', // or 'production'
    target: 'electron-preload', // Ensures built-in modules are not bundled
    entry: './preload.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'preload.bundle.js'
    },
    resolve: {
        extensions: ['.js']
    },
    externals: {
        // Prevents bundling of node built-ins like 'path'
        path: 'commonjs path'
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
    }
};