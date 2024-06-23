import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LogIn from './pages/LogIn.jsx'
import Register from './pages/Register.jsx'
import Home from './pages/Home.jsx'
import Favorites from './pages/Favorites.jsx'

const router = createBrowserRouter([
  { path: "/", element: <LogIn /> },
  { path: "/register", element: <Register /> },
  { path: "/home", element: <Home /> },
  { path: "/favorites", element: <Favorites /> },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
