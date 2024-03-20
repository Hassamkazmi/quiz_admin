import React, { useState } from "react";
import { Button, Form, Input, Space, Select, DatePicker, Radio } from "antd";
import Switch from "antd/lib/switch";
import Accordion from "react-bootstrap/Accordion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTechnician } from "../../redux/Slices/GetTechnician";
import {
  postwaterbodyData,
  resetData,
} from "../../redux/postReducer/postWaterbody";
import { toast } from "react-toastify";
import { fetchgetwaterbodyType } from "../../redux/Slices/getWaterbodyType";
import { fetchgetfrequency } from "../../redux/Slices/getfrequency";
import { fetchgetRateType } from "../../redux/Slices/getRateType";
import { fetchgetLaborCost } from "../../redux/Slices/getLaborCost";
import { Modal } from "react-bootstrap";
import PoolTypeModal from "../Pool/PoolTypeModal";
import moment from "moment";

const { Option } = Select;

const AddpoolsCustomer = () => {
  const [value, setValue] = useState();
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const { pathname } = useLocation();

  const [formData, setFormData] = useState({
    Pools: [{ name: "" }],
  });
  const [form] = Form.useForm();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [show, setShow] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [poolName, setPoolName] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleDateChange = (date) => {
    // Format the selected date as "YYYY-MM-DD"
    const formattedDate = moment(date).format("YYYY-MM-DD");
    setSelectedDate(formattedDate);
  };


  const handleDayChange = (value) => {
    setSelectedDay(value);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };
  const navigate = useNavigate(); // Initialize useory
  // URL from which to extract IDs
  const url = pathname;

  // Split the URL by "/"
  const parts = url.split("/");

  // Extract the IDs from the parts
  const customerID = parts[parts.length - 2];
  const ServiceLocationID = parts[parts.length - 1];

  const dispatch = useDispatch();

  const { data, loading, success, error } = useSelector(
    (state) => state.postwaterbody
  );
  const postDataResult = useSelector((state) => state.Technician);
  const postwaterResult = useSelector((state) => state.postwaterbody);
  const postwaterType = useSelector((state) => state.getwaterbodyType);
  const postfrequency = useSelector((state) => state.getfrequency);
  const laborcosttype = useSelector((state) => state.getLaborCost);
  const racetype = useSelector((state) => state.getRateType);

  const handleFormValuesChange = (changedValues, allValues) => {
    setFormData(allValues);
  };
  useEffect(() => {
    dispatch(fetchTechnician());
    dispatch(fetchgetwaterbodyType());
    dispatch(fetchgetfrequency());
    dispatch(fetchgetRateType());
    dispatch(fetchgetLaborCost());
  }, [dispatch]);

  const onFinish = (values, key) => {
    console.log(values);

    if (!selectedEndDate) {
      values?.Pools?.forEach((pool) => {
        pool.stop_date = null;
      });
    } else {
      values?.Pools?.forEach((pool) => {
        pool.stop_date = selectedEndDate;
      });
    }

    const pooldata = values.Pools;
    dispatch(postwaterbodyData({ pooldata }));
  };

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(resetData());
      navigate(`/pool/${customerID}/${ServiceLocationID}`);
    }
    if (error) {
      toast.error(error);
      dispatch(resetData());
    }
  }, [error, success]);

  const handlePoolName = (e) => {
    setPoolName(e.target.value)
  }

  return (
    <div className="row fomik">
      <Form
        name="dynamic_form_nest_item"
        onValuesChange={handleFormValuesChange}
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.List name="Pools" initialValue={formData.Pools}>
          {(fields, { add, remove, key }) => (
            <>
              <div className="col-sm-12 margin-top-css">
                <div className="row">
                  <div className="col-sm-6">
                    <h2>Add Pools</h2>
                  </div>
                  
                </div>
              </div>

              <Accordion defaultActiveKey="0" flush>
                {fields.map(({ key, name, ...restField }) => (
                  <Accordion.Item eventKey={String(key)} key={key}>
                    <Accordion.Header>
                      <span>{poolName ? poolName : "Pool Name"}</span>{" "}
                    </Accordion.Header>
                    <Accordion.Body>
                      <Space
                        key={key}
                        style={{ display: "flex", marginBottom: 8 }}
                        align="baseline"
                      >
                    
                          <div className="row cslocation addPOOLCustomer">
                            <div className="col-sm-12 heads">
                              <h3>Water Body</h3>
                            </div>
                        

                          <div className="col-sm-12">
                            <Form.Item
                              {...restField}
                              label="Pool Name"
                              onChange={handlePoolName}
                              name={[name, "name"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Pool Name is Invalid",
                                },
                              ]}
                            >
                              <Input placeholder="Pool Name" type="text" />
                            </Form.Item>

                            <Form.Item
                              type="hidden"
                              name={[name, "customer_id"]}
                              style={{ display: "none" }}
                              initialValue={customerID}
                            >
                              <Input placeholder="Customer id " />
                            </Form.Item>

                            <Form.Item
                              type="hidden"
                              name={[name, "service_location_id"]}
                              style={{ display: "none" }}
                              initialValue={ServiceLocationID}
                            >
                              <Input placeholder="Customer Id" />
                            </Form.Item>
                          </div>
                          <div className="col-sm-10 swicthbtn radioAddPoolCustomer">
                            <Form.Item
                              name={[name, "waterbody_type_id"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Please select Waterbody Type",
                                },
                              ]}
                            >
                              <Radio.Group
                                onChange={onChange}
                                value={value}
                                key={key}
                              >
                                {postwaterType.data.map((item) => {
                                  return (
                                    <div className="col-sm-2 switchbtn radioBtnAddPoolCustomer">
                                      <Radio value={item._id}>
                                        {item.name}
                                      </Radio>
                                    </div>
                                  );
                                })}
                              </Radio.Group>
                              
                            </Form.Item>
                            
                          </div>
                          <div className="col-sm-2 addPoolTypeBtn">
                            <Button className="bluebtn" onClick={handleShow}>
                              Add Pool Type{" "}
                            </Button>
                          </div>
                          <div className="col-sm-3">
                            <Form.Item
                              name={[name, "rate"]}
                              label="Rate"
                              rules={[
                                { required: true, message: "Invalid Rate" },
                              ]}
                            >
                              <Input placeholder="Rate" type="number" />
                            </Form.Item>
                          </div>

                          <div className="col-sm-3">
                            <Form.Item
                              name={[name, "rate_type_id"]}
                              label="Rate Type"
                              rules={[
                                {
                                  required: true,
                                  message: "Rate Type is required",
                                },
                              ]}
                            >
                              <Select placeholder="Rate Type">
                                {racetype?.data?.map((item) => {
                                  return (
                                    <Option value={item._id}>
                                      {item.label}
                                    </Option>
                                  );
                                })}
                              </Select>
                            </Form.Item>
                          </div>

                          <div className="col-sm-3">
                            <Form.Item
                              label="Labor Cost"
                              name={[name, "labor_cost"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Invalid Labor Cost",
                                },
                              ]}
                            >
                              <Input placeholder="Labor Cost" type="number" />
                            </Form.Item>
                          </div>

                          <div className="col-sm-3">
                            <Form.Item
                              name={[name, "labor_cost_type_id"]}
                              label="Labor Cost Type"
                              rules={[
                                {
                                  required: true,
                                  message: "Labor Cost Type is required",
                                },
                              ]}
                            >
                              <Select placeholder="Labot Cost Type">
                                {laborcosttype?.data?.map((item) => {
                                  return (
                                    <Option value={item._id}>
                                      {item.label}
                                    </Option>
                                  );
                                })}
                              </Select>
                            </Form.Item>
                          </div>

                          <div className="col-sm-4">
                            <Form.Item
                              name={[name, "minutes_per_stop"]}
                              label="Minutes at Stop"
                              rules={[
                                {
                                  required: true,
                                  message: "Invalid Minutes Of Stop",
                                },
                              ]}
                            >
                              <Input
                                placeholder="Minutes Of Stop"
                                type="number"
                              />
                            </Form.Item>
                          </div>

                          <div className="col-sm-4">
                            <Form.Item
                              name={[name, "size"]}
                              label="Gallons"
                              // rules={[
                              //   {
                              //     required: true,
                              //     message: "Invalid Size",
                              //   },
                              // ]}
                            >
                              <Input placeholder="Size" type="number" />
                            </Form.Item>
                          </div>

                          <div className="col-sm-4">
                            <Form.Item
                              name={[name, "pressure"]}
                              label="Base Filter Pressure"
                              // rules={[
                              //   {
                              //     required: true,
                              //     message: "Invalid pressure",
                              //   },
                              // ]}
                            >
                              <Input placeholder="Pressure" type="text" />
                            </Form.Item>
                          </div>

                          <div className="col-sm-12">
                            <Form.Item
                              name={[name, "notes"]}
                              label="Notes"
                              // rules={[
                              //   {
                              //     required: true,
                              //     message: "Invalid notes",
                              //   },
                              // ]}
                            >
                              <Input placeholder="Notes" type="text" />
                            </Form.Item>
                          </div>

                          <div className="col-sm-12 heads">
                            <h3>Route Assignment</h3>
                          </div>

                          <div className="col-sm-3">
                            <Form.Item
                              name={[name, "technician_id"]}
                              label="Tech Name"
                            >
                              <Select placeholder="Tech">
                                {postDataResult.data &&
                                  postDataResult?.data?.items?.map((item) => {
                                    return (
                                      <Option value={item._id}>
                                        {item.first_name}
                                      </Option>
                                    );
                                  })}
                              </Select>
                            </Form.Item>
                          </div>
                          <div className="col-sm-3">
                            <Form.Item
                              name={[name, "assigned_day"]}
                              label="Day Of Week"
                            >
                              <Select
                                placeholder="Day Of Week"
                                onChange={handleDayChange}
                                value={selectedDay}
                              >
                                <Option value="monday">Monday</Option>
                                <Option value="tuesday">Tuesday</Option>
                                <Option value="wednesday">Wednesday</Option>
                                <Option value="thursday">Thursday</Option>
                                <Option value="friday">Friday</Option>
                                <Option value="saturday">Saturday</Option>
                                <Option value="sunday">Sunday</Option>
                              </Select>
                            </Form.Item>
                          </div>
                          <div className="col-sm-2 forFour">
                            <Form.Item
                              name={[name, "frequency_id"]}
                              label="Frequency"
                            >
                              <Select placeholder="Never">
                                {postfrequency?.data?.map((item) => {
                                  return (
                                    <Option value={item._id}>
                                      {item.label}
                                    </Option>
                                  );
                                })}
                              </Select>
                            </Form.Item>
                          </div>
                          <div className="col-sm-2 forFour">
                            <Form.Item
                              name={[name, "start_date"]}
                              label="Start Date"
                              // rules={[
                              //   {
                              //     required: true,
                              //     message: "Start Date is Required",
                              //   },
                              // ]}
                            >
                               <DatePicker
                                selected={selectedDate}
                                onChange={handleDateChange}
                                placeholderText="Select Start date"
                              />
                            </Form.Item>
                          </div>
                          <div className="col-sm-2 forFour">
                            <Form.Item
                              name={[name, "stop_date"]}
                              label="End Date"
                              // rules={[
                              //   {
                              //     required: true,
                              //     message: "End Date is Required",
                              //   },
                              // ]}
                            >
                              <DatePicker
                                selected={selectedEndDate}
                                onChange={handleEndDateChange}
                                minDate={new Date()} // Disable past dates (today and beyond)
                                dateFormat="yyyy-MM-dd" // Set the desired date format
                                placeholderText="Select End date"
                              />
                            </Form.Item>
                          </div>

                          <div className="col-sm-12 buttonsservice">
                            {/* <Button
                              className="bluebtn form"
                              onClick={() => remove(name)}
                            >
                              {" "}
                              Remove Pool{" "}
                            </Button> */}
                            <Form.Item className="savebtn">
                              {" "}
                              <Button
                                className="yellowbtn"
                                onClick={() =>
                                  onFinish(form.getFieldsValue(), key)
                                }
                                loading={loading}
                                disabled={loading}
                                htmlType="submit"
                              >
                                {" "}
                                Save Pools{" "}
                              </Button>{" "}
                            </Form.Item>
                            {/* <Link to="/pool">
                              <Button className="bluebtn form">
                                {" "}
                                View Pools{" "}
                              </Button>
                            </Link> */}
                          </div>
                        </div>
                      </Space>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </>
          )}
        </Form.List>
      </Form>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Body>
          Pool Type
          <Button variant="secondary" onClick={handleClose}>
            X
          </Button>
        </Modal.Body>
        <PoolTypeModal data={handleClose} />
      </Modal>
    </div>
  );
};

export default AddpoolsCustomer;































