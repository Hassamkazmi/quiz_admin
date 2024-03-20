import React, { Fragment, useState, useEffect } from 'react'
import { Card, Row, Col } from "react-bootstrap";
import Noti from "../../assets/img/more.png"
import { Nav, Dropdown } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
export default function Boxes() {
  const [Data1, SetData] = useState([])
  const dispatch = useDispatch()

  return (
    <Fragment>
      <Row>

        {
           Data1.map((data) => {
            return (

              <Col lg="3" sm="6" key={data.key}>
                <Card className="card-stats">
                  <Card.Body>
                    <Row>

                      <Col xs="9">
                        <div className="icon-big text-center icon-warning">
                          <h2>{data.count}</h2>
                          <p>{data.text}</p>
                        </div>
                      </Col>

                      <Col xs="3" className='morenoti'>
                        <div className="numbers">
                      
                          <img src={data.image} alt='boximg' className='icons' />
                        </div>
                      </Col>

                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            )
          })
        }

      </Row>
    </Fragment>
  )
}
