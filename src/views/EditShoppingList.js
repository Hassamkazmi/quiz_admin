import React from 'react'
import { Fragment } from 'react'
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../../src/routes";
import AdminNav from "../../src/components/Navbars/AdminNavbar"
import EditShoppingHeader from '../components/EditShopping/EditShoppingHeader';
import EditShoppingDropDown from '../components/EditShopping/EditShoppingDropDown';
import EditShoppingSubHeader from '../components/EditShopping/EditShoppingSubHeader';
import EditShoppingForm from '../components/EditShopping/EditShoppingForm';
import { useSelector } from 'react-redux';

export default function EditShoppingList() {

  const { data: getitemNeededData, statusdata } = useSelector(
    (state) => state.getitemNeededData
  );

  return (
    <Fragment>
      <Sidebar routes={routes}/>
            <div className="main-panel" >
        <AdminNav />

     <div className="content">
            <EditShoppingHeader/>
        <div className='addcustomers'>
        <EditShoppingDropDown/>
        <EditShoppingSubHeader/>
        <EditShoppingForm data={getitemNeededData}/>
        </div>

        </div>
        </div>
    </Fragment>
  )
}
