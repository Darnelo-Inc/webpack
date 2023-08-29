const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

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
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
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
  },
}
