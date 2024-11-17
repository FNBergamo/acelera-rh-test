import { useEffect, useState } from 'react'
import { useCustomerContext } from '../context/CustomerContext'
import s from './SelectedCustomersList.module.css'
import { Customer } from '../interfaces/customer'
import { useCustomerApi } from '../hooks/useCustomerApi'
import { CustomerCard } from './CustomerCard'

export function SelectedCustomersList() {
  const { selectedCustomers } = useCustomerContext()
  const { fetchCustomersById } = useCustomerApi()
  const [error, setError] = useState<Error | null>(null)

  console.log(error)

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
          <CustomerCard
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
