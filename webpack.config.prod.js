const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body',
  minify: {
    collapseWhitespace: true,
    collapseInlineTagWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true
  }
});

const webpackoptimizeUglifyJsPluginConfig = new webpack.optimize.UglifyJsPlugin({
  compressor: {
    warnings: false,
    screw_ie8: true,
    conditionals: true,
    unused: true,
    comparisons: true,
    sequences: true,
    dead_code: true,
    evaluate: true,
    if_return: true,
    join_vars: true
  },
  output: {
    comments: false
  }
});

module.exports = {
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    './client/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new ExtractTextPlugin('./css/style.css'),
    new webpack.DefinePlugin({
      'process.env':
      {
        NODE_ENV: JSON.stringify('production'),
        CLOUDINARY_UPLOAD_PRESET : 
        JSON.stringify(process.env.CLOUDINARY_UPLOAD_PRESET),
        CLOUDINARY_URL: JSON.stringify(process.env.CLOUDINARY_URL),
        AUTHORIZED_EMAIL: JSON.stringify(process.env.AUTHORIZED_EMAIL),
        AUTHORIZED_PASSWORD: JSON.stringify(process.env.AUTHORIZED_PASSWORD),
        APP_LINK: JSON.stringify(process.env.APP_LINK),
      }
    }),
  webpackoptimizeUglifyJsPluginConfig,
  HtmlWebpackPluginConfig
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      },
      {
        test: /\.(jpe?g|gif|png)$/,
        loader: 'file-loader?name=images/[name].[ext]'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },
};
