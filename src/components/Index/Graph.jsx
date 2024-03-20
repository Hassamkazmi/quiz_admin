import React, { Fragment } from 'react'
import { Card} from "react-bootstrap";
import ChartistGraph from "react-chartist";
import { Nav, Dropdown } from "react-bootstrap";

export default function Graph() {
  return (
    <Fragment>
        <Card>
              <Card.Header className='graph'>
                {/* <Card.Title as="h4">Revenue <span className="revenue">$45,000</span></Card.Title> */}
              </Card.Header>
              <Card.Footer className='graphfilter'>
                <div className="legend">
                  {/* <span><i className="fas fa-circle text-info"></i> Finished</span> 
                  <span><i className="fas fa-circle text-danger"></i> On Going</span>
                  <span><i className="fas fa-circle text-warning"></i> On Hold</span> */}
                </div>
                <div className='filters'>
                         <Dropdown as={Nav.Item} className="notidrop" >
                            <Dropdown.Toggle   data-toggle="dropdown"  id="dropdown-67443507"  variant="default"  className="m-0" >
                              <span>Month <i className="fa fa-chevron-down" aria-hidden="true"></i></span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item  href="#pablo"  onClick={(e) => e.preventDefault()} > Edit </Dropdown.Item>
                              <Dropdown.Item  href="#pablo"  onClick={(e) => e.preventDefault()} > Update</Dropdown.Item>
                              <Dropdown.Item  href="#pablo"  onClick={(e) => e.preventDefault()} > Delete </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                </div>
              </Card.Footer>
              <Card.Body>
                <div className="ct-chart" id="chartHours">
                  <ChartistGraph  data={{   labels: [  "9:00AM", "12:00AM",  "3:00PM",  "6:00PM",  "9:00PM",  "12:00PM", "3:00AM", "6:00AM",
                      ],
                      series: [
                        [287, 385, 490, 492, 554, 586, 698, 695],
                        [67, 152, 143, 240, 287, 335, 435, 437],
                        [23, 113, 67, 108, 190, 239, 307, 308],
                      ],
                    }}
                    type="Line"
                    options={{
                      low: 0,
                      high: 800,
                      showArea: false,
                      height: "245px",
                      axisX: {
                        showGrid: false,
                      },
                      lineSmooth: true,
                      showLine: true,
                      showPoint: true,
                      fullWidth: true,
                      chartPadding: {
                        right: 50,
                      },
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                  />
                </div>
              </Card.Body>

            </Card>
    </Fragment>
  )
}
