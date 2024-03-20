import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; // Import useHistory
import { useDispatch, useSelector } from "react-redux";
import {
  fetchgetSingleCustomers,
  STATUSES,
} from "../../redux/Slices/getSingleCustomer";
import { useParams } from "react-router-dom";
import { Skeleton } from "antd";
import { FaEdit } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import Loader from "../NoDataComponent/Loader";

export default function Profile({ isFieldsDisabled }) {
  const dispatch = useDispatch();

  const { id } = useParams();

  const [serviceIndex, setserviceIndex] = useState(0);
  const [routeIndex, setrouteIndex] = useState(0);

  const { data: getSingleCustomer, status } = useSelector(
    (state) => state.getSingleCustomer
  );

  useEffect(() => {
    dispatch(fetchgetSingleCustomers({ id }));
  }, [dispatch, id]);

  const navigate = useNavigate(); // Initialize useHistory

  const NavigateCustomer = () => {
    navigate(`/edit-customer/${id}`);
  };

  const NavigateServiceLocation = () => {
    navigate(`/edit-service-location/${id}`);
  };

  const NavigatePool = (ids) => {
    navigate(`/pool/${id}/${ids}`);
  };

  if (status === STATUSES.LOADING) {
    return <Loader />;
  }

  if (status === STATUSES.ERROR) {
    return (
      <h2
        style={{
          margin: "100px",
        }}
      >
        Something went wrong!
      </h2>
    );
  }

  function formatDate(inputDate) {
    const date = new Date(inputDate);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const handlePool = (ids) => {
    navigate(`/customer-addpools/${id}/${ids}`);
  };

  const handleService = () => {
    navigate(`/customer-servicelocation/${id}`);
  };

  return (
    <Fragment>
      <div className="row">
        <div className="row customerdetail">
          <div className="col-sm-12"></div>
          <div className="col-sm-6">
            <h5 className="Customer-h5">Customer Info</h5>
            <div className="row CustomerInfo activebody-21">
              <div className="col-sm-10">
                <div className="row">
                  <div className="col-sm-6">Name</div>
                  <div className="col-sm-6">
                    {getSingleCustomer?.first_name +
                      " " +
                      getSingleCustomer?.last_name}
                  </div>
                  <div className="col-sm-6">Email</div>
                  <div className="col-sm-6">{getSingleCustomer?.email}</div>
                  <div className="col-sm-6">Phone No</div>
                  <div className="col-sm-6">
                    {getSingleCustomer?.mobile_no_primary}
                  </div>
                  <div className="col-sm-6">Address</div>
                  <div className="col-sm-6">
                    {getSingleCustomer?.billing_address
                      ? getSingleCustomer?.billing_address
                      : "No Address"}
                  </div>
                  <div className="col-sm-6">Zip Code</div>
                  <div className="col-sm-6">{getSingleCustomer?.zipcode}</div>
                </div>
              </div>
              <div className="col-sm-2 editbtn">
                <FaEdit onClick={() => NavigateCustomer()} />
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <h5 className="Customer-h5">Invoice</h5>
            <div className="row CustomerInfo">
              {" "}
              <Skeleton
                avatar
                paragraph={{
                  rows: 4,
                }}
              />
            </div>
          </div>
        </div>
        <div className="row servicedetail">
          <div className="col-sm-12">
            <h5 className="Customer-h5"> Service Location</h5>
            <Swiper
              // slidesPerView={3}
              spaceBetween={30}
              loop={true}
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
              breakpoints={{
                320: {
                  slidesPerView: 1,
                },
                // when window width is >= 575px
                575: {
                  slidesPerView: 2,
                },
                // when window width is >= 991px
                991: {
                  slidesPerView: 3,
                },
              }}
            >
              {[...Array( getSingleCustomer?.CustomerServiceLocation?.length  + 3)].map((_, index) => (
                <SwiperSlide key={index}>
                  {index <
                  getSingleCustomer?.CustomerServiceLocation?.length ? (
                    <div
                      className={
                        serviceIndex == index
                          ? "row servicedetail-card actice-service-1"
                          : "row servicedetail-card"
                      }
                      onClick={() => setserviceIndex(index)}
                    >
                      <div className="col-sm-3">Name</div>
                      <div className="col-sm-7">
                        {
                          getSingleCustomer?.CustomerServiceLocation[index]
                            ?.name
                        }
                      </div>
                      <div className="col-sm-2">
                        {" "}
                        {serviceIndex == index ? (
                          <FaEdit onClick={() => NavigateServiceLocation()} />
                        ) : (
                          <></>
                        )}
                      </div>

                      <div className="col-sm-3">Address</div>
                      <div className="col-sm-7">
                        {
                          getSingleCustomer?.CustomerServiceLocation[index]
                            ?.address
                        }
                      </div>

                      <div className="col-sm-3">Gate Code</div>
                      <div className="col-sm-7">
                        {
                          getSingleCustomer?.CustomerServiceLocation[index]
                            ?.gate_code
                        }
                      </div>
                      <div className="col-sm-3">Dog Name</div>
                      <div className="col-sm-7">
                        {getSingleCustomer?.CustomerServiceLocation[index]
                          ?.dog_name
                          ? getSingleCustomer?.CustomerServiceLocation[index]
                              ?.dog_name
                          : "No Dog"}
                      </div>
                    </div>
                  ) : (
                    <div className="row servicedetail-card card-servicedetail-btn">
                      <Skeleton
                        avatar
                        paragraph={{
                          rows: 4,
                        }}
                      />
                      <button
                        className="addviewbtn"
                        onClick={() => handleService()}
                      >
                        Add New Service Location
                      </button>
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="row servicedetail">
          <div className="col-sm-12 befoer">
            <div className="row">
              <div className="col-sm-4">
                <h5 className="Customer-h5">Water Bodies </h5>
                {getSingleCustomer?.CustomerServiceLocation &&
                getSingleCustomer?.CustomerServiceLocation[serviceIndex]
                  ?.RouteAssignmentServiceLocation ? (
                  <>
                    {getSingleCustomer?.CustomerServiceLocation[
                      serviceIndex
                    ]?.RouteAssignmentServiceLocation.map((item, key) => (
                      <div
                        className={
                          routeIndex == key
                            ? "row waterbody-sm activebody-21"
                            : "row waterbody-sm"
                        }
                        key={key}
                        onClick={() => setrouteIndex(key)}
                      >
                        <div className="col-sm-5">Name</div>
                        <div className="col-sm-5">{item?.name}</div>
                        <div className="col-sm-2">
                          {routeIndex == key ? (
                            <FaEdit
                              onClick={() =>
                                NavigatePool(
                                  getSingleCustomer?.CustomerServiceLocation[
                                    serviceIndex
                                  ]._id
                                )
                              }
                            />
                          ) : (
                            <></>
                          )}
                        </div>

                        <div className="col-sm-5">Rate Type</div>
                        <div className="col-sm-5">
                          {item?.RateTypeDetail?.name}
                        </div>

                        <div className="col-sm-5">Assigned Route</div>
                        <div className="col-sm-5">
                          {item?.RouteAssignmentWaterBody?.length}
                        </div>

                        <div className="col-sm-5">Work Order</div>
                        <div className="col-sm-5">
                          {item?.RouteAssignmentWaterBody?.length}
                        </div>
                      </div>
                    ))}
                    {/* Ensure a minimum of 3 cards */}
                    {Array.from({
                      length: Math.max(
                        0,
                        getSingleCustomer?.CustomerServiceLocation[
                          serviceIndex
                        ]?.RouteAssignmentServiceLocation.length == 0 ? 3 :  getSingleCustomer?.CustomerServiceLocation[
                          serviceIndex
                        ]?.RouteAssignmentServiceLocation.length + 1 -
                          getSingleCustomer?.CustomerServiceLocation[
                            serviceIndex
                          ]?.RouteAssignmentServiceLocation.length
                      ),
                    }).map((_, index) => (
                      <div
                        className={
                          index === 0
                            ? "row waterbody-sm with-button"
                            : "row waterbody-sm"
                        }
                        key={`empty-card-${index}`}
                      >
                        <Skeleton
                          avatar
                          paragraph={{
                            rows: 4,
                          }}
                        />
                        {index === 0 && (
                          <button
                            className="addviewbtn"
                            onClick={() =>
                              handlePool(
                                getSingleCustomer?.CustomerServiceLocation[
                                  serviceIndex
                                ]._id
                              )
                            }
                          >
                            Add New Pool
                          </button>
                        )}
                      </div>
                    ))}
                  </>
                ) : (
                  // Display at least 3 empty cards when the array is empty
                  <>
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div
                        className={
                          index === 0
                            ? "row waterbody-sm with-button"
                            : "row waterbody-sm"
                        }
                        key={`empty-card-${index}`}
                      >
                        <Skeleton
                          avatar
                          paragraph={{
                            rows: 4,
                          }}
                        />
                      </div>
                    ))}
                  </>
                )}
              </div>

              <div className="col-sm-4">
                <h5 className="Customer-h5">Route Assignment</h5>
                {getSingleCustomer?.CustomerServiceLocation ? (
                  <>
                    {getSingleCustomer?.CustomerServiceLocation[serviceIndex]
                      ?.RouteAssignmentServiceLocation?.length !== 0 ? (
                      getSingleCustomer?.CustomerServiceLocation[serviceIndex]
                        ?.RouteAssignmentServiceLocation[routeIndex]
                        .RouteAssignmentWaterBody &&
                      getSingleCustomer?.CustomerServiceLocation[
                        serviceIndex
                      ]?.RouteAssignmentServiceLocation[
                        routeIndex
                      ].RouteAssignmentWaterBody?.map((item, key) => (
                        <div
                          className="row waterbody-sm activebody-21 newdata-css-12"
                          key={key}
                          onClick={() => setrouteIndex(key)}
                        >
                          <div className="col-sm-5">Tech Name</div>
                          <div className="col-sm-5">
                            {item?.RouteAssignmentTechnician?.first_name +
                              " " +
                              item?.RouteAssignmentTechnician?.last_name}
                          </div>
                          <div className="col-sm-2">{/* <FaEdit /> */}</div>
                          <div className="col-sm-5">Day of week</div>
                          <div className="col-sm-5">{item?.assigned_date}</div>
                          <div className="col-sm-5">Frequency</div>
                          <div className="col-sm-5">
                            {item?.RouteAssignmentFrequency?.name}
                          </div>
                          <div className="col-sm-5">Start/End</div>
                          <div className="col-sm-5">
                            {formatDate(item?.start_date)}/
                            {item?.end_date
                              ? formatDate(item?.end_date)
                              : "No End"}
                          </div>
                        </div>
                      ))
                    ) : (
                      <></>
                    )}
                    {Array.from({
                      length: Math.max(
                        0,
                        3 -
                          (getSingleCustomer?.CustomerServiceLocation[
                            serviceIndex
                          ]?.RouteAssignmentServiceLocation[routeIndex]
                            ?.WaterBodyData?.length || 0)
                      ),
                    }).map((_, index) => (
                      <div
                        className="row waterbody-sm"
                        key={`empty-card-${index}`}
                      >
                        <Skeleton
                          avatar
                          paragraph={{
                            rows: 4,
                          }}
                        />
                      </div>
                    ))}
                  </>
                ) : (
                  <></>
                )}
              </div>

              <div className="col-sm-4">
                <h5 className="Customer-h5">Work Orders</h5>
                {getSingleCustomer?.CustomerServiceLocation ? (
                  <>
                    {getSingleCustomer?.CustomerServiceLocation[serviceIndex]
                      ?.RouteAssignmentServiceLocation?.length !== 0 ? (
                      getSingleCustomer?.CustomerServiceLocation[
                        serviceIndex
                      ]?.RouteAssignmentServiceLocation[
                        routeIndex
                      ].WaterBodyData?.map((item, key) => (
                        <div
                          className="row waterbody-sm activebody-21"
                          key={key}
                          onClick={() => setrouteIndex(key)}
                        >
                          <div className="col-sm-5">Tech Name</div>
                          <div className="col-sm-5">
                            {item?.TechnicianData?.first_name +
                              " " +
                              item?.TechnicianData?.last_name}
                          </div>
                          <div className="col-sm-2">{/* <FaEdit /> */}</div>

                          <div className="col-sm-5">Work Order Type</div>
                          <div className="col-sm-5">
                            {item?.WorkOrderTypeData?.name}
                          </div>

                          <div className="col-sm-5">Date</div>
                          <div className="col-sm-5">
                            {formatDate(item?.service_date)}
                          </div>

                          <div className="col-sm-5">Status</div>
                          <div className="col-sm-5">
                            {item?.labor_cost_paid ? "Completed" : "Pending"}
                          </div>
                        </div>
                      ))
                    ) : (
                      <></>
                    )}
                    {Array.from({
                      length: Math.max(
                        0,
                        3 -
                          (getSingleCustomer?.CustomerServiceLocation[
                            serviceIndex
                          ]?.RouteAssignmentServiceLocation[routeIndex]
                            ?.WaterBodyData?.length || 0)
                      ),
                    }).map((_, index) => (
                      <div
                        className="row waterbody-sm"
                        key={`empty-card-${index}`}
                      >
                        <Skeleton
                          avatar
                          paragraph={{
                            rows: 4,
                          }}
                        />
                      </div>
                    ))}
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
