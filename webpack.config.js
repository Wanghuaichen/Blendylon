/*
 * Copyright (c) Fenx Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Mel Florance <mel.florance@gmail.com>, 2017
 */

var path = require('path');
var webpack = require('webpack');

module.exports = {
  target: "electron",
  entry: './app/src/main.js',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
  ],
  output: {
    path: path.resolve(__dirname, './app/dist'),
    filename: 'build.js'
  },
  exclude: [/bower_components/, /node_modules/],
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/, /bower_components/],
        query: {
          plugins: ['transform-runtime'],
          presets: ["es2015", "stage-2"],
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader?name=/dist/img/[name].[ext]?[hash]',
      }
    ]
  },
  devtool: '#eval-source-map'
};

if(process.env.NODE_ENV === 'production')
{
  module.exports.devtool = '#source-map';
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ])
}
