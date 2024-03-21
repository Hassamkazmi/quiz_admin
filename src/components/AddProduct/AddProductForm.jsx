import React, { useState } from "react";
import { Button, Form, Input, Space, Select, Radio } from "antd";
import Checkbox from "antd/es/checkbox/Checkbox";
import { fetchgetProductType } from "../../redux/Slices/getProductType";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  postProductsData,
  clearData,
} from "../../redux/postReducer/postProducts";

const { Option } = Select;
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddProductForm = () => {
  const { data: getProductType, statusdata } = useSelector(
    (state) => state.getProductType
  );

  const { loading, success, error } = useSelector(
    (state) => state.postProducts
  );
  const [includeServicePrice, setIncludeServicePrice] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckboxChange = (e) => {
    setIncludeServicePrice(e.target.checked);
  };

  const [form] = Form.useForm();
  useEffect(() => {
    dispatch(fetchgetProductType({}));
  }, []);

  const onFinish = async (values, key) => {
    const Data = {
      name: values.name,
      description: values.description,
      price: values.price,
      isTaxable: includeServicePrice,
      item_type_id: values.item_type_id,
    };

    await dispatch(postProductsData({ Data }));
  };

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(clearData());
      navigate("/product");
    }
    if (error) {
      toast.error(error);
      dispatch(resetData());
    }
  }, [error, success]);
  const onFinishFailed = (errorInfo) => {
    toast.error("Please fill all required fields!");
  };

  return (
    <div className="row fomik addRoute AddProductt">
      <Form
        name="Customer"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="row cslocation">
          <div className="col-sm-6">
            <Form.Item
              name="name"
              label="Name"
              rules={[
                { required: true, message: "Please input Product Name!" },
              ]}
            >
              <Input placeholder="Name" />
            </Form.Item>
          </div>

          <div className="col-sm-6">
            <Form.Item
              name="description"
              label="Percentage"
              rules={[
                {
                  required: true,
                  message: "Please input Percentage!",
                },
              ]}
            >
              <Input placeholder="Percentage" />
            </Form.Item>
          </div>

         
          <div className="col-sm-12 savebtn">
            <Form.Item>
              <Button
                className="yellowbtn addReadingsssSaveBtn adProfduct"
                type="primary"
                htmlType="submit"
                disabled={loading}
                loading={loading}
              >
                Save 
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AddProductForm;
