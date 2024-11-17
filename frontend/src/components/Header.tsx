import teddyLogo from '../assets/icons/teddy-logo.svg'
import burguerMenu from '../assets/icons/burguer-menu.svg'
import cn from 'classnames'
import s from './Header.module.css'
import { useNavigate } from 'react-router-dom'
import { useCustomerContext } from '../context/CustomerContext'
import { ROUTES } from '../constants/routes'

interface HeaderProps {
  readonly isSidebarOpen: boolean
  readonly setSidebarOpen: (open: boolean) => void
}

export function Header({ isSidebarOpen, setSidebarOpen }: HeaderProps) {
  const navigate = useNavigate()
  const { username, logout } = useCustomerContext()

  function logoutUser() {
    navigate(ROUTES.WELLCOME)
    logout()
  }

  function toggleSidebar() {
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
                <button className={s.menuOption} onClick={() => navigate(ROUTES.CUSTOMERS)}>
                  Clientes
                </button>
              </li>
              <li>
                <button
                  className={s.menuOption}
                  onClick={() => navigate(ROUTES.SELECTED_CUSTOMERS)}
                >
                  Clientes Selecionados
                </button>
              </li>
              <li>
                <button className={s.menuOption} onClick={logoutUser}>
                  Sair
                </button>
              </li>
            </ul>
          </nav>
          <p className={s.greetings}>
            Olá, <b>{username}</b>!
          </p>
        </div>
      </div>
      <button className={cn(s.menuOption, s.logout)} onClick={logoutUser}>
        Sair
      </button>
    </header>
  )
}
