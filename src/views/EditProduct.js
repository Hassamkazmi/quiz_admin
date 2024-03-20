import React, { Fragment } from 'react'
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar"
import AddProductHeader from '../components/AddProduct/AddProductHeader';
import AddProductForm from '../components/AddProduct/AddProductForm';
import EditProductHeader from '../components/EditProduct/EditProductHeader';
import EditProductForm from '../components/EditProduct/EditProductForm';
import { useLocation } from "react-router-dom";

export default function EditProduct() {
  const { state } = useLocation();
  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel">
        <AdminNav />
        <div className="content">
          <div className="addcustomers">
            <EditProductHeader />
            <EditProductForm state={state} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
