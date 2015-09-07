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
        logger.log('components/item:itemUpdated', 'item updated');
        //Does nothing because codemirror handles this
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

        /**
         * on change, trigger action
         */
        this.editorOldValue = null;

        this.editorElementMde.codemirror.on('change', ()=>{
            this.editorNewValue = this.editorElementMde.value();

            logger.log('components/Item:editorChange', 'Changed: ', {
                wordCount: getWordCount(this.editorNewValue),
                valuesMatch: this.editorNewValue === this.editorOldValue
            });


            if(this.editorOldValue === this.editorNewValue){
                logger.log('components/Item:editorChange:ignore', 'values match');
                return false;
            }

            this.props.dispatch(itemsUpdate('1', this.editorNewValue));
            this.editorOldValue = this.editorNewValue;
        });
    },

    componentDidUpdate: function(){
        //update editor
        logger.log('components/item:componentDidUpdate', 'updated', this.props);

        // change the editor if the values don't match
        var itemContent = _.get(this.props, 'items.itemsById.' + 1 + '.content', null);
        if(itemContent && itemContent !== this.editorNewValue){
            this.editorElementMde.value(itemContent);
        }
    },

    /**
     * render
     */
    render: function(){
        logger.log('components/item:render', 'render called');

        // get item from item store
        var itemContent = _.get(this.props, 'items.itemsById.' + 1 + '.content', '');

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
