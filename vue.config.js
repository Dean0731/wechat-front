module.exports = {
    devServer:{
        port:8005,
        host:'0.0.0.0',
        proxy:{
            '/api':{
                target:"http://106.15.89.152:8004",
                changeOrigin:true,
                pathRewrite: {
                    '^/api': '/api'
                }
            }
        },
        disableHostCheck: true
    }
}
