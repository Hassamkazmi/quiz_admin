import React, { useState, useEffect } from "react";
// import Navbars from "../Components/Navbars";
import { Button, Steps, Form } from "antd";
import InformationForm from "../components/Registration/Register";
import img1 from "../assets/img/homePageImage1.png";
import img2 from "../assets/img/homePageImage2.png";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import img3 from "../assets/img/bannerImage.png";

const Registration = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const [form] = Form.useForm();
  const [showSecondStep, setShowSecondStep] = useState(false);
  const [DataStep, setDataStep] = useState();

  const [address, setAddress] = useState("");

  const storeTheme = localStorage.getItem("primary");
  document.documentElement.style.setProperty(
    "--primary-color",
    storeTheme || "#750004"
  );

  document.documentElement.style.setProperty("--font-color", "#fff");

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      {/* <Navbars /> */}
      <div className="container-fluid stepsform stepsform1">
        <div className="row padding-row1 cslocation">
          <div className="col-sm-12 loginlogo">
            <a href="https://thepoolnest.com/" target="_blank">
              <img src="../Images/logo.png" alt="logo" />
            </a>
          </div>
        </div>
        <div className="row class-login-new cslocation">
          <div className="col-sm-6">
            <div className="row cslocation">
              <div className="col-sm-12 monthly">
                <h3>Start Your First Month for Only $49</h3>
              </div>
              <InformationForm />
            </div>
          </div>
          <div className="col-sm-6 froImageBaner">
            <img src={img3} alt="" className="bnrimgone" />
          </div>
        </div>
        <div className="top-account-css class-login-new">
          <p>Already have an account?</p>
          <p className="signup-btn" onClick={handleNavigate}>
            Login
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
