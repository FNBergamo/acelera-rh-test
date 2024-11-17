import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useCustomerContext } from '../context/CustomerContext'

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { username } = useCustomerContext()
  const navigate = useNavigate()
  const location = useLocation()

  const protectedRoutes = ['/customers', '/selected-customers']

  useEffect(() => {
    if (!username && protectedRoutes.includes(location.pathname)) {
      navigate('/')
    }
  }, [username, navigate, location.pathname])

  if (!username && protectedRoutes.includes(location.pathname)) {
    return <h1>Carregando...</h1>
  }

  return children
}

export default ProtectedRoute
