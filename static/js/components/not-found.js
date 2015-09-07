/**
 *
 * not-found.js
 *      Non-existent pages
 * @module components/not-found
 *
 */
import React from 'react';
import {RouteHandler} from 'react-router';
import logger from 'bragi-browser';

var NotFound = React.createClass({
    render: function render(){
        logger.log('components/NotFound:render', 'called');

        return (
            <div>
                Page not found
            </div>
        );
    }
});

export default NotFound;
