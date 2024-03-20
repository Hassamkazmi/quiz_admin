import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import Customersearch from "../components/Customers/Customersearch";
import Customertable from "../components/Customers/Customertable";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../../src/routes";
import AdminNav from "../../src/components/Navbars/AdminNavbar";

export default function Customers() {
  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel">
        <AdminNav />
        <div className="content">
          <Container fluid>
            <Customersearch />
            {/* <Customerfilter /> */}
            <Customertable />
          </Container>
        </div>
      </div>
    </Fragment>
  );
}
