import { Context, ContextProvider, useContext } from '@innet/jsx'
import http from 'http'
import { onDestroy } from 'watch-state'

export const serverContext = new Context<http.Server>()

export const useServer = () => {
  return useContext(serverContext)
}

export interface ServerProps {
  children?: any
  onEnd?: () => void
  onStart?: () => void
  port?: number
}

export function Server ({
  children,
  onEnd,
  onStart,
  port = 80,
}: ServerProps) {
  const server = http.createServer()

  server.listen(port, onStart)

  if (onEnd) {
    server.on('close', onEnd)
  }

  onDestroy(() => {
    server.close()
  })

  return <ContextProvider for={serverContext} set={server}>{children}</ContextProvider>
}
