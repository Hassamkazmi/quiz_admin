import React, { Fragment, useEffect } from "react";
import { Container } from "react-bootstrap";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar";
import InvoicingHeader from "../components/Invoicing/InvoicingHeader";
import InvoicingFilter from "../components/Invoicing/InvoicingFilter";


export default function Invoicing() {

   

    return (
        <Fragment>
            <Sidebar routes={routes} />
            <div className="main-panel">
                <AdminNav />
                <div className="content">
                    <Container fluid>
                        <InvoicingHeader />
                        <InvoicingFilter />
            
                    </Container>
                </div>
            </div>
        </Fragment>
    );
}
