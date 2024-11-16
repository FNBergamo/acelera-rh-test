import { useMemo } from 'react'
import api from '../api/api'
import { CreateCustomerDto, Customer, UpdateCustomerDto } from '../interfaces/customer'

export function useCustomerApi() {
  async function fetchCustomers() {
    return await api.get<Customer[]>('/')
  }

  async function fetchCustomersById(id: number) {
    return await api.get<Customer>(`/${id}`)
  }

  async function createCustomer(customerData: CreateCustomerDto) {
    return await api.post<Customer>('/', customerData)
  }

  async function updateCustomer(id: number, customerData: UpdateCustomerDto) {
    return await api.put<Customer>(`/${id}`, customerData)
  }

  async function deleteCustomer(id: number) {
    return await api.delete(`/${id}`)
  }

  return useMemo(
    () => ({
      fetchCustomers,
      fetchCustomersById,
      createCustomer,
      updateCustomer,
      deleteCustomer,
    }),
    [],
  )
}
