import React, { Fragment, useEffect } from "react";

import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar";
import AccountHeader from "../components/Account/AccountHeader";
import { fetchaccountDetail } from "../redux/Slices/getAccoutDetails";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Button, Checkbox, Form, Input, message } from "antd";
import { FaUnlock } from "react-icons/fa";
import { toast } from "react-toastify";
import { clearData , postResetpasswordData } from "../redux/postReducer/postResetPassword";

export default function AddChecklist() {
  const dispatch = useDispatch();
  const { data: profileDetail, status } = useSelector((state) => state.profileDetail);
  const { loading, success, error } = useSelector(
    (state) => state.postResetpassword
  );
  const onFinish = async (values) => {
  dispatch(postResetpasswordData({values}))
  };

  console.log( success, error)
  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(clearData());
    }
    if (error) {
      toast.error(error);
      dispatch(clearData());
    }
  }, [error, success]);

  const onFinishFailed = (errorInfo) => {
    toast.error("Please fill all required fields!");
  };
  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel">
        <AdminNav />
        <div className="content">
          <div className="addcustomers smsHeader">
            <div className="col-sm-5 ">
              <h2>Reset Password</h2>
            </div>
          </div>

          <div className="smsHeader">
            <div className="row">
              <div className="col-sm-4 reset-password">
              <img src={profileDetail?.data?.image} alt="profile-name" />
                  <h3 style={{textAlign:"center"}}>{profileDetail?.data?.first_name}</h3>
              </div>
              <div className="col-sm-8">
              <div className="row">
                <Form
                  className="login-form"
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                

                  <div className="col-sm-11">
                    <Form.Item
                      name="oldPassword"
                      label="Old Password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Old Password!",
                        },
                      ]}
                    >
                      <Input.Password
                        placeholder="Password"
                        className="main-input-css"
                      />
                    </Form.Item>
                  </div>
                  <div className="col-sm-11">
                    <Form.Item
                      name="newPassword"
                      label="New Password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your New Password",
                        },
                        {
                          min: 6,
                          message: "Password must be at least 6 characters long",
                        },
                       
                      ]}
                    >
                      <Input.Password
                        placeholder="Confirm Password"
                        className="main-input-css"
                      />
                    </Form.Item>
                  </div>

                  <div className="col-sm-11">
                    <Form.Item
                      name="confirmPassword"
                      label="Confirm Password"
                      rules={[
                        {
                          required: true,
                          message: "Please confirm your Password",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (
                              !value ||
                              getFieldValue("newPassword") === value
                            ) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              "The two passwords do not match"
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password
                        placeholder="Confirm Password"
                        className="main-input-css"
                      />
                    </Form.Item>
                  </div>

                  <div className="col-sm-11">
                    <Button type="primary" htmlType="submit" className="gstrt">
                      Submit
                    </Button>
                  </div>
                </Form>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
