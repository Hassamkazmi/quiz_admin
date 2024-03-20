import React, { Fragment } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../../src/routes";
import AdminNav from "../../src/components/Navbars/AdminNavbar";
import AddDosageForm from "../components/AddDosages/AddDosagesForm";
import AddDosagesheader from "../components/AddDosages/AddDosagesHeader";

export default function AddDosages() {
  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel">
        <AdminNav />
        <div className="content">
          <div className="addcustomers">
            <AddDosagesheader />

            <div className="row">
              <div className="col-sm-12">
                <AddDosageForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
