const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const indexhtmlWebpackPlugin = new HtmlWebpackPlugin({
  title: "我是首页",
  template: "./public/index.html",
});
module.exports = {
  // 打包模式
  mode: "development",
  devtool: "source-map",
  // 打包入口
  entry: {
    main: "./src/main.js",
    // index: "./src/index.js",
  },
  module: {
    rules: [
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
      // 打包css文件
      { test: /\.css$/, use: ["style-loader", "css-loader", "postcss-loader"] },
      //   打包scss文件
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },
          "sass-loader",
          "postcss-loader",
        ],
      },
      // 打包less文件
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader", "postcss-loader"],
      },
      // 打包字体文件
      { test: /\.(eot|ttf|svg)$/, use: "file-loader" },
    ],
  },
  plugins: [indexhtmlWebpackPlugin, new CleanWebpackPlugin()],
  // 打包出口文件
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist"),
  },
};
