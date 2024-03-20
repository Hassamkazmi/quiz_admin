import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../../src/routes";
import AdminNav from "../../src/components/Navbars/AdminNavbar";

import CheckListHeader from "../components/Checklist/CheckListHeader";
import CheckListFilter from "../components/Checklist/CheckListFilter";
import CheckListTable from "../components/Checklist/CheckListTable";

export default function CheckList() {
    return (
        <Fragment>
            <Sidebar routes={routes} />
            <div className="main-panel">
                <AdminNav />
                <div className="content">
                    <Container fluid>
                    <CheckListHeader/>
                    <CheckListFilter/>
                    <CheckListTable/>
                    </Container>
                </div>
            </div>
        </Fragment>
    );
}
