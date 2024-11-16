import React, { createContext, useContext, useState, useEffect } from 'react'
import { Customer } from '../interfaces/customer'
import { useCustomerApi } from '../hooks/useCustomerApi'

interface CustomerContextProps {
  customers: Customer[]
  loading: boolean
  error: Error | null
  reloadCustomers: () => Promise<void>
}

const CustomerContext = createContext<CustomerContextProps | undefined>(undefined)

export const CustomerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const { fetchCustomers } = useCustomerApi()

  const reloadCustomers = async () => {
    setLoading(true)
    try {
      const result = await fetchCustomers()
      setCustomers(result?.data || [])
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    reloadCustomers()
  }, [fetchCustomers])

  return (
    <CustomerContext.Provider value={{ customers, loading, error, reloadCustomers }}>
      {children}
    </CustomerContext.Provider>
  )
}

export const useCustomerContext = () => {
  const context = useContext(CustomerContext)
  if (!context) {
    throw new Error('useCustomerContext deve ser usado dentro de CustomerProvider')
  }
  return context
}
