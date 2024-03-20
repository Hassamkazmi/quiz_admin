
import React from "react";

const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
  TotalPages,
}) => {


  let pagination = [],
    i = 1;
  const totalall = TotalPages;
  while (i <= totalall) {
    if (
      i <= 1 ||
      // eslint-disable-next-line no-mixed-operators
      i >= totalall - 2 ||
      // eslint-disable-next-line no-mixed-operators
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pagination.push(i);
      i++;
    } else {
      pagination.push('...');
      pagination.push();
      i = i < currentPage ? currentPage - 1 : totalall - 2;
    }
  }




  return (
    <nav>
      <ul className="pagination">
        {pagination.map((number) => (
          <li key={number} className="page-item">
            <button
              onClick={() => paginate(number)}
              className={number === currentPage ? "page-item1" : "page-item"}
              disabled={number === "..."}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
