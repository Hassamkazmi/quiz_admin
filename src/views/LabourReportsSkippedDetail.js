import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar";
import LabourReportDetailSkipped from "../components/LabourReportDetailSkipped/LabourReportDetailSkipped";
import LabourReportDetailSkippedFilter from "../components/LabourReportDetailSkipped/LabourReportDetailSkippedFilter";
import LabourReportDetailSkippedSearch from "../components/LabourReportDetailSkipped/LabourRebortDetailSkippedsearch";

export default function LabourReportsSkippedDetail() {

    
    return (
        <Fragment>
            <Sidebar routes={routes} />
            <div className="main-panel">
                <AdminNav />
                <div className="content">
                    <Container fluid>
                        <LabourReportDetailSkippedSearch />
                        <LabourReportDetailSkippedFilter />
                        <LabourReportDetailSkipped />
                    </Container>
                </div>
            </div>
        </Fragment>
    );
}
