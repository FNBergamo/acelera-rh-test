import teddyLogo from '../assets/icons/teddy-logo.svg'
import burguerMenu from '../assets/icons/burguer-menu.svg'
import cn from 'classnames'
import s from './Header.module.css'
import { useNavigate } from 'react-router-dom'

interface HeaderProps {
  readonly isSidebarOpen: boolean
  readonly setSidebarOpen: (open: boolean) => void
}

export function Header({ isSidebarOpen, setSidebarOpen }: HeaderProps) {
  const navigate = useNavigate()

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen)
  }

  return (
    <header className={s.header}>
      <div className={s.container}>
        <button onClick={toggleSidebar} className={s.buttonWrapper}>
          <img className={s.burguerMenu} src={burguerMenu} alt='Abrir menu' />
        </button>
        <div className={s.container}>
          <img className={cn(s.logo, { [s.hidden]: isSidebarOpen })} src={teddyLogo} alt='Teddy' />
          <nav className={s.menu}>
            <ul>
              <li>
                <button className={s.menuOption} onClick={() => navigate('/wellcome')}>
                  Clientes
                </button>
              </li>
              <li>
                <button className={s.menuOption} onClick={() => navigate('/wellcome')}>
                  Clientes Selecionados
                </button>
              </li>
              <li>
                <button className={s.menuOption} onClick={() => navigate('/wellcome')}>
                  Sair
                </button>
              </li>
            </ul>
          </nav>
          <p className={s.greetings}>Olá, Usuário!</p>
        </div>
      </div>
      <button className={cn(s.menuOption, s.logout)} onClick={() => navigate('/wellcome')}>
        Sair
      </button>
    </header>
  )
}
