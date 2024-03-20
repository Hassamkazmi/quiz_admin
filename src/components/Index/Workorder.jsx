import React, { Fragment } from 'react'
import {Card} from "react-bootstrap";
import Noti from "../../assets/img/more.png"
import Noti1 from "../../assets/img/more1.png"
import { Nav, Dropdown } from "react-bootstrap";
import { workorder } from '../../Data/Data'


export default function Workorder({data}) {
  return (
    <Fragment>

        <Card className='workorder'>
              <Card.Header>
                <Card.Title as="h4">Recent Work Orders</Card.Title>
                        <Dropdown as={Nav.Item} className="notidrop" >
                            <Dropdown.Toggle   data-toggle="dropdown"  id="dropdown-67443507"  variant="default"  className="m-0" >
                            <img src={Noti} alt='boximg'/>
                            </Dropdown.Toggle>
                            {/* <Dropdown.Menu>
                              <Dropdown.Item  href="#pablo"  onClick={(e) => e.preventDefault()} > Edit </Dropdown.Item>
                              <Dropdown.Item  href="#pablo"  onClick={(e) => e.preventDefault()} > Update</Dropdown.Item>
                              <Dropdown.Item  href="#pablo"  onClick={(e) => e.preventDefault()} > Delete </Dropdown.Item>
                            </Dropdown.Menu> */}
                        </Dropdown>
              </Card.Header>
              <div className='workorderheight'>
               { data?.map((item) => {
              return (
              <Card.Body>
                <div className="row workdetail" key={item.key}>
                  <div className='col-sm-9'>
                    <h3>{item?.RouteAssignmentFrequency?.name}</h3>
                    <p>{item?.RouteAssignmentTechnician?.first_name +" "+ item?.RouteAssignmentTechnician?.last_name}</p>
                  </div>
                  <div className='col-sm-1'>
                  <img src={item.image}/>
                  </div>
                  <div className='col-sm-2'>
                        <Dropdown as={Nav.Item} className="notidrop" >
                            <Dropdown.Toggle   data-toggle="dropdown"  id="dropdown-67443507"  variant="default"  className="m-0" >
                            <img src={Noti1} alt='boximg' className='notificationImage'/>
                            </Dropdown.Toggle>
                            {/* <Dropdown.Menu>
                              <Dropdown.Item  href="#pablo"  onClick={(e) => e.preventDefault()} > Edit </Dropdown.Item>
                              <Dropdown.Item  href="#pablo"  onClick={(e) => e.preventDefault()} > Update</Dropdown.Item>
                              <Dropdown.Item  href="#pablo"  onClick={(e) => e.preventDefault()} > Delete </Dropdown.Item>
                            </Dropdown.Menu> */}
                        </Dropdown>
                  </div>
                  <div className='col-sm-12 progressbar'>
                      <div className='row'>
                          <div className='col-sm-8'>
                          <p>Task Completed </p>
                          </div>
                          <div className='col-sm-4 text-right'>
                          <span><span className='yellow'>{data.completed}/</span>{data.task}</span>
                          </div>
                        </div>
                      <div className="progress">
                          <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width:`${data.progress}%`}}> </div>
                      </div>

                      <div className='row'>
                          <div className='col-sm-6'>
                          <p>Deadline:  </p>
                          </div>
                          <div className='col-sm-6 text-right'>
                          <span>{data.deadline}</span>
                          </div>
                        </div>
                  </div>
                </div>
                
              </Card.Body>
                 )
                })}
                </div>
            </Card>
            
    </Fragment>
  )
}
