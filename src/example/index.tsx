import { innet } from 'innet'

import { handler } from '../handler'
import { HelloWorld } from './components/HelloWorld'
import { Server } from './components/Server'

innet(<Server><HelloWorld /></Server>, handler)
