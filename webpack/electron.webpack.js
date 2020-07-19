const path = require('path')

const rootPath = path.resolve(__dirname, '..')
const nodeExternals = require('webpack-node-externals')

module.exports = {
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    devtool: 'source-map',
    entry: path.resolve(rootPath, 'electron', 'main.ts'),
    target: 'electron-main',
    externals: [nodeExternals()],
    module: {
        rules: [{
            test: /\.(js|ts|tsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        }]
    },
    node: {
        __dirname: false
    },
    output: {
        path: path.resolve(rootPath, 'dist'),
        filename: '[name].js'
    }
}