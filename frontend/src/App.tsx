import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Wellcome } from './pages/Wellcome'
import { Customers } from './pages/Customers'
import { SelectedCustomers } from './pages/SelectedCustomers'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Wellcome />} />
        <Route path='/customers' element={<Customers />} />
        <Route path='/selected-customers' element={<SelectedCustomers />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
