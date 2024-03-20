import React, { Fragment } from "react";
import { CSVLink } from "react-csv";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function ShoppingHeader() {
  const { data: getitemNeededData, statusdata } = useSelector(
    (state) => state.getitemNeededData
  );


  const data = getitemNeededData?.items ?  getitemNeededData?.items :  [
    ["firstname", "lastname", "email"],
    ["Ahmed", "Tomi", "ah@smthing.co.com"],
    ["Raed", "Labes", "rl@smthing.co.com"],
    ["Yezzi", "Min l3b", "ymin@cocococo.com"]
  ];


  console.log(statusdata)
  return (
    <Fragment>
      <div className="row customers">
        <div className="col-sm-5 equipmentssss">
          <h2>
            USER LIST <span>  </span>
          </h2>
        </div>
        <div className="col-sm-7 right equipmentssss">
        
        </div>
      </div>
    </Fragment>
  );
}
