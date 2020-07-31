import React from 'react'
import { render } from 'react-dom'
import Index from './routers'
import "./App.css";
const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
document.body.appendChild(mainElement)

const App = () => {
  return (
    <>
      <Index />
    </>
  )
}

render(<App />, mainElement)
