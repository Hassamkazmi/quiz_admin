import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  Tooltip,
  Space,
  Breadcrumb,
} from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import Switch from "antd/lib/switch";
import Accordion from "react-bootstrap/Accordion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
const { Option } = Select;
import axios from "axios";
import moment from "moment";
import CustomerServiceLocation from "../../components/AddCustomers/CustomerServiceLocation";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchgetCustomerServices,
  STATUSES,
} from "../../redux/Slices/getCustomerService";
import {
  updateServiceLocationData,
  resetData,
} from "../../redux/postReducer/postServiceLocation";
import { useParams } from "react-router-dom";
import { fetchgetCustomerCountry } from "../../redux/Slices/getCustomerCountry";
import { fetchgetAllCityByCountry } from "../../redux/Slices/getCustomerCity";
import { fetchgetCustomerState } from "../../redux/Slices/getCustomerState";
import { fetchSalesTaxGroupName } from "../../redux/Slices/getSaleGroupName";

import Loader from "../NoDataComponent/Loader";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { LoadScript } from "@react-google-maps/api";

const { Item } = Form;

const ProfServicelocation = () => {
  const { data: getCustomerService, status } = useSelector(
    (state) => state.getCustomerService
  );

  const { data, loading, success, error } = useSelector(
    (state) => state.postServiceLocation
  );
  const { id } = useParams();
  const GetSaleGroup = useSelector((state) => state.SalesTaxGroupName);
  const [activeKey, setActiveKey] = useState(0);
  const [showAccordion, setShowAccordion] = useState(true); // assuming initial state is true

  const customerstate = useSelector((state) => state.getCustomerState);
  const customercity = useSelector((state) => state.getCustomerCity);
  const customercountry = useSelector((state) => state.getCustomerCountry);
  const postServiceLocation = useSelector((state) => state.postServiceLocation);

  const [Country, setCountry] = useState("");
  const [State, setState] = useState("");
  const [City, setCity] = useState("");
  const [isFieldsDisabled, setIsFieldsDisabled] = useState(true);
  const [countryid, setcountryid] = useState("");

  const dispatch = useDispatch();
  const [showAccoundion, setshowAccoundion] = useState(false);
  const form = Form.useForm()[0];

  const UpdatePoolLocationNavigation = (id1, key) => {
    const ids = getCustomerService[key]?._id;
    navigate(`/pool/${id}/${ids}`);
  };


  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  const handleSelect = async (selectedAddress) => {
    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);
      setAddress(selectedAddress);
      setCoordinates(latLng);
    } catch (error) {
      console.error("Error fetching coordinates", error);
    }
  };

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ServiceLocation: getCustomerService,
  });

  useEffect(() => {
    dispatch(fetchgetCustomerServices({ id }));
  }, [dispatch]);

  useEffect(() => {
    setFormData(getCustomerService);
  }, [getCustomerService]);

  const value = ""

  useEffect(() => {
    window.scrollTo(0,0)
    dispatch(fetchgetCustomerCountry());
    dispatch(fetchSalesTaxGroupName());

  }, [dispatch]);

  const handleFormValuesChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

  useEffect(() => {
    if (formData?.length == 0) {
      setshowAccoundion(true);
    } else {
      setshowAccoundion(false);
    }
  }, []);

  useEffect(() => {
    if (getCustomerService && getCustomerService) {
      form.setFieldsValue({
        ServiceLocation: getCustomerService.map((location, index) => ({
          address: location.address,
          state_id: location?.statename || "",
          city_id: location?.cityname || "",
          country_id: location?.countryname || "",
          dog_name: location.dog_name || "",
          email: location.email,
          gate_code: location.gate_code,
          latitude: location.latitude,
          longitude: location.longitude,
          mobile_no: location.mobile_no_primary,
          mobile_no_secondary: location.mobile_no_secondary || "",
          name: location.name,
          notes: location.notes,
          notify_email: location.notify_email,
          notify_sms: location.notify_sms,
          notify_work_completion_email: location.notify_work_completion_email,
          notify_work_completion_sms: location.notify_work_completion_sms,
          sales_tax_group: location?.SalesTaxGroupSalesTaxGroupNameId?.name,
          _id: location._id,
          zipcode: location.zipcode,

          key: index.toString(),
        })),
      });
    }
  }, [getCustomerService, form]);

  const handleChange = (id) => {
    setCountry(id);
    dispatch(fetchgetCustomerState({ id }));
  };


  const onSearch = (name) => {
    dispatch(fetchgetAllCityByCountry({countryid,name}));
  };


  const handleChangeCity = (countryid) => {
    setcountryid(countryid)
    const value = "";
    dispatch(fetchgetAllCityByCountry({ countryid , value }));
  };

  const handleSetCity = (cityid) => {
    setCity(cityid)
  };

  const [emails, setEmails] = useState([]);

  const addEmail = () => {
    setEmails([...emails, ""]);
  };

  const removeEmail = (index) => {
    const updatedEmails = [...emails];
    updatedEmails.splice(index, 1);
    setEmails(updatedEmails);
  };

  const handleEmailChange = (index, value) => {
    const updatedEmails = [...emails];
    updatedEmails[index] = value;
    setEmails(updatedEmails);
  };
  const handleCustomer = (id) => {
    setCustomerId(id);
  };

  const filterOption = (input, option) => {
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  const AddMore = () => {
    setshowAccoundion(!showAccoundion);
    setShowAccordion(false);

    window.scrollTo(0, document.body.scrollHeight);
  };


  const DeleteLocation = async (Id, key) => {
    console.log(Id, key);
    try {
      const config = {
        headers: {
          Authorization: Cookies.get("userToken"),
        },
      };
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/serviceLocation/${Id}`,
        config
      );
      toast.success("Location Delete SuccessFully");
      dispatch(fetchgetCustomerServices({ id }));
    } catch (err) {
      const error = err.response.data.message;
      toast.error(error);
    }
  };

  const handleupdate = async (value, key) => {
    const values = value?.ServiceLocation
      ? value?.ServiceLocation[key]
      : value[key];

    const id = values?._id;    
    try {
      const data = {
        address: values.address,
        city_id: City === "" ? getCustomerService[key].city_id : City,
        country_id: countryid === "" ? getCustomerService[key].country_id : countryid,
        dog_name: values.dog_name || "",
        email: values.email,
        gate_code: values.gate_code,
        longitude: coordinates?.lng?.toString(),
        latitude: coordinates?.lat?.toString(),
        mobile_no: values.mobile_no_primary,
        mobile_no_secondary: values.mobile_no_secondary || "",
        name: values.name,
        notes: values.notes,
        notify_email: values.notify_email,
        notify_sms: values.notify_sms,
        notify_work_completion_email: values.notify_work_completion_email,
        notify_work_completion_sms: values.notify_work_completion_sms,
        sales_tax_group: values.sales_tax_group,
        _id: values._id,
        // state_id: State === "" ? getCustomerService[key].state_id : State,
        zipcode: values.zipcode,
      };
      await dispatch(updateServiceLocationData({ id, data }));
    } catch (err) {
      toast.error(err);
    }
  };

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(resetData());
    }
    if (error) {
      toast.error(error);
      dispatch(resetData());
    }
  }, [error, success]);

  const onFinishFailed = (errorInfo) => {
    toast.error("Please fill all required fields!");
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

  const HandleEdit = () => {
    setIsFieldsDisabled(!isFieldsDisabled);
  };

  const handleNav1 = () => {
    navigate(`/customerview/${id}`);
  };

  const handleNav2 = () => {
    navigate("/customer");
  };

  return (
    <div className="row fomik">
      <Form
        name="dynamic_form_nest_item"
        onValuesChange={handleFormValuesChange}
        form={form}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        initialValue={formData.ServiceLocation}
      >
        <Form.List
          name="ServiceLocation"
          className="profServiceLocationAccordion"
        >
          {(fields, { add, remove }) => (
            <>
              <div className="col-sm-12 margin-top-css heading">
                <div className="row cslocation profServHeading">
                  <div className="col-sm-6 servLoch2">
                    <h2>Service Location</h2>

                    <Breadcrumb
                      items={[
                        {
                          title: (
                            <p
                              style={{ cursor: "pointer" }}
                              onClick={handleNav2}
                            >
                              Customer Listing
                            </p>
                          ),
                        },
                        {
                          title: (
                            <p
                              style={{ cursor: "pointer" }}
                              onClick={handleNav1}
                            >
                              Customer View
                            </p>
                          ),
                        },
                      ]}
                    />
                  </div>

                  <div className="col-sm-6 addbuttons">
                    <Button
                      className="bluebtn  profServiceLocationBlue inner1"
                      style={{ padding: "6px 10px 4px 30px" }}
                      onClick={HandleEdit}
                    >
                      {" "}
                      Edit{" "}
                    </Button>
                    <Button
                      className="bluebtn profServiceLocationBlue"
                      onClick={AddMore}
                    >
                     {showAccoundion ? "Remove" : "Add More"} 
                    </Button>
                  </div>
                </div>
              </div>

              <Accordion flush>
                {fields?.map(({ key, name, ...restField }) => (
                  <Accordion.Item eventKey={key} key={key}>
                    <Accordion.Header>
                      <div className="profServiceLocationBlueflex1">
                        <span>{getCustomerService[key]?.name}</span>{" "}
                        <Button
                          className="bluebtn  profServiceLocationBlue inner1"
                          style={{ padding: "6px 10px 4px 30px" }}
                          onClick={() =>
                            UpdatePoolLocationNavigation(
                              formData[key]?._id,
                              key
                            )
                          }
                        >
                          {" "}
                          View Pools{" "}
                        </Button>
                      </div>
                    </Accordion.Header>

                    <Accordion.Body collapsible={!showAccordion}>
                      <Space
                        key={key}
                        style={{ display: "flex", marginBottom: 8 }}
                        align="baseline"
                      >
                        <div className="row cslocation">
                          <div className="col-sm-12">
                            <Form.Item
                              {...restField}
                              name={[name, "name"]}
                              label="Location Name"
                              rules={[
                                {
                                  required: true,
                                  message: "Missing Location name",
                                },
                              ]}
                            >
                              <Input
                                disabled={isFieldsDisabled}
                                placeholder="Location Name"
                              />
                            </Form.Item>

                            <Form.Item
                              type="hidden"
                              name={[name, "customer_id"]}
                              style={{ display: "none" }}
                              initialValue={formData.customer_id}
                            >
                              <Input
                                disabled={isFieldsDisabled}
                                placeholder="Customer id "
                              />
                            </Form.Item>

                            <Form.Item
                              type="hidden"
                              name={[name, "_id"]}
                              style={{ display: "none" }}
                            >
                              <Input
                                disabled={isFieldsDisabled}
                                placeholder="Customer id "
                              />
                            </Form.Item>
                          </div>

                          <div className="col-sm-6">
                            <Form.Item
                              name={[name, "country_id"]}
                              // name="country_id"
                              label="Country"
                              rules={[
                                {
                                  required: true,
                                  message: "Please input your Country!",
                                },
                              ]}
                            >
                              <Select
                                placeholder="Country"
                                onChange={handleChangeCity}
                                showSearch
                                disabled={isFieldsDisabled}
                                filterOption={filterOption}
                              >
                                {customercountry?.data?.map((item) => {
                                  return (
                                    <Option value={item._id}>
                                      {item.name}
                                    </Option>
                                  );
                                })}
                              </Select>
                            </Form.Item>
                          </div>

                          

                          <div className="col-sm-6">
                          <Form.Item
                              
                              name={[name, "city_id"]}
                              // name="city_id"
                              
                              label="City"
                              rules={[
                                {
                                  required: true,
                                  message: "Please input your city!",
                                },
                              ]}
                            >
                                          <Select
                              placeholder="City"
                              showSearch
                              onChange={handleSetCity}
                              disabled={isFieldsDisabled}
                              filterOption={filterOption}
                              onSearch={onSearch}
                            >
                              {customercity?.data?.map((item, i) => {
                                return <Option value={item?._id}>{item?.name}</Option>;
                              })}
                            </Select>
                            </Form.Item>
                          </div>

                          <div className="col-sm-6">
                            <Form.Item
                              {...restField}
                              name={[name, "zipcode"]}
                              label="Zip Code"
                              rules={[
                                {
                                  required: true,
                                  message:
                                    "Missing Zip Code for service location",
                                },
                              ]}
                            >
                              <Input
                                disabled={isFieldsDisabled}
                                placeholder="Zip-Code"
                                type="number"
                              />
                            </Form.Item>
                          </div>

                          <div className="col-sm-6">

<Form.Item
                  label="Address"
                  
                  name={[name, "address"]}
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: "Please input your Customer Address!",
                  //   },
                  // ]}
                >
                  <Input disabled={isFieldsDisabled} placeholder="Address" />
                </Form.Item>
              
                            </div>

                          <div className="col-sm-12">
                            <Form.Item
                              {...restField}
                              name={[name, "email"]}
                              label="Email"
                              rules={[
                                {
                                  type: "email",
                                  message: "The input is not valid E-mail!",
                                },
                                { required: true, message: "Email is Invalid" },
                              ]}
                            >
                              <Input
                                disabled={isFieldsDisabled}
                                placeholder="E-mail"
                              />
                            </Form.Item>
                          </div>

                          <div className="col-sm-12">
                            {emails.map((email, index) => (
                              <span className="display-flex-1" key={index}>
                                <Space
                                  style={{
                                    display: "flex",
                                    marginBottom: 8,
                                  }}
                                  align="baseline"
                                >
                                  <Input
                                    value={email}
                                    onChange={(e) =>
                                      handleEmailChange(index, e.target.value)
                                    }
                                    type="email"
                                    placeholder={`Emails`}
                                  />
                                </Space>
                                <MinusCircleOutlined
                                  onClick={() => removeEmail(index)}
                                />
                              </span>
                            ))}
                            <Button
                              type="dashed"
                              onClick={addEmail}
                              block
                              disabled={isFieldsDisabled}
                              icon={<PlusOutlined />}
                            >
                              Add Multiple Emails
                            </Button>
                          </div>

                          <div className="col-sm-12">
                            <Form.Item
                              {...restField}
                              label="Mobile No"
                              name={[name, "mobile_no"]}

                              // rules={[
                              //   {
                              //     required: true,
                              //     message: "Number is Invalid",
                              //   },
                              // ]}
                            >
                              <Input
                                placeholder="Mobile # (Primary)"
                                type="number"
                                disabled={isFieldsDisabled}
                              />
                            </Form.Item>
                          </div>

                         

                          <div className="col-sm-12">
                            <Form.List name="mobile_no">
                              {(fields, { add, remove }) => (
                                <>
                                  {fields.map(({ key, name, ...restField }) => (
                                    <span className="display-flex-1">
                                      <Space
                                        key={key}
                                        style={{
                                          display: "flex",
                                          marginBottom: 8,
                                        }}
                                        align="baseline"
                                      >
                                        <Form.Item
                                          {...restField}
                                          name={[name, "mobile_no_primary"]}
                                          rules={[
                                            {
                                              required: true,
                                              message: "Missing Mobile No #",
                                            },
                                          ]}
                                        >
                                          <Input
                                            placeholder="Mobile #"
                                            type="number"
                                          />
                                        </Form.Item>
                                      </Space>
                                      <MinusCircleOutlined
                                        onClick={() => remove(name)}
                                      />
                                    </span>
                                  ))}
                                  <Form.Item>
                                    <Button
                                      type="dashed"
                                      disabled={isFieldsDisabled}
                                      onClick={() => add()}
                                      block
                                      icon={<PlusOutlined />}
                                    >
                                      Add Multiple Mobile No
                                    </Button>
                                  </Form.Item>
                                </>
                              )}
                            </Form.List>
                          </div>

                         

                          <div className="col-sm-4">
                            <Form.Item
                              {...restField}
                              label="Gate Code"
                              name={[name, "gate_code"]}
                              rules={[
                                {
                                  required: true,
                                  message:
                                    "Missing Gate Code for service location",
                                },
                              ]}
                            >
                              <Input
                                placeholder="Gate Code"
                                disabled={isFieldsDisabled}
                                type="number"
                              />
                            </Form.Item>
                          </div>

                          <div className="col-sm-4">
                            <Form.Item
                              {...restField}
                              name={[name, "dog_name"]}
                              label="Dogs Name"
                            >
                              <Input
                                placeholder="Dogs Name (optional)"
                                type="text"
                                disabled={isFieldsDisabled}
                              />
                            </Form.Item>
                          </div>

                          <div className="col-sm-4">
                        <Form.Item
                          name="sales_tax_group"
                          label="Sales Tax"
                          // rules={[
                          //   {
                          //     required: true,
                          //     message: "Sales Tax is required",
                          //   },
                          // ]}
                        >
                          <Select placeholder="Sales Tax Group"  disabled={isFieldsDisabled}>
                            {GetSaleGroup?.data?.map((item) => {
                              return (
                                <Option value={item._id}>{item.name}</Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                      </div>

                          <div className="col-sm-12">
                            <Form.Item
                              {...restField}
                              name={[name, "notes"]}
                              label="Notes"
                              // rules={[
                              //   {
                              //     required: true,
                              //     message: "Notes are Invalid",
                              //   },
                              // ]}
                              initialValue={formData?.notes}
                            >
                              <Input
                                disabled={isFieldsDisabled}
                                placeholder="Notes"
                                type="text"
                              />
                            </Form.Item>
                          </div>
                          <div className="col-sm-12 heads">
                            <h3>Communications</h3>
                          </div>
                          <div className="col-sm-3 com switchbtn">
                            <label>
                              Notify Customer Through SMS on Arrival
                            </label>

                            <Form.Item
                              valuePropName="checked"
                              name={[name, "notify_sms"]}
                              label="Turn On To Notify"
                              initialValue={formData?.notify_sms}
                              disabled={isFieldsDisabled}
                            >
                              <Switch />
                            </Form.Item>
                          </div>
                          <div className="col-sm-3 com switchbtn">
                            <label>
                              Notify Customer Through Email on Arrival
                            </label>
                            <Form.Item
                              valuePropName="checked"
                              name={[name, "notify_email"]}
                              label="Turn On To Notify"
                              initialValue={formData?.notify_email}
                              disabled={isFieldsDisabled}
                            >
                              <Switch />
                            </Form.Item>
                          </div>
                          <div className="col-sm-3 com switchbtn">
                            <label>
                              Notify Customer on work compeleted via SMS
                            </label>
                            <Form.Item
                              valuePropName="checked"
                              name={[name, "notify_work_completion_sms"]}
                              label="Turn On To Notify"
                              disabled={isFieldsDisabled}
                              initialValue={
                                formData?.notify_work_completion_sms
                              }
                            >
                              <Switch />
                            </Form.Item>
                          </div>
                          <div className="col-sm-3 com switchbtn">
                            <label>
                              Notify Customer on work compeleted via Email
                            </label>
                            <Form.Item
                              valuePropName="checked"
                              name={[name, "notify_work_completion_email"]}
                              label="Turn On To Notify"
                              initialValue={
                                formData?.notify_work_completion_email
                              }
                            >
                              <Switch />
                            </Form.Item>
                          </div>

                          <div className="col-sm-12 buttonsservice">
                            <Button
                              className="bluebtn  profServiceLocationBlue"
                              onClick={() => DeleteLocation(formData, key)}
                              disabled={isFieldsDisabled}
                            >
                              {" "}
                              Remove Location{" "}
                            </Button>
                            <Form.Item className="savebtn">
                              {" "}
                              <Button
                                className="yellowbtn profServiceLocationyellow"
                                onClick={() => handleupdate(formData, key)}
                                disabled={isFieldsDisabled}
                                loading={loading}
                              >
                                {" "}
                                Update Location{" "}
                              </Button>{" "}
                            </Form.Item>
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
      {showAccoundion ? <CustomerServiceLocation /> : <></>}

    </div>
  );
};

export default ProfServicelocation;
