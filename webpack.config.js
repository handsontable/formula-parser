'use strict';

const webpack = require('webpack');
const path = require('path');

const env = process.env.NODE_ENV
const config = {
  output: {
    globalObject: `typeof self !== 'undefined' ? self : this`,
    library: 'formulaParser',
    libraryExport: 'default',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, '../dist'),
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules|grammar\-parser\.js$/
      },
    ]
  },
  optimization: {
    minimize: env === 'production',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ]
};

module.exports = config
