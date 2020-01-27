const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WebpackUserscript = require('webpack-userscript')

module.exports = {
  // entry is where, say, your app starts - it can be called main.ts, index.ts, app.ts, whatever
  entry: [path.join(__dirname, 'src', 'main.ts')],
  target: 'web',
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  plugins: [
    new CleanWebpackPlugin()
    // new CopyPlugin(
    //   [
    //     { from: path.join(__dirname, 'src', 'assets'), to: 'assets' }
    //   ],
    //   { copyUnmodified: true })
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};