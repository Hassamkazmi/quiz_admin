import React from "react";
import { Fragment } from "react";
import { CSVLink } from "react-csv";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchWorkOrderTypeCSVData } from "../../redux/Slices/getCSVData";

export default function WorkOrderTypeHeader() {
  const dispatch = useDispatch();
  const { data: getCSVData, isloading } = useSelector(
    (state) => state.getCSVData
  );

  const getCSVFunction = async () => {
    // Fetch CSV data when the "Export" button is clicked
    await dispatch(fetchWorkOrderTypeCSVData());
  };
  console.log(getCSVData, "<======data");
  return (
    <Fragment>
      <div className="row customers">
        <div className="col-sm-5 equipmentssss woth">
          <h2>
            WORK ORDER TYPE <span className="counts">23323</span>
          </h2>
        </div>
        <div className="col-sm-7 right equipmentssss wot">
          <button className="yellowbtn">
            {/* Render CSVLink with onClick event */}
            <CSVLink data={getCSVData} onClick={() => getCSVFunction()}>
              Export
            </CSVLink>
          </button>
          <Link to="/add-work-order-type">
            <button className="bluebtn">Add WORK ORDER TYPE</button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
}
