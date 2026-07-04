import { Context, ContextProvider, useContext } from '@innet/jsx'
import http from 'http'
import { onDestroy } from 'watch-state'

export const serverContext = new Context<http.Server>()

export const useServer = () => {
  return useContext(serverContext)
}

export interface ServerProps {
  children?: any
  port?: number
}

export function Server ({
  children,
  port = 3000,
}: ServerProps) {
  const server = http.createServer()

  server.listen(port, () => {
    console.log(`http://localhost:${port}`)
  })

  onDestroy(() => {
    server.close()
  })

  return <ContextProvider for={serverContext} set={server}>{children}</ContextProvider>
}
