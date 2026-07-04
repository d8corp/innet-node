'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var innet = require('innet');
var watchState = require('watch-state');

function nodeAsync() {
    return () => {
        const { activeWatcher } = watchState.scope;
        const app = innet.useApp();
        const handler = innet.useHandler();
        let works = true;
        watchState.onDestroy(() => {
            works = false;
        });
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        app.then(data => {
            if (works) {
                watchState.scope.activeWatcher = activeWatcher;
                innet.innet(data, handler);
                watchState.scope.activeWatcher = undefined;
            }
        });
    };
}

exports.nodeAsync = nodeAsync;
