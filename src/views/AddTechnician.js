import React, { Fragment } from 'react'
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar"
import AddTechnicianHeader from '../components/AddTechnician/AddTechnicianHeader';
import AddTechnicianForm from '../components/AddTechnician/AddTechnicianForm';

export default function AddTechnician() {
    return (
        <Fragment>
            <Sidebar routes={routes} />
            <div className="main-panel" >
                <AdminNav />
                <div className="content">


                    <div className='addcustomers addTechnician'>
                        <AddTechnicianHeader />
                        <AddTechnicianForm/>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
