import React from 'react';
import { usePermissions } from '../../../hooks/usePermissions';
import './PaginatedTable.css';
import PropTypes from 'prop-types';

function PaginatedTable({ columns, data, currentPage, totalPages, onPageChange }) {
  const permissions = usePermissions();

  if (!data || data.length === 0) {
    return (
      <div className="empty-state">
        <i className="fas fa-users-slash"></i>
        <h3>No Users Found</h3>
        <p>There are no users to display at the moment.</p>
        {permissions.canCreate && (
          <button className="btn-create">
            <i className="fas fa-plus"></i>
            Add First User
          </button>
        )}
      </div>
    );
  }

  return (
    <div role="region" aria-label="Users table" className="table-container">
      <div className="desktop-table">
        <div className="table-responsive">
          <table role="grid">
            <thead>
              <tr>
                {columns.map(column => (
                  <th key={column.key} scope="col">{column.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map(row => (
                <tr key={row.id}>
                  {columns.map(column => (
                    <td key={`${row.id}-${column.key}`}>
                      {column.render ? column.render(row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <nav role="navigation" aria-label="Pagination" className="pagination">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <i className="fas fa-chevron-left" aria-hidden="true"></i>
          Previous
        </button>
        <span aria-current="page">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          Next
          <i className="fas fa-chevron-right" aria-hidden="true"></i>
        </button>
      </nav>
    </div>
  );
}

PaginatedTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      render: PropTypes.func
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

PaginatedTable.defaultProps = {
  currentPage: 1,
  totalPages: 1
};

export default PaginatedTable;