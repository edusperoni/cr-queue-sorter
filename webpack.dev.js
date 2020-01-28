const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const WebpackUserscript = require('webpack-userscript');
const ExtensionReloader = require('webpack-extension-reloader');

function getConf(env, name) {
  const plugins = [];
  if (env.userscript) {
    plugins.push(new WebpackUserscript({
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
    }));
  }
  if (env.chrome) {
    plugins.push(
      new ExtensionReloader({
        port: 9090, // Which port use to create the server
        reloadPage: true, // Force the reload of the page also
        entries: { // The entries used for the content/background scripts or extension pages
          contentScript: 'content-script',
          background: 'background',
          // extensionPage: 'popup',
        }
      })
    );
  }
  return merge(common(env), {
    name,
    watch: true,
    externals: [
      nodeExternals({}),
    ],
    mode: 'development',
    plugins: [
      ...plugins
    ],
    devtool: 'inline-source-map'
  });
}

module.exports = (env) => {
  env = env || {};
  let {
    userscript,
    chrome
  } = env;
  env.chrome = false;
  env.userscript = false;
  if (!userscript && !chrome) {
    userscript = chrome = true;
  }

  const configs = [];
  if (userscript) {
    configs.push(getConf({ ...env, userscript: true, subdir: 'userscript' }, 'userscript'));
  }
  if (chrome) {
    configs.push(getConf({ ...env, chrome: true, subdir: 'chrome' }, 'chrome'));
  }
  return configs;
};
