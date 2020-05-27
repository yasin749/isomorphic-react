import {matchPath} from 'react-router';

import {
    ROUTE_CONFIGS,
    ROUTE_PATH_ARRAY,
} from './routeConstants';

function matchUrlForRoutePath(path, routePath) {
    let result = null,
        routeConfig = null;

    routeConfig = ROUTE_CONFIGS[routePath];

    const rawMatchPathResult = matchPath(
        path,
        {
            path: routePath,
            routePath: routePath,
            ...routeConfig,
        }
    );

    if (rawMatchPathResult) {
        result = {
            ...rawMatchPathResult,
            ...routeConfig,
        };
    }

    return result;
}

function matchUrlInRouteArray(path, routeArray) {
    let result = null;

    for (let index = 0; index < routeArray.length; index++) {
        const routePath = routeArray[index];
        const matchResult = matchUrlForRoutePath(path, routePath);

        if (matchResult) {
            result = matchResult;
            break;
        }
    }

    return result;
}

function matchUrlInRouteConfigs(path) {
    return matchUrlInRouteArray(path, ROUTE_PATH_ARRAY);
}

export {
    matchUrlInRouteConfigs,
    matchUrlInRouteArray,
    matchUrlForRoutePath,
};
