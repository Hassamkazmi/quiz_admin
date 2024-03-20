import React, { Fragment } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import AdminNav from "../../src/components/Navbars/AdminNavbar"
import routes from "../../src/routes";
import { GeneralSettingSubHeader } from "../components/GeneralSetting/GeneralSettingSubHeader";
import GeneralSettingHeader from "../components/GeneralSetting/GeneralSettingHeader";

export default function GeneralSetting()
{
    return(
        <Fragment>
            <Sidebar routes={routes} />
            <div className="main-panel">
                <AdminNav />
                <div className="content">
                    <GeneralSettingHeader />
                    <div className="addcustomers">
                        <GeneralSettingSubHeader />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}