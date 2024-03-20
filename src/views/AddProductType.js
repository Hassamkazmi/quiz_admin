import React, { Fragment } from 'react'
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar"
import AddProductTypeHeader from '../components/AddProductType/AddProductTypeHeader';
import AddProductTypeForm from '../components/AddProductType/AddProductTypeForm';

export default function AddProductType() {
    return (
        <Fragment>
            <Sidebar routes={routes} />
            <div className="main-panel" >
                <AdminNav />
                <div className="content">


                    <div className='addcustomers'>
                        <AddProductTypeHeader />
                        <AddProductTypeForm/>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
