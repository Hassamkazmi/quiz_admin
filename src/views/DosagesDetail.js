import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar";
import DosagesDetailHeader from "../components/DosagesDetail/DosagesDetailHeader";
import DosagesDetailfilter from "../components/DosagesDetail/DosagesDetailfilter";
import DosgesDetailTable from "../components/DosagesDetail/DosagesDetailtable";

export default function DosagesDetail() {
    return (
        <Fragment>
            <Sidebar routes={routes} />
            <div className="main-panel">
                <AdminNav />
                <div className="content">
                    <Container fluid>
                        <DosagesDetailHeader />
                        <DosagesDetailfilter />
                        <DosgesDetailTable />
                    </Container>
                </div>
            </div>
        </Fragment>
    );
}
