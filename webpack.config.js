var path = require('path');

module.exports = {
  entry: path.join(__dirname, 'src/js/', 'main.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'      
    }]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './public_html/js/')
  }
};