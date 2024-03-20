import React, { Fragment } from "react";

import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar";
import ThemeSettingHeader from "../components/ThemeSetting/ThemeSettingHeader";
import ThemeSetting from "../components/ThemeSetting/ThemeSetting";

export default function AddChecklist() {
  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel">
        <AdminNav />
        <div className="content">
          
          <div className="addcustomers">
            <div className="row cslocation">
          <ThemeSettingHeader />  
              <div className="col-sm-12">
                <ThemeSetting />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
