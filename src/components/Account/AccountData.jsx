import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Badge, Card, Space } from "antd";

const AddChecklistform = () => {

  

  const HandlePrimaryTheme = (data) => {
    document.documentElement.style.setProperty(
      "--primary-color",
      data
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
  

  return (
    <div className="checkForm fomik addRoute">
      <div className="row accout-setting">
        <div className="col-sm-9"></div>
        <div className="col-sm-3">
          <h4 className="Setting_h4">Theme Setting</h4>
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
              <Card title="Primary Color #3" size="small" className="Beer" onClick={() => HandlePrimaryTheme("#F9B117")}>
                Beer
              </Card>
            </Badge.Ribbon>

            <Badge.Ribbon text="Neon Yellow" className="" >
              <Card
                title="Primary Color #4"
                size="small"
                className="NeonYellow" onClick={() => HandlePrimaryTheme("#EA05F9")}
              >
                Neon Yellow Green
              </Card>
            </Badge.Ribbon>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddChecklistform;
