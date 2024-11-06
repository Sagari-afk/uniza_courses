import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1 className='c-white'>Uč sa rýchlo a<br/> efektívne.</h1>

        <div className='flex center gap-1-5'>
          <a className="btn btn-with-bc">Prihlasiť sa</a>
          <a className="btn btn-without-bc">Kurzy</a>
        </div>
      </div>
    </>
  )
}

export default App
