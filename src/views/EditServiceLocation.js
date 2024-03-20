import React, { Fragment } from 'react'
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../../src/routes";
import AdminNav from "../../src/components/Navbars/AdminNavbar"
import ProfServicelocation from '../components/Profile/ProfServicelocation';

export default function EditServiceLocation() {
  return (
    <Fragment>
      <Sidebar routes={routes} />

      <div className="main-panel">
        <AdminNav />
        <div className="content">
          <div className="addcustomers">
            <ProfServicelocation />
          </div>
        </div>
      </div>
    </Fragment>
  );
}