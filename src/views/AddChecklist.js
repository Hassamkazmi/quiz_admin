import React, { Fragment } from 'react'


import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../../src/routes";
import AdminNav from "../../src/components/Navbars/AdminNavbar"
import AddChecklistHeader from '../components/AddChecklist/AddChecklistHeader';
import AddChecklistform from '../components/AddChecklist/AddChecklistform';

export default function AddChecklist() {
  return (
    <Fragment>
      <Sidebar routes={routes}/>
        <div className="main-panel" >
          <AdminNav />
          <div className="content">      
            <div className='addcustomers'>
              <div className='row cslocation'> 
                <AddChecklistHeader/>      
                <div className='col-sm-12'>
                  <AddChecklistform/>
                </div>
              </div>
            </div>
          </div>
        </div>
    </Fragment>
  )
}
