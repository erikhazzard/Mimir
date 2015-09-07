/**
 * Home.js
 *      Main home component
 * @module components/Home
 */
// External Dependencies
import React from 'react';
import {RouteHandler} from 'react-router';
import logger from 'bragi-browser';

/**
 *
 * Functionality
 *
 */
var Home = React.createClass({
    componentWillMount: function(){
        logger.log('components/Home:componentWillMount', 'called');
    },

    render: function render(){
        logger.log('components/Home:render', 'called');

        return (
            <div>
                Home
            </div>
        );
    }
});

export default Home;
