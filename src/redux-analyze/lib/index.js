const applyMiddleware = require('./applyMiddleware');
const bindActionCreators = require('./bindActionCreators');
const combineReducers = require('./bindActionCreators');
const compose = require('./compose');
const createStore = require('./createStore');
const thunk = require('./thunk');

exports.applyMiddleware = applyMiddleware;
exports.bindActionCreators = bindActionCreators;
exports.combineReducers = combineReducers;
exports.compose = compose;
exports.createStore = createStore;
exports.thunk = thunk;
