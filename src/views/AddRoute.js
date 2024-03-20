import React, { Fragment } from 'react'

import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../../src/routes";
import AdminNav from "../../src/components/Navbars/AdminNavbar"
import AddRouteForm from '../components/AddRoute/AddRoutForm';
import AddRouteheader from '../components/AddRoute/AddRouteHeader';

export default function AddRoute() {
    return (
        <Fragment>
            <Sidebar routes={routes} />
            <div className="main-panel" >
                <AdminNav />
                <div className="content">


                    <div className='addcustomers'>
                        <AddRouteheader />
                        <AddRouteForm />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
