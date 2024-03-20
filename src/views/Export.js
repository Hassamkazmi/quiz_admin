import React, { Fragment } from 'react'


import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar"
import ExportHeader from '../components/Export/ExportHeader';
import ExportData from '../components/Export/ExportData';

export default function AddChecklist() {
  return (
    <Fragment>
      <Sidebar routes={routes}/>
            <div className="main-panel" >
        <AdminNav />
     <div className="content">

      
        <div className='addcustomers'>
        
        <div className='row'> 
        <div className='col-sm-12'>
        <ExportHeader/>
        <ExportData/>
        </div>

        </div>
        </div>
        </div>
        </div>
    </Fragment>
  )
}
