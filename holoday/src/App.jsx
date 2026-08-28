import { useState } from 'react'
import './App.css'
import Header from './components/common/Header'
import Footer from './components/common/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header/>
      <div className="App">
        <main className="main-content">
            페이지 내용
        </main>
      </div>
      <Footer/>
    </>
  )
}

export default App
