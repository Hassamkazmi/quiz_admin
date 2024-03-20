import React from "react";
import { Fragment } from "react";
import { CSVLink } from "react-csv";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUserCSVData } from "../../redux/Slices/getCSVData";
import { useDispatch } from "react-redux";

export default function CheckListHeader() {
  const dispatch = useDispatch();
  const { data: getCSVData, isloading } = useSelector(
    (state) => state.getCSVData
  );

  const data = getCSVData ? getCSVData : [];

  const getCSVFunction = async () => {
    await dispatch(fetchUserCSVData());
  };
  console.log(data, "<=====data");

  return (
    <Fragment>
      <div className="row customers">
        <div className="col-sm-5 equipmentssss">
          <h2>User Listing</h2>
        </div>
        <div className="col-sm-7 right equipmentssss">
          <button className="yellowbtn">
            <CSVLink data={data} onClick={() => getCSVFunction()}>
              Export
            </CSVLink>
          </button>
          <Link to="/add-user">
            <button className="bluebtn">Add New</button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
}
