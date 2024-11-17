import { usePaginationContext } from '../context/PaginationContext'
import { generatePagination } from '../helper/generatePagination'
import cn from 'classnames'
import s from './Pagination.module.css'
import { useEffect, useState } from 'react'

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

  return (
    <div className={s.pagination}>
      {isMobile ? (
        <>
          <button
            className={cn(s.pageButton, { [s.hidden]: page === 1 }, s.arrow)}
            onClick={() => setPage(page - 1)}
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
            onClick={() => setPage(page + 1)}
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
            onClick={() => typeof item === 'number' && setPage(item)}
            disabled={item === page || typeof item !== 'number'}
          >
            {item}
          </button>
        ))
      )}
    </div>
  )
}
