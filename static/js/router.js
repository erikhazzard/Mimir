/**
 *
 * router.js
 *      Routes
 * @module components/router
 *
 */
// External Dependencies
import React from 'react';
import logger from 'bragi-browser';

import {Route, DefaultRoute, NotFoundRoute} from 'react-router';
import {create, HistoryLocation, HashLocation, TestLocation} from 'react-router';

// Internal Dependencies
import App from './components/app.js';
import Home from './components/home.js';
import NotFound from './components/not-found.js';
import Item from './components/item.js';

/**
 *
 * Functionality
 *
 */
var routes = (
    <Route handler={App} >
        <Route name="home" path="/" handler={Home} />
        <Route name="item" path="/item/:itemId" handler={Item} />
        <NotFoundRoute handler={NotFound}/>
    </Route>
);

export default create({
    routes: routes,
    ////TODO: Use historylocation instead
    //location: HistoryLocation
    location: HashLocation
});
