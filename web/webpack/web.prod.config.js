const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const clientConfig = {
  entry: [
    path.join(__dirname, '../../app/web/index'),
  ],
  output: {
    path: path.join(__dirname, '../public/'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    root: [
      path.resolve(__dirname, '../../app')
    ]
  },
  module: {
    loaders: [
      // take all less files, compile them, and bundle them in with our js bundle
      {
        test: /\.scss$/,
        loader: 'style!css!autoprefixer?browsers=last 2 version!sass'
      },{
        test: /\.css$/,
        loader: 'style!css!autoprefixer?browsers=last 2 version'
      },{
        test: /\.json$/,
        loader: "json",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-0'],
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        // Useful to reduce the size of client-side libraries, e.g. react
        NODE_ENV: JSON.stringify('production'),
        PLATFORM_ENV: JSON.stringify('web'),
        NODE_PATH: JSON.stringify('./app'),
      },
    }),
    // optimizations
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ],
};

const serverConfig = {
  entry: [
    path.join(__dirname, '../../app/web/server.js'),
  ],
  output: {
    path: path.join(__dirname, '../server/'),
    filename: 'server.js',
    publicPath: '/',
  },
  module: {
    loaders: [
      // take all less files, compile them, and bundle them in with our js bundle
      {
        test: /\.json$/,
        loader: "json",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        // Useful to reduce the size of client-side libraries, e.g. react
        NODE_ENV: JSON.stringify('production'),
        PORT: process.env.PORT
      },
    }),
    // optimizations
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    })
  ],
  context: __dirname,
  target: 'node',
  externals: [nodeExternals()],
  node: {
    __dirname: false
  }
};

module.exports = [ clientConfig, serverConfig ];