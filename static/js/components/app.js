/**
 *
 * app.js
 *      Main app handler component
 * @module components/app
 *
 */
/**
 * dependencies
 */
import React, {Component, PropTypes} from 'react';
import {RouteHandler} from 'react-router';
import logger from '../logger.js';
import {connect} from 'react-redux';

let mui = require('material-ui');
let ThemeManager = new mui.Styles.ThemeManager();

/**
 *
 * functionality
 *
 */
var App = React.createClass({
    contextTypes: { router: React.PropTypes.func.isRequired },

    /**
     * material ui
     */
    childContextTypes: { muiTheme: React.PropTypes.object },
    getChildContext() { return { muiTheme: ThemeManager.getCurrentTheme() }; },

    /**
     * lifecycle events
     */
    componentDidMount: function(){
        logger.log('components/app:componentDidMount', 'called');
    },

    /**
     * render
     */
    render: function render(){
        logger.log('components/app:render', 'called : ', this.props);

        return (
            <div id='site-wrapper'>
                <RouteHandler {...this.props} />
            </div>
        );
    }
});

/**
 * configure select function and connect to redux
 */
function select(state) {
    logger.log('components/app:select', 'called: ', state);

    // TODO: use https://github.com/faassen/reselect and only return certain
    // things
    return state;
}
export default connect(select)(App);
