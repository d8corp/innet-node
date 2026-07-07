import { innet } from 'innet'
import { Context, ContextProvider, useContext } from '@innet/jsx'

import { useEffect } from './useEffect'

import { handler } from '../../handler'

describe('useEffect', () => {
  it('should keep observable scope', async () => {
    const promise = Promise.withResolvers()
    const logContext = new Context<any[]>([])

    function Foo ({ children }: { children: unknown }) {
      const log: any[] = []

      useEffect(() => {
        promise.resolve(log)
      })

      return <ContextProvider for={logContext} set={log}>{children}</ContextProvider>
    }

    function Bar ({ value }: { value: any }) {
      const log = useContext(logContext)

      if (!log) return

      log.push(value)
    }

    innet(<Foo><Bar value={1} /><Bar value={2} /></Foo>, handler)

    const result = await promise.promise

    expect(result).toEqual([1, 2])
  })
})
