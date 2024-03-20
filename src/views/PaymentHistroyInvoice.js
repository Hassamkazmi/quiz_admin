import React, { Fragment } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar";
import PaymentHistoryInvoiceHeader from "../components/PaymentHistory/PaymentHistoryInvoiceHeader";
import { HiOutlineMail } from "react-icons/hi";
import { FaPrint } from "react-icons/fa6";
import PaymentHistoryInvoiceDetail from "../components/PaymentHistory/PaymentHistoryInvoiceDetail";
import { Button } from "antd";

export default function PaymentHistroyInvoice() {
    return (
        <Fragment>
            <Sidebar routes={routes} />
            <div className="main-panel">
                <AdminNav />
                <div className="content">
                
                    <div className="addcustomers">
                        <div className="row cslocation">
                            <div className="col-sm-6">
                                <PaymentHistoryInvoiceHeader />
                            </div>
                            <div className="col-sm-6">
                                <div className="buttonForHead">
                                    <Button>
                                        <HiOutlineMail />
                                        <p>Send Invoice</p>
                                    </Button>
                                    <Button>
                                        <FaPrint />
                                        <p>Print Invoice</p>
                                    </Button>
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <PaymentHistoryInvoiceDetail />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
