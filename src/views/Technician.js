import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar";

import TechnicianHeader from "../components/Technician/TechnicianHeader";
import TechnicianFilter from "../components/Technician/TechnicianListFilter";
import TechnicianTable from "../components/Technician/TechnicianTable";

export default function Technician() {
    return (
        <Fragment>
            <Sidebar routes={routes} />
            <div className="main-panel">
                <AdminNav />
                <div className="content">
                    <Container fluid>
                    <TechnicianHeader/>
                    <TechnicianFilter/>
                    <TechnicianTable/>
                    </Container>
                </div>
            </div>
        </Fragment>
    );
}
