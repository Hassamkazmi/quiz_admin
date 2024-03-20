import React, { Fragment, useState } from "react";
import { Container } from "react-bootstrap";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../../src/routes";
import AdminNav from "../../src/components/Navbars/AdminNavbar";

import ShoppingHeader from "../components/ShoppingList/ShoppingHeader";
import ShoppingFilter from "../components/ShoppingList/ShoppingFilter";
import ShoppingListTable from "../components/ShoppingList/ShoppingListTable";
import ShoppingTabs from "../components/ShoppingList/ShoppingTabs";

export default function ShoppingList() {
 const [tableData,setTableData] = useState("")
 
  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel">
        <AdminNav />
        <div className="content">
          <Container fluid>

            <ShoppingHeader />
            <ShoppingFilter />
            <ShoppingListTable tableData={tableData}/>
          </Container>
        </div>
      </div>
    </Fragment>
  );
}
