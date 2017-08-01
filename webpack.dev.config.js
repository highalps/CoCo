var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
    entry: [
        'webpack-dev-server/client?http://localhost:4001',
        'webpack/hot/only-dev-server',
        path.resolve(__dirname, 'src', 'index.js'),
    ],
    output: {
        path: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'stage-0', 'react'],
                        plugins: ['transform-decorators-legacy'],
                    }
                },
            },
            {
                test: /\.(css|sass|scss)$/,
                exclude: '/node_modules/',
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                localIdentName: '[name]__[local]--[hash:base64:5]'
                            }
                        },
                        {
                            loader: 'sass-loader'
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: (loader) => [
                                    require('autoprefixer')()
                                ]
                            }
                        }
                    ]
                })
            },
            {
                test: /\.json$/,
                exclude: /node_modules/,
                use: ['json-loader'],
            }
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin('style.css'),
    ],
    devServer: {
        compress: true,
        proxy:{
            "**": "http://localhost:3000"
        }
    },
}

module.exports = config
