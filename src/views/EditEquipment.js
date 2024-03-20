import React, { Fragment } from 'react'
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar"
import EquipmentForm from '../components/EditEquipment/EquipmentForm';
import EquipmentHeader from '../components/EditEquipment/EquipmentHeader';

export default function EditEquipment() {
    return (
        <Fragment>
            <Sidebar routes={routes} />
            <div className="main-panel" >
                <AdminNav />
                <div className="content">


                    <div className=''>
                        <EquipmentHeader />
                        <EquipmentForm />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
