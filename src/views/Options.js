import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import Optionssearch from "../components/Options/Optionssearch";
import Optionstable from "../components/Options/Optionstable";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar";

export default function Options() {
  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel">
        <AdminNav />
        <div className="content">
          <Container fluid>
            <Optionssearch />
            <Optionstable />
          </Container>
        </div>
      </div>
    </Fragment>
  );
}
