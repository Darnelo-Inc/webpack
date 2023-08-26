const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: "development",
  entry: { main: "./src/index.js", analytics: "./src/analytics.js" },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      // title: "Dynamic title",
      template: "./src/index.html",
    }),
  ],
}
