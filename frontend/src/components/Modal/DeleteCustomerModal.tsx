import { useState, useEffect } from 'react'
import { Customer } from '../../interfaces/customer'
import { Modal } from './Modal'
import { useCustomerApi } from '../../hooks/useCustomerApi'
import { useCustomerContext } from '../../context/CustomerContext'
import s from './DeleteCustomerModal.module.css'
import { toast } from 'react-toastify'

interface DeleteCustomerModalProps {
  readonly isOpen: boolean
  readonly onClose: () => void
  readonly id: number
}

export function DeleteCustomerModal({ isOpen, onClose, id }: DeleteCustomerModalProps) {
  const { deleteCustomer, fetchCustomersById } = useCustomerApi()
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

  function closeModal() {
    onClose()
  }

  async function deleteSelectedCustomer() {
    try {
      await deleteCustomer(id)
      toast.success('Cliente deletado com sucesso!')
    } catch {
      toast.error('Erro ao deletar cliente')
    } finally {
      reloadCustomers()
      closeModal()
    }
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
