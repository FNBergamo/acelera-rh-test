import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Wellcome } from './pages/Wellcome'
import { Home } from './pages/Home'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/wellcome' element={<Wellcome />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

