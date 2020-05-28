const path = require('path');
module.exports = {
    // Path to your entry point. From this file Webpack will begin his work
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/bundle.js'
    },
    devServer : {
        contentBase : './dist'
    },
    module : {
        rules : [{
            test : /\.js$/,
            exclude : /node_modules/,
            use : 'babel-loader'}]
    },
  }