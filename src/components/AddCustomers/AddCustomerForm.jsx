import React from "react";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Checkbox, Form, Input, Select, Tooltip, Space } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

import Switch from "antd/lib/switch";
import { useNavigate } from "react-router-dom"; // Import useHistory
import { useDispatch, useSelector } from "react-redux";
import {
  postCustomerData,
  resetData,
} from "../../redux/postReducer/postCustomer";
import { fetchgetCustomerType } from "../../redux/Slices/getCustomerType";
import { fetchgetAllCityByCountry } from "../../redux/Slices/getCustomerCity";
import { fetchgetCustomerCountry } from "../../redux/Slices/getCustomerCountry";
import { fetchtag } from "../../redux/Slices/getTags";
import ProfileDetail, {
  fetchprofileDetail,
} from "../../redux/Slices/ProfileDetail";
import { useEffect } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
const { Item } = Form;

export default function AddCustomerForm() {
  const { Option } = Select;
  const [form] = Form.useForm();
  const navigate = useNavigate(); // Initialize useHistory
  const dispatch = useDispatch();

  const { data, loading, success, error } = useSelector(
    (state) => state.postsCustomer
  );
  const postDataResult = useSelector((state) => state.postsCustomer);
  const customertype = useSelector((state) => state.getCustomerType);
  const customercity = useSelector((state) => state.getCustomerCity);
  const customercountry = useSelector((state) => state.getCustomerCountry);
  const customertags = useSelector((state) => state.tag);
  const userProfile = useSelector((state) => state.profileDetail);

  const [options, setOptions] = useState(customertags?.data); // Use state to manage options
  const [isCommercial, setIsCommercial] = useState(false);
  const [isSameAddress, setIsSameAddress] = useState(true);
  const [sameLocation, setsameLocation] = useState(true);
  const [additionalEmail, setAdditionalEmail] = useState([]);
  const [additionalMobileNo, setAdditionalMobileNo] = useState([]);
  const [countryid, setcountryid] = useState("");

  const addEmailField = () => {
    setAdditionalEmail([...additionalEmail, { type: "text", value: "" }]);
  };

  useEffect(() => {
    setcountryid(userProfile?.data?.data?.CountryId);
  }, [userProfile]);


  const removeMobileNo = (fieldId) => {
    setAdditionalMobileNo(
      additionalMobileNo.filter((field) => field.id !== fieldId)
    );
  };

  const [address, setAddress] = useState("");

  const filterOption = (input, option) => {
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  const handleChangeTags = (value) => {
    setOptions(value);
  };
  const handleCustomerTypeChange = (value, option) => {
    console.log(value, option);
    if (option.children !== "residential") {
      setIsCommercial(true);
    } else {
      setIsCommercial(false);
    }
  };

  const handleChangeCity = (countryid) => {
    setcountryid(countryid);
    const value = "";
    dispatch(fetchgetAllCityByCountry({ countryid, value }));
  };

  const onFinish = (values) => {
    if (!values._id) {
      // values.customer_type_id = customertype?.data[0]?._id;
      values.address = address;
      values.same_location = sameLocation;
    }
    if (!values?.customer_type_id) {
      values.customer_type_id = customertype?.data[0]?._id;
    }

    dispatch(postCustomerData({ values }));
  };

  // Handle successful form submission
  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(resetData());
      navigate(`/customer-servicelocation/${postDataResult?.data?.data?._id}`);
    }
    if (error) {
      toast.error(error);
      dispatch(resetData());
    }
  }, [error, success]);

  const name = "";

  useEffect(() => {
    dispatch(fetchgetAllCityByCountry({ countryid, name }));
  }, [dispatch, countryid]);

  useEffect(() => {
    dispatch(fetchgetCustomerType());
    dispatch(fetchprofileDetail());
    dispatch(fetchgetCustomerCountry());
    dispatch(fetchtag());
    setOptions(customertags?.data);
  }, [dispatch]);

  const onFinishFailed = (errorInfo) => {
    toast.error("Please fill all required fields!");
  };

  const onSearch = (name) => {
    dispatch(fetchgetAllCityByCountry({ countryid, name }));
  };

  const handleCheckboxChange = (e) => {
    if (e.target.checked === true) {
      setIsSameAddress(true);
    } else {
      setIsSameAddress(false);
    }
  };

  const handleCheckboxLocation = (e) => {
    if (e.target.checked === true) {
      setsameLocation(true);
    } else {
      setsameLocation(false);
    }
  };
  const serviceType = [
    {
      id:1,
      value:"true",
      label:"Post Paid"
    },
    {
      id:2,
      value:"false",
      label:"Pre Paid"
    },
  ]
  const billingCycle = [
    {
      id:0,
      value:"7",
      label:"7 Days"
    },
    {
      id:1,
      value:"15",
      label:"15 Days"
    },
    {
      id:1,
      value:"30",
      label:"30 Days"
    },
    {
      id:1,
      value:"45",
      label:"45 Days"
    },
    {
      id:1,
      value:"60",
      label:"60 Days"
    },
  ]

  return (
    <Fragment>
      <div className="row fomik customer">
        <Form
          name="Customer"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="row">
            <div className="col-sm-2 forFifty customertype customertypesssss">
              <Form.Item name="customer_type_id" label="Customer Type">
                <Select
                  placeholder="Customer Type"
                  defaultValue={customertype?.data[0]?._id || "residential"}
                  onChange={handleCustomerTypeChange}
                >
                  {customertype?.data?.map((item) => {
                    return (
                      <Option key={item._id} value={item._id}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </div>
            <div className="col-sm-2 forFifty switchbtn prospect">
              <div className="inside">
                <span>Status</span>
              </div>
              <Form.Item
                name="status"
                label="Inactive Active"
                valuePropName="checked"
                className="prospectusss"
                initialValue={true}
              >
                <Switch />
              </Form.Item>
            </div>

            <div className="col-sm-4 forFifty customerNameeeee">
              <Form.Item
                name="first_name"
                label="First Name"
                rules={[
                  { required: true, message: "Please input your firstname!" },
                ]}
              >
                <Input placeholder="First Name" />
              </Form.Item>
            </div>

            <div className="col-sm-4 forFifty customerNameeeee">
              <Form.Item
                name="last_name"
                label="Last Name"
                // rules={[
                //   { required: true, message: "Please input your Lastname!" },
                // ]}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
            </div>

            <div className="row additionalDetailsss">
              <div className="col-sm-12">
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: true, message: "Email is Required" }]}
                >
                  <Input placeholder="E-mail" />
                </Form.Item>
              </div>
            </div>

            <div className="col-sm-12">
              <Form.List
                name="EmailData"
                initialValue={[]}
                rules={[
                  {
                    validator: async (_, emails) => {
                      if (emails.length > 5) {
                        throw new Error("You can add a maximum of 5 emails");
                      }
                    },
                  },
                ]}
              >
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                      <span className="row display-flex-1" key={key}>
                        <div className="col-sm-5">
                          <Form.Item
                            {...restField}
                            name={[name, "title"]}
                            fieldKey={[fieldKey, "title"]}
                            rules={[
                              {
                                required: true,
                                message: "Missing title",
                              },
                            ]}
                          >
                            <Input type="text" placeholder={`Title`} />
                          </Form.Item>
                        </div>
                        <div className="col-sm-6">
                          <Form.Item
                            {...restField}
                            name={[name, "Email"]}
                            fieldKey={[fieldKey, "Email"]}
                            rules={[
                              {
                                required: true,
                                message: "Missing Email",
                              },
                            ]}
                          >
                            <Input type="email" placeholder={`Emails`} />
                          </Form.Item>
                        </div>
                        <div className="col-sm-1">
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </div>
                      </span>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                        disabled={fields.length >= 5}
                      >
                        Add Multiple Emails
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </div>

            <div className="row additionalDetailsssOne">
              <div
                className={
                  additionalMobileNo.length === 0 ? "col-sm-12" : "col-sm-5"
                }
              >
                <Form.Item
                  label="Mobile No"
                  name="mobile_no_primary"
                  rules={[
                    { required: true, message: "Mobile Number is Required" },
                  ]}
                >
                  <Input placeholder="Mobile # (primary)" type="number" />
                </Form.Item>
              </div>

              {additionalMobileNo.map((field, index) => (
                <>
                  <div key={field.id} className="col-sm-5">
                    <Form.Item
                      name="mobile_no_secondary"
                      label="Mobile No Secondary"
                      // rules={[
                      //   { required: true, message: "Please input your mobile!" },
                      // ]}
                    >
                      <Input placeholder="Mobile # (secondary)" type="number" />
                    </Form.Item>
                  </div>
                  <Tooltip
                    title="Remove Additional Email"
                    color="#750004"
                    onClick={() => removeMobileNo(field.id)}
                  >
                    <span className="formIconOne">
                      <MinusOutlined />
                    </span>
                  </Tooltip>
                </>
              ))}
            </div>

            <div className="col-sm-12">
              <Form.List
                name="PhoneData"
                initialValue={[]}
                rules={[
                  {
                    validator: async (_, phone) => {
                      if (phone.length > 5) {
                        throw new Error("You can add a maximum of 5 Mobile No");
                      }
                    },
                  },
                ]}
              >
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                      <span className="row display-flex-1" key={key}>
                        <div className="col-sm-5">
                          <Form.Item
                            {...restField}
                            name={[name, "title"]}
                            fieldKey={[fieldKey, "title"]}
                            rules={[
                              {
                                required: true,
                                message: "Missing title",
                              },
                            ]}
                          >
                            <Input type="text" placeholder={`Title`} />
                          </Form.Item>
                        </div>
                        <div className="col-sm-6">
                          <Form.Item
                            {...restField}
                            name={[name, "Phone"]}
                            fieldKey={[fieldKey, "Phone"]}
                            rules={[
                              {
                                required: true,
                                message: "Missing Phone",
                              },
                            ]}
                          >
                            <Input placeholder="Mobile #" type="number" />
                          </Form.Item>
                        </div>
                        <div className="col-sm-1">
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </div>
                      </span>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                        disabled={fields.length >= 5}
                      >
                        Add Multiple Mobile No
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </div>

            <div className="col-sm-6">
              <div>
                <Form.Item
                  name="Address"
                  label="Address"
                  rules={[
                    {
                      required: true,
                      message: "Please input Address!",
                    },
                  ]}
                >
                  <PlacesAutocomplete
                    value={address}
                    onChange={setAddress}
                    // onSelect={data}
                  >
                    {({
                      getInputProps,
                      suggestions,
                      getSuggestionItemProps,
                      loading,
                    }) => (
                      <div>
                        <Input
                          {...getInputProps({ placeholder: "Enter Address" })}
                        />
                        <div className="address-suggestion">
                          {loading && <div>Loading...</div>}
                          {suggestions.map((suggestion) => {
                            const style = {
                              backgroundColor: suggestion.active
                                ? "#41b6e6"
                                : "#fff",
                            };
                            return (
                              <div
                                key={suggestion.placeId}
                                {...getSuggestionItemProps(suggestion, {
                                  style,
                                })}
                              >
                                {suggestion.description}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </PlacesAutocomplete>
                </Form.Item>
              </div>
            </div>

            <div className="col-sm-6">
              <Form.Item
                label="Zip Code"
                name="zipcode"
                rules={[
                  { required: true, message: "Please input your zipcode!" },
                ]}
              >
                <Input placeholder="Zip-Code" type="number" />
              </Form.Item>
            </div>

            <div className="col-sm-6">
              <Form.Item name="country_id" label="Country">
                <Select
                  placeholder="Country"
                  onChange={handleChangeCity}
                  showSearch
                  // disabled
                  filterOption={filterOption}
                  defaultValue={"United States"}
                >
                  {customercountry &&
                    customercountry?.data?.map((item) => (
                      <Option key={item._id} value={item._id}>
                        {item.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </div>

            <div className="col-sm-6">
              <Form.Item
                name="city_id"
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
                  filterOption={filterOption}
                  onSearch={onSearch}
                >
                  {customercity?.data?.map((item, i) => {
                    return <Option value={item?._id}>{item?.name}</Option>;
                  })}
                </Select>
              </Form.Item>
            </div>

            {isCommercial ? (
              <>
                <div className="col-sm-4">
                  <Form.Item
                    label="Company Name"
                    name="company_name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Company Name!",
                      },
                    ]}
                  >
                    <Input placeholder="Company Name" />
                  </Form.Item>
                </div>

                <div className="col-sm-4">
                  <Form.Item
                    name="company_address"
                    label="Company Code"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Company Code!",
                      },
                    ]}
                  >
                    <Input placeholder="Company Code" />
                  </Form.Item>
                </div>
              </>
            ) : (
              <></>
            )}

            <div className="col-sm-3 forFifty">
              <Form.Item name="">
                <Checkbox
                  name="Billing_Address"
                  checked={isSameAddress}
                  onChange={handleCheckboxChange}
                >
                  Billing address is same as a service address?
                </Checkbox>
              </Form.Item>
            </div>

            <div className="col-sm-3 forFifty">
              <Form.Item name="samelocation">
                <Checkbox
                  name="samelocation"
                  checked={sameLocation}
                  onChange={handleCheckboxLocation}
                  initialValue={true}
                >
                  Service Location Same Address
                </Checkbox>
              </Form.Item>
            </div>

            <div className="col-sm-6">
              <Form.Item name="billing_details" label="Billing Details">
                <Input placeholder="Billing Details" />
              </Form.Item>
            </div>

            {!isSameAddress && (
              <div className="col-sm-6">
                <Form.Item
                  name="billing_address"
                  label="Billing Address"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Billing Address!",
                    },
                  ]}
                >
                  <Input placeholder="Billing Address" />
                </Form.Item>
              </div>
            )}

            <div className="col-sm-4 addCustomTags">
              <Form.Item name="TagsId" label="Tags">
                <Select
                  mode="tags"
                  style={{
                    width: "100%",
                  }}
                  placeholder="Tags Mode"
                  onChange={handleChangeTags}
                  value={options}
                >
                  {customertags?.data?.map((item) => {
                    return <Option value={item._id}>{item.name}</Option>;
                  })}
                </Select>
              </Form.Item>
            </div>
            <div className="col-sm-4">
              <Form.Item
                name="serviceType"
                label="Service Type"
                
              >
                <Select
                  placeholder="Service Type"
                >
                  {serviceType?.map((item, i) => {
                    return <Option value={item?.value}>{item?.label}</Option>;
                  })}
                </Select>
              </Form.Item>
            </div>
            <div className="col-sm-4">
              <Form.Item
                name="billingCycle"
                label="Billing Cycle"
               
              >
                <Select
                  placeholder="billing Cycle"
                >
                  {billingCycle?.map((item, i) => {
                    return <Option value={item?.value}>{item?.label}</Option>;
                  })}
                </Select>
              </Form.Item>
            </div>

            <div className="col-sm-12 savebtn">
              <Form.Item>
                <Button
                  className="yellowbtn addCustomerSaveBtn"
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  disable={loading}
                >
                  {" "}
                  Save Customer
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </Fragment>
  );
}
