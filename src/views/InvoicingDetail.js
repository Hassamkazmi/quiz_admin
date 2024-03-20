import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar";
import InvoicingHeader from "../components/InvoicingDetail/InvoicingHeader";
import InvoicingTable from "../components/InvoicingDetail/InvoicingTable";
import InvoiceSlider from "../components/InvoicingDetail/InvoiceSlider";
import { fetchgetInvoiceSingle } from "../redux/Slices/getInvoiceDetail";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import moment from "moment";

export default function InvoicingDetail() {
  const dispatch = useDispatch();

  const [isFieldsDisabled, setIsFieldsDisabled] = useState(true);

  const toggleFields = () => {
    setIsFieldsDisabled((prev) => !prev);
  };

  const parts1 = window.location.href;

  const parts = parts1.split("/");

  // Extract the required variables
  const Id = parts[4]; // 45441524-16d2-401b-9eed-edca9b156cdb
  const locationId = parts[5]; // 45441524-16d2-401b-9eed-edca9b156cdb
  const variable2 = parts[6]; // 2023-12-31T19:00:00Z
  const variable3 = parts[7]; // 2024-01-30T19:00:00Z

  const [StartDate, setStartDate] = useState(
    moment(variable2).startOf("month").format("YYYY-MM-DD")
  );
  const [EndDate, setEndDate] = useState(
    moment(variable3).endOf("month").format("YYYY-MM-DD")
  );

  useEffect(() => {
    dispatch(fetchgetInvoiceSingle({ Id, locationId, StartDate, EndDate }));
  }, [dispatch]);
  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel">
        <AdminNav />
        <div className="content">
          <Container fluid>
            <InvoicingHeader
              toggleFields={{ toggleFields, isFieldsDisabled }}
            />
            <InvoiceSlider isFieldsDisabled={isFieldsDisabled} />
          </Container>
        </div>
      </div>
    </Fragment>
  );
}
