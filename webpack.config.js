const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        b: path.join(__dirname, 'src', 'app')
    },
    output: {
        path: `${__dirname}/dist`,
        filename: 'assets/js/bundle.[hash].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: [
                    path.resolve(__dirname, '/node_modules/')
                ]
            }
        ]
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new CleanWebpackPlugin([
            `${__dirname}/dist/assets/js/*.js`
        ], {
            allowExternal: true
        }),
        new HtmlWebpackPlugin({
            template: `${__dirname}/index.html`,
            filename: 'index.html',
            inject: 'body',
            chunksSortMode: 'none'
        })
    ],
    resolve: {
        extensions: ['.js'],
        modules: [
            path.resolve('./node_modules')
        ]
    },
    optimization: {
        runtimeChunk: {
            name: 'm'
        },
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'v',
                    chunks: 'all'
                }
            }
        }
    },
    // devServer 則是 webpack-dev-server 設定
    devServer: {
        inline: true,
        port: 8080,
        open: true
    }
};
