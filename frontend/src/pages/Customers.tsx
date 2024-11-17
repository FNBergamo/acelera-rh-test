import { useState } from 'react'
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'
import s from './Customers.module.css'
import { CustomerList } from '../components/CustomerList'

export function Customers() {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false)

  return (
    <div className={s.customers}>
      <Header isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      <CustomerList />
    </div>
  )
}
