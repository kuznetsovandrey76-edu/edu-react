var path = require('path');

module.exports = {
  // entry: './src/js/main.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        query: {
          // preset: ['es2015', 'react']
          preset: [
            ['latest', { modules: false}],
          ],
        },
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    // path: path.resolve(__dirname, './public_html/js/')
  }
};