import { useState } from 'react'
import { CustomerCard } from './CustomerCard'
import { CreateCustomerModal } from './Modal/CreateCustomerModal'
import { useCustomerContext } from '../context/CustomerContext'
import s from './CustomerList.module.css'
import { Pagination } from './Pagination'
import { LoadingOverlay } from './LoadingOverlay'
import { usePaginationContext } from '../context/PaginationContext'

export function CustomerList() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { customers, loading } = useCustomerContext()
  const { limit, setLimit } = usePaginationContext()
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

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setLimit(Number(event.target.value))
  }

  return (
    <div className={s.customerList}>
      <div className={s.container}>
        <div className={s.infoSection}>
          <p className={s.totalClients}>
            <b>{customers.length}</b> clientes encontrados:
          </p>
          <div className={s.selectWrapper}>
            <label htmlFor='customersPerPage'>Clientes por página:</label>
            <select
              name='customersPerPage'
              className={s.select}
              onChange={handleSelectChange}
              value={limit}
            >
              <option value='8'>8</option>
              <option value='16'>16</option>
              <option value='24'>24</option>
              <option value='32'>32</option>
              <option value='40'>40</option>
            </select>
          </div>
        </div>
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
