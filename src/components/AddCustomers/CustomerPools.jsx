import React from "react";
import { Fragment } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import { Button, Form, Input, Select } from "antd";
import Switch from "antd/lib/switch";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTechnician } from "../../redux/Slices/GetTechnician";

const CustomerPools = () => {
  const dispatch = useDispatch();
  const postDataResult = useSelector((state) => state.Technician);
  useEffect(() => {
    dispatch(fetchTechnician());
  }, [dispatch]);

  return (
    <Fragment>
      <>
        {(fieldsinner, { add: addInner, remove: removeInner }) => (
          <>
            <div className="row servicerow poools">
              <div className="col-sm-12 btns">
                <Form.Item>
                  <Button
                    className="yellowbtn form"
                    onClick={() => addInner()}
                    block
                  >
                    Add Pools
                  </Button>
                </Form.Item>
              </div>
            </div>

            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              loop={true}
              pagination={{ clickable: true }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              {fieldsinner.map(
                ({ index, name: innerName, ...restInnerField }) => (
                  <SwiperSlide key={index}>
                    <div className="row poools">
                      <div className="col-sm-6 heads">
                        <h3>Water Body</h3>
                      </div>
                      <div className="col-sm-6 poolsremove">
                        <Button
                          className="bluebtn form"
                          onClick={() => removeInner(innerName)}
                        >
                          Remove Pools
                        </Button>
                      </div>
                      <div className="col-sm-3">
                        <Form.Item
                          {...restInnerField}
                          name={[innerName, "poolname"]}
                          rules={[
                            { required: true, message: "Pool Name is Invalid" },
                          ]}
                        >
                          <Input placeholder="Notes" type="text" />
                        </Form.Item>
                      </div>
                      <div className="col-sm-3 switchbtn">
                        <Form.Item
                          valuePropName="checked"
                          name={[innerName, "pool"]}
                          label="Pool"
                        >
                          <Switch />
                        </Form.Item>
                      </div>
                      <div className="col-sm-3 switchbtn">
                        <Form.Item
                          valuePropName="checked"
                          name={[innerName, "spa"]}
                          label="SPA"
                        >
                          <Switch />
                        </Form.Item>
                      </div>
                      <div className="col-sm-3 switchbtn">
                        <Form.Item
                          valuePropName="checked"
                          name={[innerName, "waterfeature"]}
                          label="Water Feature"
                        >
                          <Switch />
                        </Form.Item>
                      </div>
                      i
                      <div className="col-sm-12 heads">
                        <h3>Route Assignment</h3>
                      </div>
                      <div className="col-sm-3">
                        <Form.Item
                          name={[innerName, "tech"]}
                          rules={[
                            { required: true, message: "Tech is required" },
                          ]}
                        >
                          <Select placeholder="Tech">
                            <Option value="Zhejiang">Zhejiang</Option>
                            <Option value="Jiangsu">Jiangsu</Option>
                          </Select>
                        </Form.Item>
                      </div>
                      <div className="col-sm-3">
                        <Form.Item
                          name={[innerName, "dayofweek"]}
                          rules={[
                            {
                              required: true,
                              message: "Day Of Week is required",
                            },
                          ]}
                        >
                          <Select placeholder="Day Of Week">
                            <Option value="Zhejiang">Zhejiang</Option>
                            <Option value="Jiangsu">Jiangsu</Option>
                          </Select>
                        </Form.Item>
                      </div>
                      <div className="col-sm-2">
                        <Form.Item
                          name={[innerName, "frequency"]}
                          rules={[
                            {
                              required: true,
                              message: "Frequency is required",
                            },
                          ]}
                        >
                          <Select placeholder="Frequency">
                            <Option value="Zhejiang">Zhejiang</Option>
                            <Option value="Jiangsu">Jiangsu</Option>
                          </Select>
                        </Form.Item>
                      </div>
                      <div className="col-sm-2">
                        <Form.Item
                          name={[innerName, "starton"]}
                          rules={[
                            { required: true, message: "Start On is required" },
                          ]}
                        >
                          <Select placeholder="Start On">
                            <Option value="Zhejiang">Zhejiang</Option>
                            <Option value="Jiangsu">Jiangsu</Option>
                          </Select>
                        </Form.Item>
                      </div>
                      <div className="col-sm-2">
                        <Form.Item
                          name={[innerName, "startafter"]}
                          rules={[
                            {
                              required: true,
                              message: "Start After is required",
                            },
                          ]}
                        >
                          <Select placeholder="Start After">
                            <Option value="Zhejiang">Zhejiang</Option>
                            <Option value="Jiangsu">Jiangsu</Option>
                          </Select>
                        </Form.Item>
                      </div>
                    </div>
                  </SwiperSlide>
                )
              )}
            </Swiper>
          </>
        )}
      </>
    </Fragment>
  );
};

export default CustomerPools;
