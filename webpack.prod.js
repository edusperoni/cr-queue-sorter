const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');
const WebpackUserscript = require('webpack-userscript')

module.exports = (env) => {
    const plugins = [];
    env = env || {};
    if (env.report) {
        plugins.push(new BundleAnalyzerPlugin({
            analyzerMode: "static",
            openAnalyzer: false,
            generateStatsFile: true,
            reportFilename: path.join(__dirname, 'report', 'report.html'),
            statsFilename: path.join(__dirname, 'report', 'stats.json'),
        }));
    }
    plugins.push(new WebpackUserscript({
        headers: {
            name: 'CR Queue Sorter',
            version: `[version]`,
            match: 'https://www.crunchyroll.com/home/queue',
            grant: [
                'unsafeWindow'
            ]
        },
        downloadBaseUrl: "https://github.com/edusperoni/cr-queue-sorter/raw/master/release/userscript/bundle.user.js",
        updateBaseUrl: "https://github.com/edusperoni/cr-queue-sorter/raw/master/release/userscript/bundle.meta.js"
    }));
    const sourceMapOption = 'hidden-source-map';
    return merge(common, {
        watch: false,
        mode: 'production',
        devtool: sourceMapOption,
        optimization: {
            minimizer: [
                new TerserPlugin({
                    parallel: true,
                    cache: true,
                    terserOptions: {
                        mangle: true,
                        output: {
                            comments: false,
                            semicolons: !sourceMapOption
                        },
                        keep_classnames: true
                    },
                    sourceMap: true
                })
            ]
        },
        plugins: plugins,
        output: {
            sourceMapFilename: '[file].map'
        }
    });
}