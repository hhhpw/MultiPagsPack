'use strict';

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //分离css
const webpack = require('webpack');
const vConsolePlugin = require('vconsole-webpack-plugin'); 


const commonConfig = (env) => ({
    mode: env ===  'production' ? env : 'none',
    devtool: 'source-map',
    plugins: [
        // //环境变量
        // new webpack.DefinePlugin({
        //     'process.env': env,
        // }),
        // 压缩JS
        new UglifyJsPlugin({
            sourceMap: true,
            uglifyOptions: {
                compress: {
                  warnings: false
                }
            },
            parallel: true,  //并行
        }),
        //build前清理car文件目录
        new CleanWebpackPlugin(['dist']), 

        //提取CSS
        new MiniCssExtractPlugin({
            filename: env === 'production' ? '[name].[hash].css' : '[name].css',
            chunkFilename: env === 'production' ? '[id].[hash].css' : '[id].css',
        }),
        // vconsole
        new vConsolePlugin({
            enable: env === 'production' ? false : true,
        })
    ]
});
const config = {
    dev: {
        mode: 'development',
        devtool: 'cheap-module-eval-source-map', 
        devServer: {
            contentBase: '/car',
            clientLogLevel: 'warning',
            port: 9000,
            host: '127.0.0.1',
            hot: true,
            open: true,
            compress: true,
            openPage: 'car/A/A.html',
            proxy: {
                "/api": {
                    // target: "http://172.30.37.84:8821",
                    changeOrigin: true,
                    pathRewrite: {
                        '^/api': ''
                    }
                }
            }
        },
        plugins: [
            // 热加载
            new webpack.DefinePlugin({
                'process.env': 'development',
            }),
            new webpack.HotModuleReplacementPlugin(),
            new vConsolePlugin({ enable: true })
        ]
        
    },
    // 开发打包
    devBuild: {
        ...commonConfig('devBuild'),
    },
    // 测试打包
    qa: {
        ...commonConfig('qa'),

    },
    // 生产打包
    prod: {
        ...commonConfig('production'),

    }
}

module.exports = config;