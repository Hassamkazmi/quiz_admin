import React, { useState } from "react";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { fetchgetitemNeededShoping } from "../../redux/Slices/getItemNeeded";

export default function ShoppingFilter() {
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchgetitemNeededShoping({ name }));

  };
  return (
    <Fragment>
      <div className="row">
        <div className="col-sm-12 equipmentssss">
          <form
            className="myfilters tableFilters grayFilters"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Search By Name"
              onChange={(e) => setName(e.target.value)}
            />
            <button type="submit">
              {" "}
              <i className="fa fa-search" aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
