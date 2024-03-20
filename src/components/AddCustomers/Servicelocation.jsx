// import React from 'react'
// import { Fragment } from 'react'
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import { Pagination, Navigation } from "swiper";
// import { Button, Form, Input, Space, Select } from 'antd';
// import Switch from "antd/lib/switch";


// const Servicelocation = () => {


//   const onFinishs = (values) => {
//     console.log('Received values of form:', values);
//   };


//   return (
//     <Fragment>
//       <div className='row fomik dynamic_form_nest_item'>


//         <Form.List name="servicelocation" initialValue={[{ locationname: "", locationcode: "" },]} >

//           {(fields, { add, remove }) => (


//             <>
//               <div className='row servicerow'>
//                 <div className='col-sm-6'>
//                   <h3>Service Location</h3>
//                 </div>
//                 <div className='col-sm-6 btns'>
//                   <Form.Item>
//                     <Button className='yellowbtn form' onClick={() => add()} block >
//                       Add More
//                     </Button>
//                   </Form.Item>

//                 </div>

//               </div>

//               <Swiper slidesPerView={1} spaceBetween={30} loop={true} pagination={{ clickable: true, }} navigation={true} modules={[Pagination, Navigation]} className="mySwiper"  >
//                 {fields.map(({ key, name, ...restField }) => (
//                   <SwiperSlide>
//                     <Space key={key} style={{ display: 'flex', marginBottom: 8, }} align="baseline" >
//                       <div className='row'>
//                         <div className='col-sm-7'>
//                           <Form.Item {...restField} name={[name, 'locationname']} rules={[{ required: true, message: 'Missing Location name', },]} >
//                             <Input placeholder="Location Name" />
//                           </Form.Item>
//                         </div>

//                         <div className='col-sm-5'>
//                           <Form.Item  {...restField} name={[name, 'locationcode']} rules={[{ required: true, message: 'Missing Location Code', },]} >
//                             <Input placeholder="Location Code" />
//                           </Form.Item>
//                         </div>

//                         <div className='col-sm-4'>
//                           <Form.Item  {...restField} name={[name, 'city']} rules={[{ required: true, message: 'Missing City', },]} >
//                             <Input placeholder="City" />
//                           </Form.Item>
//                         </div>

//                         <div className='col-sm-4'>
//                           <Form.Item  {...restField} name={[name, 'state']} rules={[{ required: true, message: 'Missing State', },]} >
//                             <Input placeholder="State" />
//                           </Form.Item>
//                         </div>

//                         <div className='col-sm-4'>
//                           <Form.Item  {...restField} name={[name, 'zipcode']} rules={[{ required: true, message: 'Missing Zip Code for service location', },]} >
//                             <Input placeholder="Zip-Code" type="number" />
//                           </Form.Item>
//                         </div>

//                         <div className='col-sm-4'>
//                           <Form.Item  {...restField} name={[name, 'email']} rules={[{ type: 'email', message: 'The input is not valid E-mail!', }, { required: true, message: 'Email is Invalid', },]} >
//                             <Input placeholder="E-mail" />
//                           </Form.Item>
//                         </div>

//                         <div className='col-sm-4'>
//                           <Form.Item  {...restField} name={[name, 'mobile(primary)']} rules={[{ required: true, message: 'Number is Invalid', },]} >
//                             <Input placeholder="Mobile # (Primary)" type='number' />
//                           </Form.Item>
//                         </div>

//                         <div className='col-sm-4'>
//                           <Form.Item  {...restField} name={[name, 'mobile(secondary)']} rules={[{ required: true, message: 'write correct length', },]} >
//                             <Input placeholder="Mobile # (Secondary)" type='number' />
//                           </Form.Item>
//                         </div>

//                         <div className='col-sm-12'>
//                           <Form.Item  {...restField} name={[name, 'locationaddress']} rules={[{ required: true, message: 'Address Invalid', },]} >
//                             <Input placeholder="Location Address" type='text' />
//                           </Form.Item>
//                         </div>

//                         <div className='col-sm-3'>
//                           <Form.Item {...restField} name={[name, 'gatecode']} rules={[{ required: true, message: 'Missing Gate Code for service location', },]} >
//                             <Input placeholder="Gate Code" type="number" />
//                           </Form.Item>
//                         </div>

//                         <div className='col-sm-3'>
//                           <Form.Item  {...restField} name={[name, 'dogsname']}  >
//                             <Input placeholder="Dogs Name (optional)" type='text' />
//                           </Form.Item>
//                         </div>

//                         <div className='col-sm-3'>
//                           <Form.Item {...restField} name={[name, 'minutesatstop']} rules={[{ required: true, message: 'Invalid Minutes Of Stop', },]} >
//                             <Input placeholder="Minutes Of Stop" type="number" />
//                           </Form.Item>
//                         </div>

