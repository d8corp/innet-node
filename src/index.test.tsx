import { innet } from 'innet'
import { Watch } from 'watch-state'

import { HelloWorld } from './example/components/HelloWorld'
import { Server } from './example/components/Server'
import { handler } from './handler'

describe('@innet/node', () => {
  test('server', async () => {
    const open = Promise.withResolvers()
    const close = Promise.withResolvers()

    const watcher = new Watch(() => {
      innet((
        <Server
          onEnd={() => close.resolve(null)}
          onStart={() => open.resolve(null)}
          port={3000}>
          <HelloWorld />
        </Server>
      ), handler)
    })

    await open.promise

    const res = await fetch('http://localhost:3000')
    const text = await res.text()

    expect(text).toBe('Hello, World!')

    watcher.destroy()

    await close.promise
  })
  test('async component', async () => {
    let count = 0

    async function Foo () {
      await new Promise(resolve => setTimeout(resolve, 100))
      count++
    }

    innet((
      <>
        <Foo />
        <Foo />
        <Foo />
      </>
    ), handler)

    expect(count).toBe(0)

    await new Promise(resolve => setTimeout(resolve, 100))

    expect(count).toBe(3)
  })
})
