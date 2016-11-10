/**
 * This file is part of IrisJS
 * Created by Chi on 11/4/16.
 */
var webpackConfig = require('./webpack.config');

module.exports = {
    devtool: 'inline-source-map',
    module: webpackConfig.module
};