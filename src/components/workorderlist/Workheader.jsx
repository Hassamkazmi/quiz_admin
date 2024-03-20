import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

function Workheader() {
  return (
    <Fragment>
      <div className="row customers">
        <div className="col-sm-5 equipmentssss">
          <h2>Work Order</h2>
        </div>
        <div className="col-sm-7 right equipmentssss">
          <Link to="/add-work-order">
            <button className="bluebtn equipmentssssblue">Add Another</button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
}

export default Workheader;
