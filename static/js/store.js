/**
 *
 * store.js
 *      App store
 * @module store
 *
 */
/**
 * dependencies
 */
import logger from './logger.js';
import _ from 'lodash';
import async from 'async';

import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import * as reducers from './reducers.js';

import * as ACTIONS from './actions.js';

/**
 *
 * middleware
 *
 */
function logMiddleware ({ dispatch, getState }) {
    logger.log('logMiddleware:setup', 'called', arguments);

    return function(next) {
        logger.log('logMiddleware:wrappedNext', 'called');

        return function (action) {
            logger.log('logMiddleware:wrappedAction',
                'called with %O', action);

            return next(action);
        };
    };
}

/**
 *
 * persist - store data. While this could be a considered a side effect as
 * data is saved when state changes, it simplifies things (as opposed to having
 * persistState() function calls in the action creators). By being a store
 * middleware, we can batch saves by putting the save behind a throttle.
 *
 */
var throttledSave = _.throttle(
    function saveState(action, getState){
        logger.log('persistMiddleware:throttle:' + action.type, 'called');
        // iterate over all stores and save data
        let state = getState();

        // TODO: Could use async.each and trigger an action to let UI know
        // we've saved all data when all data has been saved

        for(let key in state){
            window.localforage.setItem(key, JSON.stringify(state[key]));
        }
    },
    300,
    {trailing: true, leading: true}
);

function persistMiddleware ({ dispatch, getState }) {
    logger.log('persistMiddleware:setup', 'called', arguments);
    return function(next) {
        logger.log('persistMiddleware:wrappedNext', 'called');
        return function (action) {
            logger.log('persistMiddleware:wrappedAction:' + action.type, 'called');
            // call throttled save function
            throttledSave(action, getState);

            return next(action);
        };
    };
}

/**
 *
 * Setup store and reducer
 *
 */

// setup store with middleware
const createStoreWithMiddleware = applyMiddleware(logMiddleware, persistMiddleware, thunk)(createStore);

const store = createStoreWithMiddleware(combineReducers(reducers));
export default store;

// Get default state from localstorage
function loadLocalData(){
    logger.log('store:loadLocalData', 'called');

    let state = store.getState();
    for(let key in state){
        window.localforage.getItem(key, (err, res)=>{
            logger.log('store:loadLocalData:' + key, 'got data');
            if(ACTIONS[key + 'SetState'] && res){
                let parsedState = JSON.parse(res);
                store.dispatch(ACTIONS[key + 'SetState'](parsedState));
            }
        });
    }
}
loadLocalData();
