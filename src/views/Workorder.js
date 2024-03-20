import React, { Fragment } from 'react'


import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../../src/routes";
import AdminNav from "../../src/components/Navbars/AdminNavbar"
import WorkorderHeader from '../components/Workorder/WorkorderHeader';
import Workorderform from "../components/Workorder/Workorderform";

export default function Workorder() {
  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel works">
        <AdminNav />
        <div className="content">
          <div className="addcustomers">
            <WorkorderHeader />
            <Workorderform />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
