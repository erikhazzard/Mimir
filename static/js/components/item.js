/**
 * Individual item component view
 * @module controllers/item
 */

import logger from '../logger.js';
import React from 'react';
import _ from 'lodash';
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

import Immutable from 'immutable';

import {itemsUpdate} from '../actions.js';
import getWordCount from '../util/get-word-count.js';

/**
 *
 * Functionality
 *
 */

/**
 * Item Component
 */
var Item = React.createClass({
    // Component events
    itemUpdatedNoOp: function(e){
        //Does nothing because codemirror handles this
        logger.log('components/item:itemUpdated', 'item updated');
    },

    /**
     * Life cycle events
     */
    componentDidMount: function(){
        logger.log('components/item:componentDidMount', 'mounted, setting up MDE');

        this.editorElementMde = new window.SimpleMDE({
            element: React.findDOMNode(this.refs.textInput),
            toolbar: false,
            status: false,
            tabSize: 4,
            spellChecker: true,
            autosave: { enabled: false }
        });
        this.editorElementMde.render();

        this.editorOldValue = null;

        /**
         * on change, trigger action
         */
        this.editorElementMde.codemirror.on('change', ()=>{
            this.editorNewValue = this.editorElementMde.value();

            logger.log('components/Item:editorChange', 'Changed: ', {
                valuesMatch: this.editorNewValue === this.editorOldValue
            });

            if(this.editorOldValue === this.editorNewValue){
                logger.log('components/Item:editorChange:ignore', 'values match');
                return false;
            }

            this.editorOldValue = this.editorNewValue;

            // Dispatch action, inform redux that data has changed
            requestAnimationFrame(()=>{
                this.props.dispatch(itemsUpdate(this.props.params.itemId, this.editorNewValue));
            });
        });
    },

    shouldComponentUpdate: function(nextProps, nextState){
        logger.log('components/item:shouldComponentUpdate', 'called');
        // TODO: use state
        this._newItemId = nextProps.params.itemId;

        // if IDs are different, render
        if(nextProps.params.itemId !== this.props.params.itemId){ return true; }

        // check on content
        var curItemContent = this.getItemContent(this.props);
        var nextItemContent = this.getItemContent(nextProps);
        if(curItemContent === nextItemContent){
            logger.log('components/item:shouldComponentUpdate', 'should NOT update');
            return false;
        }

        return true;
    },

    /**
     * When component updates, update the editor if there is a new a value.
     * This is useful when, for instance, data is being passed in to the
     * component and not entered manually (e.g., on loading data)
     */
    componentDidUpdate: function componentDidUpdate(){
        //update editor
        logger.log('components/item:componentDidUpdate', 'updated');

        var itemContent = this.getItemContent(this.props);

        // change the editor if the values don't match
        if((this._newItemId && (this.props.params.itemId !== this._newItemId)) ||
            (itemContent && itemContent !== this.editorNewValue)
        ){
            logger.log('components/item:componentDidUpdate:update', 'updating');
            this.editorElementMde.value(itemContent);
        }
    },

    /**
     * utility function for returning item content from either a passed in props
     * or the current props
     */
    getItemContent: function(props){
        return _.get(
            (props || this.props),
            'items.itemsById.' + this.props.params.itemId + '.content',
            null);
    },

    /**
     * render
     */
    render: function(){
        logger.log('components/item:render', 'render called');

        // get item from item store
        var itemContent = this.getItemContent(this.props) || '';

        return (
            <div id='item-content__inner'>
                <textarea
                    ref='textInput'
                    id='item-content__text-input'
                    onChange={this.itemUpdatedNoOp}
                    value={itemContent}></textarea>
            </div>
        );
    }
});

export default Item;
