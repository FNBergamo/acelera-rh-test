import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Wellcome } from './pages/Wellcome'
import { Customers } from './pages/Customers'
import { SelectedCustomers } from './pages/SelectedCustomers'
import './App.css'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Wellcome />} />
        <Route
          path='/customers'
          element={
            <ProtectedRoute>
              <Customers />
            </ProtectedRoute>
          }
        />
        <Route
          path='/selected-customers'
          element={
            <ProtectedRoute>
              <SelectedCustomers />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App

