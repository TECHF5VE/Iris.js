"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const { camelCase } = require('lodash');
const webpack = require('webpack');
const { TsConfigPathsPlugin, CheckerPlugin } = require('awesome-typescript-loader');
const TypedocWebpackPlugin = require('typedoc-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
/**
 * Update this variable if you change your library name
 */
const libraryName = 'iris-js';
const env = process && process.env && process.env.NODE_ENV;
const dev = !(env && env === 'production');
const entry = dev ? [
    // 'react-hot-loader/patch',
    // activate HMR for React
    'webpack-dev-server/client?http://localhost:8081',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint
    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
    './src/' + libraryName + '.ts'
    // the entry point of our apps
] : path_1.join(__dirname, './src/' + libraryName + '.ts');
exports.default = {
    entry: {
        index: entry
    },
    // Currently cheap-module-source-map is broken https://github.com/webpack/webpack/issues/4176
    devtool: 'source-map',
    output: {
        path: path_1.join(__dirname, 'dist'),
        libraryTarget: 'umd',
        library: camelCase(libraryName),
        filename: `${libraryName}.js`
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new CheckerPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new TsConfigPathsPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            title: libraryName,
            filename: 'index.html',
            template: path_1.join(__dirname, 'src/template/common.html'),
            hash: true,
            chunks: ['common', 'index']
        }),
        new TypedocWebpackPlugin({
            theme: 'minimal',
            out: 'docs',
            target: 'es6',
            ignoreCompilerErrors: true
        }, 'src'),
    ],
    devServer: {
        hot: true,
        contentBase: path_1.resolve(__dirname, 'dist'),
        publicPath: '/'
    }
};
//# sourceMappingURL=webpack.config.js.map