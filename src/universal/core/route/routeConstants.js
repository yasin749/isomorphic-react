import values from 'lodash/values';

const ROUTE_PATHS = {
    HOME_PAGE: '/',
};

const ROUTE_CONFIGS = {
    [ROUTE_PATHS.HOME_PAGE]: {
        routeName: 'HOME_PAGE',
        isPublic: true,
        exact: true,
    },
};

const ROUTE_PATH_ARRAY = values(ROUTE_PATHS);

export {
    ROUTE_PATHS,
    ROUTE_CONFIGS,
    ROUTE_PATH_ARRAY,
};

