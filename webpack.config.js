const path = require('path')
module.exports={
    // 打包模式
    mode:'development',
    // 打包入口
    entry:'./src/main.js',
    // 打包出口文件
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'./dist')
    }

}