import { useState, ChangeEvent } from 'react'
import { CreateCustomerDto } from '../../interfaces/customer'
import { Modal } from './Modal'
import { useCustomerApi } from '../../hooks/useCustomerApi'
import { useCustomerContext } from '../../context/CustomerContext'
import s from './CreateCustomerModal.module.css'
import { toast } from 'react-toastify'

const MAX_VALUE = 9999999999999.99

interface CreateCustomerModalProps {
  readonly isOpen: boolean
  readonly onClose: () => void
}

export function CreateCustomerModal({ isOpen, onClose }: CreateCustomerModalProps) {
  const { createCustomer } = useCustomerApi()
  const { reloadCustomers } = useCustomerContext()

  const [customer, setCustomer] = useState<CreateCustomerDto>({
    name: '',
    salary: 0,
    companyValue: 0,
  })

  const isButtonDisabled = Object.values(customer).some((value) => !value)

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target

    if (name === 'salary' || name === 'companyValue') {
      if (parseFloat(value) > MAX_VALUE) {
        toast.error(`Valor máximo permitido é R$ ${MAX_VALUE.toLocaleString()}`)
        return
      }

      setCustomer((prevCustomer) => ({
        ...prevCustomer,
        [name]: value,
      }))
    } else {
      setCustomer((prevCustomer) => ({
        ...prevCustomer,
        [name]: value,
      }))
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    const { name, value } = e.target

    if (name === 'salary' || name === 'companyValue') {
      const formattedValue = value ? parseFloat(value).toFixed(2) : ''
      setCustomer((prevCustomer) => ({
        ...prevCustomer,
        [name]: formattedValue,
      }))
    }
  }

  function closeModal() {
    onClose()
    setCustomer({
      name: '',
      salary: 0,
      companyValue: 0,
    })
  }

  async function createNewCustomer(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      await createCustomer(customer)
      toast.success('Cliente criado com sucesso!')
    } catch {
      toast.error('Erro ao criar cliente')
    } finally {
      reloadCustomers()
      closeModal()
    }
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
              required
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
              step='0.01'
              value={customer.salary}
              required
              onChange={handleInputChange}
              onBlur={handleBlur}
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
              step='0.01'
              value={customer.companyValue}
              required
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
          </div>
          <button className={s.submitButton} type='submit' disabled={isButtonDisabled}>
            Criar cliente
          </button>
        </form>
      </div>
    </Modal>
  )
}
