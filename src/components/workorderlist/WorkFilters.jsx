import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchgetWorkOrderRouteApi } from "../../redux/Slices/getWorkOrderRoute";
import { fetchgetWorkOrder } from "../../redux/Slices/getWorkorder";
import { fetchTechnician } from "../../redux/Slices/GetTechnician";
import moment from "moment";
import { DatePicker } from "antd";
import { useSelector } from "react-redux";

const WorkFilters = () => {
  const { RangePicker } = DatePicker;

  const {data : Technician } = useSelector((state) => state.Technician);
  const {data : getWorkOrder } = useSelector((state) => state.getWorkOrder);

  // const [start_date, setStartDate] = useState(moment().startOf("month").format('YYYY-MM-DD'));
  // const [end_date, setEndDate] = useState(moment().endOf("month").format('YYYY-MM-DD'));

  const [start_date, setStartDate] = useState(moment().startOf("week").format('YYYY-MM-DD'));
  const [end_date, setEndDate] = useState(moment().endOf("week").format('YYYY-MM-DD'));

  const [assigned_day, setassigned_day] = useState("");
  const [WorkOrder, setWorkOrder] = useState("");
  const [TechId, setTechId] = useState("");

  const dispatch = useDispatch();

  const currentDate = new Date(); // Example: replace this with your actual date
  const date1 = new Date(currentDate.toISOString().split('T')[0]);



  const handleDateChange = (dates, i) => {
    setStartDate(i[0]);
    setEndDate(i[1]);
  };

  useEffect(() => {
    // dispatch(fetchgetWorkOrder())
    dispatch(fetchTechnician())
  },[dispatch])

  useEffect(() => {
    dispatch(fetchgetWorkOrderRouteApi({start_date , end_date ,assigned_day, TechId}))
  },[dispatch , start_date , end_date , assigned_day ,TechId ])


  const AllDay = [
    {
      id:"",
      value:"",
      label:"All Day"
    },
    {
      id:"1",
      value:"sunday",
      label:"Sunday"
    },
    {
      id:"2",
      value:"monday",
      label:"Monday"
    },
    {
      id:"3",
      value:"tuesday",
      label:"Tuesday"
    },
    {
      id:"4",
      value:"wednesday",
      label:"Wednesday"
    },
    {
      id:"5",
      value:"thursday",
      label:"Thursday"
    },{
      id:"6",
      value:"friday",
      label:"Friday"
    },{
      id:"7",
      value:"saturday",
      label:"Saturday"
    }
   
  ];


  return (
    <div className="row grayshade workFilter">
      {/* <div className="col-sm-3">
        <Select placeholder="Work Order" onChange={(e) => setWorkOrder(e)}>
        {
            getWorkOrder?.items?.map((item,i) => {
              return(
                <Option value={item?._id}>{item?.work_needed}</Option>
              )
            })
          }
        </Select>
      </div> */}
      
      <div className="col-sm-3">
        <Select placeholder="All Tech"  onChange={(e) => setTechId(e)}>
        {
            Technician?.items?.map((item,i) => {
              return(
                <Option value={item?._id}>{item?.first_name}</Option>
              )
            })
          }
        </Select>
      </div>
      <div className="col-sm-3">
        <Select placeholder="All Day" onChange={(e) => setassigned_day(e)}>
          {
            AllDay.map((item,i) => {
              return(
                <Option value={item?.value}>{item?.label}</Option>
              )
            })
          }
        </Select>
      </div>
      <div className="col-sm-3">
        <Select placeholder="Billing Status">

        <Option value="true">Paid</Option>
        <Option value="false">Unpaid</Option>
       
        </Select>
      </div>
      <div className="col-sm-3">
      <span className="myfilters tableFilters invoiceFilter">
        <DatePicker.RangePicker
            
            allowClear={true}
            onChange={handleDateChange}
          />
          </span>
      </div>
     
    </div>
  );
};

export default WorkFilters;
