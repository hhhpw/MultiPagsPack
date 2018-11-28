const merge = require('webpack-merge');
const baseWebpackConfig = require('../webpack.config');

process.env.NODE_ENV = 'development';



const webpackConfig =  merge(baseWebpackConfig, {
        mode: 'development',
        devtool: 'eval-source-map', 
        devServer: {
            contentBase: './car',
            clientLogLevel: 'warning',
            port: 9000,
            host: '127.0.0.1',
            hot: true,
            open: true,
            compress: true,
            openPage: 'A/A.html',
            proxy: {
                "/car": {
                  target: "http://172.30.40.65:8088",
                //   http://operdev.zhidaohulian.com
                  changeOrigin: true
                }
            }
        },

    }
)

module.exports = webpackConfig;