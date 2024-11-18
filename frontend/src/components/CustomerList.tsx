import { useState } from 'react'
import { CustomerCard } from './CustomerCard'
import { CreateCustomerModal } from './Modal/CreateCustomerModal'
import { useCustomerContext } from '../context/CustomerContext'
import s from './CustomerList.module.css'
import { Pagination } from './Pagination'
import { LoadingOverlay } from './LoadingOverlay'

export function CustomerList() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { customers, loading } = useCustomerContext()
  const isListEmpty = customers.length === 0

  if (loading) {
    return <LoadingOverlay show={loading} />
  }

  function renderList() {
    if (isListEmpty) {
      return <p className={s.emptyList}>Nenhum cliente adicionado</p>
    }
    return customers.map((customer) => (
      <CustomerCard
        key={customer.id}
        id={customer.id}
        name={customer.name}
        salary={customer.salary}
        companyValue={customer.companyValue}
      />
    ))
  }

  return (
    <div className={s.customerList}>
      <div className={s.container}>
        <p className={s.totalClients}>
          <b>{customers.length}</b> clientes encontrados:
        </p>
        {renderList()}
        <button className={s.createClientButton} onClick={() => setIsModalOpen(true)}>
          Criar cliente
        </button>
        {!isListEmpty && <Pagination />}
        <CreateCustomerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
  )
}
