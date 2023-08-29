const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const isDev = process.env.NODE_ENV === "development"

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: { main: "./index.js", analytics: "./analytics.js" },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      // title: "Dynamic title",
      template: "./index.html",
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/assets/favicon.ico"),
          to: path.resolve(__dirname, "dist"),
        },
      ],
    }),
    new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
  ],
  resolve: {
    extensions: [".js", ".json", "..."],
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@models": path.resolve(__dirname, "src/models"),
    },
  },
  optimization: { splitChunks: { chunks: "all" } },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        type: "asset/resource",
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        type: "asset/resource",
      },
      {
        test: /\.xml$/i,
        use: ["xml-loader"],
      },
      {
        test: /\.csv$/i,
        use: ["csv-loader"],
      },
    ],
  },
  devServer: {
    static: {
      directory: "./src",
    },
    port: 3000,
    hot: isDev,
  },
}
