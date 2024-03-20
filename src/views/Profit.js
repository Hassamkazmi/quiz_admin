import React, { Fragment } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import AdminNav from "../../src/components/Navbars/AdminNavbar"
import routes from "../../src/routes";
import ProfitHeader from "../components/Profit/ProfitHeader";
import ProfitFilter from "../components/Profit/ProfitFilter";
import ProfitListing from "../components/Profit/ProfitListing";
import ProfitReport from "../components/Profit/ProfitReport";
import { useSelector } from "react-redux";

export default function GeneralSetting()

{
    const {data : getProfitData , status } = useSelector((state) =>  state.getProfitData);

    return(
        <Fragment>
            <Sidebar routes={routes} />
            <div className="main-panel">
                <AdminNav />
                <div className="content">
                    <div className='addcustomers'>
                        <ProfitHeader />
                        <div className='row grayshade'>
                            <div className="col-sm-12 profitFilters">
                                <ProfitFilter />
                            </div>
                            <div className='col-sm-12'>
                                <ProfitListing data = {getProfitData}/>
                            </div>

                            {/* <div className='col-sm-6 '>
                                <ProfitReport />
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}