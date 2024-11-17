import React, { createContext, useContext, useState } from 'react'

interface PaginationContextProps {
  page: number
  limit: number
  totalItems: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  setLimit: React.Dispatch<React.SetStateAction<number>>
  setTotalItems: React.Dispatch<React.SetStateAction<number>>
}

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 16

const PaginationContext = createContext<PaginationContextProps | undefined>(undefined)

export const PaginationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [page, setPage] = useState(DEFAULT_PAGE)
  const [limit, setLimit] = useState(DEFAULT_LIMIT)
  const [totalItems, setTotalItems] = useState(0)

  return (
    <PaginationContext.Provider
      value={{
        page,
        limit,
        totalItems,
        setPage,
        setLimit,
        setTotalItems,
      }}
    >
      {children}
    </PaginationContext.Provider>
  )
}

export const usePaginationContext = () => {
  const context = useContext(PaginationContext)
  if (!context) {
    throw new Error('usePaginationContext deve ser usado dentro de PaginationProvider')
  }
  return context
}
