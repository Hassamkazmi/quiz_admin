import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar";
import ProductTypeHeader from "../components/ProductType/ProductTypeHeader";
import ProductTypefilter from "../components/ProductType/ProductTypefilter";
import ProductTypetable from "../components/ProductType/ProductTypetable";

export default function ProductType() {
    return (
        <Fragment>
            <Sidebar routes={routes} />
            <div className="main-panel">
                <AdminNav />
                <div className="content">
                    <Container fluid>
                        <ProductTypeHeader />
                        <ProductTypefilter />
                        <ProductTypetable />
                    </Container>
                </div>
            </div>
        </Fragment>
    );
}
