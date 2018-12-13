const merge = require('webpack-merge');
const baseWebpackConfig = require('../webpack.config');
const webpack = require('webpack');
const config = require('./config');




let env = {
    NODE_ENV: '"production"',
    API_ROOT: '"domain name"',
}
const webpackConfig = merge(baseWebpackConfig, config.prod, 
    {
        plugins: [
            new webpack.DefinePlugin({
                'process.env': env,
            }),
        ]
    }
);

console.log(`build for ${process.env.NODE_ENV}`);

module.exports = webpackConfig;
