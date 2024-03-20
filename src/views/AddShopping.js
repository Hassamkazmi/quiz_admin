import React, { useState } from 'react'
import { Fragment } from 'react'
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../../src/routes";
import AdminNav from "../../src/components/Navbars/AdminNavbar"
import ShoppingHeader from '../components/AddShopping/ShoppingHeader';
import ShoppingDropDown from '../components/AddShopping/ShoppingDropDown';
import ShoppingSubHeader from '../components/AddShopping/ShoppingSubHeader';
import ShoppingForm from '../components/AddShopping/ShoppingForm';

export default function AddShopping() {

const [type ,setType] = useState()
  return (
    <Fragment>
      <Sidebar routes={routes}/>
            <div className="main-panel" >
        <AdminNav />

     <div className="content">
            <ShoppingHeader/>
        <div className='addcustomers'>
        <ShoppingDropDown setType={setType}/>
        <ShoppingSubHeader/>
        <ShoppingForm type={type}/>
        </div>

        </div>
        </div>
    </Fragment>
  )
}
