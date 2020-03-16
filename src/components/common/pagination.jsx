import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

//extracting passed value from parent inside object props
const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
  const pagesCount = itemsCount / pageSize;
  //if there is one page => hide the pagination
  if (Math.ceil(pagesCount) === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map(page => (
          <li
            onClick={() => onPageChange(page)}
            key={page}
            className={currentPage === page ? "page-item active" : "page-item"}
          >
            <button className="page-link">{page}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
};
export default Pagination;
