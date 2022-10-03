const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = 3000;

module.exports = {
  entry: './src/client.js',
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    host: 'localhost',
    port: port,
    historyApiFallback: true,
    open: true
  },
  module: {
    rules: [
       {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "public", "index.html"),
    }),
  ],
};