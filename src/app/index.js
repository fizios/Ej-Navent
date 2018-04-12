import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {autoRehydrate} from 'redux-persist';
import {routerMiddleware, ConnectedRouter} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import reducers from './reducers';
import Routes from './routes';

require('./sass/styles.scss');

const history = createHistory();
const logger = require('redux-logger')({collapsed: true});
const middleware = applyMiddleware(thunk, logger, routerMiddleware(history));
let store = createStore(reducers, autoRehydrate(), middleware);

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Routes/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);