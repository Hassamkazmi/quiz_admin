import React, { Fragment } from 'react'
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../../src/routes";
import AdminNav from "../../src/components/Navbars/AdminNavbar"
import AddpoolsCustomer from '../components/AddCustomers/AddpoolsCustomer';

export default function Addpools() {
  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel" >
        <AdminNav />
        <div className="content">


       
          <div className='addcustomers'>
          
            <AddpoolsCustomer />
            
          </div>
        </div>
      </div>
    </Fragment>
  )
}