import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import memberRouter from './router/memberRouter.jsx'
import holoBoardRouter from "./holoLounge/router/holoBoardRouter.jsx";
import holoddamRouter from './router/holoddamRouter.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // 밑에 자식 Router 하나씩 추가해 갈 예정
      ...memberRouter(),
      ...holoBoardRouter(),
      ...holoddamRouter(),
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)