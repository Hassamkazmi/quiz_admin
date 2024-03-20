import React, { Fragment } from 'react'
import Addformheader from '../components/AddCustomers/Addformheader'
import AddCustomerForm from '../components/AddCustomers/AddCustomerForm'

import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../../src/routes";
import AdminNav from "../../src/components/Navbars/AdminNavbar"

export default function Addcustomer() {
  return (
    <Fragment>
      <Sidebar routes={routes}/>
            <div className="main-panel" >
        <AdminNav />
     <div className="content">

      
        <div className='addcustomers'>
        <Addformheader/>
        <AddCustomerForm/>
        </div>
        </div>
        </div>
    </Fragment>
  )
}
