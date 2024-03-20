import React, { Fragment } from "react";
import { Form, Select, Input, DatePicker, InputNumber, Button } from "antd";
import { useSelector , useDispatch } from "react-redux";
import { posttagsData } from "../../redux/postReducer/postTags";
import { fetchtag } from "../../redux/Slices/getTags";

const { Option } = Select;
function ServiceListModal({data}) {

  const dispatch = useDispatch();
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };




  /* eslint-enable no-template-curly-in-string */
  const onFinish = async (values) => {
    await  dispatch(posttagsData({values}));
    dispatch(fetchtag());
    data()
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Fragment>
      <div className="container-fluid modals">
        <Form
          name="nest-messages"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          validateMessages={validateMessages}
        >
          <div className="row">
            <div className="col-sm-12">
              <h4>Tags</h4>
              <div className="row myselect">    
                <div className="col-sm-12">
                  <Form.Item name="name" rules={[{ required: true }]}>
                    <Input placeholder="Name" />
                  </Form.Item>
                </div>                              
              </div>
            </div>
          </div>

          <Form.Item className="addTagsSaveBtn">
            <Button type="primary" htmlType="submit">
              {" "}
              Save{" "}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Fragment>
  );
}

export default ServiceListModal;
