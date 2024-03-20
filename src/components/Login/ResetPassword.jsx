import { Fragment, React, useEffect } from "react";
import Logo from "../../assets/img/new_logo.png";
import { Button, Checkbox, Form, Input, message } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Cookies from "js-cookie";
import {
  forgetPassword,
  resetPassword,
  userLogin,
} from "../../redux/postReducer/userPost";
import { useDispatch, useSelector } from "react-redux";
import img1 from "../../assets/img/homePageImage1.png";
import img2 from "../../assets/img/homePageImage2.png";
import { FaUnlock } from "react-icons/fa";
import { reset } from "../../redux/Slices/userSlice";
import Logos from "../../assets/img/logo.png";
import img3 from "../../assets/img/bannerImage.png";

function ResetPassword() {
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const param = useParams();

  const validatePassword = (_, value) => {
    if (value && value.length < 6) {
      return Promise.reject("Password must be at least 4 characters long.");
    }
    return Promise.resolve();
  };

  const onFinish = async (values) => {
    const token = param.token;

    dispatch(resetPassword({ token, values }));
  };

  useEffect(() => {
    if (error) {
      const err = error?.data?.message;
      toast.error(err);
      dispatch(reset());
    }
    if (success) {
      toast.success(success);
      navigate("/");
      dispatch(reset());
    }
  }, [error, success]);
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Fragment>
      <div className="row padding-row1">
        <div className="container-fluid stepsform stepsform1">
          <div className="col-sm-12 loginlogo">
            <img src={Logos} alt="logo" />
          </div>
          <div className="row class-login-new">
            <div className="col-sm-6">
              <div className="row">
                <Form
                  className="login-form"
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <h3 className="main-h1">
                    Enter New Password <FaUnlock />
                  </h3>

                  <div className="col-sm-12">
                    <Form.Item
                      name="firstpassword"
                      label="Password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Input.Password
                        placeholder="Password"
                        className="main-input-css"
                      />
                    </Form.Item>
                  </div>
                  <div className="col-sm-12">
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
                              getFieldValue("firstpassword") === value
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

                  <div className="col-sm-12">
                    <Button type="primary" htmlType="submit" className="gstrt">
                      Submit
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
            <div className="col-sm-6 bannerImages">
              {/* <img src={img1} alt="bannerImage" className="bnrimgone" />
              <img src={img2} alt="bannerImage2" className="banrimgtwo" /> */}
              <img src={img3} alt="" className="bnrimgone" />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ResetPassword;
