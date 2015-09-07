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
 * Setup store and reducer
 *
 */

// setup store with middleware
const createStoreWithMiddleware = applyMiddleware(logMiddleware, thunk)(createStore);

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
