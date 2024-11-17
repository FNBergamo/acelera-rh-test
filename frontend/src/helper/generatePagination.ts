export function generatePagination(page: number, totalPages: number): (number | string)[] {
  const delta = 1
  const range: (number | string)[] = []
  const leftBoundary = Math.max(2, page - delta)
  const rightBoundary = Math.min(totalPages - 1, page + delta)

  range.push(1)

  if (leftBoundary > 2) {
    range.push('...')
  }

  for (let i = leftBoundary; i <= rightBoundary; i++) {
    range.push(i)
  }

  if (rightBoundary < totalPages - 1) {
    range.push('...')
  }

  if (totalPages > 1) {
    range.push(totalPages)
  }

  return range
}
