import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar";
import EquipmentHeaderList from "../components/Equipment/EquipmentHeaderList";
import Equipmentfilter from "../components/Equipment/Equipmentfilter";
import Equipmenttable from "../components/Equipment/Equipmenttable";

export default function Equipment() {
  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel">
        <AdminNav />
        <div className="content">
          <Container fluid>
            <EquipmentHeaderList />
            <Equipmentfilter />
            <Equipmenttable />
          </Container>
        </div>
      </div>
    </Fragment>
  );
}
