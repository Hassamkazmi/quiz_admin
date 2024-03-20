import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../../src/routes";
import AdminNav from "../../src/components/Navbars/AdminNavbar";

import WorkOrderTypeHeader from "../components/WorkOrderType/WorkOrderTypeHeader";
import WorkOrderTypeFilter from "../components/WorkOrderType/WorkOrderTypeFilter";
import WorkOrderTypeTable from "../components/WorkOrderType/WorkOrderTypeTable";

export default function WorkOrderType() {
    return (
        <Fragment>
            <Sidebar routes={routes} />
            <div className="main-panel">
                <AdminNav />
                <div className="content">
                    <Container fluid>
                    <WorkOrderTypeHeader/>
                    <WorkOrderTypeFilter/>
                    <WorkOrderTypeTable/>
                    </Container>
                </div>
            </div>
        </Fragment>
    );
}
