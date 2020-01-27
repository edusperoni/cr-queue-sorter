const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const WebpackUserscript = require('webpack-userscript')

module.exports = merge(common, {
  // entry is where, say, your app starts - it can be called main.ts, index.ts, app.ts, whatever
  // entry: ['webpack/hot/poll?100'],
  // This forces webpack not to compile TypeScript for one time, but to stay running, watch for file changes in project directory and re-compile if needed
  watch: true,
  externals: [
    nodeExternals({
      // whitelist: ['webpack/hot/poll?100'],
    }),
  ],
  mode: 'development',
  plugins: [
    // new webpack.HotModuleReplacementPlugin()
    new WebpackUserscript({
      headers: {
        name: 'CR Queue Sorter',
        version: `[version]-build.[buildNo]`,
        match: 'https://www.crunchyroll.com/home/queue',
        grant: [
          'unsafeWindow'
        ]
      },
      proxyScript: {
        baseUrl: 'http://127.0.0.1:5001',
        filename: '[basename].proxy.user.js',
        enable: true
      }
    })
  ],
  devtool: 'inline-source-map'
});