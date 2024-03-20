import React, { Fragment } from 'react'
import ServiceHeader from '../components/ServiceLocation/ServiceHeader'
import ServiceLocationAccordion from '../components/ServiceLocation/ServiceLocationAccordion'

import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../../src/routes";
import AdminNav from "../../src/components/Navbars/AdminNavbar"

function ServiceLocation() {
  return (
    <Fragment>

<Sidebar routes={routes}/>
            <div className="main-panel" >
        <AdminNav />
     <div className="content">
        
        <div className='addcustomers'>
             <ServiceHeader/>
             <ServiceLocationAccordion/>
        </div>

        </div>
        </div>
    </Fragment>
  )
}

export default ServiceLocation