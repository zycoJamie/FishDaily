const path=require('path')

module.exports={
    lintOnSave:false,
    configureWebpack:{
        resolve:{
            alias: {
                style:path.resolve(__dirname,'./src/assets/style')
            }
        }
    },
    devServer:{
        open:true,
        port:8000,
        proxy:{
            '/zhihu':{
                target:'http://news-at.zhihu.com',
                pathRewrite:{
                    "^/zhihu":""
                }
            }
        }
    }
}