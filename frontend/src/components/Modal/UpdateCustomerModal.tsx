import { useState, ChangeEvent, useEffect } from 'react'
import { Customer } from '../../interfaces/customer'
import { Modal } from './Modal'
import { useCustomerApi } from '../../hooks/useCustomerApi'
import { useCustomerContext } from '../../context/CustomerContext'
import s from './UpdateCustomerModal.module.css'
import { toast } from 'react-toastify'

interface UpdateCustomerModalProps {
  readonly isOpen: boolean
  readonly onClose: () => void
  readonly id: number
}

export function UpdateCustomerModal({ isOpen, onClose, id }: UpdateCustomerModalProps) {
  const { updateCustomer, fetchCustomersById } = useCustomerApi()
  const { reloadCustomers } = useCustomerContext()
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
      } catch {
        toast.error('Erro ao buscar cliente selecionado')
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
  }

  async function update(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      await updateCustomer(id, customer)
      toast.success('Cliente editado com sucesso!')
    } catch {
      toast.error('Erro ao editar o cliente selecionado')
    } finally {
      reloadCustomers()
      closeModal()
    }
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
