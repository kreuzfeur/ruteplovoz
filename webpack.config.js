const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const webpack = require('webpack');
module.exports = {
    entry: { main: './src/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(html)$/,
                use: ['html-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.scss$/,
                use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|gif|ico|svg|eot|ttf|woff|woff2|php)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                    context: ''
                }
            },
            {
                test: /\.(php)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    context: ''
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader']
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: false,
            template: './src/index.html',
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: false,
            template: './src/page.html',
            filename: 'page.html'
        }),
        new ImageminPlugin({
            disable: process.env.NODE_ENV !== 'production',
            pngquant: {
                quality: '95-100'
            }
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ]
};