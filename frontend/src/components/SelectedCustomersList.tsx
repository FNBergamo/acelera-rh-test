import { useEffect, useState } from 'react'
import { ClientCard } from './ClientCard'
import { useCustomerContext } from '../context/CustomerContext'
import s from './SelectedCustomersList.module.css'
import { Customer } from '../interfaces/customer'
import { useCustomerApi } from '../hooks/useCustomerApi'

export function SelectedCustomersList() {
  const { selectedCustomers } = useCustomerContext()
  const { fetchCustomersById } = useCustomerApi()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  console.log(loading, error)

  const [customers, setCustomers] = useState<Customer[]>([])

  useEffect(() => {
    function getCustomer() {
      try {
        selectedCustomers.forEach(async (id) => {
          const response = await fetchCustomersById(id)
          setCustomers((prevCustomers) => {
            if (prevCustomers.some((customer) => customer.id === response.data.id)) {
              return prevCustomers
            }
            return [...prevCustomers, response.data]
          })
        })
      } catch (error) {
        setError(error as Error)
      } finally {
        setLoading(false)
      }
    }
    getCustomer()
  }, [selectedCustomers, fetchCustomersById])

  return (
    <div className={s.selectedCustomersList}>
      <div className={s.container}>
        <p className={s.totalClients}>
          <b>Clientes selecionados:</b>
        </p>
        {customers.map((customer) => (
          <ClientCard
            key={customer.id}
            id={customer.id}
            name={customer.name}
            salary={customer.salary}
            companyValue={customer.companyValue}
          />
        ))}
      </div>
    </div>
  )
}