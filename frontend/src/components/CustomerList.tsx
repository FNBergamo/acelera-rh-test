import { useState } from 'react'
import { CustomerCard } from './CustomerCard'
import { CreateCustomerModal } from './Modal/CreateCustomerModal'
import { useCustomerContext } from '../context/CustomerContext'
import s from './CustomerList.module.css'
import { Pagination } from './Pagination'

export function CustomerList() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { customers } = useCustomerContext()

  return (
    <div className={s.customerList}>
      <div className={s.container}>
        <p className={s.totalClients}>
          <b>{customers.length}</b> clientes encontrados:
        </p>
        {customers.map((customer) => (
          <CustomerCard
            key={customer.id}
            id={customer.id}
            name={customer.name}
            salary={customer.salary}
            companyValue={customer.companyValue}
          />
        ))}
        <button className={s.createClientButton} onClick={() => setIsModalOpen(true)}>
          Criar cliente
        </button>
        <Pagination />
        <CreateCustomerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
  )
}
