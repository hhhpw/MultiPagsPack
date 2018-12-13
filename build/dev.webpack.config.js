const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('../webpack.config');
const config = require('./config');




let env = {
    NODE_ENV: '"devBuild"',
    API_ROOT: '"/api"',
}

const webpackConfig = merge(baseWebpackConfig, config.dev, 
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
