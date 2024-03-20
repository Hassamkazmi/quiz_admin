import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Checkbox, Form, Input, Select, Tooltip, Space } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom"; // Import useHistory
import { useDispatch, useSelector } from "react-redux";
import {
  fetchgetSingleCustomers,
  STATUSES,
} from "../../redux/Slices/getSingleCustomer";
import { useParams } from "react-router-dom";
import { fetchgetCustomerState } from "../../redux/Slices/getCustomerState";
import {
  fetchgetAllCityByCountry,
  fetchgetCustomerCity,
} from "../../redux/Slices/getCustomerCity";
import { fetchgetCustomerCountry } from "../../redux/Slices/getCustomerCountry";
import {
  updateCustomerData,
  resetData,
} from "../../redux/postReducer/postCustomer";
import Loader from "../NoDataComponent/Loader";

export default function Profile({ isFieldsDisabled }) {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { data: getSingleCustomer, status } = useSelector(
    (state) => state.getSingleCustomer
  );

  // const customertype = useSelector((state) => state.getCustomerType);
  const customerstate = useSelector((state) => state.getCustomerState);
  const customercity = useSelector((state) => state.getCustomerCity);
  const customercountry = useSelector((state) => state.getCustomerCountry);
  const postsCustomer = useSelector((state) => state.postsCustomer);
  const { data, loading, success, error } = useSelector(
    (state) => state.postsCustomer
  );

  const customertags = useSelector((state) => state.tag);

  const [Country, setCountry] = useState(getSingleCustomer.countryname);
  const [State, setState] = useState(getSingleCustomer.statename);
  const [City, setCity] = useState(getSingleCustomer.city_id);
  const [CustomerId, setCustomerId] = useState(null);
  const [options, setOptions] = useState(customertags?.data); // Use state to manage options
  const [countryid, setcountryid] = useState("");

  const [formData, setFormData] = useState();

  const resultArray = getSingleCustomer?.CustomerTags?.map((item) => {
    const idParts = item._id.split("-"); // Split _id by '-' to get an array of parts
    const newName = `${item.TagsData.name}${idParts[idParts.length - 1].charAt(
      0
    )}${idParts[idParts.length - 1].charAt(1)}`;
    return newName.toLowerCase(); // Convert to lowercase as per your example
  });

  useEffect(() => {
    setFormData({
      address: getSingleCustomer?.address,
      billing_details: getSingleCustomer?.billing_details || "",
      company_address: getSingleCustomer?.company_address || "",
      company_name: getSingleCustomer?.company_name || "",
      customer_type_id: getSingleCustomer?.customertypename,
      customer_type: getSingleCustomer?.customertypename,
      email: getSingleCustomer?.email || "",
      first_name: getSingleCustomer?.first_name,
      last_name: getSingleCustomer?.last_name || "",
      mobile_no_primary: getSingleCustomer?.mobile_no_primary || "",
      mobile_no_secondary: getSingleCustomer?.mobile_no_secondary || "",
      state_id: getSingleCustomer?.statename || "",
      city_id: getSingleCustomer?.cityname || "",
      country_id: getSingleCustomer?.countryname || "",

      status: getSingleCustomer?.status || "",
      billing_address: getSingleCustomer?.billing_address || "",
      zipcode: getSingleCustomer?.zipcode,
      updatedAt: getSingleCustomer?.updatedAt || "",
    });
  }, [getSingleCustomer]);

  useEffect(() => {
    dispatch(fetchgetSingleCustomers({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    // dispatch(fetchgetCustomerType());
    dispatch(fetchgetCustomerCountry());
  }, [dispatch]);

  const UpdateServiceLocationNavigation = () => {
    navigate(`/edit-service-location/${id}`);
  };
  const { Option } = Select;
  const [form] = Form.useForm();
  const navigate = useNavigate(); // Initialize useHistory

  const emailData = getSingleCustomer?.CustomerEmailsData?.map((item) => ({
    Email: item.Email,
    title: item.title,
  }));

  const phoneData = getSingleCustomer?.CustomerPhoneData?.map((item) => ({
    Phone: item.Phone,
    title: item.title,
  }));

  const [EmailData, setEmailData] = useState(emailData);
  const [PhoneData, setPhoneData] = useState(phoneData);

  useEffect(() => {
    setEmailData(emailData);
    setPhoneData(phoneData);
  }, [getSingleCustomer]);

  const onFinish = async (values) => {
    const Emails = await values?.EmailData1;
    const Phones = await values?.PhoneData;
    const postData = {
      // customer_type_id:
      //   CustomerId == null ? getSingleCustomer.customertypename : CustomerId,
      city_id: City,
      state_id: State,
      country_id: Country,
      first_name: values.first_name,
      last_name: values.last_name,
      address: values.address,
      zipcode: values.zipcode,
      status: values.status,
      email: values.email,
      mobile_no_primary: values.mobile_no_primary,
      company_name: values.company_name,
      company_address: values.company_address,
      billing_address: values.billing_address,
      billing_details: values.billing_details,
      PhoneData: Phones ? Phones : PhoneData,
      EmailData: Emails ? Emails : EmailData,
    };
    console.log(Phones)
    console.log(PhoneData)
    console.log(values)
    dispatch(updateCustomerData({ id, postData }));
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

  const handleFormValuesChange = (changedValues, allValues) => {
    setFormData(allValues);
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

  const handleChangeCity = (countryid) => {
    setcountryid(countryid);
    const value = "";
    dispatch(fetchgetAllCityByCountry({ countryid, value }));
  };

  const HandleEmail = (key) => {
    const newEmailData = [...EmailData];
    newEmailData.splice(key, 1);
    setEmailData(newEmailData);
  };

  const HandlePhone = (key) => {
    const newPhoneData = [...PhoneData];
    newPhoneData.splice(key, 1);
    setPhoneData(newPhoneData);
  };

  const onSearch = (name) => {
    dispatch(fetchgetAllCityByCountry({ countryid, name }));
  };

  form.setFieldsValue({
    address: formData?.address,
    billing_details: formData?.billing_details || "",
    country_id: formData?.country_id || "",
    city_id: formData?.city_id || "",
    company_address: formData?.company_address || "",
    company_name: formData?.company_name || "",
    customer_type_id: formData?.customer_type_id,
    email: formData?.email || "",
    first_name: formData?.first_name,
    last_name: formData?.last_name || "",
    mobile_no_primary: formData?.mobile_no_primary || "",
    state_id: formData?.state_id || "",
    status: formData?.status || "",
    billing_address: formData?.billing_address || "",
    zipcode: formData?.zipcode,
    // EmailData: EmailData,
    updatedAt: formData?.updatedAt || "",
  });

  const filterOption = (input, option) => {
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };
  return (
    <Fragment>
      <div className="row fomik customer editCustomer editedit">
        {!getSingleCustomer?._id ? (
          <></>
        ) : (
          <Form
            name="Customer"
            onValuesChange={handleFormValuesChange}
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            disabled={isFieldsDisabled}
            initialValues={formData}
          >
            <div className="row">
              <div className="col-sm-2 forFifty customertype">
                <Form.Item name="customer_type_id" label="Customer Type">
                  <Input defaultValue={CustomerId} disabled />
                </Form.Item>
              </div>
              <div className="col-sm-2 forFifty">
                <Form.Item name="status" valuePropName="checked" label="Status">
                  <Input
                    defaultValue={
                      formData?.status === true ? "Active" : "In Active"
                    }
                    disabled
                  />
                </Form.Item>
              </div>
              <div className="col-sm-4 forFifty">
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

              <div className="col-sm-4 forFifty">
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

              <div className="col-sm-6">
                <Form.Item
                  //  name={[name, "country_id"]}
                  label="Country"
                  name="country_id"
                  rules={[
                    { required: true, message: "Please input your Country!" },
                  ]}
                >
                  <Select
                    placeholder="Country"
                    onChange={handleChangeCity}
                    showSearch
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

              <div className="col-sm-12">
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    { required: true, message: "Email is Invalid" },
                  ]}
                  // initialValue={formData?.email}
                >
                  <Input placeholder="E-mail" />
                </Form.Item>
              </div>

              <div className="col-sm-12">
                {EmailData?.map((item, key) => {
                  return (
                    <span className="row display-flex-1" key={key}>
                      <div className="col-sm-5">
                        <Form.Item
                          name={`Title ${key + 1}`}
                          label={`Title ${key + 1}`}
                          initialValue={item?.title}
                          rules={[
                            {
                              required: true,
                              message: "Missing title",
                            },
                          ]}
                        >
                          <Input type="text" placeholder={`title`} />
                        </Form.Item>
                      </div>
                      <div className="col-sm-6">
                        <Form.Item
                          name={`Email ${key + 1}`}
                          label={`Email ${key + 1}`}
                          initialValue={item?.Email}
                          rules={[
                            {
                              required: true,
                              message: "Missing Email",
                            },
                          ]}
                        >
                          <Input type="email" placeholder={`Email`} />
                        </Form.Item>
                      </div>
                      <div className="col-sm-1">
                        <MinusCircleOutlined onClick={() => HandleEmail(key)} />
                      </div>
                    </span>
                  );
                })}
                <Form.List name="EmailData1">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                       <span className="row display-flex-1" key={key}>
                        <div className="col-sm-5">
                          <Form.Item
                            {...restField}
                            name={[name, "title"]}
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
                        >
                          Add Multiple Emails
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </div>

              <div className="col-sm-12">
                <Form.Item
                  name="mobile_no_primary"
                  label="Mobile No"
                  // rules={[
                  //   { required: true, message: "Please input your mobile!" },
                  // ]}
                  initialValue={formData?.mobile_no_primary}
                >
                  <Input placeholder="Mobile # (primary)" type="number" />
                </Form.Item>
              </div>

              <div className="col-sm-12">
                {PhoneData?.map((item, key1) => {
                  return (
                    <span className="row display-flex-1" key={key1}>
                      <div className="col-sm-5">
                        <Form.Item
                         name={`title ${key1 + 1}`}
                          label={`Title ${key1 + 1}`}
                          initialValue={item?.title}
                          rules={[
                            {
                              required: true,
                              message: "Missing title",
                            },
                          ]}
                        >
                          <Input type="text" placeholder={`title`} />
                        </Form.Item>
                      </div>
                      <div className="col-sm-6">
                        <Form.Item
                          name={`Phone ${key1 + 1}`}
                          label={`Title ${key1 + 1}`}
                          initialValue={item?.Phone}
                          rules={[
                            {
                              required: true,
                              message: "Missing Emails",
                            },
                          ]}
                        >
                          <Input type="phone" placeholder={`Phone`} />
                        </Form.Item>
                      </div>
                      <div className="col-sm-1">
                        {" "}
                        <MinusCircleOutlined
                          onClick={() => HandlePhone(key1)}
                        />
                      </div>
                    </span>
                  );
                })}
                <Form.List name="PhoneData">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name,fieldKey, ...restField }) => (
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
                        >
                          Add Multiple Mobile No
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </div>

              <div className="col-sm-6">
                <Form.Item
                  name="zipcode"
                  label="Zip Code"
                  rules={[
                    { required: true, message: "Please input your zipcode!" },
                  ]}
                  initialValue={formData?.zipcode}
                >
                  <Input placeholder="Zip-Code" type="number" />
                </Form.Item>
              </div>

              {formData?.customer_type_id === "commerical" ? (
                <>
                  <div className="col-sm-6">
                    <Form.Item
                      name="company_name"
                      label="Company Name"
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: "Please input your Company Name!",
                      //   },
                      // ]}
                      initialValue={formData?.company_name}
                    >
                      <Input placeholder="Company Name" />
                    </Form.Item>
                  </div>

                  <div className="col-sm-6">
                    <Form.Item
                      label="Company Code"
                      name="company_address"
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: "Please input your Company Code!",
                      //   },
                      // ]}
                      initialValue={formData?.company_address}
                    >
                      <Input placeholder="Company Code" />
                    </Form.Item>
                  </div>
                </>
              ) : (
                <></>
              )}

              <div className="col-sm-6">
                <Form.Item
                  label="Address"
                  name="address"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: "Please input your Customer Address!",
                  //   },
                  // ]}
                >
                  <Input placeholder="Customer Address" />
                </Form.Item>
              </div>

              <div className="col-sm-6">
                <Form.Item name="billing_details" label="Billing Details">
                  <Input placeholder="Billing Details" />
                </Form.Item>
              </div>

              <div className="col-sm-6">
                <Form.Item
                  name="billing_address"
                  label="Billing Address"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: "Please input your Billing Address!",
                  //   },
                  // ]}
                >
                  <Input placeholder="Billing Address" />
                </Form.Item>
              </div>

              <div className="col-sm-6">
                <Form.Item name="tags" label="Tags">
                  <Select
                    mode="tags"
                    style={{
                      width: "100%",
                    }}
                    placeholder="Tags Mode"
                    defaultValue={resultArray}
                    // onChange={handleChangeTags}
                    value={options}
                  >
                    {customertags?.data?.map((item) => {
                      return <Option value={item.tag_id}>{item.name}</Option>;
                    })}
                  </Select>
                </Form.Item>
              </div>

              <div className="col-sm-12 savebtn">
                <Form.Item>
                  <Button
                    className="bluebtn viewServiceLocation"
                    type="secondary"
                    onClick={() => UpdateServiceLocationNavigation()}
                    disabled={false}
                  >
                    {" "}
                    View ServiceLocation
                  </Button>
                  <Button
                    className="yellowbtn updateCustomer"
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                  >
                    {" "}
                    Update Customer
                  </Button>
                </Form.Item>
                <Form.Item></Form.Item>
              </div>
            </div>
          </Form>
        )}
      </div>
    </Fragment>
  );
}
