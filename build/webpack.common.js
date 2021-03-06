const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin");
const { merge } = require("webpack-merge");
const devConfig = require("./webpack.dev");
const prodConfig = require("./webpack.prod");
const { DllReferencePlugin } = require("webpack");
const commonConfig = {
  entry: {
    main: "./src/main.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
          {
            loader: "eslint-loader",
          },
        ],
      },
      // 打包图片文件
      {
        test: /\.(jpg|png|gig)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name]_[hash:6].[ext]",
              outputPath: "images/",
              limit: 10240,
            },
          },
        ],
      },

      // 打包字体文件
      { test: /\.(eot|ttf|svg)$/, use: "file-loader" },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new CleanWebpackPlugin(),
    new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, "../dll/vendors.dll.js"), //需要添加的文件路径
    }),
    new DllReferencePlugin({
      manifest: path.resolve(__dirname, "../dll/vendors.manifest.json"),
    }),
  ],
  optimization: {
    usedExports: true,
    splitChunks: {
      chunks: "all",
    },
    runtimeChunk: "single",
  },
  output: {
    filename: "[name]_[hash:6].js",
    path: path.resolve(__dirname, "../dist"),
  },
};

module.exports = (env) => {
  if (env && env.production) {
    return merge(commonConfig, prodConfig);
  } else {
    return merge(commonConfig, devConfig);
  }
};
