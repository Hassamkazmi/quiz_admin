import React, { useState } from "react";
import { Fragment } from "react";
import { fetchTechnician } from "../../redux/Slices/GetTechnician";
import { useDispatch } from "react-redux";

export default function CheckListFilter() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [status, setstatus] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchTechnician({ name, email, status, currentPage }));
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-sm-12">
          <form onSubmit={handleSearch} className="myfilters userFilter">
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Search for Name"
              className="simpleInput"
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Search for Email"
              className="emailInput"
            />
            <select
              className="form-select form-select-sm select2 selectNext"
              onChange={(e) => setstatus(e.target.value)}
              aria-label=".form-select-sm example"
            >
              <option selected value="">
                User Type
              </option>
              <option value="Admin">Admin</option>
              <option value="Technician">Technician</option>
            </select>
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
