import React, { Fragment } from "react";

import { Button, Upload, Form } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
export default function ShoppingImageUpload() {
  return (
    <Fragment>
      <div className="container-fluid wordkorder">
        <div className="row headwork">
          <div className="col-sm-12 heads">
            <h3>Images</h3>
          </div>

          <Form.Item
            name="upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload name="logo" action="/upload.do" listType="picture-circle">
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
        </div>
      </div>
    </Fragment>
  );
}
