import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

export default function Chemicalsearch() {
  return (
    <Fragment>
      <div className="row customers chemicals">
        <div className="col-sm-5 chemicalDosages">
          <h2>STATS</h2>
        </div>
        <div className="col-sm-7 right chemicalBtns">
          {/* <Link to="/dashboard">
            <button className="bluebtn">Add Chemicals</button>
          </Link>
          <button className="yellowbtn">Delete Chemicals</button> */}
        </div>
      </div>
    </Fragment>
  );
}
