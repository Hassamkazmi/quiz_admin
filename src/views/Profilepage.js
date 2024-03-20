import React, { Fragment, useState } from "react";
import Addprofileheader from "../components/Profile/Addprofileheader";
import Profilecomp from "../components/Profile/Profile";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../../src/routes";
import AdminNav from "../../src/components/Navbars/AdminNavbar";

export default function Profilepage() {
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
            <Addprofileheader toggleFields={toggleFields} />
            <Profilecomp isFieldsDisabled={isFieldsDisabled} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}