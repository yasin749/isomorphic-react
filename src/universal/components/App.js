import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import {Switch} from 'react-router-dom';
import {hot} from 'react-hot-loader';

import {renderRoutes} from '../routes/routes';

import MainLayout from '../layouts/MainLayout/MainLayout';

class App extends PureComponent {
    static propTypes = {
        initialState: PropTypes.object,
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
        const {
            location,
            history,
        } = this.props;

        return (
            <MainLayout
                history={history}
                location={location}>
                <Switch>
                    {
                        renderRoutes(this.generateRoutingProps())
                    }
                </Switch>
            </MainLayout>
        );
    }
}

export default hot(module)(withRouter(App));
