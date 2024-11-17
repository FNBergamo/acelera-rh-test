import { useState, useEffect } from 'react'
import { Customer } from '../../interfaces/customer'
import { Modal } from './Modal'
import { useCustomerApi } from '../../hooks/useCustomerApi'
import { useCustomerContext } from '../../context/CustomerContext'
import s from './DeleteCustomerModal.module.css'

interface DeleteCustomerModalProps {
  readonly isOpen: boolean
  readonly onClose: () => void
  readonly id: number
}

export function DeleteCustomerModal({ isOpen, onClose, id }: DeleteCustomerModalProps) {
  const { deleteCustomer, fetchCustomersById } = useCustomerApi()
  const { reloadCustomers } = useCustomerContext()
  const [loading, setLoading] = useState<boolean>(false)
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
      } finally {
        setLoading(false)
      }
    }
    getCustomer()
  }, [id, fetchCustomersById])

  function closeModal() {
    onClose()
    setError(null)
  }

  async function deleteSelectedCustomer() {
    setLoading(true)
    try {
      await deleteCustomer(id)
    } catch (error) {
      setError(error as Error)
    } finally {
      setLoading(false)
      reloadCustomers()
      closeModal()
    }
  }

  if (loading) {
    return <p>Carregando...</p>
  }

  if (error) {
    return <p>Erro ao deletar o cliente selecionado: {error.message}</p>
  }

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <div className={s.modalContent}>
        <p className={s.title}>Excluir cliente:</p>
        <p>
          Você está prestes a excluir o cliente: <b>{customer.name}</b>
        </p>
        <button className={s.submitButton} onClick={deleteSelectedCustomer}>
          Excluir cliente
        </button>
      </div>
    </Modal>
  )
}
