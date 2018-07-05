/*
# 
*/

var config = require('../config')
var CompressionPlugin = require("compression-webpack-plugin")
var path = require('path')
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
var FaviconPlugin = require('favicons-webpack-plugin')
var webpack = require('webpack')
var _ = require('lodash')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "[name].css"
});

module.exports = {
    entry: {
        main: "./entry.js",
        check: "./js/browser-check.js",
        client: "./js/client.js",
        test: "./js/test.js",
        vendor: ["aws-sdk"]
    },
    output: {
        path: path.join(__dirname, '../build'),
        filename: "[name].js",
        chunkFilename: '[name].js',
    },
    plugins: _.compact([
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: 2
        }),
        extractSass,
        new CopyWebpackPlugin([{ from: './assets', to: "images" }]),
        new CopyWebpackPlugin([{ from: './assets', to: "assets" }]),
        new CopyWebpackPlugin([{
            from: './node_modules/aws-lex-web-ui/dist/wav-worker.min.js',
            to: "wav-worker.js"
        }]),
        new CopyWebpackPlugin([{
            from: './index.js',
            to: "index.js"
        }]),
        new HtmlWebpackPlugin({
            template: './html/admin.pug',
            filename: 'index.html',
            chunks: ["main", "check", "vendor"]
        }),
        new HtmlWebpackPlugin({
            template: './html/test.ejs',
            filename: 'test.html',
            chunks: ["main", "test", "check"]
        }),
        new HtmlWebpackPlugin({
            template: './html/client.pug',
            filename: 'client.html',
            chunks: ["client", "vendor"]
        }),
        new HtmlWebpackPlugin({
            filename: "health.html",
            templateContent: "ok\n",
            inject: false
        })
    ]),
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.js',
            handlebars: 'handlebars/dist/handlebars.min.js',
            querystring: 'querystring-browser'
        }
    },
    module: {
        rules: [
            {
                test: /\.(md|txt)$/,
                loader: 'raw-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                    }
                }
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.styl$/,
                use: ['style-loader', 'css-loader', 'stylus-loader']
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [
                        { loader: "css-loader" },
                        { loader: "sass-loader" }
                    ]
                })
            }
        ]
    }
}
