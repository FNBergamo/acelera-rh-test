import { useState } from 'react'
import { ClientCard } from './ClientCard'
import { CreateCustomerModal } from './Modal/CreateCustomerModal'
import { useCustomerContext } from '../context/CustomerContext'
import { usePaginationContext } from '../context/PaginationContext'
import { generatePagination } from '../helper/generatePagination'
import cn from 'classnames'
import s from './CustomerList.module.css'

export function CustomerList() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { customers } = useCustomerContext()
  const { page, limit, totalItems, setPage } = usePaginationContext()

  return (
    <div className={s.customerList}>
      <div className={s.container}>
        <p className={s.totalClients}>
          <b>{customers.length}</b> clientes encontrados:
        </p>
        {customers.map((customer) => (
          <ClientCard
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
        <div className={s.pagination}>
          {generatePagination(page, Math.ceil(totalItems / limit)).map((item, index) => (
            <button
              key={index}
              className={cn(s.pageButton, { [s.active]: item === page })}
              onClick={() => typeof item === 'number' && setPage(item)}
              disabled={item === page || typeof item !== 'number'}
            >
              {item}
            </button>
          ))}
        </div>
        <CreateCustomerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
  )
}
