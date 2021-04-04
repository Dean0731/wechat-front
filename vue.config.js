module.exports = {
    devServer: {
        port: process.env.PORT,
        proxy: process.env.SERVICE_URL
    },
    publicPath: process.env.BASE_URL
}
