const { join, resolve } = require('path');
const TypedocWebpackPlugin = require('typedoc-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");
const env = process && process.env && process.env.NODE_ENV;
const dev = !(env && env === 'production');
const tsConfig = dev ? { configFileName: 'tsconfig.prod.json' } : {};
const projectName = 'Iris';
const libraryName = 'iris';
const entry = dev ? [
      // 'react-hot-loader/patch',
      // activate HMR for React
      'webpack-dev-server/client?http://localhost:8081',
      // bundle the client for webpack-dev-server
      // and connect to the provided endpoint
      'webpack/hot/only-dev-server',
      // bundle the client for hot reloading
      // only- means to only hot reload for successful updates
      `./src/${libraryName}.ts`
      // the entry point of our apps
    ] : join(__dirname, `src/${libraryName}.ts`);

export default {
  entry: {
    index: entry
  },
  output: {
    path: join(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: libraryName,
    filename: `${libraryName}.js`
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        use: "source-map-loader"
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'babel-loader',
            options: { presets: ['es2015'] }
          },
          {
            loader: 'ts-loader',
            options: tsConfig
          }
        ],
        exclude: [
          join(__dirname, 'node_modules'),
          join(__dirname, 'test')
        ]
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: "common",
      filename: "common.js"
    }),
    new webpack.optimize.UglifyJsPlugin({sourceMap: true}),
      new HtmlWebpackPlugin({
        inject: true,
        title: projectName,
        filename: "index.html",
        template: join(__dirname, "src/template/common.html"),
        hash: true,
        chunks: ["common", "index"]
      }),
    new TypedocWebpackPlugin(
      {
        theme: 'minimal',
        out: 'docs',
        target: 'es6',
        ignoreCompilerErrors: true
      },
      'src'
    ),
  ],
  devServer: {
    hot: true,
    contentBase: resolve(__dirname, 'dist'),
    publicPath: '/'
  }
};
