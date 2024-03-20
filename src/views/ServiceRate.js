import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import Servicesearch from "../components/ServiceRates/ServiceRatessearch";
import Servicetable from "../components/ServiceRates/ServiceRatestable";
import Servicefilter from "../components/ServiceRates/ServiceRatesfilter";

import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar";

export default function Services() {
  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel">
        <AdminNav />
        <div className="content">
          <Container fluid>
            <Servicesearch />
            <Servicefilter />
            <Servicetable />
          </Container>
        </div>
      </div>
    </Fragment>
  );
}
