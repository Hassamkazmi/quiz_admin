import React from 'react'
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../../src/routes";
import AdminNav from "../../src/components/Navbars/AdminNavbar"
import { Fragment } from 'react'
import Locationonmap from '../components/RouteAssignment/Locationonmap';
import Logsheader from '../components/ServiceLogs/Logsheader';
import Routetabs from '../components/ServiceLogs/Routetabs';
import { fetchactiveServicedashboard } from "../redux/Slices/getActiveServiceRoute";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect , useState } from 'react';
import { Spin } from 'antd';
import moment from 'moment';


function ServiceLogs() {

  const { data: activeServicedashboard , statusdata } = useSelector(
    (state) => state.activeServicedashboard
  );
  const dispatch = useDispatch();
  const currentDate = new Date(); // Example: replace this with your actual date
      const date1 = new Date(currentDate.toISOString().split('T')[0]);

      const [date , setDate] = useState(date1)
  const technician_id = null;

  useEffect(() => {
    dispatch(fetchactiveServicedashboard({date , technician_id}))
  },[dispatch])


  const dateMap = new Map();

  const result =  activeServicedashboard && activeServicedashboard?.data?.map(item => {
    const assignedDate = item.assigned_date;
  
    if (dateMap.has(assignedDate)) {
      dateMap.set(assignedDate, true);
    } else {
      dateMap.set(assignedDate, false);
    }
  
    return { ...item, hasSameAssignedDate: dateMap.get(assignedDate) };
  });
  


  return (
    <Fragment>
    <Sidebar routes={routes}/>
          <div className="main-panel" >
      <AdminNav />

   <div className="content">
      <div className='addcustomers'>
          <Logsheader/>
          
          {
            statusdata === "loading" ? <div className='SpinLoader'> <Spin />  </div>:  <div className='row grayshade workOrderListsss'>
            <div className='col-sm-6 abc'>
              <Routetabs  data={result}/>
            </div>

            <div className='col-sm-6 abc notDisplay'>
                <Locationonmap/>
            </div>
        </div>
          }
         
      </div>
          
      </div>
      </div>
  </Fragment>
  )
}

export default ServiceLogs