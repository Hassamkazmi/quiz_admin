import React, { Fragment } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar";
import EditDosageForm from "../components/EditDosages/EditDosagesForm";
import EditDosagesheader from "../components/EditDosages/EditDosagesHeader";
import { useLocation } from 'react-router-dom';

export default function EditDosages() {
  const { state } = useLocation();

  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel">
        <AdminNav />
        <div className="content">
          <div className="addcustomers">
            <EditDosagesheader />

            <div className="row">
              <div className="col-sm-12">
                <EditDosageForm state={state} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
