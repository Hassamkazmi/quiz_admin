import React, { Fragment } from 'react'


import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar"

import EditWorkHeader from '../components/EditWorkOrder/EditWorkHeader';
import EditWorkForm from '../components/EditWorkOrder/EditWorkForm';
import AddWorkTypeHeader from '../components/AddWorkType/AddWorkTypeHeader';
import WorkTypeForm from '../components/AddWorkType/WorkTypeForm';

export default function AddWorkType() {
  return (
    <Fragment>
      <Sidebar routes={routes}/>
            <div className="main-panel works" >
        <AdminNav />
     <div className="content">

      
        <AddWorkTypeHeader/>
        <div className='addcustomers'>
        <WorkTypeForm/>
        </div>
        </div>
        </div>
    </Fragment>
  )
}
