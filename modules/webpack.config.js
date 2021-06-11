const path = require('path');

module.exports = {
    entry: './main.js',
    devtool: 'source-map',
    // devtool: 'inline-source-map',
    output: {
        // path: path.join(__dirname, 'dist'),
        filename: "[name].js",
        // filename: './bundle.js',
        // sourceMapFilename: "[name].js.map"
    },
    // module: {
    //     rules: [
    //         {
    //             test: /\.js$/,
    //             enforce: 'pre',
    //             use: ['source-map-loader'],
    //         },
    //     ],
    // }
};