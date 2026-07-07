'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utils = require('@watch-state/utils');
var queueNanoTask = require('queue-nano-task');
var watchState = require('watch-state');

function useEffect(callback) {
    let run = true;
    watchState.onDestroy(() => {
        run = false;
    });
    const effect = utils.withScope(callback);
    queueNanoTask.queueNanotask(() => {
        if (run) {
            effect();
        }
    }, 1, true);
}

exports.useEffect = useEffect;
