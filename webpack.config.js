"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var camelCase = require('lodash').camelCase;
var webpack = require("webpack");
var _a = require('awesome-typescript-loader'), TsConfigPathsPlugin = _a.TsConfigPathsPlugin, CheckerPlugin = _a.CheckerPlugin;
var TypedocWebpackPlugin = require('typedoc-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
/**
 * Update this variable if you change your library name
 */
var libraryName = 'iris-js';
var env = process && process.env && process.env.NODE_ENV;
var dev = !(env && env === 'production');
var entry = dev ? [
    // 'react-hot-loader/patch',
    // activate HMR for React
    'webpack-dev-server/client?http://localhost:8081',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint
    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
    "./IrisJS/src/" + libraryName + ".ts"
    // the entry point of our apps
] : path_1.join(__dirname, "IrisJS/src/" + libraryName + ".ts");
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
        filename: libraryName + ".js"
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
            filename: "index.html",
            template: path_1.join(__dirname, "IrisJS/src/template/common.html"),
            hash: true,
            chunks: ["common", "index"]
        }),
        new TypedocWebpackPlugin({
            theme: 'minimal',
            out: 'docs',
            target: 'es6',
            ignoreCompilerErrors: true
        }, 'IrisJS/src'),
    ],
    devServer: {
        hot: true,
        contentBase: path_1.resolve(__dirname, 'dist'),
        publicPath: '/'
    }
};
