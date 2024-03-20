import React, { Fragment } from "react";

import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar";
import EditWorkTypeHeader from "../components/EditWorkOrderType/EditWorkTypeHeader";
import EditWorkTypeForm from "../components/EditWorkOrderType/EditWorkTypeForm";
import { useLocation } from "react-router-dom";

export default function EditWorkType() {
  const { state } = useLocation();

  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel works">
        <AdminNav />
        <div className="content">
          <EditWorkTypeHeader />
          <div className="addcustomers">
            <EditWorkTypeForm state={state} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
