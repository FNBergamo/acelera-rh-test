import { useMemo } from 'react'
import api from '../api/api'
import { CreateCustomerDto, Customer, UpdateCustomerDto } from '../interfaces/customer'

export function useCustomerApi() {
  async function fetchCustomers(
    page: number = 1,
    limit: number = 16,
  ): Promise<{ customers: Customer[]; total: number }> {
    const response = await api.get<{ customers: Customer[]; total: number }>(`/`, {
      params: {
        page,
        limit,
      },
    })

    return response.data
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
