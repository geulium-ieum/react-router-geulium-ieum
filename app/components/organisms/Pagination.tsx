import { Button } from "../ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "../ui/pagination";

// components/Pagination.tsx
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function CustomPagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className="px-4 py-2 text-gray-800 page-arrow"
              onClick={() => onPageChange(currentPage - 1)}
              // disabled={currentPage === 1}
              // variant="ghost"
            >
              &lsaquo;
            </PaginationPrevious>
          </PaginationItem>

          {pageNumbers.map((page) => (
            <Button
              key={page}
              onClick={() => onPageChange(page)}
              variant="ghost"
              className="py-2 px-4 text-gray-800 page-number"
            >
              {page}
            </Button>
          ))}
          <PaginationItem>
            <PaginationNext
              className="px-4 py-2 text-gray-800 page-arrow"
              onClick={() => onPageChange(currentPage + 1)}
            >
              &rsaquo;
            </PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
