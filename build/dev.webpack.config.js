const merge = require('webpack-merge');
const baseWebpackConfig = require('../webpack.config');
const config = require('./config');



process.env.NODE_ENV = 'development';

console.log(`build for ${process.env.NODE_ENV}`);

const webpackConfig = merge(baseWebpackConfig, config.dev);


module.exports = webpackConfig;
