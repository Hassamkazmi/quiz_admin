import React, { Fragment, useEffect } from "react";
import { Container } from "react-bootstrap";
import LabourReportsearch from "../components/LabourReports/LabourRebortsearch.jsx";
import LabourReportstable from "../components/LabourReports/LabourServiceReporttable.jsx";
import LabourReportsfilter from "../components/LabourReports/LabourReportilter.jsx";
import LabourWorkOrderfilter from "../components/LabourReports/LabourWorkorderfilter.jsx";
import LabourSkippedfilter from "../components/LabourReports/LabourSkippedfilter.jsx";
import Sidebar from "../components/Sidebar/Sidebar.js";
import routes from "../routes.js";
import AdminNav from "../components/Navbars/AdminNavbar.js";
import { useState } from "react";
import SkippedTable from "../components/LabourReports/SkippedTable.jsx";
import WorkOrderTable from "../components/LabourReports/WorkOrderTable.jsx";
import WorkOrderHeader from "../components/LabourReports/WorkOrderHeader.jsx";
import { useSelector } from "react-redux";


export default function LabourReports() {
  const [value, setValue] = useState("Service");

  const {data:labourReport } = useSelector((state) => state.labourReport)
  const {data:workorderReport } = useSelector((state) => state.workorderReport)
  const {data:skippedStopReport } = useSelector((state) => state.skippedStopReport)

  

  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel">
        <AdminNav />
        <div className="content">
          <Container fluid>
            <LabourReportsearch />
            
            <LabourSkippedfilter setValue={setValue} />
              <SkippedTable data={skippedStopReport}/>
          </Container>
        </div>
      </div>
    </Fragment>
  );
}
