const path = require('path'),
    webpack = require('webpack'),
    extractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'frontend'),
    entry:{
        app: [
            './js/app.js'
        ],
    },

    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '../'
    },

    devServer: {
        contentBase: './dist',
        port: 5000
    },


}