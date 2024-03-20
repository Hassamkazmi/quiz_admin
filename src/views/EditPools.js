import React, { Fragment } from 'react'
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../../src/routes";
import AdminNav from "../../src/components/Navbars/AdminNavbar"
import Profpools from '../components/Profile/Profpools';

export default function EditPools() {
  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel" >
        <AdminNav />
        <div className="content">


          <div className='addcustomers'>
            <Profpools />
          </div>
        </div>
      </div>
    </Fragment>
  )
}