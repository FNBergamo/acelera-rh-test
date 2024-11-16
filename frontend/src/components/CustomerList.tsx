import { useState } from 'react'
import { ClientCard } from './ClientCard'
import { CreateClientModal } from './CreateClientModal'
import { useCustomerContext } from '../context/CustomerContext'
import s from './CustomerList.module.css'

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
          <ClientCard
            key={customer.id}
            name={customer.name}
            salary={customer.salary}
            companyValue={customer.companyValue}
          />
        ))}
        <button className={s.createClientButton} onClick={() => setIsModalOpen(true)}>
          Criar cliente
        </button>
        <CreateClientModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
  )
}
