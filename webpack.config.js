var path = require('path')
var Dotenv = require('dotenv-webpack')
var nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: './server.js',
  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'server.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  },
  plugins: [
    new Dotenv({
      path: './.env'
    })
  ]
}
