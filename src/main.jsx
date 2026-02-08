import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import LogRocket from 'logrocket';

if (import.meta.env.VITE_LOGROCKET_APP_ID) {
  LogRocket.init(import.meta.env.VITE_LOGROCKET_APP_ID);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
