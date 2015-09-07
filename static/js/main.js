/**
 *
 * main.js
 *      Main entrypoint into app
 * @module main
 *
 */
import logger from './logger.js';

//logger.options.groupsEnabled = false;
//logger.options.groupsEnabled = [/[Ss]tore/];
//logger.options.groupsEnabled = [/ItemList/];

import React from 'react';
import '../css/main.scss';

import $ from 'jQuery';
window.$ = $;

import _ from 'lodash';
window._ = _;

// Internal Dependencies
import router from './router.js';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import * as actions from './actions.js';

import store from "./store.js";

/**
 *
 * Functionality
 *
 */
logger.log('app', 'Initializing. Store: %o', store);

router.run((Handler, state) => {
    React.render(
        <Provider store={store}>
            {()=> <Handler {...state} />}
        </Provider>,
        document.getElementById('app')
    );
});
