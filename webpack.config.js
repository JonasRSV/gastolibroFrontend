const webpack = require('webpack')
const path = require('path')

var BUILD_DIR = path.resolve(__dirname, '../gastolibroBE/src/main/resources/assets');
var APP_DIR = path.resolve(__dirname, 'src/containers');

module.exports = {    //For Building
  entry: APP_DIR + '/Build.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'index.js'
  },
    module : {
        loaders : [
        {
            test : /\.jsx?/,
            include : APP_DIR,
            loader : 'babel-loader'
        }
        ]
    }
};



// module.exports = { //For Dev
//   devtool: 'source-map',
//   entry: {
//     'app': [
//       'babel-polyfill',
//       'react-hot-loader/patch',
//       './src/index'
//     ]
//   },
//   output: {
//     path: path.resolve(__dirname, './dist'),
//     filename: '[name].js'
//   },
//   module: {
//     rules: [
//       { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
//     ]
//   }
// }
