var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
    entry: [
        'webpack-dev-server/client?http://localhost:4001',
        'webpack/hot/only-dev-server',
        path.resolve(__dirname, 'src', 'main.js'),
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    devServer: {
        inline: true,
        port: 4001,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.scss$/,
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
                loader: 'json-loader'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin({
            filename: 'styles.scss',
            allChunks: true,
        })
    ]
}

module.exports = config
