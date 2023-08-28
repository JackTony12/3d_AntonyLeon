import React from 'react'
import ReactDOM from 'react-dom/client'
import Titulo from "./components/title"
import App from './App.jsx'
import ThreeScene from './components/modelo3d'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <Titulo/>
    <ThreeScene/>
    <App />
  </React.StrictMode>,
)
