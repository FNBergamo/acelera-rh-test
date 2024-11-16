import { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'
import s from './Home.module.css'
import { Customer } from '../interfaces/customer'
import { useCustomerApi } from '../hooks/useCustomerApi'

export function Home() {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const [customers, setCustomers] = useState<Customer[]>([])
  const { fetchCustomers } = useCustomerApi()

  useEffect(() => {
    async function getCustomers() {
      setLoading(true)
      try {
        const result = await fetchCustomers()
        setCustomers(result?.data)
      } catch (error) {
        setError(error as Error)
      } finally {
        setLoading(false)
      }
    }

    getCustomers()
  }, [fetchCustomers])

  console.log(customers)

  if (loading) {
    return <p>Carregando...</p>
  }

  if (error) {
    return <p>Erro ao carregar os clientes: {error.message}</p>
  }

  return (
    <div className={s.home}>
      <Header isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
    </div>
  )
}
