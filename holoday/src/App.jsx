import './App.css'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import { Outlet } from 'react-router'
import { useState } from 'react'

function App() {
  const [isLogin, setIsLogin] = useState(
    !!localStorage.getItem("accessToken")
  )

  return (
    <>
    <Header
      isLogin={isLogin}
      setIsLogin={setIsLogin}
      />
      <div className="App">
        <main className="main-content">
            <Outlet />
        </main>
      </div>
      <Footer/>
    </>
  )
}

export default App