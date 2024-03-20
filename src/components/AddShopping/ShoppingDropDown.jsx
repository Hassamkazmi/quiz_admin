import { Form, Select } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchgetProductByType } from "../../redux/Slices/getProduct";

const ShoppingDropDown = ({ setType }) => {

  const dispatch = useDispatch()

  const { data: getProductType } = useSelector(
    (state) => state.getProductType
  );

  const filterOption = (input, option) => {
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };
  const currentPage = 1;
  const handleChange = (item_type_id) => {
    dispatch(fetchgetProductByType({ item_type_id,currentPage}));
  };
  return (
    <div className="row shoppingDropDown cslocation">
      <div className="col-sm-12">
        <Form.Item
          name="name"
          label="Item Type"
          // rules={[
          //   { required: true, message: "Please input name" },
          // ]}
        >
          <Select
            placeholder="Select Type"
            onChange={handleChange}
            filterOption={filterOption}
          >
            {getProductType &&
              getProductType?.items?.map((item) => {
                return <Option value={item.item_type_id}>{item.name}</Option>;
              })}
          </Select>
        </Form.Item>
      </div>
    </div>
  );
};

export default ShoppingDropDown;
