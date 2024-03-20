import React, { Fragment } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar";
import { useLocation } from "react-router-dom";
import EditRedingsHeader from "../components/EditReadings/EditRedingsHeader";
import EditReadingsForm from "../components/EditReadings/EditReadingsForm";

export default function EditReadings() {
  const { state } = useLocation();

  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel">
        <AdminNav />
        <div className="content">
          <div className="addcustomers">
            <EditRedingsHeader />

            <div className="row">
              <div className="col-sm-12">
                <EditReadingsForm state={state} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
