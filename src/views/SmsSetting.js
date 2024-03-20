import React, { Fragment } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar";
import SmsHeader from "../components/SmsSetting/SmsHeader";

export default function SmsSetting() {
  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel">
        <AdminNav />
        <div className="content">
          <div className="addcustomers smsHeader">
            <SmsHeader />
            <div className="row">
              <div className="col-sm-12">{/* <AccountData /> */}</div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
