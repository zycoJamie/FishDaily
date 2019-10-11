const path=require('path')

module.exports={
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
            '/gank':{
                target:'http://gank.io',
                pathRewrite:{
                    "^/gank":""
                }
            }
        }
    }
}