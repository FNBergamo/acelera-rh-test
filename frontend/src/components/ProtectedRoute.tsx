import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useCustomerContext } from '../context/CustomerContext'
import { ROUTES } from '../constants/routes'
import { LoadingOverlay } from './LoadingOverlay'

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { username } = useCustomerContext()
  const [isLoading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    setLoading(true)
    if (!username && location.pathname !== ROUTES.WELLCOME) {
      const currentPage = new URLSearchParams(location.search).get('page') || '1'
      sessionStorage.setItem('redirectTo', location.pathname)
      sessionStorage.setItem('redirectPage', currentPage)
      navigate(ROUTES.WELLCOME, { replace: true })
    }
    setLoading(false)
  }, [username, navigate, location.pathname])

  useEffect(() => {
    setLoading(true)
    if (username) {
      const redirectTo = sessionStorage.getItem('redirectTo')
      const redirectPage = sessionStorage.getItem('redirectPage')

      if (redirectTo && redirectPage) {
        navigate(`${redirectTo}?page=${redirectPage}`, { replace: true })
        sessionStorage.removeItem('redirectTo')
        sessionStorage.removeItem('redirectPage')
      }
    }
    setLoading(false)
  }, [username, navigate])

  if (!username || isLoading) {
    return <LoadingOverlay show={true} />
  }

  return children
}

export default ProtectedRoute
