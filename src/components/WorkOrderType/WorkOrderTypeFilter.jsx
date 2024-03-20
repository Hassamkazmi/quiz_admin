import React, { useState } from "react";
import { useEffect } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchgetWorkOrderType } from "../../redux/Slices/getWorkOrderType";

export default function WorkOrderTypeFilter() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchgetWorkOrderType({ name }));

    setName("");
  };

  return (
    <Fragment>
      <form className="myfilters workOrderType" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for Name"
          name="name"
          onChange={(e) => setName(e.target.value)}
        />

        <button type="submit">
          {" "}
          <i className="fa fa-search" aria-hidden="true" />
        </button>
      </form>
    </Fragment>
  );
}
