/**
 *
 * reducers.js
 *      Reducer functions
 * @module reducers
 *
 */
import logger from './logger.js';

import Immutable from 'immutable';
import * as ACTIONS from './actions.js';

/**
 *
 * Utility functions
 *
 */
/**
 * persistState utility. Reducers can call this, passing in their name and
 * state to be stored locally. We cannot access arguments.callee.name, so since
 * we cannot get the function name we have to pass in it in manually (TODO:
 * figure out a workaround). Downside is this must be called in every reducer
 * which we want to persist state for (which is probably all reducers).
 * Alternatively, we could put this as a middleware on the store, but stores
 * should probably have no sideeffects. It's a bit more explicit this way, but
 * more work on the caller
 *
 * TODO: Make this a middleware
 */
function persistState( reducerName, state ){
    logger.log('persistState:' + reducerName, 'called');
    return window.localforage.setItem(reducerName, JSON.stringify(state));
}


/**
 *
 * Reducers
 *
 */
/**
 * Folders
 */
const initialStateFolders = { folders: [] };
export function folders ( state = initialStateFolders, action ){
    logger.log('reducers/folders:' + action.type, 'called %O', {state, action});
    persistState('folders', state);

    switch(action.type){
        case ACTIONS.FOLDERS_SET_STATE:
            return {...action.state};

        case ACTIONS.FOLDERS_ADD:
            return Object.assign(
                {},
                state, {
                    folders: [...state.folders, action.folder]
                }
            );

        default:
            return state;
    }
}

/**
 * Items
 */
const initialStateItems = { itemsById: {} };
export function items ( state = initialStateItems, action ){
    logger.log('reducers/items:' + action.type, 'called');

    switch(action.type){
        case ACTIONS.ITEMS_SET_STATE:
            persistState('items', action.state);
            return {...action.state};

        case ACTIONS.ITEMS_UPDATE:
            var newState = {...state};
            newState.itemsById[action.id] = newState.itemsById[action.id] || {};
            newState.itemsById[action.id].content = action.content;
            persistState('items', state);

            return newState;

        default:
            return state;
    }
}
