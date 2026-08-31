/*import { useState } from 'react'
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
*/

// 내 게시판 불러오기 위한 코드(merge 할 때 삭제 예정)
import './App.css'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import { Outlet } from 'react-router'

function App() {

  return (
    <>
    <Header/>
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