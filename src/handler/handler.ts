import { createHandler, type Plugin } from 'innet'
import { jsxComponent } from '@innet/jsx'
import { array as isArray, arraySync, fn, nullish, object as isObject, promise } from '@innet/utils'

import { nodeAsync, nodeFn } from '../plugins'

export const arrayPlugins: Plugin[] = [
  arraySync,
]

export const fnPlugins: Plugin[] = [
  nodeFn,
]

export const objectPlugins: Plugin[] = [
  jsxComponent,
]

export const promisePlugins: Plugin[] = [
  nodeAsync,
]

export const handler = createHandler([
  promise(promisePlugins),
  isArray(arrayPlugins),
  nullish([]),
  isObject(objectPlugins),
  fn(fnPlugins),
])
