import { useEffect, useState } from 'react'
import { ClientCard } from './ClientCard'
import { useCustomerApi } from '../hooks/useCustomerApi'
import { Customer } from '../interfaces/customer'
import s from './CustomerList.module.css'

export function CustomerList() {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
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
    <div className={s.customerList}>
      <div className={s.container}>
        <p className={s.totalClients}>
          <b>{customers.length}</b> clientes encontrados
        </p>
        {customers.map((customer) => (
          <ClientCard
            key={customer.id}
            name={customer.name}
            salary={customer.salary}
            companyValue={customer.companyValue}
          />
        ))}
      </div>
    </div>
  )
}
