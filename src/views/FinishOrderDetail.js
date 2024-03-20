import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import FinishedOrdersearch from "../components/FinishedOrderDetail/FinishedOrdersearch";
import FinishedOrdertable from "../components/FinishedOrderDetail/FinishedOrderTable";
import FinishedOrderfilter from "../components/FinishedOrderDetail/FinishedOrderfilter";

import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar";
import { useSelector } from "react-redux";

export default function FinishedOrderDetail() {

    const {data:workorderReport } = useSelector((state) => state.workorderReport)


    return (
        <Fragment>
            <Sidebar routes={routes} />
            <div className="main-panel">
                <AdminNav />
                <div className="content">
                    <Container fluid>
                        <FinishedOrdersearch />
                        <FinishedOrderfilter />
                        <FinishedOrdertable data={workorderReport}/>
                    </Container>
                </div>
            </div>
        </Fragment>
    );
}
