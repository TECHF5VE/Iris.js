import { join, resolve } from 'path'
const { camelCase } = require('lodash')
const webpack = require('webpack')
const { TsConfigPathsPlugin, CheckerPlugin } = require('awesome-typescript-loader')
const TypedocWebpackPlugin = require('typedoc-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
/**
 * Update this variable if you change your library name
 */
const libraryName = 'iris-js'

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
  './IrisJS/src/' + libraryName + '.ts'
  // the entry point of our apps
] : join(__dirname, './IrisJS/src/' + libraryName + '.ts')

export default {
  entry: {
    index: entry
  },
  // Currently cheap-module-source-map is broken https://github.com/webpack/webpack/issues/4176
  devtool: 'source-map',
  output: {
    path: join(__dirname, 'dist'),
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
      template: join(__dirname, 'IrisJS/src/template/common.html'),
      hash: true,
      chunks: ['common', 'index']
    }),
    new TypedocWebpackPlugin(
      {
        theme: 'minimal',
        out: 'docs',
        target: 'es6',
        ignoreCompilerErrors: true
      },
      'IrisJS/src'
    ),
  ],
  devServer: {
    hot: true,
    contentBase: resolve(__dirname, 'dist'),
    publicPath: '/'
  }
}
