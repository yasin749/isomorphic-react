import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import {Switch} from 'react-router-dom';
import {hot} from 'react-hot-loader';

import {renderRoutes} from '../routes/routes';

class App extends PureComponent {
    static propTypes = {
        initialState: PropTypes.object,
        location: PropTypes.any,
        history: PropTypes.any,
    };

    constructor(props) {
        super(props);
    }

    generateRoutingProps() {
        const {
            initialState,
        } = this.props;

        return {
            initialState,
        };
    }

    render() {
        return (
            <Switch>
                {
                    renderRoutes(this.generateRoutingProps())
                }
            </Switch>
        );
    }
}

export default hot(module)(withRouter(App));
