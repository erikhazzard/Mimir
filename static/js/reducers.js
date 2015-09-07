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
 * Reducers
 *
 */
/**
 * Folders
 */
const initialStateFolders = { folders: [] };
export function folders ( state = initialStateFolders, action ){
    logger.log('reducers/folders:' + action.type, 'called %O', {state, action});

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
            return {...action.state};

        case ACTIONS.ITEMS_UPDATE:
            var newState = {...state};
            newState.itemsById[action.id] = newState.itemsById[action.id] || {};
            newState.itemsById[action.id].content = action.content;

            return newState;

        default:
            return state;
    }
}
