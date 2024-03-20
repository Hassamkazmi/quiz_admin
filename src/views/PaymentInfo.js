import React, { useState, useEffect } from "react";
import { Button, Form, Space } from "antd";
import { FaLock } from "react-icons/fa";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postPaymentData } from "../redux/postReducer/PostPaymentData"
import { useDispatch } from "react-redux";
import img3 from "../assets/img/bannerImage.png";


const PaymentInfo = () => {
  const [client_secret_id, setstateData] = useState("");
  const [token, settoken] = useState("");
  const dispatch = useDispatch();

  const storeTheme = localStorage.getItem("primary");
  document.documentElement.style.setProperty(
    "--primary-color",
    storeTheme || "#750004"
  );

  document.documentElement.style.setProperty("--font-color", "#fff");

  const location = window.location.origin;
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (state) {
      const { client_secret } = state;
      setstateData(client_secret?.data?.client_secret);
      settoken(client_secret?.data?.data);
    } else {
      window.location.href = location;
    }
  }, [state]);

  const handleNavigate = () => {
    navigate("/");
  };

  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { paymentIntent, error } = await stripe.confirmCardPayment(
      client_secret_id,
      {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      }
    );

    setLoading(false);

    if (paymentIntent) {
      if (paymentIntent?.status === "succeeded") {
        const Data = paymentIntent?.id;
        dispatch(postPaymentData({ Data, token }));
        handleNavigate();
      }
    } else if (error) {
      toast(error?.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (

    <div className="container-fluid stepsform stepsform1">
      <div className="row padding-row registerForm paymentForm">
        <div className="top-account-css">
          <p>Already have an account?</p>
          <p className="signup-btn" onClick={handleNavigate}>
            Login
          </p>
        </div>

        <div className="col-sm-12 loginlogo">
          <a href="https://thepoolnest.com/" target="_blank">
            <img src="../Images/logo.png" alt="logo" />
          </a>
        </div>
        <div className="col-sm-6 stepforms step steps">
          <div className="row fomik addRoute">
            <h3>
              Step 2: Payment Information <FaLock />
            </h3>
            <form onSubmit={handleSubmit} className="formpayement">
              <div className="card-element">
                <h2 className="carddetails">Please Enter Cards Details</h2>
                <div className="col-sm-12">

                  <Form.Item name="cardDetails" required>
                    <CardElement
                      options={{
                        style: {
                          base: {
                            fontSize: "16px",
                            color: "#424770",
                            "::placeholder": {
                              color: "#aab7c4",
                            },
                          },
                        },
                      }}
                    />
                  </Form.Item>
                </div>
              </div>
              <Space className="paymentSpace">
                <div className="col-sm-12 paymentBtn">
                  <Button
                    type="primary"
                    className="nextbtn"
                    htmlType="submit"
                    disabled={!stripe || loading}
                  >
                    Pay Now
                  </Button>
                </div>
              </Space>
            </form>
          </div>
        </div>
        <div className="col-sm-6 froImageBaner">
          <img src={img3} alt="" className="bnrimgone" />
        </div>
      </div>
    </div>
  );
};

export default PaymentInfo;
