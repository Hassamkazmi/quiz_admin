import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../../src/routes";
import AdminNav from "../../src/components/Navbars/AdminNavbar";
import DosagesHeader from "../components/Dosages/DosagesHeader";
import Dosagesfilter from "../components/Dosages/Dosagesfilter";
import DosgesTable from "../components/Dosages/Dosagestable";

export default function Dosages() {
    return (
        <Fragment>
            <Sidebar routes={routes} />
            <div className="main-panel">
                <AdminNav />
                <div className="content">
                    <Container fluid>
                        <DosagesHeader />
                        <Dosagesfilter />
                        <DosgesTable />
                    </Container>
                </div>
            </div>
        </Fragment>
    );
}
