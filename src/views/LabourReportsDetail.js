import React, { Fragment, useEffect, useState } from "react";
import { Container } from "react-bootstrap";


import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar";
import LabourReportDetailSearch from "../components/LabourReportDetail/LabourRebortDetailsearch";
import LabourReportDetailFilter from "../components/LabourReportDetail/LabourReportDetailFilter";
import LabourReportDetail from "../components/LabourReportDetail/LabourReportDetail";
import {fetchlabourReportByID} from "../redux/Slices/getlabourReportSlice"
import { useDispatch } from "react-redux";
import useSelection from "antd/es/table/hooks/useSelection";
import { useParams } from "react-router-dom";
import moment from "moment";
import WorkOrderHeaderSummary from "../components/LabourReports/WorkOrderSummaryTechWiseHeader";


export default function LabourReportsDetail() {

   

    return (
        <Fragment>
            <Sidebar routes={routes} />
            <div className="main-panel">
                <AdminNav />
                <div className="content">
                    <Container fluid>
                        <LabourReportDetailSearch />
                        <LabourReportDetailFilter />
                        <WorkOrderHeaderSummary />
                        <LabourReportDetail />
                    </Container>
                </div>
            </div>
        </Fragment>
    );
}
