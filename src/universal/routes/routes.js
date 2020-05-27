import React from 'react';
import loadable from '@loadable/component';

import AppRoute from '../partials/route/AppRoute';

const HomePage = loadable(() => import(/* webpackChunkName: "HomePage" */ './home/HomePage'));

import {
    ROUTE_CONFIGS,
    ROUTE_PATHS,
} from '../core/route/routeConstants';

function renderRoutes(routingProps) {
    return [
        <AppRoute
            routingProps={routingProps}
            key={ROUTE_PATHS.HOME_PAGE}
            path={ROUTE_PATHS.HOME_PAGE}
            {...ROUTE_CONFIGS[ROUTE_PATHS.HOME_PAGE]}
            component={HomePage}/>,
    ];
}

export {
    renderRoutes,
};
