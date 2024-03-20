import { Fragment, React, useEffect } from "react";
import Logo from "../../assets/img/new_logo.png";
import { Button, Checkbox, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Cookies from "js-cookie";
import { userLogin } from "../../redux/postReducer/userPost";
import { useDispatch, useSelector } from "react-redux";
import img3 from "../../assets/img/aaa.jpg";

import { FaUnlock } from "react-icons/fa";
function Login() {
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.user
  );

  const storeTheme = localStorage.getItem("primary");
  document.documentElement.style.setProperty(
    "--primary-color",
    storeTheme || "#750004"
  );

  document.documentElement.style.setProperty("--font-color", "#fff");

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useHistory
  const VerifyUser = async () => {
    const config = {
      headers: {
        Authorization: Cookies.get("userToken"),
      },
    };
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/owner/Auth/me`,
        config
      );
      navigate("/dashboard");
      return true;
    } catch (err) {
      navigate("/");
      return false;
      // SetUserApproval(false);
    }
  };

  const token = Cookies.get("userToken");
  useEffect(() => {
    if (userInfo && token) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate, userInfo]);
  const onFinish = async (values) => {
    dispatch(userLogin({ values }));
  };

  useEffect(() => {
    if (error) {
      const err = error?.data?.message;
      toast.error(err);
    }
  }, [error]);
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {
    // VerifyUser();
  }, []);

  const handleNavigate = () => {
    navigate("/account/register");
  };

  return (
    <Fragment>
        <div className="container-fluid stepsform stepsform1">
      <div className="row padding-row1 cslocation forgetFPage">
          <div className="col-sm-12 loginlogo ">
            <img src="../Images/logo.png" alt="logo" />
          </div>
          {/* <div className="row class-login-new"> */}
            <div className="col-sm-6 loginInputs forgetForm">
              <div className="row cslocation">
                <Form
                  className="login-form"
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <h3 className="main-h1">
                    Sign into your account <FaUnlock />
                  </h3>

                  <div className="col-sm-12">
                    <Form.Item
                      name="Email"
                      label="Email"
                      rules={[
                        {
                          required: true,
                          message: "Please input Email!",
                        },
                      ]}
                    >
                      <Input placeholder="Email" className="main-input-css" />
                    </Form.Item>
                  </div>

                  <div className="col-sm-12">
                    <Form.Item
                      name="password"
                      label="Password"
                      className="inputPass"
                      rules={[
                        {
                          required: true,
                          message: "Please input password!",
                        },
                      ]}
                    >
                      <Input.Password
                        placeholder="Password"
                        type="password"
                        className="main-input-css"
                      />
                    </Form.Item>
                  </div>

                  <div className="col-sm-12">
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="gstrt logBtn"
                    >
                      Login
                    </Button>
                    <div>
                     
                    </div>
                  </div>
                </Form>
              </div>
            </div>
            <div className="col-sm-6 froImageBaner">
              <img src={img3} alt="" className="bnrimgone" />
            </div>
          {/* </div> */}
        </div>
      </div>
    </Fragment>
  );
}

export default Login;
