import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import Installedsearch from "../components/InstalledItems/Installedsearch";
import Installedtable from "../components/InstalledItems/Installedtable";
import Installedfilter from "../components/InstalledItems/Installedfilter";

import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar";
import { useSelector , useDispatch } from "react-redux";

export default function InstalledItems() {

    const dispatch = useDispatch();

    return (
        <Fragment>
            <Sidebar routes={routes} />
            <div className="main-panel">
                <AdminNav />
                <div className="content">
                    <Container fluid>
                        <Installedsearch />
                        <Installedfilter />
                        <Installedtable />
                    </Container>
                </div>
            </div>
        </Fragment>
    );
}
