/**
 *
 * logger.js
 *      Logger instance
 * @module logger
 *
 */
import logger from 'bragi-browser';
logger.transports.get('console').property('showMeta', false);

export default logger;
