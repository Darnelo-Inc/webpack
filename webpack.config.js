const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const ESLintPlugin = require("eslint-webpack-plugin")
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin

const isDev = process.env.NODE_ENV === "development"
const isProd = !isDev

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`)
const cssLoaders = (add) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      // options: { hmr: isDev, reloadAll: true },
    },
    "css-loader",
  ]
  if (add) loaders.push(add)
  return loaders
}
const babelUse = (add) => {
  const use = {
    loader: "babel-loader",
    options: {
      presets: ["@babel/preset-env"],
    },
  }

  if (add) use.options.presets.push(add)
  return use
}

const plugins = () => {
  const base = [
    new HtmlWebpackPlugin({
      // title: "Dynamic title",
      template: "./index.html",
      minify: {
        collapseWhitespace: isProd,
      },
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
    new MiniCssExtractPlugin({ filename: filename("css") }),
    new ESLintPlugin(),
  ]

  if (isProd) base.push(new BundleAnalyzerPlugin())

  return base
}

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: { main: "./index.jsx", analytics: "./analytics.ts" },
  output: {
    filename: filename("js"),
    path: path.resolve(__dirname, "dist"),
  },

  resolve: {
    extensions: [".js", ".json", "..."],
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@models": path.resolve(__dirname, "src/models"),
    },
  },

  devtool: isDev ? "source-map" : false,

  devServer: {
    static: {
      directory: "./src",
    },
    port: 3000,
    hot: isDev,
  },

  optimization: {
    splitChunks: { chunks: "all" },
    minimizer: ["...", new CssMinimizerPlugin()],
    runtimeChunk: "single",
  },

  plugins: plugins(),

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: babelUse(),
      },
      {
        test: /\.m?ts$/,
        exclude: /node_modules/,
        use: babelUse("@babel/preset-typescript"),
      },
      {
        test: /\.[jt]sx$/,
        exclude: /node_modules/,
        use: babelUse("@babel/preset-react"),
      },
      {
        test: /\.css$/,
        use: cssLoaders(),
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
      {
        test: /\.less$/i,
        use: cssLoaders("less-loader"),
      },
      {
        test: /\.s[ac]ss$/i,
        use: cssLoaders("sass-loader"),
      },
    ],
  },
}
