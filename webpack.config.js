const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: "development",
  name: "webpack-glowing",
  entry: {
    app: ["./src/index.js"],
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'jsx',
          target: 'es2015',
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.glsl$/,
        loader: 'webpack-glsl-loader'
      },
      {
        type: 'javascript/auto',
        test: /\.(glb|png|svg|jpe?g|gif|hdr|json|mp3|mov|woff|woff2|eot|ttf|otf|mp4|webm|ico)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'assets/',
          esModule: false,
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, "dist", "index.html"),
      hash: true,
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/assets/", to: "assets/" },
      ],
      options: {
        concurrency: 100,
      },
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    host: "0.0.0.0", // Open every network Access.
    compress: true,
    port: 9000,
  },
}
