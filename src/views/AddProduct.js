import React, { Fragment } from 'react'
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar"
import AddProductHeader from '../components/AddProduct/AddProductHeader';
import AddProductForm from '../components/AddProduct/AddProductForm';

export default function AddProduct() {
    return (
        <Fragment>
            <Sidebar routes={routes} />
            <div className="main-panel" >
                <AdminNav />
                <div className="content">


                    <div className='addcustomers'>
                        <AddProductHeader />
                        <AddProductForm/>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
