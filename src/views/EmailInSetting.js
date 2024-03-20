import React, { Fragment } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar";
import EmailHeaders from "../components/EmailInSetting/EmailHeaders";

export default function EmailInSetting() {
  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel">
        <AdminNav />
        <div className="content">
          <div className="addcustomers smsHeader">
            <EmailHeaders />
            <div className="row">
              <div className="col-sm-12">{/* <AccountData /> */}</div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
