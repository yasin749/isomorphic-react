const webpack = require('webpack');
const path = require('path');

const isDebug = !process.argv.includes('--publish');
const reStyle = /\.(css|less|styl|scss|sass|sss)$/;
const reImage = /\.(bmp|gif|jpg|jpeg|png|svg)$/;
const staticAssetName = '[name]-[hash].[ext]';

const commonConfig = {
    mode: isDebug ? 'development' : 'production',

    module: {
        strictExportPresence: true,
        rules: [
            {
                test: reImage,
                oneOf: [
                    {
                        issuer: reStyle,
                        oneOf: [
                            {
                                loader: 'url-loader',
                                options: {
                                    name: staticAssetName,
                                    limit: 4096, // 4kb
                                },
                            },
                        ],
                    },

                    {
                        loader: 'file-loader',
                        options: {
                            name: staticAssetName,
                        },
                    },
                ],
            },

            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    name: staticAssetName,
                    limit: 10000
                },
            },

            {
                test: /\.(ttf|eot|otf|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: staticAssetName
                },
            },
        ]
    },
    stats: 'errors-only',
    devtool: isDebug ? 'cheap-module-inline-source-map' : 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.APP_ENV': JSON.stringify(process.env.APP_ENV),
        }),
    ],
};

module.exports = commonConfig;
