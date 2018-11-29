const merge = require('webpack-merge');
const baseWebpackConfig = require('../webpack.config');
const config = require('./config');



process.env.NODE_ENV = 'qa';

console.log(`build for ${process.env.NODE_ENV}`);

const webpackConfig = merge(baseWebpackConfig, config.qa);


module.exports = webpackConfig;
