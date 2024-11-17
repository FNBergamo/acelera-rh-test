import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useCustomerContext } from '../context/CustomerContext'
import { ROUTES } from '../constants/routes'
import { LoadingOverlay } from './LoadingOverlay'

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { username } = useCustomerContext()
  const navigate = useNavigate()
  const location = useLocation()

  const protectedRoutes = [ROUTES.CUSTOMERS, ROUTES]

  useEffect(() => {
    if (!username && protectedRoutes.includes(location.pathname)) {
      navigate(ROUTES.WELLCOME, { replace: true })
    }
  }, [username, navigate, location.pathname])

  if (!username && protectedRoutes.includes(location.pathname)) {
    return <LoadingOverlay show={true} />
  }

  return children
}

export default ProtectedRoute
