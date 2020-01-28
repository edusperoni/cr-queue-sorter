const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WebpackUserscript = require('webpack-userscript');

module.exports = (env) => {
  env = env || {};
  const {
    subdir
  } = env;
  let outpath = path.join(__dirname, 'dist');
  if (subdir) {
    outpath = path.join(outpath, subdir);
  }
  const entries = {};
  if (env.userscript) {
    entries.userscript = path.join(__dirname, 'src', 'main.userscript.ts');
  }
  if (env.chrome) {
    entries['content-script'] = path.join(__dirname, 'src', 'main.content.ts');
    entries.background = path.join(__dirname, 'src', 'main.background.ts');
  }

  return {
    entry: entries,
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
      path: outpath,
      filename: env.userscript ? 'bundle.js' : '[name].bundle.js'
    }
  };
};
