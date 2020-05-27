const path = require('path');
const webpack = require("webpack");
const webpackMerge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');

const commonConfig = require('./webpack.common.config');
const babelConfig = require('./babel.server.config');
const postCssConfig = require('./postcss.config');
const isDebug = !process.argv.includes('--publish');

const isCssClassNameObfuscationEnabled = false;

const serverConfig = webpackMerge(
    commonConfig,
    {
        name: 'server',
        target: 'node',
        mode: isDebug ? 'development' : 'production',
        entry: {
            server: [
                path.resolve(__dirname, 'src/server/server.js')
            ],
        },
        output: {
            path: path.resolve(__dirname, 'build/server'),
            filename: '[name].js',
            libraryTarget: 'commonjs2'
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx|mjs)$/,
                    loader: "babel-loader",
                    include: [
                        path.resolve(__dirname, 'src')
                    ],
                    options: {
                        cacheDirectory: true,
                        babelrc: false,
                        ...babelConfig
                    }
                },
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: 'css-loader/locals',
                            options: {
                                modules: true,
                                importLoaders: 1,
                                sourceMap: isDebug,
                                localIdentName: isCssClassNameObfuscationEnabled
                                    ? '[hash:base64:5]'
                                    : '[name]-[local]',
                                minimize: isDebug,
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: postCssConfig
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                }
            ],
        },
        externals: [nodeExternals()],
        plugins: [
            new webpack.DefinePlugin({
                'process.env.BROWSER': false,
                __DEV__: isDebug,
            }),
            ...(
                isDebug ? [
                        new webpack.HotModuleReplacementPlugin(),
                    ] :
                    []
            ),
        ]
    });

module.exports = serverConfig;
