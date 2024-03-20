import React, { Fragment } from 'react'
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar"
import EditProductTypeHeader from '../components/EditProductType/EditProductTypeHeader';
import EditProductTypeForm from '../components/EditProductType/EditProductTypeForm';

export default function EditProductType() {
    return (
        <Fragment>
            <Sidebar routes={routes} />
            <div className="main-panel" >
                <AdminNav />
                <div className="content">


                    <div className='addcustomers'>
                        <EditProductTypeHeader />
                        <EditProductTypeForm />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
