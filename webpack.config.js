var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        app: [
            "./static/js/main.js"
        ]
    },
    output: {
        path: __dirname + '/static/build/js/',
        filename: 'main.js'
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader"},
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },

            { test: /\.jpg$/, loader: 'url-loader?limit=10000&minetype=image/jpg' },
            { test: /\.jpeg$/, loader: 'url-loader?limit=10000&minetype=image/jpg' },
            { test: /\.png/, loader: 'url-loader?limit=10000&minetype=image/png' },
            { test: /\.gif/, loader: 'url-loader?limit=10000&minetype=image/gif' },

            { test: /\.scss$/, loader: ExtractTextPlugin.extract('css!sass') }
        ]
    },
    plugins: [ new ExtractTextPlugin("../css/main.css", { allChunks: true }) ],

    // dev server
    devServer: {
        filename: 'main.js',
        publicPath: "/static/build/js/",
        inline: true,
        hot: true
    }
};
