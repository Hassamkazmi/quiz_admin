import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import LabourReportsearch from "../components/LabourReports/LabourRebortsearch";
import LabourReportstable from "../components/LabourReports/LabourServiceReporttable";
import LabourReportsfilter from "../components/LabourReports/LabourReportilter";

import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar";
import LabourReportSkippedsearch from "../components/LabourReportsSkipped/LabourRebortSkippedsearch";
import LabourReportSkippedFilter from "../components/LabourReportsSkipped/LabourReportSkipedfilter";
import LabourReportSkippedTable from "../components/LabourReportsSkipped/LabourReportSkippedtable";

export default function LabourReportsSkipped() {
    return (
        <Fragment>
            <Sidebar routes={routes} />
            <div className="main-panel">
                <AdminNav />
                <div className="content">
                    <Container fluid>
                        <LabourReportSkippedsearch />
                        <LabourReportSkippedFilter />
                        <LabourReportSkippedTable />
                    </Container>
                </div>
            </div>
        </Fragment>
    );
}
