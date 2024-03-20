import React, { Fragment } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../../src/routes";
import AdminNav from "../../src/components/Navbars/AdminNavbar";
import EditWorkHeader from "../components/EditWorkOrder/EditWorkHeader";
import EditWorkForm from "../components/EditWorkOrder/EditWorkForm";
import { useLocation } from "react-router-dom";

export default function EditWorkOrder() {
  const { state } = useLocation();

  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel works">
        <AdminNav />
        <div className="content">
          <div className="addcustomers">
            <EditWorkHeader />
            <EditWorkForm state={state} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