//                         <div className='col-sm-3'>
//                           <Form.Item name={[name, 'salestaxgroup']} rules={[{ required: true, message: 'Sales Tax is required', },]} >
//                             <Select placeholder="Sales Tax Group">
//                               <Option value="sales group">Sales Group</Option>
//                               <Option value="non sales group">Non Sales Group</Option>
//                             </Select>
//                           </Form.Item>
//                         </div>

//                         <div className='col-sm-3'>
//                           <Form.Item  {...restField} name={[name, 'rate']} rules={[{ required: true, message: 'Invalid Rate', },]} >
//                             <Input placeholder="Rate" type='text' />
//                           </Form.Item>
//                         </div>

//                         <div className='col-sm-3'>
//                           <Form.Item name={[name, 'ratetype']} rules={[{ required: true, message: 'Rate Type is required', },]} >
//                             <Select placeholder="Rate Type">
//                               <Option value="dollar">Dollar</Option>
//                               <Option value="nationalcurrency">National Currency</Option>
//                             </Select>
//                           </Form.Item>
//                         </div>

//                         <div className='col-sm-3'>
//                           <Form.Item  {...restField} name={[name, 'labortype']} rules={[{ required: true, message: 'Invalid Labor type', },]} >
//                             <Input placeholder="Labor type" type='text' />
//                           </Form.Item>
//                         </div>

//                         <div className='col-sm-3'>
//                           <Form.Item name={[name, 'laborcosttype']} rules={[{ required: true, message: 'Labor Cost Type is required', },]} >
//                             <Select placeholder="Labot Cost Type">
//                               <Option value="daily">Daily</Option>
//                               <Option value="weekly">Weekly</Option>
//                               <Option value="monthly">Monthly</Option>
//                             </Select>
//                           </Form.Item>
//                         </div>

//                         <div className='col-sm-12'>
//                           <Form.Item  {...restField} name={[name, 'notes']} rules={[{ required: true, message: 'Notes are Invalid', },]} >
//                             <Input placeholder="Notes" type='text' />
//                           </Form.Item>
//                         </div>



//                         <div className='col-sm-12'>
//                           <Form.List name={[name, 'pools']} initialValue={[{ poolname: '' }]}>
//                             {(fieldsinner, { add: addInner, remove: removeInner }) => (
//                               <>
//                                 <div className='row servicerow poools'>
//                                   <div className='col-sm-12 btns'>
//                                     <Form.Item>
//                                       <Button className='yellowbtn form' onClick={() => addInner()} block>
//                                         Add More Pools
//                                       </Button>
//                                     </Form.Item>
//                                   </div>
//                                 </div>

//                                 <Swiper slidesPerView={1} spaceBetween={30} loop={true} pagination={{ clickable: true }} navigation={true} modules={[Pagination, Navigation]} className='mySwiper'>
//                                   {fieldsinner.map(({ index, name: innerName, ...restInnerField }) => (
//                                     <SwiperSlide key={index}>
//                                       <div className='row poools'>
//                                         <div className='col-sm-6 heads'>
//                                           <h3>Water Body</h3>
//                                         </div>
//                                         <div className='col-sm-6 poolsremove'>
//                                           <Button className='bluebtn form' onClick={() => removeInner(innerName)}>
//                                             Remove Pools
//                                           </Button>
//                                         </div>
//                                         <div className='col-sm-3'>
//                                           <Form.Item {...restInnerField} name={[innerName, 'poolname']} rules={[{ required: true, message: 'Pool Name is Invalid' }]}>
//                                             <Input placeholder='Pool Name' type='text' />
//                                           </Form.Item>
//                                         </div>

//                                         <div className='col-sm-3 switchbtn'>
//                                           <Form.Item valuePropName='checked' name={[innerName, 'pool']} label='Pool'>
//                                             <Switch />
//                                           </Form.Item>
//                                         </div>
//                                         <div className='col-sm-3 switchbtn'>
//                                           <Form.Item valuePropName='checked' name={[innerName, 'spa']} label='SPA'>
//                                             <Switch />
//                                           </Form.Item>
//                                         </div>
//                                         <div className='col-sm-3 switchbtn'>
//                                           <Form.Item valuePropName='checked' name={[innerName, 'waterfeature']} label='Water Feature'>
//                                             <Switch />
//                                           </Form.Item>
//                                         </div>

//                                         <div className='col-sm-12 heads'>
//                                           <h3>Route Assignment</h3>
//                                         </div>

