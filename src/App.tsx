// import { useState } from 'react'
import currentseaLogo from './assets/currentsea-logo.png'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://currentsea.com/" target="_blank" rel="noreferrer">
          <img src={currentseaLogo} className="logo" alt="CurrentSea logo" />
        </a>
      </div>
      <p className="read-the-docs">
        Placeholder
      </p>
    </>
  )
}

export default App
