var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    entry: [
        './src/server/server.js'
    ],
    target: 'node',
    output: {
        path: path.resolve('build'),
        filename: 'server.js'
    },
    externals: nodeModules,
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                presets:[ 'es2015', 'react', 'stage-2']
            }
        }]
    },
    devtool: 'source-map',
    resolve: {
        modules: ['node_modules', 'src/pages', 'src/common/components'],
        extensions: ['.js', '.jsx'],
        alias: {
        }
    }
};
