import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import root from "./holoInfo/router/root.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={root}/>
    {/*<App />*/}

  </StrictMode>,
)
