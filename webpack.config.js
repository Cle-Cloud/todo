const path = require('path');
const webpack = require('webpack');
const {VueLoaderPlugin} = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractPlugin = require('extract-text-webpack-plugin');

const isDev = process.env.NODE_ENV ==='development';

const config = {
  entry: {
    app: path.resolve(__dirname, 'src/index.js')
  },
  devtool: 'inline-source-map',
  module: {
    rules:[
      {
        test: /\.vue$/,
        use: [
          'vue-loader'
        ]
      },
      {
        test: /\.jsx$/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': isDev ? JSON.stringify('development') : JSON.stringify('production')
    }),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Todo List'
    }),
    new VueLoaderPlugin()
  ],
  output: {
    filename: '[name][hash:8].js',
    path: path.resolve(__dirname, 'dist')
  }
};

if(isDev){
  config.devServer = {
    contentBase: './dist',
    port: 8000,
    host: '0.0.0.0',
    overlay: {
      errors:true
    },
    hot: true
  };
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.module.rules.push(
    {
      test: /\.styl$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        },
        'stylus-loader'
      ]
    }
  );
}else{
  config.entry = {
    app: path.resolve(__dirname, 'src/index.js'),
    vendor: ['vue']
  };
  config.plugins.push(new webpack.HashedModuleIdsPlugin());
  config.plugins.push(new ExtractPlugin('style.[chunkHash:8].css'));
  config.plugins.push(
    new webpack.optimize.SplitChunksPlugin({
      name: 'vendor'
    })
  );
  config.module.rules.push(
    {
      test: /\.styl$/,
      use: ExtractPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      })
    }
  );
  config.output.filename = '[name].[chunkHash:8].js'
}

module.exports = config;