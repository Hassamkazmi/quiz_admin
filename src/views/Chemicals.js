import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import Chemicalsearch from "../components/Chemicals/Chemicalsearch";
import Chemicaltable from "../components/Chemicals/Chemicaltable";
import Chemicalfilter from "../components/Chemicals/Chemicalfilter";

import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar";

export default function Chemicals() {
    return (
        <Fragment>
            <Sidebar routes={routes} />
            <div className="main-panel">
                <AdminNav />
                <div className="content">
                    <Container fluid>
                        <Chemicalsearch />
                        <Chemicaltable />
                    </Container>
                </div>
            </div>
        </Fragment>
    );
}
