import { useState } from 'react'
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'
import s from './Home.module.css'
import { CustomerList } from '../components/CustomerList'
import { CustomerProvider } from '../context/CustomerContext'

export function Home() {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false)

  return (
    <div className={s.home}>
      <CustomerProvider>
        <Header isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
        <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
        <CustomerList />
      </CustomerProvider>
    </div>
  )
}
