import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Wellcome } from './pages/Wellcome'
import { Customers } from './pages/Customers'
import { SelectedCustomers } from './pages/SelectedCustomers'
import './App.css'
import ProtectedRoute from './components/ProtectedRoute'
import { NotFound } from './pages/NotFound'
import { ComingSoon } from './pages/ComingSoon'
import { ROUTES } from './constants/routes'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.WELLCOME} element={<Wellcome />} />
        <Route
          path={ROUTES.CUSTOMERS}
          element={
            <ProtectedRoute>
              <Customers />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.SELECTED_CUSTOMERS}
          element={
            <ProtectedRoute>
              <SelectedCustomers />
            </ProtectedRoute>
          }
        />
        <Route path={ROUTES.COMING_SOON} element={<ComingSoon />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

