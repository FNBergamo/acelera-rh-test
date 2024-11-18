import React, { createContext, useContext, useState, useEffect } from 'react'
import { Customer } from '../interfaces/customer'
import { useCustomerApi } from '../hooks/useCustomerApi'
import { usePaginationContext } from './PaginationContext'
import { toast } from 'react-toastify'

interface CustomerContextProps {
  username: string
  customers: Customer[]
  selectedCustomers: number[]
  loading: boolean
  error: Error | null
  reloadCustomers: () => Promise<void>
  addCustomerToSelection: (id: number) => void
  removeCustomerFromSelection: (id: number) => void
  setUsername: React.Dispatch<React.SetStateAction<string>>
  setSelectedCustomers: React.Dispatch<React.SetStateAction<number[]>>
  logout: () => void
}

const CustomerContext = createContext<CustomerContextProps | undefined>(undefined)

export function CustomerProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState<string>('')
  const [customers, setCustomers] = useState<Customer[]>([])
  const [selectedCustomers, setSelectedCustomers] = useState<number[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const { fetchCustomers } = useCustomerApi()
  const { page, limit, setPage, setLimit, setTotalItems } = usePaginationContext()

  useEffect(() => {
    setLoading(true)
    const retrievedObject = JSON.parse(localStorage.getItem('customerInfo') || '{}')
    if (retrievedObject?.username) {
      setUsername(retrievedObject.username)
      setSelectedCustomers(retrievedObject.selectedCustomers)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    reloadCustomers()
  }, [fetchCustomers, page, limit, selectedCustomers])

  useEffect(() => {
    localStorage.setItem('customerInfo', JSON.stringify({ username, selectedCustomers }))
  }, [username, selectedCustomers])

  async function reloadCustomers() {
    setLoading(true)
    try {
      const result = await fetchCustomers(page, limit)
      setCustomers(result?.customers || [])
      setTotalItems(result?.total || 0)
    } catch (err) {
      setError(err as Error)
      toast.error('Erro ao buscar clientes')
    } finally {
      setLoading(false)
    }
  }

  function logout() {
    setUsername('')
    setSelectedCustomers([])
    setPage(1)
    setLimit(16)
  }

  function addCustomerToSelection(customerId: number) {
    setSelectedCustomers((prevSelected) => {
      if (prevSelected.some((id) => id === customerId)) {
        return prevSelected
      }
      return [...prevSelected, customerId]
    })
  }

  function removeCustomerFromSelection(customerId: number) {
    setSelectedCustomers((prevSelected) => prevSelected.filter((id) => id !== customerId))
  }

  return (
    <CustomerContext.Provider
      value={{
        username,
        customers,
        selectedCustomers,
        loading,
        error,
        setUsername,
        setSelectedCustomers,
        reloadCustomers,
        addCustomerToSelection,
        removeCustomerFromSelection,
        logout,
      }}
    >
      {children}
    </CustomerContext.Provider>
  )
}

export function useCustomerContext() {
  const context = useContext(CustomerContext)
  if (!context) {
    throw new Error('useCustomerContext deve ser usado dentro de CustomerProvider')
  }
  return context
}
