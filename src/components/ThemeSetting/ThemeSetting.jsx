import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ColorPicker } from 'antd';

import { Badge, Card, Space } from "antd";

const AddChecklistform = () => {

  

  const HandlePrimaryTheme = async (data) => {
    await localStorage.setItem("primary",data)
    const storeTheme  = localStorage.getItem("primary")
    document.documentElement.style.setProperty(
      "--primary-color",
      storeTheme
    );


    document.documentElement.style.setProperty(
      "--font-color",
      "#fff"
    );
  }

  const HandleSecondaryTheme = () => {
    document.documentElement.style.setProperty(
      "--secondary-color",
      ThemeData.SecondaryColor
    );
  }
  
  const handleChange = (data, code) => {
    console.log(data, code)
     localStorage.setItem("primary",code)
    const storeTheme  = localStorage.getItem("primary")
    document.documentElement.style.setProperty(
      "--primary-color",
      storeTheme)
  }

  return (
    <div className="checkForm fomik addRoute">
      <div className="row accout-setting">
        <div className="col-sm-9">
          <div className="theme-class-data">
          <ColorPicker defaultValue="#750004" onChange={handleChange}/>
          </div>
        </div>
        <div className="col-sm-3">
          <div className="theme-card">
            <Badge.Ribbon text="Blue Dianne" className="">
              <Card title="Primary Color #1" size="small" className="Dianne" onClick={() => HandlePrimaryTheme("#750004")}>
                Blue Dianne
              </Card>
            </Badge.Ribbon>

            <Badge.Ribbon text="Black Blue" className="">
              <Card title="Primary Color #2" size="small" className="BlackBlue" onClick={() => HandlePrimaryTheme("#20C073")}>
                Black Blue
              </Card>
            </Badge.Ribbon>

            <Badge.Ribbon text="Beer" className="">
              <Card title="Primary Color #3" size="small" className="Beer" onClick={() => HandlePrimaryTheme("#15093d")}>
                Navy Blue
              </Card>
            </Badge.Ribbon>

            <Badge.Ribbon text="Neon Yellow" className="" >
              <Card
                title="Primary Color #4"
                size="small"
                className="NeonYellow" onClick={() => HandlePrimaryTheme("#9f02aa")}
              >
                Neon Yellow Green
              </Card>
            </Badge.Ribbon>

            <Badge.Ribbon text="Dark Mode" className="" >
              <Card
                title="Primary Color #5"
                size="small"
                className="DarkMode" onClick={() => HandlePrimaryTheme("#000000")}
              >
               Dark Mode
              </Card>
            </Badge.Ribbon>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddChecklistform;
