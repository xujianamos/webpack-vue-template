//webpack.dll.js
const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "production",
  entry: {
    vendors: ["lodash", "jquery"], //这里配置需要打包的第三方模块名字（只需要打包一次的第三方模块）
  },
  output: {
    filename: "[name].dll.js", //打包后的名字为vendors.dll.js
    path: path.resolve(__dirname, "../dll"), //打包后的文件存放路径
    library: "[name]", //将打包好的文件通过全局变量暴露出来，这个全局变量叫vendors
  },
  plugins: [
    //使用DllPlugin插件对暴露的模块代码做一个分析生成一个manifest.json的映射文件
    new webpack.DllPlugin({
      name: "[name]", //分析的文件名字，必须和library的名字一样。
      path: path.resolve(__dirname, "../dll/[name].manifest.json"), //分析结果的存放位置
    }),
  ],
};
