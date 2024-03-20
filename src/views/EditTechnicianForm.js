import React, { Fragment } from 'react'
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar"
import AddTechnicianHeader from "../components/EditTechnician/AddTechnicianHeader";
import EditTechnicianForm from '../components/EditTechnician/AddTechnicianForm';
import { useLocation } from 'react-router-dom';

export default function AddTechnician() {

    const {state} =useLocation(); 

    return (
        <Fragment>
            <Sidebar routes={routes} />
            <div className="main-panel" >
                <AdminNav />
                <div className="content">


                    <div className='addcustomers'>
                        <AddTechnicianHeader />
                        <EditTechnicianForm state = {state}/>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
