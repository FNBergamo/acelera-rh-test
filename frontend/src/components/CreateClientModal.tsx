import { useState, ChangeEvent } from 'react'
import { CreateCustomerDto } from '../interfaces/customer'
import { Modal } from './Modal'
import { useCustomerApi } from '../hooks/useCustomerApi'
import { useCustomerContext } from '../context/CustomerContext'
import s from './CreateClientModal.module.css'

interface CreateClientModalProps {
  readonly isOpen: boolean
  readonly onClose: () => void
}

export function CreateClientModal({ isOpen, onClose }: CreateClientModalProps) {
  const { createCustomer, fetchCustomers } = useCustomerApi()
  const { reloadCustomers } = useCustomerContext()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const [customer, setCustomer] = useState<CreateCustomerDto>({
    name: '',
    salary: 0,
    companyValue: 0,
  })

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }))
  }

  async function createNewCustomer(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    try {
      await createCustomer(customer)
    } catch (error) {
      setError(error as Error)
    } finally {
      await fetchCustomers()
      setLoading(false)
      reloadCustomers()
      onClose()
    }
  }

  if (loading) {
    return <p>Carregando...</p>
  }

  if (error) {
    return <p>Erro ao carregar os clientes: {error.message}</p>
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={s.modalContent}>
        <p>Criar cliente:</p>
        <form onSubmit={createNewCustomer}>
          <input
            type='text'
            placeholder='Nome'
            name='name'
            value={customer.name}
            onChange={handleInputChange}
          />
          <input
            type='number'
            placeholder='Salário'
            name='salary'
            value={customer.salary}
            onChange={handleInputChange}
          />
          <input
            type='number'
            placeholder='Valor da empresa'
            name='companyValue'
            value={customer.companyValue}
            onChange={handleInputChange}
          />
          <button type='submit'>Criar cliente</button>
        </form>
      </div>
    </Modal>
  )
}
