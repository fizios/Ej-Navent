var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'build');
var APP_DIR = path.resolve(__dirname, 'src/app');
var MOCK_DIR = path.resolve(__dirname, 'src/apiMockups');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  title: 'Navent - FrontEnd',
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body',
});
const CopyWebpackPluginConfig = new CopyWebpackPlugin([
  {from: 'src/static'}
]);

const config = {
  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    publicPath: "/"
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        include: APP_DIR,
        use: {
          loader: 'babel-loader'
        }
      },
      {test: /\.json$/, use: 'json-loader', include: MOCK_DIR},

      {
        test: /.(scss|css)$/,
        exclude: /(node_modules|bower_components)/,
        include: APP_DIR,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }]
  },
  devServer: {
    contentBase: path.join(__dirname, 'src/www'),
    // Live-reload
    hot: true,
    inline: true,
    historyApiFallback: {
      index: '/',
    },
  },
  plugins: [
    HtmlWebpackPluginConfig,
    CopyWebpackPluginConfig
  ]
};

module.exports = config;