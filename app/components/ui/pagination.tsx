// components/Pagination.tsx
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      <button
        className="px-4 py-2 text-gray-800 page-arrow"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lsaquo;
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className="py-2 px-4 text-gray-800 page-number"
        >
          {page}
        </button>
      ))}

      <button
        className="px-4 py-2 text-gray-800 page-arrow"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &rsaquo;
      </button>
    </div>
  );
}

export default Pagination;
