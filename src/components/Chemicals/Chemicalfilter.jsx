import React, { useState , useEffect } from "react";
import { Fragment } from "react";
import { DatePicker } from "antd";
import { fetchchemicalReport } from "../../redux/Slices/getchemicalReportSlice";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { fetchgetCustomerType } from "../../redux/Slices/getCustomerType";

export default function Chemicalfilter() {
  const { RangePicker } = DatePicker;

  const dispatch = useDispatch();
  const customertype = useSelector((state) => state.getCustomerType);

  const [selectedDates, setSelectedDates] = useState([]);
  const [StartDate, setStartDate] = useState(moment().startOf("month").format('YYYY-MM-DD'));
  const [EndDate, setEndDate] = useState(moment().endOf("month").format('YYYY-MM-DD'));
  const [currentPage, setCurrentPage] = useState(1);
  const [Customer_type, setcustomer_type] = useState("");

  const handleDateChange = (dates, i) => {
    setSelectedDates(i);
    setStartDate(i[0]);
    setEndDate(i[1]);
  };
  useEffect(() => {
    dispatch(fetchgetCustomerType());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchchemicalReport({StartDate , EndDate , Customer_type , currentPage}))
  }, [dispatch, StartDate, EndDate , Customer_type]);


  return (
    <Fragment>
      <form className="myfilters tableFilters labourReportInvoice">

        <div className="row cslocation">
          
        </div>
       

          {/* <button type="submit">
            <i className="fa fa-search" aria-hidden="true" />
          </button> */}
        {/* <button type="submit">
          {" "}
          <i className="fa fa-search" aria-hidden="true" />
        </button> */}
      </form>
    </Fragment>
  );
}
