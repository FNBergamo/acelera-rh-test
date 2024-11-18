import { usePaginationContext } from '../context/PaginationContext'
import { generatePagination } from '../helper/generatePagination'
import cn from 'classnames'
import s from './Pagination.module.css'
import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}

export function Pagination() {
  const { page, limit, totalItems, setPage } = usePaginationContext()
  const { width } = useWindowSize()
  const isMobile = width <= 768
  const navigate = useNavigate()
  const location = useLocation()

  function updateUrl(newPage: number) {
    const queryParams = new URLSearchParams(location.search)
    queryParams.set('page', newPage.toString())

    navigate(
      {
        pathname: location.pathname,
        search: queryParams.toString(),
      },
      { replace: true },
    )
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const pageFromUrl = queryParams.get('page')

    if (pageFromUrl && !isNaN(Number(pageFromUrl))) {
      const pageNumber = Number(pageFromUrl)
      if (pageNumber >= 1 && pageNumber <= Math.ceil(totalItems / limit)) {
        setPage(pageNumber)
      }
    }
  }, [location.search, setPage, totalItems, limit])

  function handlePageChange(newPage: number) {
    if (newPage >= 1 && newPage <= Math.ceil(totalItems / limit)) {
      setPage(newPage)
      updateUrl(newPage)
    }
  }

  return (
    <div className={s.pagination}>
      {isMobile ? (
        <>
          <button
            className={cn(s.pageButton, { [s.hidden]: page === 1 }, s.arrow)}
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            {'<'}
          </button>
          <button className={cn(s.pageButton, s.active)} disabled>
            {page}
          </button>
          <button
            className={cn(
              s.pageButton,
              { [s.hidden]: page === Math.ceil(totalItems / limit) },
              s.arrow,
            )}
            onClick={() => handlePageChange(page + 1)}
            disabled={page === Math.ceil(totalItems / limit)}
          >
            {'>'}
          </button>
        </>
      ) : (
        generatePagination(page, Math.ceil(totalItems / limit)).map((item, index) => (
          <button
            key={index}
            className={cn(s.pageButton, { [s.active]: item === page })}
            onClick={() => typeof item === 'number' && handlePageChange(item)}
            disabled={item === page || typeof item !== 'number'}
          >
            {item}
          </button>
        ))
      )}
    </div>
  )
}
