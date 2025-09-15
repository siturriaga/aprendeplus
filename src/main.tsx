import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css' // We'll assume you have some CSS here if needed

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
