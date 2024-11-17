import React, { createContext, useContext, useState, useEffect } from 'react'
import { Customer } from '../interfaces/customer'
import { useCustomerApi } from '../hooks/useCustomerApi'

interface CustomerContextProps {
  username: string
  customers: Customer[]
  selectedCustomers: Customer[]
  loading: boolean
  error: Error | null
  reloadCustomers: () => Promise<void>
  setUsername: React.Dispatch<React.SetStateAction<string>>
  setSelectedCustomers: React.Dispatch<React.SetStateAction<Customer[]>>
  logout: () => void
}

const CustomerContext = createContext<CustomerContextProps | undefined>(undefined)

export const CustomerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState<string>('')
  const [customers, setCustomers] = useState<Customer[]>([])
  const [selectedCustomers, setSelectedCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const { fetchCustomers } = useCustomerApi()

  async function reloadCustomers() {
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

  function logout() {
    setUsername('')
    setSelectedCustomers([])
  }

  useEffect(() => {
    const retrievedObject = JSON.parse(localStorage.getItem('customerInfo') || '{}')
    if (retrievedObject?.username) {
      setUsername(retrievedObject.username)
      setSelectedCustomers(retrievedObject.selectedCustomers)
    }
  }, [])

  useEffect(() => {
    reloadCustomers()
  }, [fetchCustomers])

  useEffect(() => {
    localStorage.setItem('customerInfo', JSON.stringify({ username, selectedCustomers }))
  }, [username, selectedCustomers])

  return (
    <CustomerContext.Provider
      value={{
        username,
        customers,
        selectedCustomers,
        loading,
        error,
        reloadCustomers,
        setUsername,
        setSelectedCustomers,
        logout,
      }}
    >
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
