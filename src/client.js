import React from 'react';
import { hydrate, render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import allReducers from './ducks/combined';
import App from './app';

const preloadedState = window.__PRELOADED_STATE__;

delete window.__PRELOADED_STATE__;

let composeEnhancers;

if (process.env.NODE_ENV !== 'production')
{
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
else
{
    composeEnhancers = (anything) => anything;
}

const store = createStore(allReducers, preloadedState, composeEnhancers(applyMiddleware(thunkMiddleware)));

hydrate(<App store={ store }/>, document.querySelector('#app'));

if (process.env.NODE_ENV === 'dev' && module.hot)
{
    module.hot.accept('./app', () =>
    {
        const NewApp = require('./app').default;
        render(<NewApp store={ store }/>, document.querySelector('#app'));
    });
    module.hot.accept('./ducks/combined', () =>
    {
        store.replaceReducer(require('./ducks/combined').default);
    });
}
