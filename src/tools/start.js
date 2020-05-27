const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const getPort = require('get-port');

const webpackClientConfig = require('../../webpack.client.config');
const webpackServerConfig = require('../../webpack.server.config');
const run = require('./run');
const clean = require('./clean');
const appConfig = require('../config/appConfig');

const PORT_REPORT_TIMEOUT = 1000;

async function start() {
    let availablePort;
    const webServerApp = express();

    await run(clean);

    const compiler = webpack([
        webpackClientConfig,
        webpackServerConfig,
    ]);

    const clientCompiler = compiler.compilers.find(
        compiler => compiler.name === 'client',
    );

    webServerApp.use(
        webpackDevMiddleware(
            compiler,
            {
                quiet: true,
                noInfo: true,
                lazy: false,
                writeToDisk: true,
                serverSideRender: false,
                publicPath: webpackClientConfig.output.publicPath,
            },
        ),
    );

    webServerApp.use(
        webpackHotMiddleware(
            clientCompiler,
        ),
    );

    webServerApp.use(
        webpackHotServerMiddleware(
            compiler, {
                chunkName: 'server',
                serverRendererOptions: {
                    webServerApp,
                },
            }),
    );

    availablePort = await getPort({
        port: [
            appConfig.port,
            appConfig.port + 2,
            appConfig.port + 4,
        ],
    });

    webServerApp.listen(
        availablePort,
    );

    compiler.hooks.done.tap(
        'start.js__port-reporting',
        () => {
            setTimeout(() => {
                console.log(`App is running on port: ${availablePort}`);
            }, PORT_REPORT_TIMEOUT);
        },
    );

    return webServerApp;
}

module.exports = start;
