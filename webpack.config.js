/**
 * This file is part of IrisJS
 * Created by Chi on 11/4/16.
 */
var webpack = require("webpack");
var HtmlWebPackPlugin = require("html-webpack-plugin");
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin({
        name: 'commons',
        filename: 'common.js'
    });
var path = require("path");
var port = process.env.PORT || 8012;
var srcPath = path.join(__dirname, "src");
var outputPublicPath = "./";
var indexEntry = [
    srcPath + "/index.js"
];
var ProjectName = 'Iris.js';

if (process.env.NODE_ENV === 'development') {
    indexEntry = [
        'webpack-dev-server/client?http://localhost:' + port + '/',
        'webpack/hot/only-dev-server',
        srcPath + "/index.js"
    ];
    outputPublicPath = 'http://localhost:' + port + '/build';
}

module.exports = {
    entry: {
        index: indexEntry
    },
    output:{
        publicPath: outputPublicPath,
        path: "./build" ,
        filename: "./[name].bundle.js",
        sourceMapFilename: "[file].map"
    },
    module:{
        loaders:[
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-0', 'stage-2'],
                    plugins: ['istanbul']
                },
                exclude: [/bower_components/, /node_modules/]
            }
        ]
    },
    resolve:{
        extensions: ['', ".js", ".jsx"]
    },
    devtool: 'inline-source-map',
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new HtmlWebPackPlugin({
            inject: true,
            title: ProjectName,
            filename: 'index.html',
            template: srcPath + '/pages/common.html',
            hash: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ],
    devServer:{
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true
    }
};