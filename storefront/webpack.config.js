const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    filename: 'script.min.js',
    path: path.resolve(__dirname, '../dist/storefront')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.min.css' // Укажите имя для выходного CSS-файла
    })
  ],
  resolve: {
    extensions: ['.ts', '.js', '.vue'],
    alias: {
      vue: '@vue/runtime-dom'
    }
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '../dist/storefront'),
    },
    compress: true,
    port: 8081,
    open: false
  }
};
