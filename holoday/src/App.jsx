import './App.css'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import { Outlet } from 'react-router'
import { useState } from 'react'
import { ThemeInit } from '../.flowbite-react/init'

function App() {
  const [isLogin, setIsLogin] = useState(
    !!localStorage.getItem("accessToken")
  )

  return (
    <>
      <ThemeInit />
      <Header
        isLogin={isLogin}
        setIsLogin={setIsLogin}
      />
      <div className="App">
        <main className="main-content">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  )
}

export default App