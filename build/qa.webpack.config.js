const merge = require('webpack-merge');
const webpack = require('webpack');
const baseWebpackConfig = require('../webpack.config');
const config = require('./config');



let env = {
    NODE_ENV: '"qa"',
    API_ROOT: '"domain name"',
}

const webpackConfig = merge(baseWebpackConfig, config.qa,
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
