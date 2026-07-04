import { type HandlerPlugin, innet, useApp, useHandler } from 'innet'
import { onDestroy, scope } from 'watch-state'

export function nodeAsync (): HandlerPlugin {
  return () => {
    const { activeWatcher } = scope
    const app = useApp<Promise<any>>()
    const handler = useHandler()

    let works = true

    onDestroy(() => {
      works = false
    })

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    app.then(data => {
      if (works) {
        scope.activeWatcher = activeWatcher
        innet(data, handler)
        scope.activeWatcher = undefined
      }
    })
  }
}
