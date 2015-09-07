/**
 *
 * actions.js
 *      Action constants and action creators
 * @module actions
 *
 */
import logger from './logger.js';

/**
 * Item Related
 */
export const ITEMS_ADD = 'ITEMS_ADD';

export const ITEMS_UPDATE = 'ITEMS_UPDATE';
export function itemsUpdate ( id, content ){
    logger.log('actions/itemUpdate', 'called');
    return { type: ITEMS_UPDATE, content: content, id: id };
}

export const ITEMS_SET_STATE = 'ITEMS_SET_STATE';
export function itemsSetState ( state ){
    logger.log('actions/itemSetState', 'called');
    return { type: ITEMS_SET_STATE, state: state };
}


/**
 * Folder Related
 */
export const FOLDERS_ADD = 'FOLDERS_ADD';
export function foldersAdd ( name ) {
    logger.log('actions/foldersAdd', 'called');
    return { type: FOLDERS_ADD, folder: { name: name }};
}
export const FOLDERS_SET_STATE = 'FOLDERS_SET_STATE';
export function foldersSetState ( id, content ){
    logger.log('actions/foldersSetState', 'called');
    return { type: FOLDERS_SET_STATE, content: content, id: id };
}


////EXAMPLES
//export function doSomethingAsync() {
  //return (dispatch) => {
    //dispatch({ type: SOMETHING_STARTED });

    //return requestSomething().then(
      //(result) =>  dispatch({ type: SOMETHING_COMPLETED, result }),
      //(error) =>  dispatch({ type: SOMETHING_FAILED, error })
    //);
  //};
//}
//*/



//[>
//// Example 
//function doSomething() {
  //return { type: 'SOMETHING' };
//}

//function maybeDoSomething() {
  //return function (dispatch, getState) {
    //if (getState().isFetching) {
      //return;
    //}

    //dispatch(doSomething());
  //};
//}

//store.dispatch(maybeDoSomething());
//*/
