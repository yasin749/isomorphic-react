const path = require('path');
const fs = require('fs');

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const LoadablePlugin = require('@loadable/webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const commonConfig = require('./webpack.common.config');
const postCssConfig = require('./postcss.config');

const isDebug = !process.argv.includes('--publish');
const reScript = /\.(js|jsx|mjs)$/;
const distFolderPath = path.resolve(__dirname, 'build');
const isCssClassNameObfuscationEnabled = false;

const clientEntryFiles = [
    '@babel/polyfill',
    path.resolve(__dirname, 'src/client/client.js'),
];

if (isDebug) {
    clientEntryFiles.push('webpack-hot-middleware/client')
}

const outputPath = path.resolve(__dirname, 'build/public/assets');

const mode = isDebug ? 'development' : 'production';

const clientConfig = webpackMerge(
    commonConfig,
    {
        name: 'client',
        target: 'web',
        mode: mode,
        entry: {
            client: clientEntryFiles,
        },

        output: {
            path: outputPath,
            publicPath: '/assets/',
            filename: '[name]-[hash].js',
            chunkFilename: !isDebug ? '[id]-[chunkhash].js' : '[id]-[name]-[chunkhash].js',
        },

        module: {
            rules: [
                {
                    test: reScript,
                    include: [
                        path.resolve(__dirname, 'src'),
                    ],
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: isDebug,
                    },
                },
                {
                    test: /\.css$/,
                    use: [
                        isDebug ?
                            {
                                loader: 'style-loader',
                                options: {
                                    insertAt: 'top',
                                    singleton: true,
                                    sourceMap: false,
                                },
                            } :
                            MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                modules: false,
                                importLoaders: 1,
                                sourceMap: isDebug,
                                minimize: isDebug,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: postCssConfig,
                        },
                    ],
                },
                {
                    test: /\.scss$/,
                    use: [
                        isDebug ?
                            {
                                loader: 'style-loader',
                                options: {
                                    insertAt: 'top',
                                    singleton: true,
                                    sourceMap: false,
                                },
                            } :
                            MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 1,
                                sourceMap: isDebug,
                                localIdentName: isCssClassNameObfuscationEnabled
                                    ? '[hash:base64:5]'
                                    : '[name]-[local]',
                                minimize: isDebug,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: postCssConfig,
                        },
                        {
                            loader: 'sass-loader',
                        },
                    ],
                },
            ],
        },

        optimization: {
            nodeEnv: mode,
            minimizer: [
                new UglifyJsPlugin({
                    sourceMap: true,
                    parallel: true,
                }),
                new OptimizeCSSAssetsPlugin({}),
            ],
            noEmitOnErrors: true,
            concatenateModules: true,
            splitChunks: {
                automaticNameDelimiter: '_',
                cacheGroups: {
                    commons: {
                        chunks: 'initial',
                    },
                    vendor: {
                        test: /node_modules/,
                        chunks: 'initial',
                        name: 'vendor',
                    }
                },
            },
        },

        plugins: [
            new webpack.DefinePlugin({
                'process.env.BROWSER': true,
                __DEV__: isDebug,
            }),

            new CopyWebpackPlugin([
                {
                    from: path.resolve(__dirname, 'src/public'),
                    to: path.resolve(__dirname, 'build/public'),
                },
            ]),

            ...(
                isDebug ? [
                        new webpack.HotModuleReplacementPlugin(),
                    ] :
                    [
                        new MiniCssExtractPlugin({
                            filename: '[name]-[contenthash].css',
                            chunkFilename: '[id]-[contenthash].css',
                        }),
                    ]
            ),

            new LoadablePlugin(
                {
                    filename: path.resolve(__dirname, 'src/universal/loadable-stats.json'),
                    writeToDisk: true,
                    outputAsset: false,
                }
            ),
        ],
    });

module.exports = clientConfig;
