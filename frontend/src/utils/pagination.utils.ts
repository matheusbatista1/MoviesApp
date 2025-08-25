const calculatePageRange = (currentPage: number, totalPages: number, maxVisiblePages: number = 5) => {
  const halfVisible = Math.floor(maxVisiblePages / 2);
  const startPage = Math.max(1, currentPage - halfVisible);
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  const pageNumbers: number[] = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return pageNumbers;
};

export { calculatePageRange };
