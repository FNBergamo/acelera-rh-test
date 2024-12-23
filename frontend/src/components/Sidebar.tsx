import teddyLogo from '../assets/icons/teddy-logo.svg'
import cn from 'classnames'
import s from './Sidebar.module.css'
import customer from '../assets/icons/customer.svg'
import home from '../assets/icons/home.svg'
import products from '../assets/icons/products.svg'
import leftArrow from '../assets/icons/left-arrow.svg'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../constants/routes'

interface SidebarProps {
  readonly isSidebarOpen: boolean
  readonly setSidebarOpen: (open: boolean) => void
}

export function Sidebar({ isSidebarOpen, setSidebarOpen }: SidebarProps) {
  const navigate = useNavigate()

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen)
  }

  return (
    <nav className={cn(s.navbar, { [s.open]: isSidebarOpen })}>
      <div className={s.menu}>
        <div className={s.logoWrapper}>
          <img className={s.logo} src={teddyLogo} alt='Teddy' />
          <button
            onClick={toggleSidebar}
            className={cn(s.arrowButton, { [s.open]: isSidebarOpen })}
          >
            <img className={s.leftArrow} src={leftArrow} alt='Ocultar menu' />
          </button>
        </div>
        <ul>
          <li className={s.menuOption}>
            <button onClick={() => navigate(ROUTES.CUSTOMERS)} className={s.menuButton}>
              <img className={s.menuIcon} src={home} alt='Home' />
              <p>Home</p>
            </button>
          </li>
          <li className={s.menuOption}>
            <button onClick={() => navigate(ROUTES.CUSTOMERS)} className={s.menuButton}>
              <img className={s.menuIcon} src={customer} alt='Clientes' />
              <p>Clientes</p>
            </button>
          </li>
          <li className={s.menuOption}>
            <button onClick={() => navigate(ROUTES.COMING_SOON)} className={s.menuButton}>
              <img className={s.menuIcon} src={products} alt='Produtos' />
              <p>Produtos</p>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}
