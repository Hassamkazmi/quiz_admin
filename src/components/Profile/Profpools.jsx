import React, { Fragment, useState } from "react";
import { Button, Form, Input, Space, Select, Radio } from "antd";
import Switch from "antd/lib/switch";
import Accordion from "react-bootstrap/Accordion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTechnician } from "../../redux/Slices/GetTechnician";
import { postwaterbodyData } from "../../redux/postReducer/postWaterbody";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
const { Option } = Select;
import AddpoolsCustomer from "../AddCustomers/AddpoolsCustomer";
import Workorder from "../Pool/Workorder";
import Recurringwork from "../Pool/Recurringwork";
import Equipment from "../Pool/Equipment";
import Itemneeded from "../Pool/Itemneeded";
import Servicelist from "../Pool/Servicelist";
import Previewslider from "../Pool/Previewslider";
import UploadImage from "../Pool/UploadImage";
import { fetchgetSingleCustomers } from "../../redux/Slices/getSingleCustomer";

const Profpools = () => {
  const [value, setValue] = useState();
  const navigate = useNavigate(); // Initialize useHistory

  const dispatch = useDispatch();
  const postDataResult = useSelector((state) => state.Technician);
  const postwaterResult = useSelector((state) => state.postwaterbody);
  const { data: getSingleCustomer, status } = useSelector(
    (state) => state.getSingleCustomer
  );

  const id = 212;

  useEffect(() => {
    dispatch(fetchgetSingleCustomers({ id }));
  }, [dispatch]);



  const onChange = (e) => {
    setValue(e.target.value);
  };
  const [Data, setData] = useState({
    // Pools: state.WaterBody,
  });

  const key = 1;

  const [formData, setFormData] = useState({
    // Pools: getSingleCustomer?.ServiceLocation[state?.key].WaterBody,
  });
  const [form] = Form.useForm();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [showAccoundion, setshowAccoundion] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  useEffect(() => {
    dispatch(fetchTechnician());
    dispatch(postwaterbodyData());
  }, [dispatch]);

  const onFinish = async (values) => {
    const config = {
      headers: {
        Authorization: Cookies.get("userToken"),
      },
    };
    // const WaterBodyData = values;
    // let apirequesteddata = values;
    // // const pooldata = values?.Pools;
    // const waterbodyid = apirequesteddata.waterbody_id;
    // delete apirequesteddata.waterbody_id;
    // delete apirequesteddata.admin_id;
    // delete apirequesteddata.createdAt;
    // delete apirequesteddata.updatedAt;
    // delete apirequesteddata.latitude;
    // delete apirequesteddata.longitude;
    // delete apirequesteddata.waterbody_type;
    // delete apirequesteddata.media;
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/waterbody/${values.waterbody_id}`,
        {
          assigned_day: values.assigned_day,
          customer_id: values.customer_id,
          end_date: values.end_date,
          frequency: values.frequency,
          name: values.name,
          service_location_id: values.service_location_id,
          start_date: values.start_date,
          technician_id: values.technician_id,
        },
        config
      );
      navigate("/customer");
      //   setFormData(Data);
      toast.success("Form submitted successfully!");
    } catch (err) {
      toast.error(err);
    }
    // dispatch(postwaterbodyData({ pooldata }));
  };

  const handleFormValuesChange = (changedValues, allValues) => {
    setFormData(allValues);
    setData(allValues);
  };

  // Handle successful form submission
  useEffect(() => {
    if (postwaterResult.data) {
      // form.resetFields();
      toast.success("Form submitted successfully!");
      // navigate("/customer");
    }
  }, [postwaterResult.data, navigate]);

  // Handle form submission error
  useEffect(() => {
    if (postwaterResult.error) {
      const err = postwaterResult.error;
      // form.resetFields();
      toast.error(err);
    }
  }, [postwaterResult.error]);

  const AddMore = () => {
    setshowAccoundion(true);
  };

  return (
    <Fragment>
      {showAccoundion ? <AddpoolsCustomer /> : <></>}
      {formData?.Pools?.length == 0 ? (
        <h3 className="spinnerclass">Pool Not Added Yet</h3>
      ) : (
        <></>
      )}
      <div className="row fomik">
        <Form
          name="dynamic_form_nest_item"
          onValuesChange={handleFormValuesChange}
          autoComplete="off"
        >
          <Form.List name="Pools" initialValue={formData.Pools}>
            {(fields, { add, remove, key }) => (
              <>
                <div className="col-sm-12 ">
                  <div className="row">
                    <div className="col-sm-6">
                      {/* <h2>Update Pools</h2> */}
                    </div>
                    <div className="col-sm-6 addbuttons">
                      <Button className="bluebtn form" onClick={AddMore} block>
                        Add Pool
                      </Button>
                    </div>
                  </div>
                </div>

                <Accordion defaultActiveKey="0" flush>
                  {fields.map(({ key, name, ...restField }) => (
                    <Accordion.Item eventKey={String(key)} key={key}>
                      <Accordion.Header>
                        <span>Pool {key + 1}</span>{" "}
                      </Accordion.Header>
                      <Accordion.Body>
                        <Space
                          key={key}
                          style={{ display: "flex", marginBottom: 8 }}
                          align="baseline"
                        >
                          <div className="row">
                            <div className="col-sm-12 heads">
                              <h3>Water Body</h3>
                            </div>

                            <div className="col-sm-3">
                              <Form.Item
                                {...restField}
                                name={[name, "name"]}
                                label="Pool Name"
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
                                initialValue={state.customer_id}
                              >
                                <Input placeholder="Customer id " />
                              </Form.Item>

                              <Form.Item
                                type="hidden"
                                name={[name, "service_location_id"]}
                                style={{ display: "none" }}
                                initialValue={state.service_location_id}
                              >
                                <Input placeholder="Customer id " />
                              </Form.Item>
                            </div>
                            <div className="col-sm-9 swicthbtn">
                              <Form.Item name={[name, "waterbody_type"]}>
                                <Radio.Group
                                  onChange={onChange}
                                  value={Data.Pools[key]?.waterbody_type}
                                >
                                  <div className="row">
                                    <div className="col-sm-4 switchbtn">
                                      <Radio
                                        value={"spa"}
                                        checked={
                                          Data.Pools[key]?.waterbody_type ==
                                          "spa"
                                            ? true
                                            : false
                                        }
                                      >
                                        SPA
                                      </Radio>
                                    </div>
                                    <div className="col-sm-4 switchbtn">
                                      <Radio
                                        value={"pool"}
                                        checked={
                                          Data.Pools[key]?.waterbody_type ==
                                          "pool"
                                            ? true
                                            : false
                                        }
                                      >
                                        POOLS
                                      </Radio>
                                    </div>
                                    <div className="col-sm-4 switchbtn waterfeature">
                                      <Radio
                                        value={"water feature"}
                                        checked={
                                          Data.Pools[key]?.waterbody_type ==
                                          "water feature"
                                            ? true
                                            : false
                                        }
                                      >
                                        WATER FEATURE
                                      </Radio>
                                    </div>
                                  </div>
                                </Radio.Group>
                              </Form.Item>
                            </div>

                            <div className="col-sm-12 heads">
                              <h3>Route Assignment</h3>
                            </div>

                            <div className="col-sm-3">
                              <Form.Item
                                name={[name, "technician_id"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Tech is required",
                                  },
                                ]}
                              >
                                <Select placeholder="Tech">
                                  {postDataResult.data &&
                                    postDataResult.data.map((item) => {
                                      return (
                                        <Option value={item.id}>
                                          {item.username}
                                        </Option>
                                      );
                                    })}
                                </Select>
                              </Form.Item>
                            </div>
                            <div className="col-sm-3">
                              <Form.Item
                                name={[name, "assigned_day"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Day Of Week is required",
                                  },
                                ]}
                              >
                                <Select placeholder="Day Of Week">
                                  <Option value="MONDAY">Monday</Option>
                                  <Option value="TUESDAY">Tuesday</Option>
                                  <Option value="WEDNESDAY">Wednesday</Option>
                                  <Option value="THURSDAY">Thursday</Option>
                                  <Option value="FRIDAY">Friday</Option>
                                  <Option value="SATURDAY">Saturday</Option>
                                  <Option value="SUNDAY">Sunday</Option>
                                </Select>
                              </Form.Item>
                            </div>
                            <div className="col-sm-2">
                              <Form.Item
                                name={[name, "frequency"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Frequency is required",
                                  },
                                ]}
                              >
                                <Select placeholder="Frequency">
                                  <Option value="WEEKLY">WEEKLY</Option>
                                  <Option value="EVERY_TWO_WEEKS">
                                    EVERY_TWO_WEEKS
                                  </Option>
                                  <Option value="EVERY_THREE_WEEKS">
                                    EVERY_THREE_WEEKS
                                  </Option>
                                  <Option value="EVERY_FOUR_WEEKS">
                                    EVERY_FOUR_WEEKS
                                  </Option>
                                </Select>
                              </Form.Item>
                            </div>
                            <div className="col-sm-2">
                              <Form.Item
                                name={[name, "start_date"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Start On is required",
                                  },
                                ]}
                              >
                                <DatePicker
                                  selected={selectedDate}
                                  onChange={handleDateChange}
                                  minDate={new Date()} // Disable past dates (today and beyond)
                                  dateFormat="yyyy-MM-dd" // Set the desired date format
                                  placeholderText="Select Start date"
                                />
                              </Form.Item>
                            </div>
                            <div className="col-sm-2">
                              <Form.Item
                                name={[name, "end_date"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Start After is required",
                                  },
                                ]}
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
                              <Button
                                className="bluebtn form"
                                onClick={() => remove(name)}
                              >
                                {" "}
                                Remove Pool{" "}
                              </Button>
                              <Form.Item className="savebtn">
                                {" "}
                                <Button
                                  className="yellowbtn"
                                  onClick={() =>
                                    onFinish(formData.Pools[key], key)
                                  }
                                >
                                  {" "}
                                  Update Pool{" "}
                                </Button>{" "}
                              </Form.Item>
                            </div>
                          </div>
                        </Space>
                        <Workorder />
                        <Recurringwork />
                        <Equipment />
                        <div className="row">
                          <div className="col-sm-6">
                            {" "}
                            <Itemneeded />{" "}
                          </div>
                          <div className="col-sm-6">
                            <Servicelist />
                          </div>
                        </div>
                        <UploadImage />
                        <Previewslider />
                        <div className="col-sm-12 accordfinalbtn">
                          <Form.Item>
                            <Button type="primary" htmlType="submit">
                              Save{" "}
                            </Button>
                          </Form.Item>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </>
            )}
          </Form.List>
        </Form>
      </div>
    </Fragment>
  );
};

export default Profpools;
