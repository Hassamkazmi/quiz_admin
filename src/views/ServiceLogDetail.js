import React from 'react'
import { Fragment } from 'react'
import Poolheader from '../components/Pool/Poolheader'
import Poolaccordian from '../components/Pool/Poolaccordian'

import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../../src/routes";
import AdminNav from "../../src/components/Navbars/AdminNavbar"
import ServiceLogDetailHeader from '../components/ServiceLogsDetail/ServiceLogDetailHeader';
import ServiceLogDetailPage from '../components/ServiceLogsDetail/ServiceLocationPage';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchgetSingleActiveService } from '../redux/Slices/getSingleActiveService';
import { useEffect } from 'react';

export default function ServiceLogDetail() {

    const { id } = useParams();

    const { data: getSingleActiveService } = useSelector(
    (state) => state.getSingleActiveService
  );
  const dispatch = useDispatch();
  
      useEffect(() => {
    dispatch(fetchgetSingleActiveService({id}))
  },[dispatch])

    return (
        <Fragment>
            <Sidebar routes={routes} />
            <div className="main-panel" >
                <AdminNav />

                <div className="content">
                    <div className='addcustomers'>
                        <ServiceLogDetailHeader />
                        <ServiceLogDetailPage data={getSingleActiveService}/>
                        
                    </div>

                </div>
            </div>
        </Fragment>
    )
}
