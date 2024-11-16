import edit from '../assets/icons/edit.svg'
import trash from '../assets/icons/trash.svg'
import add from '../assets/icons/add.svg'

import s from './ClientCard.module.css'

interface ClientCardProps {
  readonly name: string
  readonly salary: number
  readonly companyValue: number
}

export function ClientCard({ name, salary, companyValue }: ClientCardProps) {
  return (
    <div className={s.clientCard}>
      <div className={s.clientInfo}>
        <p className={s.name}>{name}</p>
        <p className={s.salary}>Salário: {salary}</p>
        <p className={s.company}>Empresa: {companyValue}</p>
      </div>
      <div className={s.options}>
        <button>
          <img className={s.add} src={add} alt='Adicionar cliente a lista' />
        </button>
        <button>
          <img className={s.icon} src={edit} alt='Editar informações do cliente' />
        </button>
        <button>
          <img className={s.icon} src={trash} alt='Excluir cliente' />
        </button>
      </div>
    </div>
  )
}
