import * as React from 'react'
import { MatrixGenerator, MatrixTable } from './components'
import { MatrixProvider } from './context'

function App() {
  return (
    <MatrixProvider>
      <MatrixGenerator />
      <MatrixTable />
    </MatrixProvider>
  )
}

export default App
