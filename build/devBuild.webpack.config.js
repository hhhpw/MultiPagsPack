const merge = require('webpack-merge');
const baseWebpackConfig = require('../webpack.config');
const config = require('./config');



process.env.NODE_ENV = 'devBuild';
process.env.API_ROOT = 'domain name';


console.log(`build for ${process.env.NODE_ENV}`);

const webpackConfig = merge(baseWebpackConfig, config.devBuild);


module.exports = webpackConfig;
