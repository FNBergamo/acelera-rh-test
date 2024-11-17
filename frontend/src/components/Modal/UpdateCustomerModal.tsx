import { useState, ChangeEvent, useEffect } from 'react'
import { Customer } from '../../interfaces/customer'
import { Modal } from './Modal'
import { useCustomerApi } from '../../hooks/useCustomerApi'
import { useCustomerContext } from '../../context/CustomerContext'
import s from './UpdateCustomerModal.module.css'

interface UpdateCustomerModalProps {
  readonly isOpen: boolean
  readonly onClose: () => void
  readonly id: number
}

export function UpdateCustomerModal({ isOpen, onClose, id }: UpdateCustomerModalProps) {
  const { updateCustomer, fetchCustomersById } = useCustomerApi()
  const { reloadCustomers } = useCustomerContext()
  const [error, setError] = useState<Error | null>(null)
  const [customer, setCustomer] = useState<Customer>({
    id: 0,
    name: '',
    salary: 0,
    companyValue: 0,
  })

  useEffect(() => {
    async function getCustomer() {
      try {
        const response = await fetchCustomersById(id)
        setCustomer(response.data)
      } catch (error) {
        setError(error as Error)
      }
    }
    getCustomer()
  }, [id, fetchCustomersById])

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
  }

  async function update(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      await updateCustomer(id, customer)
    } catch (error) {
      setError(error as Error)
    } finally {
      reloadCustomers()
      closeModal()
    }
  }

  if (error) {
    return <p>Erro ao editar o cliente selecionado: {error.message}</p>
  }

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <div className={s.modalContent}>
        <p className={s.title}>Editar cliente:</p>
        <form className={s.form} onSubmit={update}>
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
              min={0}
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
              min={0}
              value={customer.companyValue}
              onChange={handleInputChange}
            />
          </div>
          <button className={s.submitButton} type='submit'>
            Editar cliente
          </button>
        </form>
      </div>
    </Modal>
  )
}
