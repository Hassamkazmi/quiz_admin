import React, { Fragment } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar";
import PaymentMethodHeader from "../components/PaymentMethod/PaymentMethodHeader";
import PaymentMethodForm from "../components/PaymentMethod/PaymentMethodForm";
import PaymentInfoMethod from "../components/PaymentMethod/PaymentInfoMethod";
import CancelSubscription from "../components/PaymentMethod/CancelSubscription";

export default function PaymentMethodAccount() {
  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel">
        <AdminNav />
        <div className="content">
          
          <div className="addcustomers">
            <div className="row cslocation paymentPage">
              <div className="col-sm-12">
                <PaymentMethodHeader />
              </div>
              <div className="col-sm-6 height-adjust">
                <PaymentMethodForm />
              </div>
              <div className="col-sm-6 height-adjust">
                <PaymentInfoMethod />
              </div>
              <div className="col-sm-6 height-adjust">
                <CancelSubscription />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
