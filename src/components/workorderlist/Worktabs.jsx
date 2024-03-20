import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// import { Routeassignments } from "../../Data/Data";
import { RightOutlined } from "@ant-design/icons";
import Accordion from "react-bootstrap/Accordion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Card, Dropdown, Menu } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import NoData from "../NoDataComponent/NoData";

function Worktabs({ activeServicedashboard }) {


  const { data: WorkOrderRouteApi  , statusdata} = useSelector(
    (state) => state.WorkOrderRouteApi
  );

  console.log(statusdata)

  
  function metersToMiles(kilometers) {
    const conversionFactor = 0.621371;
    return kilometers * conversionFactor;
  }

  function secondsToMinutes(seconds) {
    return seconds / 60;
  }

  const calculatePercentage = (distanceCovered, totalDistance) => {
    const percentage = (distanceCovered / totalDistance) * 100;
    return percentage > 100 ? 100 : percentage; // Ensure it doesn't exceed 100%
  };

  // Function to set background color based on percentage
  const getBackgroundColor = () => {
    const percentage = calculatePercentage();
    if (percentage < 50) {
      return "#e9ecef"; // Set a color for the first half
    } else if (percentage < 80) {
      return "#fab51c"; // Set a color for the second half
    } else {
      return "#e9ecef"; // Set a color for the last part
    }
  };



  function getDayName(dateString) {
    var dateObject = new Date(dateString);
    var dayOfWeek = dateObject.getUTCDay();
    var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return weekdays[dayOfWeek];

    
}
console.log(activeServicedashboard)
  return (
    <Fragment>
      <Row className="cslocation">
        <Col sm={12} className="workOrdertwelve">
          {activeServicedashboard?.length != 0 ? activeServicedashboard?.data?.map((newdata, ind) => {
            return (
              <>
              {
                statusdata == "idle" ? <div className="filteraccordian workTabsss" key={ind}>
                <div className="main">
                  <div className="">
                    <h3 className="datefilter-h3">
                      <span>
                        <span className="date-day">
                          {getDayName(activeServicedashboard?.data[ind].Date)}{" "}
                        </span>{" "}
                        {moment(activeServicedashboard?.data[ind].Date).format(
                          "LL"
                        )}
                      </span>
                    </h3>
                  </div>
                  {newdata?.Data?.map((item, key) => {
                    return (
                      <Accordion defaultActiveKey="1" flush>
                        <Accordion.Item eventKey={ind} key={ind}>
                          <Accordion.Header>
                            <div className="row cslocation">
                              <div className="col-sm-2 yellows roueTabs">
                                <h2>
                                  <span>WORKORDERS </span>{" "}
                                  {item?.completedWorkOrder} <br />
                                  <span>{item.TotalWorkOrder}</span>
                                </h2>
                              </div>

                              <div className="col-sm-10 roueTabsMax">
                                <div className="row">
                                  <h2>
                                    {item?.first_name + " " + item?.last_name}
                                  </h2>
                                  <div
                                    className="tech_color_code"
                                    style={{
                                      background: `${item?.color_code}`,
                                    }}
                                  ></div>
                                </div>

                                <div className="row miles">
                                  <div className="col-sm-4 roueTabsMaxContent">
                                    {metersToMiles(
                                      item.distanceCovered
                                    ).toFixed(1)}{" "}
                                    MILES
                                  </div>
                                  <div className="col-sm-4 roueTabsMaxContent">
                                    {secondsToMinutes(item.totaltime).toFixed(
                                      2
                                    )}{" "}
                                    MIN
                                  </div>
                                  <div className="col-sm-4 roueTabsMaxContent">
                                    {metersToMiles(item.totaldistance).toFixed(
                                      1
                                    )}{" "}
                                    MILES
                                  </div>
                                </div>
                                <div className="progress">
                                  <div
                                    className="progress-bar"
                                    role="progressbar"
                                    aria-valuenow={calculatePercentage()}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                    style={{
                                      width: `${calculatePercentage(
                                        item.distanceCovered,
                                        item.totaldistance
                                      )}%`,
                                      backgroundColor: getBackgroundColor(),
                                    }}
                                  >
                                    {`${calculatePercentage(
                                      item.distanceCovered,
                                      item.totaldistance
                                    ).toFixed(1)}%`}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Accordion.Header>
                          {item?.RouteAssignmentTechnician?.map((data) => {
                            return (
                              <Accordion.Body>
                                <div className="row cslocation">
                                  <div className="col-sm-4">
                                    <div className="repairSection">
                                      <button className="bluebtn">
                                      {data?.RouteAssignmentWorkOrder?.WorkOrderTypeData?.name}
                                      </button>
                                      <div>
                                        <h6>UNPAID</h6>
                                      </div>
                                    </div>
                                    <div className="workCustomer">
                                      <h4>
                                        {
                                          data?.RouteAssignmentWaterBody
                                            ?.customer_name
                                        }
                                      </h4>
                                      <p>
                                        {
                                          data?.RouteAssignmentWaterBody
                                            ?.service_address
                                        }
                                      </p>
                                    </div>
                                    <div className="workPool">
                                      <p>
                                        {data?.RouteAssignmentWaterBody?.name}
                                      </p>
                                    </div>
                                    <div className="workStatus">
                                      <p
                                        style={{ textTransform: "capitalize" }}
                                      >
                                        Status: {item.status}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="col-sm-8">
                                    <div className="workSelect">
                                      <Card>
                                        <p>
                                          {
                                            data?.RouteAssignmentWorkOrder
                                              ?.work_needed
                                          }
                                        </p>
                                        <p>
                                          {data?.RouteAssignmentFrequency?.name}
                                        </p>
                                        <p>{data?.RouteAssignmentWorkOrder?.WorkOrderTypeData?.name}</p>
                                      </Card>
                                      <p className="workAdded">
                                        Added By:{" "}
                                        {/* {item?.Added_by?.first_name +
                                  " " +
                                  item?.Added_by?.last_name}{" "}
                                -{moment(item.updatedAt).format("YYYY-MM-DD ")}{" "} */}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </Accordion.Body>
                            );
                          })}
                        </Accordion.Item>
                      </Accordion>
                    );
                  })}
                </div>
              </div> : <h3>Loading ...</h3>
              }
              </>
            );
          }) : <NoData />}
        </Col>
      </Row>
    </Fragment>
  );
}

export default Worktabs;
