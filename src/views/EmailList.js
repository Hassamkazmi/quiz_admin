import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import EmailHeader from "../components/EmailList/EmailHeader";
import EmailListing from "../components/EmailList/EmailList";

import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar";
import EmailSearch from "../components/EmailList/EmailSearch";
import { useDispatch } from "react-redux";
import { fetchbroadCastEmail } from "../redux/Slices/getbroadCastEmail";
import { useSelector } from "react-redux";
import NoData from "../components/NoDataComponent/Loader";

export default function EmailList() {
  const dispatch = useDispatch();
  

  const { data:broadCastEmail, statusdata } = useSelector((state) => state.broadCastEmail);
  const { data, loading } = useSelector((state) => state.postEmailboardcast);

  const Value = data ? data : broadCastEmail;
  const [MapData, setValue] = useState(broadCastEmail);

  useEffect(() => {
    setValue(Value)
  },[data,broadCastEmail])

  useEffect(() => {
    dispatch(fetchbroadCastEmail());
  }, [dispatch]);



  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel">
        <AdminNav />

        <div className="content">
          <div className="addcustomers">
            <EmailHeader />
            <div className="row grayshade emailBroadcast">
              <div className="col-sm-6 email">
                <EmailSearch emailData={MapData}/>
              </div>
              <div className="col-sm-6 email">
                {
                  statusdata !== "idle" ? <NoData /> : <EmailListing broadCastEmail={{setValue,MapData}} />
                }
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}