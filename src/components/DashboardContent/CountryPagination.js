import React from 'react';
import { Pagination } from 'react-bootstrap';

const CountryPagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPaginationItems = () => {
    return Array.from({ length: totalPages }).map((_, index) => (
      <Pagination.Item
        key={index}
        active={index + 1 === currentPage}
        onClick={() => onPageChange(index + 1)}
      >
        {index + 1}
      </Pagination.Item>
    ));
  };

  return <Pagination>{renderPaginationItems()}</Pagination>;
};

export default CountryPagination;
