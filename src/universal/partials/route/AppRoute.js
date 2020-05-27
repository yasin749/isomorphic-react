import React, {PureComponent} from 'react';
import {Route} from 'react-router-dom';

const renderMergedProps = (component, ownRouteProps, routingProps) => {
    const finalProps = {
        ...ownRouteProps,
        ...routingProps,
    };

    return React.createElement(component, finalProps);
};

class AppRoute extends PureComponent {
    render() {
        const {component, routingProps, ...rest} = this.props;

        return (
            <Route
                {...rest}
                render={routeProps => renderMergedProps(component, routeProps, routingProps)}/>
        );
    }
}

export default AppRoute;
