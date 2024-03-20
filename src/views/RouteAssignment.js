import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../../src/routes";
import AdminNav from "../../src/components/Navbars/AdminNavbar";
import { Fragment } from "react";
import Routeheader from "../components/RouteAssignment/Routeheader";
import RouteListing from "../components/RouteAssignment/RouteListing";
import RouteSearchFilters from "../components/RouteAssignment/RouteSearchFilters";
import Locationonmap from "../components/RouteAssignment/RoutesMap";
import {
  fetchactiveServicedashboard
} from "../redux/Slices/getActiveServiceRoute";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loader from "../components/NoDataComponent/Loader";
import moment from "moment";
import socket from "../Socket";

function RouteAssignment() {
  const [routeData, setRouteData] = useState();
  const { data: profileDetail } = useSelector((state) => state.profileDetail);

  const [Techniciandata , setTechniciandata] = useState("")

  const { data: activeServicedashboard, statusdata } = useSelector(
    (state) => state.activeServicedashboard
  );
  const dispatch = useDispatch();

  const id = profileDetail?.data?._id;

  const currentDate = new Date();
  const date1 = new Date(currentDate.toISOString().split("T")[0]);

  const [date, setDate] = useState(date1);
  const technician_id = null;
  useEffect(() => {
    dispatch(fetchactiveServicedashboard({ date, technician_id }));
  }, [dispatch]);

  // useEffect(() => {
  //   socket.on("routeAssignment", (data) => {
  //     setRouteData(data);
  //     console.log(routeData, "<=============data");
  //   });
  // }, []);



  const SocketData = []

  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel">
        <AdminNav />

        <div className="content">
          <div className="addcustomers">
            <Routeheader />

            <div className="row grayshade workOrderListsss">
              <div className="col-sm-6 route-filter abc">
                <RouteSearchFilters data={SocketData} />
                <div className="onTabletDisplay">
                  {statusdata == "idle" ? <Locationonmap Techniciandata={Techniciandata}/> : <Loader />}
                </div>
                <RouteListing data={{SocketData , setTechniciandata}} />
              </div>

              <div className="col-sm-6 abc notDisplay">
                {statusdata == "idle" ? <Locationonmap Techniciandata={Techniciandata}/> : <Loader />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default RouteAssignment;
