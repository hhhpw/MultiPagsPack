const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //分离css
const CleanWebpackPlugin =require('clean-webpack-plugin');
const pages = require('./page.config.js');

let HTMLPlugins = [], entries = {};

const devMode = process.env.NODE_ENV !== 'production'


pages.map(d => {
    entries[d.name] = `./src/${d.js}`;
    HTMLPlugins.push(new HtmlWebpackPlugin({
        template: `./src/${d.html}`,
        filename: `${d.name}.html`,
        inject: true,
        chunks: [d.name],
        inlineSource: '.(js|css)',
        minify: {
            removeComments: true,//去注释
            collapseWhitespace: true,//压缩空格
            removeAttributeQuotes: true //去除属性引用
        },
    }));
});

module.exports = {
    mode: 'development',
    entry: entries,

    output: {
        filename: '[name].js',
        path: __dirname + '/car'
    },

    // devtool: 'inline-source-map',   //开发环境

    // devServer: {
    //     contentBase: './car',
    //     port: 9000,
    //     host: '127.0.0.1',
    //     hot: true,
    //     open: true,
    //     compress: true,
    //     openPage: 'A/A.html',
    //     proxy: {
    //         "/car": {
    //           target: "http://172.30.40.65:8088",
    //         //   pathRewrite: {"^/api" : ""},
    //           changeOrigin: true
    //         }
    //     }
    // },

    module: {
        rules: [
            {
                test: /\.js$/,
                 exclude: /node_modules/, 
                 loader: "babel-loader"
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'flie-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(le|c)ss$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options:{
                            plugins:[require("autoprefixer")("last 10 versions")]},
                    },
                    'less-loader'
                ]
            },
        ]
    },
    plugins: [ 
        //build前清理car文件目录
        new CleanWebpackPlugin(['car']), 
        //html模板
        ...HTMLPlugins,
        //提取CSS
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        }),
        // 热加载
        new webpack.HotModuleReplacementPlugin(),

        // new ExtractTextPlugin({
        //         filename: 'test.css',
        // }),
        // new vConsolePlugin({
        //         enable: process.env.NODE_ENV !== 'production'
        //     })
    ],
};