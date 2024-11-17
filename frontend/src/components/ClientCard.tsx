import edit from '../assets/icons/edit.svg'
import trash from '../assets/icons/trash.svg'
import add from '../assets/icons/add.svg'

import s from './ClientCard.module.css'
import { UpdateCustomerModal } from './Modal/UpdateCustomerModal'
import { useState } from 'react'
import { DeleteCustomerModal } from './Modal/DeleteCustomerModal'

interface ClientCardProps {
  readonly id: number
  readonly name: string
  readonly salary: number
  readonly companyValue: number
}

export function ClientCard({ id, name, salary, companyValue }: ClientCardProps) {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  return (
    <div className={s.clientCard}>
      <div className={s.clientInfo}>
        <p className={s.name}>{name}</p>
        <p className={s.salary}>Salário: R${salary}</p>
        <p className={s.company}>Empresa: R${companyValue}</p>
      </div>
      <div className={s.options}>
        <button>
          <img className={s.add} src={add} alt='Adicionar cliente a lista' />
        </button>
        <button onClick={() => setIsUpdateModalOpen(true)}>
          <img className={s.icon} src={edit} alt='Editar informações do cliente' />
        </button>
        <button onClick={() => setIsDeleteModalOpen(true)}>
          <img className={s.icon} src={trash} alt='Excluir cliente' />
        </button>
      </div>
      <UpdateCustomerModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        id={id}
      />
      <DeleteCustomerModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        id={id}
      />
    </div>
  )
}
