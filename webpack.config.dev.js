import path from 'path';
import webpack from 'webpack';

 export default {
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    './client/App'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundles.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
    // js
    {
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'client')
    },
    // CSS
    { 
      test: /\.scss$/, 
      loaders: ['style-loader','css-loader','sass-loader'],
      include: path.join(__dirname, 'client')
    }
    ]
  },
  
};
