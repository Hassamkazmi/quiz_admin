import React from 'react'
import { Fragment } from 'react'
import EmailHeader from '../components/EmailSetting/EmailHeader'
import EmailAccordion from '../components/EmailSetting/EmailAccordion'

import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar"


export default function EmailSetting() {
    return (
        <Fragment>
        <Sidebar routes={routes}/>
              <div className="main-panel" >
          <AdminNav />
  
       <div className="content">
          <div className='addcustomers'>
 
          <EmailHeader/>
<EmailAccordion/>
          </div>
  
          </div>
          </div>
      </Fragment>
    )
}