//                                         <div className='col-sm-3'>
//                                           <Form.Item name={[innerName, 'tech']} rules={[{ required: true, message: 'Tech is required' }]}>
//                                             <Select placeholder='Tech'>
//                                               <Option value='aeron'>Aeron</Option>
//                                               <Option value='jhon snow'>Jhon Snow</Option>
//                                             </Select>
//                                           </Form.Item>
//                                         </div>
//                                         <div className='col-sm-3'>
//                                           <Form.Item name={[innerName, 'dayofweek']} rules={[{ required: true, message: 'Day Of Week is required' }]}>
//                                             <Select placeholder='Day Of Week'>
//                                               <Option value='monday'>Monday</Option>
//                                               <Option value='tuesday'>Tuesday</Option>
//                                               <Option value='wednesday'>Wednesday</Option>
//                                               <Option value='thursday'>Thursday</Option>
//                                               <Option value='friday'>Friday</Option>
//                                               <Option value='saturday'>Saturday</Option>
//                                               <Option value='sunday'>Sunday</Option>
//                                             </Select>
//                                           </Form.Item>
//                                         </div>
//                                         <div className='col-sm-2'>
//                                           <Form.Item name={[innerName, 'frequency']} rules={[{ required: true, message: 'Frequency is required' }]}>
//                                             <Select placeholder='Frequency'>
//                                               <Option value='20ghz'>20ghz</Option>
//                                               <Option value='50ghz'>50ghz</Option>
//                                               <Option value='100ghz'>100ghz</Option>
//                                             </Select>
//                                           </Form.Item>
//                                         </div>
//                                         <div className='col-sm-2'>
//                                           <Form.Item name={[innerName, 'starton']} rules={[{ required: true, message: 'Start On is required' }]}>
//                                             <Select placeholder='Start On'>
//                                               <Option value='now'>Now</Option>
//                                               <Option value='later'>Later</Option>
//                                             </Select>
//                                           </Form.Item>
//                                         </div>
//                                         <div className='col-sm-2'>
//                                           <Form.Item name={[innerName, 'startafter']} rules={[{ required: true, message: 'Start After is required' }]}>
//                                             <Select placeholder='Start After'>
//                                               <Option value='tomorrow'>Tommorow</Option>
//                                               <Option value='week'>Week</Option>
//                                             </Select>
//                                           </Form.Item>
//                                         </div>
//                                       </div>
//                                     </SwiperSlide>
//                                   ))}
//                                 </Swiper>
//                               </>
//                             )}
//                           </Form.List>
//                         </div>


//                         <div className='col-sm-12 heads'>
//                           <h3>Communications</h3>
//                         </div>
//                         <div className='col-sm-3 com'>
//                           <label>Notify Customer Through SMS on Arrival</label>
//                           <Form.Item name={[name, 'smsonarive']} rules={[{ required: true, message: 'Time is required', },]} >
//                             <Select placeholder="15 Min">
//                               <Option value="15 min">15 Min</Option>
//                               <Option value="30 Min">30 Min</Option>
//                             </Select>
//                           </Form.Item>
//                         </div>
//                         <div className='col-sm-3 com'>
//                           <label>Notify Customer Through Email on Arrival</label>
//                           <Form.Item name={[name, 'emailonarive']} rules={[{ required: true, message: 'Time is required', },]} >
//                             <Select placeholder="15 Min">
//                               <Option value="15 min">15 Min</Option>
//                               <Option value="30 Min">30 Min</Option>
//                             </Select>
//                           </Form.Item>
//                         </div>
//                         <div className='col-sm-3 com'>
//                           <label>Notify Customer on work compeleted via SMS</label>
//                           <Form.Item name={[name, 'viasms']} rules={[{ required: true, message: 'Time is required', },]} >
//                             <Select placeholder="15 Min">
//                               <Option value="15 min">15 Min</Option>
//                               <Option value="30 Min">30 Min</Option>
//                             </Select>
//                           </Form.Item>
//                         </div>
//                         <div className='col-sm-3 com'>
//                           <label>Notify Customer on work compeleted via Email</label>
//                           <Form.Item name={[name, 'vismail']} rules={[{ required: true, message: 'Time is required', },]} >
//                             <Select placeholder="15 Min">
//                               <Option value="15 min">15 Min</Option>
//                               <Option value="30 Min">30 Min</Option>
//                             </Select>
//                           </Form.Item>
//                         </div>






//                         <Button className='bluebtn form' onClick={() => remove(name)} > Remove </Button>
//                       </div>
//                     </Space>
//                   </SwiperSlide>

//                 ))}
//               </Swiper>
//             </>
//           )}
//         </Form.List>

//       </div>
//     </Fragment>

//   )
// }

// export default Servicelocation