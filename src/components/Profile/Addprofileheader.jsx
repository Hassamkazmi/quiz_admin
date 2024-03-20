import React, { useState } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";


export default function Addprofileheader({toggleFields }) {
  

  return (
    <Fragment>
      <div className="row customers">
        <div className="col-sm-5 ">
          <h2>Customers Info</h2>
        </div>
        <div className="col-sm-7 right">
        {/* <button onClick={handleShow} className="bluebtn">
              Add Tags
            </button> */}
          <button onClick={toggleFields} className="bluebtn">Edit</button>

        </div>
      </div>

    

    </Fragment>
  );
}
