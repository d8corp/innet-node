import { type RequestListener } from 'node:http'
import { onDestroy } from 'watch-state'

import { useServer } from '../Server'

export function HelloWorld () {
  const server = useServer()

  if (!server) return

  const listener: RequestListener = (req, res) => {
    res.end('Hello, World!')
  }

  server.on('request', listener)

  onDestroy(() => {
    server.off('request', listener)
  })
}
