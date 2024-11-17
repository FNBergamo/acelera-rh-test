import { useState, ChangeEvent } from 'react'
import { CreateCustomerDto } from '../../interfaces/customer'
import { Modal } from './Modal'
import { useCustomerApi } from '../../hooks/useCustomerApi'
import { useCustomerContext } from '../../context/CustomerContext'
import s from './CreateCustomerModal.module.css'

interface CreateCustomerModalProps {
  readonly isOpen: boolean
  readonly onClose: () => void
}

export function CreateCustomerModal({ isOpen, onClose }: CreateCustomerModalProps) {
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

  function closeModal() {
    onClose()
    setError(null)
    setCustomer({
      name: '',
      salary: 0,
      companyValue: 0,
    })
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
      closeModal()
    }
  }

  if (loading) {
    return <p>Carregando...</p>
  }

  if (error) {
    return <p>Erro ao carregar os clientes: {error.message}</p>
  }

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <div className={s.modalContent}>
        <p className={s.title}>Criar cliente:</p>
        <form className={s.form} onSubmit={createNewCustomer}>
          <div className={s.inputWrapper}>
            <input
              className={s.input}
              type='text'
              placeholder='Nome'
              name='name'
              value={customer.name}
              onChange={handleInputChange}
            />
          </div>
          <div className={s.inputWrapper}>
            <span className={s.inputPrefix}>R$</span>
            <input
              className={s.input}
              type='number'
              placeholder='Salário'
              name='salary'
              value={customer.salary}
              onChange={handleInputChange}
            />
          </div>
          <div className={s.inputWrapper}>
            <span className={s.inputPrefix}>R$</span>
            <input
              className={s.input}
              type='number'
              placeholder='Valor da empresa'
              name='companyValue'
              value={customer.companyValue}
              onChange={handleInputChange}
            />
          </div>
          <button className={s.submitButton} type='submit'>
            Criar cliente
          </button>
        </form>
      </div>
    </Modal>
  )
}
