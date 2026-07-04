'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var innet = require('innet');
var jsx = require('@innet/jsx');
var utils = require('@innet/utils');
require('../plugins/index.js');
var nodeFn = require('../plugins/nodeFn/nodeFn.js');
var nodeAsync = require('../plugins/nodeAsync/nodeAsync.js');

const arrayPlugins = [
    utils.arraySync,
];
const fnPlugins = [
    nodeFn.nodeFn,
];
const objectPlugins = [
    jsx.jsxComponent,
];
const promisePlugins = [
    nodeAsync.nodeAsync,
];
const handler = innet.createHandler([
    utils.promise(promisePlugins),
    utils.array(arrayPlugins),
    utils.nullish([]),
    utils.object(objectPlugins),
    utils.fn(fnPlugins),
]);

exports.arrayPlugins = arrayPlugins;
exports.fnPlugins = fnPlugins;
exports.handler = handler;
exports.objectPlugins = objectPlugins;
exports.promisePlugins = promisePlugins;
