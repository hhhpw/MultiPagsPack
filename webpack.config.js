"use strict";

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //分离css
const pages = require("./page.config.js");
const path = require("path");

let HTMLPlugins = [], entries = {};


pages.map(d => {
	entries[d.name] = `./src/${d.js}`;
	HTMLPlugins.push(new HtmlWebpackPlugin({     //https://github.com/jantimon/html-webpack-plugin
		template: `./src/${d.html}`, // 生产文件所依赖的文件模板 html、jade、ejs
		filename: `${d.name}.html`, // 文件名
		inject: true, //默认 script标签位于body底部
		chunks: [d.name], //指定所引用的JS 不需要再加js后缀
		hash: process.env.NODE_ENV === "production" ? true : false,  // hash
		inlineSource: ".(js|css)",
		minify: {
			removeComments: true,//去注释
			collapseWhitespace: true,//压缩空格
			removeAttributeQuotes: true //去除属性引用
		}
	}));
});



module.exports = {

	entry: entries,

	output: {
		filename: "[name].js",
		path: __dirname + "/dist"
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
					{
						loader: "eslint-loader",
						options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
							formatter: require("eslint-friendly-formatter") // 指定错误报告的格式规范
						}
					}
				],
				enforce: "pre", // 编译前检查
				exclude: /node_modules/, // 不检测的文件
				include: [path.resolve(__dirname, "src")]// 指定检查的目录

			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				include: [path.join(__dirname, "./src")]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					"flie-loader"
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					"file-loader"
				]
			},
			{
				test: /\.(le|c)ss$/,
				use: [
					process.env.NODE_ENV === "production" ? MiniCssExtractPlugin.loader : "style-loader",
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							plugins: [require("autoprefixer")("last 10 versions")]
						}
					},
					"less-loader"
				]
			}
		]
	},
	plugins: [
		...HTMLPlugins
	]
};
