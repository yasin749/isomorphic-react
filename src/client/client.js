import React from 'react';
import ReactDOM from 'react-dom';
import {Route} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import {loadableReady} from '@loadable/component';

import App from '../universal/components/App';

import '../assets/styles/application.scss';

let initialState;
if (window.__INITIAL_STATE__) {
    initialState = JSON.parse(window.__INITIAL_STATE__);
    delete window.__INITIAL_STATE__;
}

const container = document.getElementById('container');

loadableReady(() => {
    ReactDOM.hydrate(
        <BrowserRouter>
            <Route
                path='/'
                component={() => <App initialState={initialState}/>}/>
        </BrowserRouter>,
        container,
    );
});
