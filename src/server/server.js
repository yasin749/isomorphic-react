import express from 'express';
import bodyParser from 'body-parser';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {StaticRouter} from 'react-router';
import {ChunkExtractor} from '@loadable/server';
import {compose} from 'compose-middleware';
import compressionMiddleware from 'compression';

import appConfig from '../config/appConfig';

import html from './html/html';
import {matchUrlInRouteConfigs} from '../universal/core/route/routeUtils';

import {ROUTE_CONFIG_TO_COMPONENTS} from '../universal/core/route/routesWithComponents';

import App from '../universal/components/App';

import path from 'path';

const loadableStats = path.resolve('src/universal/loadable-stats');

process.on('unhandledRejection', (reason, p) => {
    console.log('Error: unhandledRejection');
});

const getExtractor = (entrypoints, statsFile = loadableStats) => {
    return new ChunkExtractor({statsFile, entrypoints});
}

const css = new Set();

const baseHtmlProps = {
    styles: [
        {
            id: 'css',
            cssText: [...css].join(''),
        },
    ],
};

const serverRenderer = async (req, res, next) => {
    try {
        const context = {
            pathname: req.path,
            query: req.query,
        };
        const matchResult = matchUrlInRouteConfigs(req.url);

        if (matchResult) {
            context.pathParams = matchResult.params;

            const RouteComponent = ROUTE_CONFIG_TO_COMPONENTS[matchResult.path]

            let initialState = {};
            if (RouteComponent.fetchData) {
                initialState = await RouteComponent.fetchData(context);
            }

            // console.log('initialState', initialState);

            const Application = () => (
                <StaticRouter
                    location={req.url}
                    context={context}>
                    <>
                        <div id='container'>
                            {
                                <App initialState={initialState}/>
                            }
                        </div>
                    </>
                </StaticRouter>
            );

            const extractorEntrypoint = ['client'];
            const extractor = getExtractor(extractorEntrypoint)
            const jsx = extractor.collectChunks(<Application/>);

            const bodyHtml = ReactDOMServer.renderToString(jsx);

            // console.log('bodyHtml', bodyHtml);

            const htmlString = html({
                ...baseHtmlProps,
                scriptTags: extractor.getScriptTags(),
                linkTags: extractor.getLinkTags(),
                styleTags: extractor.getStyleTags(),
                pageTitleContent: appConfig.applicationName,
                initialState: initialState,
                children: bodyHtml,
            });

            res.status(200);
            res.send(htmlString);
        } else {
            res.status(404);
            res.send('Not Found');
        }
    } catch (error) {
        console.log('Server Error');
        next(error, req, res);
    }
};

function processExistingServerApp(webServer) {
    webServer.use(express.static(path.resolve(process.cwd(), 'build/public')));
    webServer.use(compressionMiddleware());
    webServer.use(bodyParser.urlencoded({extended: true}));
    webServer.use(bodyParser.json());
    webServer.use(serverRenderer);
}

if (process.env.NODE_ENV === 'production') {
    const app = express();
    processExistingServerApp(app);
    app.listen(appConfig.port);
}

export {
    processExistingServerApp,
};

export default function () {
    return compose([
        express.static(path.resolve(process.cwd(), 'build/public')),
        compressionMiddleware(),
        bodyParser.urlencoded({extended: true}),
        bodyParser.json(),
        serverRenderer,
    ]);
}
