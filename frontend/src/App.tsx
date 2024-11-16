import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Wellcome } from './pages/Wellcome'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/wellcome' element={<Wellcome />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

