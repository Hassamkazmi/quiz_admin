import { Fragment, React, useEffect } from "react";
import Logo from "../../assets/img/new_logo.png";
import { Button, Checkbox, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Cookies from "js-cookie";
import { forgetPassword, userLogin } from "../../redux/postReducer/userPost";
import { useDispatch, useSelector } from "react-redux";
import img1 from "../../assets/img/homePageImage1.png";
import img2 from "../../assets/img/homePageImage2.png";
import { FaUnlock } from "react-icons/fa";
import { reset } from "../../redux/Slices/userSlice";
import img3 from "../../assets/img/bannerImage.png";
function ForgetPassword() {
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useHistory

  const onFinish = async (values) => {
    values.ClientUrl = window.location.origin;
    dispatch(forgetPassword({ values }));
  };
  console.log(
    loading,
    userInfo,
    error,
    success,
    "loading, userInfo, error, success "
  );
  useEffect(() => {
    if (error) {
      const err = error?.data?.message;
      toast.error(err);
      dispatch(reset());
    }
    if (success) {
      toast.success(success);
      dispatch(reset());
    }
  }, [error, success]);
  const baseURL = window.location.origin; // Gets the base URL (e.g., http://localhost:3000)

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleNavigate = () => {
    navigate("/account/register");
  };

  return (
    <Fragment>
      <div className="container-fluid stepsform stepsform1">
        <div className="row padding-row1 cslocation forgetFPage">
          <div className="col-sm-12 loginlogo">
            <Link to="/">
            <img src="../Images/logo.png" alt="logo" />
            </Link>
          </div>
          {/* <div className="row class-login-new"> */}
            <div className="col-sm-6 forgetForm">
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
                    Forget Password <FaUnlock />
                  </h3>

                  <div className="col-sm-12">
                    <Form.Item
                      name="email"
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
                    <Button type="primary" htmlType="submit" className="gstrt">
                      Submit
                    </Button>
                    <div>
                      <Link to="/">Login</Link>
                      <div className="Signup-css">
                        <p>Don't have an account?</p>
                        <p className="signup-btn" onClick={handleNavigate}>
                          Sign up
                        </p>
                      </div>
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

export default ForgetPassword;
