import React, { Fragment } from "react";
import Addformheader from "../components/AddCustomers/Addformheader";

import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../../src/routes";
import AdminNav from "../../src/components/Navbars/AdminNavbar";
import CustomeraddServiceLocation from "../components/AddCustomers/CustomeraddServiceLocation";

export default function CustomerServiceLocation() {
  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel">
        <AdminNav />
        <div className="content">
          <div className="addcustomers">
            <CustomeraddServiceLocation />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
