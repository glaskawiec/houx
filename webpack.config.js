const path = require('path');
module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components|lib)/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  },
  externals: {
    'react': 'commonjs react'
  }
};
