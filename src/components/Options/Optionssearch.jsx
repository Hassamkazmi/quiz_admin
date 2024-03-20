import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CSVLink, CSVDownload } from "react-csv";
import { fetchCustomerCSVData } from "../../redux/Slices/getCSVData";

export default function Customersearch() {

  
  const dispatch = useDispatch();

  const { data: getCustomer, statusdata } = useSelector(
    (state) => state.getCustomer
  );

 

  return (
    <Fragment>
      <div className="row customers">
        <div className="col-sm-5 equipmentssss">
          <h2>
            Option{" "}
            <span className="counts">{getCustomer?.items?.totalCount}</span>
          </h2>
        </div>
        <div className="col-sm-7 right equipmentssss">
         

          {/* <Link to="/addcustomer">
            <button className="bluebtn">Add Question</button>
          </Link> */}
        </div>
      </div>
    </Fragment>
  );
}
