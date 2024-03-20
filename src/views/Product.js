import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar";
import ProductHeader from "../components/Product/ProductHeader";
import Productfilter from "../components/Product/Productfilter";
import Producttable from "../components/Product/Producttable";

export default function Product() {
    return (
        <Fragment>
            <Sidebar routes={routes} />
            <div className="main-panel">
                <AdminNav />
                <div className="content">
                    <Container fluid>
                        <ProductHeader />
                        <Productfilter />
                        <Producttable />
                    </Container>
                </div>
            </div>
        </Fragment>
    );
}
