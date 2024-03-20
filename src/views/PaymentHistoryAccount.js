import React, { Fragment, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar";
import PaymentHistoryHeader from "../components/PaymentHistory/PaymentHistoryHeader";
import PaymentHistoryTable from "../components/PaymentHistory/PaymentHistoryTable";
import { useSelector , useDispatch } from "react-redux";
import { fetchgetPaymentHistory } from "../redux/Slices/getPaymentHistory";

export default function PaymentHistoryAccount() {

  const {data: getPaymentHistory , status} = useSelector((state) => state.getPaymentHistory)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchgetPaymentHistory())
  },[dispatch])

  console.log(getPaymentHistory,"getPaymentHistorygetPaymentHistory")

  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel">
        <AdminNav />
        <div className="content">
          
          <div className="addcustomers">
            <div className="row cslocation">
              <div className="col-sm-12">
                <PaymentHistoryHeader />
              </div>

              <div className="col-sm-12">
                <PaymentHistoryTable data={getPaymentHistory}/>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
