import { useState } from 'react'
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'
import s from './SelectedCustomers.module.css'
import { SelectedCustomersList } from '../components/SelectedCustomersList'

export function SelectedCustomers() {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false)

  return (
    <div className={s.selectedCustomers}>
      <Header isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      <SelectedCustomersList />
    </div>
  )
}
