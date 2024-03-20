import React, { Fragment, useEffect } from "react";

import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar";
import AccountHeader from "../components/Account/AccountHeader";
import { fetchaccountDetail } from "../redux/Slices/getAccoutDetails"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import aaa from "../assets/img/aaa.jpg"

export default function AddChecklist() {

  const dispatch = useDispatch();
  const {data : accountDetail} = useSelector((state) => state.accountDetail)
  useEffect(() => {
    dispatch(fetchaccountDetail())
  },[dispatch])

  console.log(accountDetail)
  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel">
        <AdminNav />
        <div className="content">
          <div className="addcustomers smsHeader">
            <AccountHeader />
            
          </div>

          <div className="smsHeader">
          <div className="rounded bg-white mt-5 mb-5">
            <div className="row">
                <div className="col-md-3 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                        <img className="mt-1" width="250px" src={aaa} alt="Profile"/>
                    </div>
                </div>
                <div className="col-md-9 border-right">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right">Profile Settings</h4>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-6"><label className="labels"> Name</label><input type="text" className="form-control form-css-data" placeholder="first name" value={accountDetail?.users?.Name}/></div>
                            <div className="col-md-6"><label className="labels">Email</label><input type="text" className="form-control form-css-data" value={accountDetail?.users?.Email} placeholder="surname" /></div>
                        </div>
                        
                        <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="button">Save Profile</button></div>
                    </div>
                </div>
                
            </div>
        </div>
            
          </div>
        </div>
      </div>
    </Fragment>
  );
}
