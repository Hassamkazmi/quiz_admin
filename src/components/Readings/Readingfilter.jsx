import React, { useState } from "react";
import { Fragment } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { fetchgetAllreading } from "../../redux/Slices/getAllReading";
export default function Readingfilter() {
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchgetAllreading({ name }));
  };

  

  return (
    <Fragment>
      <div className="row">
        <div className="col-sm-12 equipmentssss">
          <form
            className="myfilters tableFilters grayFilters equipment"
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
