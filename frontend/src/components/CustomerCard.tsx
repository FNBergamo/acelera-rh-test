import edit from '../assets/icons/edit.svg'
import trash from '../assets/icons/trash.svg'
import add from '../assets/icons/add.svg'
import remove from '../assets/icons/remove.svg'
import cn from 'classnames'
import s from './CustomerCard.module.css'
import { UpdateCustomerModal } from './Modal/UpdateCustomerModal'
import { useState } from 'react'
import { DeleteCustomerModal } from './Modal/DeleteCustomerModal'
import { useCustomerContext } from '../context/CustomerContext'
import { useLocation } from 'react-router-dom'
import { ROUTES } from '../constants/routes'

interface CustomerCardProps {
  readonly id: number
  readonly name: string
  readonly salary: number
  readonly companyValue: number
}

export function CustomerCard({ id, name, salary, companyValue }: CustomerCardProps) {
  const { pathname } = useLocation()
  const { removeCustomerFromSelection } = useCustomerContext()
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const { selectedCustomers, addCustomerToSelection } = useCustomerContext()
  const isButtonHidden = pathname === ROUTES.SELECTED_CUSTOMERS
  const isAddButtonHidden = selectedCustomers.includes(id) || isButtonHidden
  const removeCard = !selectedCustomers.includes(id) && pathname === ROUTES.SELECTED_CUSTOMERS

  function renderRemoveAndDeleteButton() {
    return !isButtonHidden ? (
      <button onClick={() => setIsDeleteModalOpen(true)}>
        <img className={s.icon} src={trash} alt='Excluir cliente' />
      </button>
    ) : (
      <button onClick={() => removeCustomerFromSelection(id)}>
        <img className={s.icon} src={remove} alt='Remover cliente' />
      </button>
    )
  }

  return (
    <div className={cn(s.customerCard, { [s.remove]: removeCard })}>
      <div className={s.customerInfo}>
        <p className={s.name}>{name}</p>
        <p className={s.salary}>Salário: R${salary}</p>
        <p className={s.company}>Empresa: R${companyValue}</p>
      </div>
      <div className={s.options}>
        <button
          className={cn({ [s.hidden]: isAddButtonHidden })}
          disabled={isButtonHidden}
          onClick={() => addCustomerToSelection(id)}
        >
          <img className={s.add} src={add} alt='Adicionar cliente a lista' />
        </button>
        <button
          className={cn({ [s.hidden]: isButtonHidden })}
          onClick={() => setIsUpdateModalOpen(true)}
        >
          <img className={s.icon} src={edit} alt='Editar informações do cliente' />
        </button>
        {renderRemoveAndDeleteButton()}
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
