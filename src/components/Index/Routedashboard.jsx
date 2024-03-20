import React, { Fragment } from 'react'
import { Card} from "react-bootstrap";
import { Link } from 'react-router-dom';
import Noti from "../../assets/img/more.png"
import { Nav, Dropdown } from "react-bootstrap";
import { routedashboard } from '../../Data/Data'
import Avatar from "../../assets/img/avatar.png"

export default function Routedashboard({data}) {
  return (
    <Fragment>
        <Card className='routedashboard'>
              <Card.Header>
                <Card.Title as="h4">Route Dashboard 
                <Link to="/route-assignment" className="yellow">View All</Link>
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartActivity">
                  <table>
                    <thead>
                    <tr>
                      <th>Technician</th>
                      <th>Customer</th>
                      <th>Pool</th>
                      <th>Assigned Day</th>
                      <th>Address</th>
                      {/* <th>Skipped</th> */}
                      <th> </th>
                    </tr>
                    </thead>

                    <tbody>
                    {data?.map((item) => {
                     return (

                    <tr key={item.key}>
                      <td><img src={Avatar} alt='image'/><b>{item.techname}</b></td>
                      <td>{item?.RouteAssignmentWaterBody?.customer_name}</td>
                      <td>{item?.RouteAssignmentWaterBody?.name}</td>
                      <td>{item.assigned_date}</td>
                      <td><b>{item?.RouteAssignmentWaterBody?.service_address}</b></td>
                      <td>
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
                      </td>
                    </tr>
                    )
                  })}

                    </tbody>
                  </table>
                </div>
              </Card.Body>
            </Card>
    </Fragment>
  )
}
