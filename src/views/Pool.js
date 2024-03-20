import React, { useState } from "react";
import { Fragment } from "react";
import Poolheader from "../components/Pool/Poolheader";
import Poolaccordian from "../components/Pool/Poolaccordian";

import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../../src/routes";
import AdminNav from "../../src/components/Navbars/AdminNavbar";

export default function Pool() {
  const [isFieldsDisabled, setIsFieldsDisabled] = useState(true);

  const toggleFields = () => {
    setIsFieldsDisabled((prev) => !prev);
  };

  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel">
        <AdminNav />

        <div className="content">
          <div className="addcustomers">
            <Poolheader toggleFields={toggleFields} />
            <Poolaccordian isFieldsDisabled={isFieldsDisabled} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
