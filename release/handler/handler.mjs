import { createHandler } from 'innet';
import { jsxComponent } from '@innet/jsx';
import { arraySync, promise, array, nullish, object, fn } from '@innet/utils';
import '../plugins/index.mjs';
import { nodeFn } from '../plugins/nodeFn/nodeFn.mjs';
import { nodeAsync } from '../plugins/nodeAsync/nodeAsync.mjs';

const arrayPlugins = [
    arraySync,
];
const fnPlugins = [
    nodeFn,
];
const objectPlugins = [
    jsxComponent,
];
const promisePlugins = [
    nodeAsync,
];
const handler = createHandler([
    promise(promisePlugins),
    array(arrayPlugins),
    nullish([]),
    object(objectPlugins),
    fn(fnPlugins),
]);

export { arrayPlugins, fnPlugins, handler, objectPlugins, promisePlugins };
